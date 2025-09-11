import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { HomeFeed } from './components/HomeFeed';
import { ReportIssue } from './components/ReportIssue';
import { SearchScreen } from './components/SearchScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { GuestLimitedScreen } from './components/GuestLimitedScreen';
import { Home, Search, Plus, Bell, User, Languages } from 'lucide-react';
import { Button } from './components/ui/button';

type Screen = 'login' | 'home' | 'search' | 'report' | 'notifications' | 'profile';

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  phone?: string;
  isGuest?: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const translations = {
    en: {
      home: 'Home',
      search: 'Search', 
      report: 'Report',
      notifications: 'Alerts',
      profile: 'Profile'
    },
    hi: {
      home: 'होम',
      search: 'खोजें',
      report: 'रिपोर्ट',
      notifications: 'अलर्ट',
      profile: 'प्रोफ़ाइल'
    }
  };

  const t = translations[language];

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleGuestLogin = () => {
    const guestUser: User = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@jansetu.com',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isGuest: true
    };
    setUser(guestUser);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="absolute top-4 right-4">
          <Button
            variant="outline" 
            size="sm"
            onClick={toggleLanguage}
            className="rounded-full"
          >
            <Languages className="w-4 h-4 mr-1" />
            {language.toUpperCase()}
          </Button>
        </div>
        <LoginScreen onLogin={handleLogin} onGuestLogin={handleGuestLogin} language={language} />
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeFeed user={user} language={language} />;
      case 'search':
        return <SearchScreen language={language} />;
      case 'report':
        return <ReportIssue user={user} language={language} onSuccess={() => setCurrentScreen('home')} />;
      case 'notifications':
        return user.isGuest ? <GuestLimitedScreen screenType="notifications" language={language} /> : <NotificationsScreen user={user} language={language} />;
      case 'profile':
        return user.isGuest ? <GuestLimitedScreen screenType="profile" language={language} onLogin={() => setCurrentScreen('login')} /> : <ProfileScreen user={user} language={language} onLogout={handleLogout} />;
      default:
        return <HomeFeed user={user} language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">JS</span>
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Jan Setu
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            {user?.isGuest && (
              <Button
                variant="default"
                size="sm"
                onClick={() => setCurrentScreen('login')}
                className="rounded-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
              >
                Sign Up
              </Button>
            )}
            <Button
              variant="outline" 
              size="sm"
              onClick={toggleLanguage}
              className="rounded-full"
            >
              <Languages className="w-4 h-4 mr-1" />
              {language.toUpperCase()}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <div className="flex items-center justify-around py-2 px-4">
          {[
            { key: 'home', icon: Home, label: t.home },
            { key: 'search', icon: Search, label: t.search },
            { key: 'report', icon: Plus, label: t.report },
            { key: 'notifications', icon: Bell, label: t.notifications },
            { key: 'profile', icon: User, label: t.profile }
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setCurrentScreen(key as Screen)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-2xl transition-all duration-200 ${
                currentScreen === key 
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white transform scale-105' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${key === 'report' && currentScreen === key ? 'rotate-45' : ''} transition-transform duration-200`} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}