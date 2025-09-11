import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Eye, EyeOff, Mail, Phone, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginScreenProps {
  onLogin: (user: any) => void;
  onGuestLogin: () => void;
  language: 'en' | 'hi';
}

const translations = {
  en: {
    welcome: 'Welcome to Jan Setu',
    subtitle: 'Report civic issues, build better communities',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    sendOtp: 'Send OTP',
    enterOtp: 'Enter OTP',
    verifyOtp: 'Verify OTP',
    signInBtn: 'Sign In',
    signUpBtn: 'Create Account',
    orContinue: 'Or continue with',
    phoneLogin: 'Phone + OTP',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    nameRequired: 'Full name is required',
    phoneRequired: 'Phone number is required',
    passwordMismatch: 'Passwords do not match',
    invalidEmail: 'Please enter a valid email address',
    weakPassword: 'Password must be at least 6 characters',
    agreeTo: 'By continuing, you agree to our Terms of Service and Privacy Policy',
    continueAsGuest: 'Continue as Guest',
    guestAccess: 'Browse issues and explore the community without signing up'
  },
  hi: {
    welcome: 'जन सेतु में आपका स्वागत है',
    subtitle: 'नागरिक समस्याओं की रिपोर्ट करें, बेहतर समुदाय बनाएं',
    login: 'लॉगिन',
    signup: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    fullName: 'पूरा नाम',
    phoneNumber: 'फोन नंबर',
    sendOtp: 'OTP भेजें',
    enterOtp: 'OTP दर्ज करें',
    verifyOtp: 'OTP सत्यापित करें',
    signInBtn: 'साइन इन करें',
    signUpBtn: 'खाता बनाएं',
    orContinue: 'या जारी रखें',
    phoneLogin: 'फोन + OTP',
    emailRequired: 'ईमेल आवश्यक है',
    passwordRequired: 'पासवर्ड आवश्यक है',
    nameRequired: 'पूरा नाम आवश्यक है',
    phoneRequired: 'फोन नंबर आवश्यक है',
    passwordMismatch: 'पासवर्ड मेल नहीं खाते',
    invalidEmail: 'कृपया एक वैध ईमेल पता दर्ज करें',
    weakPassword: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए',
    agreeTo: 'जारी रखकर, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत हैं',
    continueAsGuest: 'गेस्ट के रूप में जारी रखें',
    guestAccess: 'साइन अप किए बिना समस्याओं को ब्राउज़ करें और समुदाय का अन्वेषण करें'
  }
};

export function LoginScreen({ onLogin, onGuestLogin, language }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    otp: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[language];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (activeTab === 'login') {
      if (!formData.email) newErrors.email = t.emailRequired;
      else if (!validateEmail(formData.email)) newErrors.email = t.invalidEmail;
      if (!formData.password) newErrors.password = t.passwordRequired;
    } else {
      if (!formData.fullName) newErrors.fullName = t.nameRequired;
      if (!formData.email) newErrors.email = t.emailRequired;
      else if (!validateEmail(formData.email)) newErrors.email = t.invalidEmail;
      if (!formData.password) newErrors.password = t.passwordRequired;
      else if (formData.password.length < 6) newErrors.password = t.weakPassword;
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t.passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: '1',
        name: formData.fullName || 'Demo User',
        email: formData.email,
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        phone: formData.phoneNumber
      };
      
      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  const handleOtpLogin = async () => {
    if (!formData.phoneNumber) {
      setErrors({ phoneNumber: t.phoneRequired });
      return;
    }

    setIsLoading(true);
    // Simulate OTP send
    setTimeout(() => {
      setIsOtpMode(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleOtpVerify = async () => {
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      const userData = {
        id: '1',
        name: 'Demo User',
        email: 'user@example.com',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        phone: formData.phoneNumber
      };
      
      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Hero */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl flex items-center justify-center shadow-lg">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1658734029438-d97357737bf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpYyUyMGNvbW11bml0eSUyMGdvdmVybm1lbnQlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzU3MzQ2MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Jan Setu Logo"
              className="w-12 h-12 rounded-2xl"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {t.welcome}
            </h1>
            <p className="text-gray-600 mt-2">{t.subtitle}</p>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="rounded-3xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-gray-100">
                <TabsTrigger value="login" className="rounded-xl">{t.login}</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-xl">{t.signup}</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent className="space-y-4">
            <Tabs value={activeTab}>
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 rounded-2xl border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    {errors.email && (
                      <Alert className="py-2 rounded-xl border-red-200 bg-red-50">
                        <AlertDescription className="text-red-600 text-sm">{errors.email}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t.password}</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 pr-10 rounded-2xl border-gray-200 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <Alert className="py-2 rounded-xl border-red-200 bg-red-50">
                        <AlertDescription className="text-red-600 text-sm">{errors.password}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : t.signInBtn}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">{t.orContinue}</span>
                  </div>
                </div>

                {/* Phone OTP Login */}
                <div className="space-y-3">
                  {!isOtpMode ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.phoneNumber}</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 9876543210"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            className="pl-10 rounded-2xl border-gray-200 focus:border-blue-500"
                          />
                        </div>
                        {errors.phoneNumber && (
                          <Alert className="py-2 rounded-xl border-red-200 bg-red-50">
                            <AlertDescription className="text-red-600 text-sm">{errors.phoneNumber}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleOtpLogin}
                        className="w-full rounded-2xl border-blue-200 hover:bg-blue-50"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Sending...' : t.sendOtp}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="otp">{t.enterOtp}</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="123456"
                          value={formData.otp}
                          onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                          className="text-center text-lg tracking-widest rounded-2xl border-gray-200 focus:border-blue-500"
                          maxLength={6}
                        />
                      </div>
                      <Button 
                        type="button" 
                        onClick={handleOtpVerify}
                        className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Verifying...' : t.verifyOtp}
                      </Button>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.fullName}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="rounded-2xl border-gray-200 focus:border-blue-500"
                    />
                    {errors.fullName && (
                      <Alert className="py-2 rounded-xl border-red-200 bg-red-50">
                        <AlertDescription className="text-red-600 text-sm">{errors.fullName}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="user@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 rounded-2xl border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    {errors.email && (
                      <Alert className="py-2 rounded-xl border-red-200 bg-red-50">
                        <AlertDescription className="text-red-600 text-sm">{errors.email}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">{t.password}</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="signupPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 pr-10 rounded-2xl border-gray-200 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <Alert className="py-2 rounded-xl border-red-200 bg-red-50">
                        <AlertDescription className="text-red-600 text-sm">{errors.password}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-10 rounded-2xl border-gray-200 focus:border-blue-500"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <Alert className="py-2 rounded-xl border-red-200 bg-red-50">
                        <AlertDescription className="text-red-600 text-sm">{errors.confirmPassword}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : t.signUpBtn}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              {t.agreeTo}
            </p>
          </CardContent>
        </Card>

        {/* Guest Access */}
        <Card className="rounded-3xl border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.continueAsGuest}</h3>
            <p className="text-sm text-gray-600 mb-4">{t.guestAccess}</p>
            <Button
              onClick={onGuestLogin}
              variant="outline"
              className="w-full rounded-2xl border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            >
              {t.continueAsGuest}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}