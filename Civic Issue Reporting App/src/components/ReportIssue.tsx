import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Camera, 
  MapPin, 
  Upload, 
  X,
  Check,
  AlertTriangle,
  Trash2,
  Zap,
  Droplets,
  Car,
  Building2,
  TreePine
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ReportIssueProps {
  user: any;
  language: 'en' | 'hi';
  onSuccess: () => void;
}

const translations = {
  en: {
    reportIssue: 'Report Issue',
    title: 'Issue Title',
    titlePlaceholder: 'Describe the issue briefly...',
    description: 'Description',
    descriptionPlaceholder: 'Provide detailed information about the issue...',
    addPhoto: 'Add Photo',
    takePhoto: 'Take Photo',
    uploadPhoto: 'Upload Photo',
    location: 'Location',
    locationPlaceholder: 'Select location on map or enter address...',
    currentLocation: 'Use Current Location',
    selectCategory: 'Select Category',
    road: 'Road',
    garbage: 'Garbage',
    electricity: 'Electricity',
    water: 'Water',
    infrastructure: 'Infrastructure',
    environment: 'Environment',
    submitReport: 'Submit Report',
    submitting: 'Submitting...',
    success: 'Issue reported successfully!',
    titleRequired: 'Title is required',
    descriptionRequired: 'Description is required',
    locationRequired: 'Location is required',
    categoryRequired: 'Category is required',
    photoOptional: 'Photo (Optional)',
    removePhoto: 'Remove Photo',
    maxLength: 'characters remaining',
    guestLimited: 'Sign up required to report issues',
    guestMessage: 'Create an account to report civic issues and help improve your community',
    createAccount: 'Create Account'
  },
  hi: {
    reportIssue: 'समस्या रिपोर्ट करें',
    title: 'समस्या का शीर्षक',
    titlePlaceholder: 'समस्या का संक्षिप्त विवरण दें...',
    description: 'विस्तृत विवरण',
    descriptionPlaceholder: 'समस्या की विस्तृत जानकारी प्रदान करें...',
    addPhoto: 'फोटो जोड़ें',
    takePhoto: 'फोटो लें',
    uploadPhoto: 'फोटो अपलोड करें',
    location: 'स्थान',
    locationPlaceholder: 'मानचित्र पर स्थान चुनें या पता दर्ज करें...',
    currentLocation: 'वर्तमान स्थान का उपयोग करें',
    selectCategory: 'श्रेणी चुनें',
    road: 'सड़क',
    garbage: 'कचरा',
    electricity: 'बिजली',
    water: 'पानी',
    infrastructure: 'बुनियादी ढांचा',
    environment: 'पर्यावरण',
    submitReport: 'रिपोर्ट जमा करें',
    submitting: 'जमा किया जा रहा है...',
    success: 'समस्या सफलतापूर्वक रिपोर्ट की गई!',
    titleRequired: 'शीर्षक आवश्यक है',
    descriptionRequired: 'विवरण आवश्यक है',
    locationRequired: 'स्थान आवश्यक है',
    categoryRequired: 'श्रेणी आवश्यक है',
    photoOptional: 'फोटो (वैकल्पिक)',
    removePhoto: 'फोटो हटाएं',
    maxLength: 'अक्षर शेष',
    guestLimited: 'समस्या रिपोर्ट करने के लिए साइन अप आवश्यक',
    guestMessage: 'नागरिक समस्याओं की रिपोर्ट करने और अपने समुदाय को बेहतर बनाने में मदद करने के लिए एक खाता बनाएं',
    createAccount: 'खाता बनाएं'
  }
};

const categories = [
  { id: 'road', icon: Car, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'garbage', icon: Trash2, color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'electricity', icon: Zap, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'water', icon: Droplets, color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
  { id: 'infrastructure', icon: Building2, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'environment', icon: TreePine, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
];

export function ReportIssue({ user, language, onSuccess }: ReportIssueProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    photo: null as File | null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const t = translations[language];

  // Show guest limitation screen if user is a guest
  if (user.isGuest) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="rounded-3xl border-0 shadow-xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-3">{t.guestLimited}</h2>
            <p className="text-orange-100 leading-relaxed mb-6">{t.guestMessage}</p>
            <Button
              onClick={() => window.history.back()}
              variant="secondary"
              className="rounded-2xl px-8"
            >
              {t.createAccount}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = t.titleRequired;
    if (!formData.description.trim()) newErrors.description = t.descriptionRequired;
    if (!formData.location.trim()) newErrors.location = t.locationRequired;
    if (!formData.category) newErrors.category = t.categoryRequired;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(t.success);
      setIsSubmitting(false);
      onSuccess();
    }, 2000);
  };

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setFormData({ ...formData, photo: file });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removePhoto = () => {
    setFormData({ ...formData, photo: null });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ 
            ...formData, 
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` 
          });
          toast.success('Location updated!');
        },
        (error) => {
          toast.error('Unable to get location. Please enter manually.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="rounded-3xl border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
            {t.reportIssue}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-medium">{t.title}</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t.titlePlaceholder}
                className="rounded-2xl border-gray-200 focus:border-blue-500 p-4"
                maxLength={100}
              />
              <div className="flex justify-between text-sm text-gray-500">
                {errors.title && <span className="text-red-500">{errors.title}</span>}
                <span className="ml-auto">{100 - formData.title.length} {t.maxLength}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-medium">{t.description}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t.descriptionPlaceholder}
                className="rounded-2xl border-gray-200 focus:border-blue-500 p-4 min-h-[120px] resize-none"
                maxLength={500}
              />
              <div className="flex justify-between text-sm text-gray-500">
                {errors.description && <span className="text-red-500">{errors.description}</span>}
                <span className="ml-auto">{500 - formData.description.length} {t.maxLength}</span>
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">{t.selectCategory}</Label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = formData.category === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: category.id })}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                        isSelected 
                          ? `${category.color} border-opacity-100 scale-105 shadow-lg` 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? '' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${isSelected ? '' : 'text-gray-600'}`}>
                        {t[category.id as keyof typeof t]}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-medium">{t.location}</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={t.locationPlaceholder}
                  className="rounded-2xl border-gray-200 focus:border-blue-500 p-4 flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={getCurrentLocation}
                  className="rounded-2xl border-gray-200 hover:bg-gray-50 px-4"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
              {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
            </div>

            {/* Photo Upload */}
            <div className="space-y-3">
              <Label className="text-base font-medium">{t.photoOptional}</Label>
              
              {!formData.photo ? (
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">{t.addPhoto}</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-2xl border-gray-200 hover:bg-gray-50"
                      onClick={() => document.getElementById('camera-input')?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {t.takePhoto}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-2xl border-gray-200 hover:bg-gray-50"
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {t.uploadPhoto}
                    </Button>
                  </div>
                  
                  <input
                    id="camera-input"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                    className="hidden"
                  />
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Uploaded issue"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {formData.photo.name}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-4 text-lg font-medium shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t.submitting}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  {t.submitReport}
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}