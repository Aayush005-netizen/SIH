import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  User,
  MapPin,
  Calendar,
  Award,
  BarChart3,
  Settings,
  LogOut,
  Edit,
  Trophy,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Heart,
  MessageCircle,
  ChevronUp,
  Share2
} from 'lucide-react';

interface ProfileScreenProps {
  user: any;
  language: 'en' | 'hi';
  onLogout: () => void;
}

interface UserReport {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  location: string;
  dateReported: string;
  likes: number;
  comments: number;
  upvotes: number;
}

const translations = {
  en: {
    profile: 'Profile',
    editProfile: 'Edit Profile',
    settings: 'Settings',
    logout: 'Logout',
    myReports: 'My Reports',
    statistics: 'Statistics',
    achievements: 'Achievements',
    memberSince: 'Member since',
    totalReports: 'Total Reports',
    resolvedIssues: 'Resolved Issues',
    communityPoints: 'Community Points',
    averageRating: 'Average Rating',
    pending: 'Pending',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    rejected: 'Rejected',
    all: 'All',
    reportsSubmitted: 'Reports Submitted',
    issuesResolved: 'Issues Resolved',
    communityRank: 'Community Rank',
    pointsEarned: 'Points Earned',
    activeReporter: 'Active Reporter',
    activeReporterDesc: 'Submitted 10+ reports',
    problemSolver: 'Problem Solver',
    problemSolverDesc: 'Had 5+ issues resolved',
    communityHero: 'Community Hero',
    communityHeroDesc: 'Top 10% in your area',
    verified: 'Verified Citizen',
    verifiedDesc: 'Profile verified by authorities',
    noReports: 'No reports yet',
    noReportsDesc: 'Start by reporting your first issue to help your community',
    reportFirst: 'Report Your First Issue',
    viewDetails: 'View Details',
    likes: 'likes',
    comments: 'comments',
    upvotes: 'upvotes'
  },
  hi: {
    profile: 'प्रोफ़ाइल',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    settings: 'सेटिंग्स',
    logout: 'लॉगआउट',
    myReports: 'मेरी रिपोर्ट्स',
    statistics: 'आंकड़े',
    achievements: 'उपलब्धियां',
    memberSince: 'सदस्य बने',
    totalReports: 'कुल रिपोर्ट्स',
    resolvedIssues: 'हल की गई समस्याएं',
    communityPoints: 'सामुदायिक अंक',
    averageRating: 'औसत रेटिंग',
    pending: 'लंबित',
    inProgress: 'प्रगति में',
    resolved: 'हल हो गया',
    rejected: 'अस्वीकृत',
    all: 'सभी',
    reportsSubmitted: 'रिपोर्ट्स जमा की गईं',
    issuesResolved: 'समस्याएं हल हुईं',
    communityRank: 'सामुदायिक रैंक',
    pointsEarned: 'अर्जित अंक',
    activeReporter: 'सक्रिय रिपोर्टर',
    activeReporterDesc: '10+ रिपोर्ट्स जमा कीं',
    problemSolver: 'समस्या समाधानकर्ता',
    problemSolverDesc: '5+ समस्याएं हल हुईं',
    communityHero: 'सामुदायिक हीरो',
    communityHeroDesc: 'आपके क्षेत्र में टॉप 10%',
    verified: 'सत्यापित नागरिक',
    verifiedDesc: 'प्राधिकरणों द्वारा प्रोफ़ाइल सत्यापित',
    noReports: 'अभी तक कोई रिपोर्ट नहीं',
    noReportsDesc: 'अपनी पहली समस्या रिपोर्ट करके अपने समुदाय की मदद करना शुरू करें',
    reportFirst: 'अपनी पहली समस्या रिपोर्ट करें',
    viewDetails: 'विवरण देखें',
    likes: 'लाइक',
    comments: 'टिप्पणियां',
    upvotes: 'अपवोट'
  }
};

const mockUserReports: UserReport[] = [
  {
    id: '1',
    title: 'Pothole on Main Street causing traffic issues',
    description: 'Large pothole near intersection causing vehicle damage',
    category: 'Road',
    status: 'pending',
    location: 'Main Street, Sector 15',
    dateReported: '2024-01-05',
    likes: 23,
    comments: 7,
    upvotes: 45
  },
  {
    id: '2',
    title: 'Broken streetlight at Liberty Square',
    description: 'Non-functional streetlight making area unsafe during night',
    category: 'Electricity',
    status: 'in-progress',
    location: 'Liberty Square, Gate 2',
    dateReported: '2024-01-03',
    likes: 12,
    comments: 4,
    upvotes: 28
  },
  {
    id: '3',
    title: 'Water supply disruption in Block C',
    description: 'No water supply for 3 days affecting multiple households',
    category: 'Water',
    status: 'resolved',
    location: 'Block C, Apartments',
    dateReported: '2023-12-28',
    likes: 8,
    comments: 12,
    upvotes: 34
  }
];

const achievements = [
  {
    id: 'active-reporter',
    icon: Trophy,
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    earned: true
  },
  {
    id: 'problem-solver',
    icon: CheckCircle2,
    color: 'bg-green-100 text-green-700 border-green-200',
    earned: true
  },
  {
    id: 'community-hero',
    icon: Award,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    earned: false
  },
  {
    id: 'verified',
    icon: CheckCircle2,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    earned: true
  }
];

export function ProfileScreen({ user, language, onLogout }: ProfileScreenProps) {
  const [reports] = useState<UserReport[]>(mockUserReports);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved' | 'rejected'>('all');

  const t = translations[language];

  const getStatusBadge = (status: UserReport['status']) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      'in-progress': { color: 'bg-blue-100 text-blue-800', icon: Clock },
      resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} rounded-full px-2 py-1 text-xs flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {t[status.replace('-', '') as keyof typeof t]}
      </Badge>
    );
  };

  const filteredReports = reports.filter(report => 
    statusFilter === 'all' || report.status === statusFilter
  );

  const stats = {
    totalReports: reports.length,
    resolvedIssues: reports.filter(r => r.status === 'resolved').length,
    communityPoints: 245,
    averageRating: 4.7,
    communityRank: 8
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20 ring-4 ring-white/20">
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback className="text-blue-600 text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-blue-100 mb-2">{user.email}</p>
                <div className="flex items-center space-x-4 text-sm text-blue-100">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{t.memberSince} Jan 2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>Sector 15, Gurgaon</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm" className="rounded-2xl">
                <Edit className="w-4 h-4 mr-1" />
                {t.editProfile}
              </Button>
              <Button variant="secondary" size="sm" className="rounded-2xl">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t.totalReports, value: stats.totalReports, icon: BarChart3, color: 'text-blue-600' },
          { label: t.resolvedIssues, value: stats.resolvedIssues, icon: CheckCircle2, color: 'text-green-600' },
          { label: t.communityPoints, value: stats.communityPoints, icon: Award, color: 'text-purple-600' },
          { label: t.communityRank, value: `#${stats.communityRank}`, icon: Trophy, color: 'text-yellow-600' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="rounded-2xl border-0 shadow-sm bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-gray-100 p-1">
          <TabsTrigger value="reports" className="rounded-xl">{t.myReports}</TabsTrigger>
          <TabsTrigger value="stats" className="rounded-xl">{t.statistics}</TabsTrigger>
          <TabsTrigger value="achievements" className="rounded-xl">{t.achievements}</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4 mt-6">
          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'in-progress', 'resolved', 'rejected'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status as any)}
                className="rounded-2xl"
              >
                {t[status as keyof typeof t]}
              </Button>
            ))}
          </div>

          {/* Reports List */}
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noReports}</h3>
              <p className="text-gray-600 mb-4">{t.noReportsDesc}</p>
              <Button className="rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                {t.reportFirst}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="rounded-3xl border-0 shadow-sm bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h4>
                        <p className="text-gray-700 mb-3">{report.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{report.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(report.dateReported).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(report.status)}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{report.likes} {t.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{report.comments} {t.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ChevronUp className="w-4 h-4" />
                          <span>{report.upvotes} {t.upvotes}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="rounded-xl border-gray-200 hover:bg-gray-50">
                        {t.viewDetails}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="stats" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Reports Over Time */}
            <Card className="rounded-3xl border-0 shadow-sm bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">{t.reportsSubmitted}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-blue-500" />
                  <span className="ml-2 text-gray-600">Chart visualization</span>
                </div>
              </CardContent>
            </Card>

            {/* Resolution Rate */}
            <Card className="rounded-3xl border-0 shadow-sm bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">{t.issuesResolved}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Resolution Rate</span>
                  <span className="font-medium">33%</span>
                </div>
                <Progress value={33} className="h-2" />
                <p className="text-xs text-gray-600">
                  {stats.resolvedIssues} out of {stats.totalReports} reports resolved
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4 mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card 
                  key={achievement.id}
                  className={`rounded-3xl border-2 shadow-sm transition-all duration-300 ${
                    achievement.earned 
                      ? `${achievement.color} bg-opacity-50` 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      achievement.earned ? achievement.color : 'bg-gray-200'
                    }`}>
                      <Icon className={`w-8 h-8 ${achievement.earned ? '' : 'text-gray-400'}`} />
                    </div>
                    <h4 className={`font-semibold mb-2 ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                      {t[achievement.id.replace('-', '') as keyof typeof t]}
                    </h4>
                    <p className={`text-sm ${achievement.earned ? 'text-gray-700' : 'text-gray-400'}`}>
                      {t[`${achievement.id.replace('-', '')}Desc` as keyof typeof t]}
                    </p>
                    {achievement.earned && (
                      <Badge className="mt-3 bg-green-100 text-green-800 rounded-full">
                        Earned
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Logout Button */}
      <div className="text-center pt-6">
        <Button 
          variant="outline" 
          onClick={onLogout}
          className="rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {t.logout}
        </Button>
      </div>
    </div>
  );
}