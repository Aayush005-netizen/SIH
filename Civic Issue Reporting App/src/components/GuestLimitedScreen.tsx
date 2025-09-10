import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  UserPlus,
  Bell,
  User,
  Lock,
  Eye,
  MessageCircle,
  Heart,
  Award
} from 'lucide-react';

interface GuestLimitedScreenProps {
  screenType: 'notifications' | 'profile';
  language: 'en' | 'hi';
  onLogin?: () => void;
}

const translations = {
  en: {
    signUpRequired: 'Sign Up Required',
    notificationsTitle: 'Stay Updated with Notifications',
    notificationsDesc: 'Get real-time updates about your reported issues, community responses, and authority actions.',
    profileTitle: 'Create Your Profile',
    profileDesc: 'Track your reports, earn community points, and build your civic reputation.',
    guestLimitations: 'As a guest, you can:',
    guestFeatures: [
      'Browse and view community issues',
      'Search for issues by location or type',
      'Read issue details and comments',
      'Explore the community map'
    ],
    memberFeatures: 'With an account, you can also:',
    memberBenefits: [
      'Report new civic issues',
      'Get notifications about issue updates',
      'Like, comment, and upvote issues',
      'Track your contribution statistics',
      'Earn community badges and achievements',
      'Build your civic reputation'
    ],
    signUp: 'Create Account',
    signIn: 'Sign In',
    continueBrowsing: 'Continue Browsing as Guest'
  },
  hi: {
    signUpRequired: 'साइन अप आवश्यक',
    notificationsTitle: 'सूचनाओं के साथ अपडेट रहें',
    notificationsDesc: 'अपनी रिपोर्ट की गई समस्याओं, सामुदायिक प्रतिक्रियाओं और प्राधिकरण कार्रवाइयों के बारे में रीयल-टाइम अपडेट प्राप्त करें।',
    profileTitle: 'अपना प्रोफ़ाइल बनाएं',
    profileDesc: 'अपनी रिपोर्ट्स को ट्रैक करें, सामुदायिक अंक अर्जित करें, और अपनी नागरिक प्रतिष्ठा बनाएं।',
    guestLimitations: 'गेस्ट के रूप में, आप कर सकते हैं:',
    guestFeatures: [
      'सामुदायिक समस्याओं को ब्राउज़ और देख सकते हैं',
      'स्थान या प्रकार के आधार पर समस्याओं की खोज कर सकते हैं',
      'समस्या विवरण और टिप्पणियां पढ़ सकते हैं',
      'सामुदायिक मानचित्र का अन्वेषण कर सकते हैं'
    ],
    memberFeatures: 'खाते के साथ, आप यह भी कर सकते हैं:',
    memberBenefits: [
      'नई नागरिक समस्याओं की रिपोर्ट करें',
      'समस्या अपडेट की सूचनाएं प्राप्त करें',
      'समस्याओं को लाइक, कमेंट और अपवोट करें',
      'अपने योगदान के आंकड़े ट्रैक करें',
      'सामुदायिक बैज और उपलब्धियां अर्जित करें',
      'अपनी नागरिक प्रतिष्ठा बनाएं'
    ],
    signUp: 'खाता बनाएं',
    signIn: 'साइन इन करें',
    continueBrowsing: 'गेस्ट के रूप में ब्राउज़िंग जारी रखें'
  }
};

export function GuestLimitedScreen({ screenType, language, onLogin }: GuestLimitedScreenProps) {
  const t = translations[language];

  const getScreenInfo = () => {
    if (screenType === 'notifications') {
      return {
        icon: Bell,
        title: t.notificationsTitle,
        description: t.notificationsDesc,
        color: 'from-blue-500 to-purple-500'
      };
    } else {
      return {
        icon: User,
        title: t.profileTitle,
        description: t.profileDesc,
        color: 'from-green-500 to-blue-500'
      };
    }
  };

  const screenInfo = getScreenInfo();
  const Icon = screenInfo.icon;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header Card */}
      <Card className={`rounded-3xl border-0 shadow-xl bg-gradient-to-r ${screenInfo.color} text-white`}>
        <CardContent className="p-8 text-center">
          <Icon className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl font-bold mb-3">{screenInfo.title}</h2>
          <p className="text-blue-100 leading-relaxed">{screenInfo.description}</p>
        </CardContent>
      </Card>

      {/* Guest Features */}
      <Card className="rounded-3xl border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Eye className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">{t.guestLimitations}</h3>
          </div>
          <ul className="space-y-3">
            {t.guestFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Member Benefits */}
      <Card className="rounded-3xl border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Lock className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">{t.memberFeatures}</h3>
          </div>
          <ul className="space-y-3 mb-6">
            {t.memberBenefits.map((benefit, index) => {
              const icons = [MessageCircle, Bell, Heart, Award, Award, Award];
              const IconComponent = icons[index] || Award;
              return (
                <li key={index} className="flex items-start">
                  <IconComponent className="w-4 h-4 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              );
            })}
          </ul>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onLogin}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-3 text-base font-medium shadow-lg"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              {t.signUp}
            </Button>
            
            <Button
              onClick={onLogin}
              variant="outline"
              className="w-full rounded-2xl border-gray-300 hover:bg-gray-50 py-3 text-base"
            >
              {t.signIn}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Continue as Guest */}
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="rounded-2xl text-gray-600 hover:text-gray-800"
        >
          {t.continueBrowsing}
        </Button>
      </div>
    </div>
  );
}