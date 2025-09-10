import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  ChevronUp, 
  MapPin, 
  Clock, 
  Filter,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  reporter: {
    name: string;
    avatar: string;
  };
  location: string;
  timeAgo: string;
  image: string;
  tags: string[];
  likes: number;
  comments: number;
  upvotes: number;
  isLiked: boolean;
  isUpvoted: boolean;
}

interface HomeFeedProps {
  user: any;
  language: 'en' | 'hi';
}

const translations = {
  en: {
    filterBy: 'Filter by',
    nearby: 'Nearby',
    latest: 'Latest',
    trending: 'Trending',
    resolved: 'Resolved',
    pending: 'Pending',
    inProgress: 'In Progress',
    rejected: 'Rejected',
    likes: 'likes',
    comments: 'comments',
    upvotes: 'upvotes',
    share: 'Share',
    reportedBy: 'Reported by',
    ago: 'ago',
    readMore: 'Read more',
    guestWelcome: 'Welcome to Jan Setu! 👋',
    guestSubtitle: 'You\'re browsing as a guest. Sign up to report issues and engage with the community.',
    signUpToInteract: 'Sign up to interact'
  },
  hi: {
    filterBy: 'फिल्टर करें',
    nearby: 'आस-पास',
    latest: 'नवीनतम',
    trending: 'ट्रेंडिंग',
    resolved: 'हल हो गया',
    pending: 'लंबित',
    inProgress: 'प्रगति में',
    rejected: 'अस्वीकृत',
    likes: 'लाइक',
    comments: 'टिप्पणियां',
    upvotes: 'अपवोट',
    share: 'साझा करें',
    reportedBy: 'द्वारा रिपोर्ट',
    ago: 'पहले',
    readMore: 'और पढ़ें',
    guestWelcome: 'जन सेतु में आपका स्वागत है! 👋',
    guestSubtitle: 'आप गेस्ट के रूप में ब्राउज़ कर रहे हैं। समस्याओं की रिपोर्ट करने और समुदाय के साथ जुड़ने के लिए साइन अप करें।',
    signUpToInteract: 'इंटरैक्ट करने के लिए साइन अप करें'
  }
};

const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Large pothole on Main Street causing traffic issues',
    description: 'There is a dangerous pothole near the intersection that has been growing larger over the past month. Multiple vehicles have suffered tire damage.',
    category: 'Road',
    status: 'pending',
    reporter: {
      name: 'Rajesh Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    location: 'Main Street, Sector 15',
    timeAgo: '2 hours',
    image: 'https://images.unsplash.com/photo-1695124348908-b69818fd51e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwcG90aG9sZSUyMHN0cmVldCUyMGlzc3VlfGVufDF8fHx8MTc1NzM0NjIyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Pothole', 'Traffic', 'Safety'],
    likes: 23,
    comments: 7,
    upvotes: 45,
    isLiked: false,
    isUpvoted: true
  },
  {
    id: '2', 
    title: 'Overflowing garbage bin at Park Avenue',
    description: 'The garbage bin has been overflowing for days, attracting stray animals and creating hygiene issues for nearby residents.',
    category: 'Garbage',
    status: 'in-progress',
    reporter: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
    },
    location: 'Park Avenue, Block C',
    timeAgo: '6 hours',
    image: 'https://images.unsplash.com/photo-1570575237245-076d5ee3d6e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwd2FzdGUlMjBzdHJlZXQlMjBjbGVhbmluZ3xlbnwxfHx8fDE3NTczNDYyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Garbage', 'Hygiene', 'Health'],
    likes: 12,
    comments: 3,
    upvotes: 28,
    isLiked: true,
    isUpvoted: false
  },
  {
    id: '3',
    title: 'Broken streetlight causing safety concerns',
    description: 'The streetlight has been non-functional for over a week, making the area unsafe for pedestrians during evening hours.',
    category: 'Electricity',
    status: 'resolved',
    reporter: {
      name: 'Amit Singh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    location: 'Liberty Square, Gate 2',
    timeAgo: '1 day',
    image: 'https://images.unsplash.com/photo-1643641255222-570d62f119a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjBzdHJlZXRsaWdodCUyMGVsZWN0cmljaXR5fGVufDF8fHx8MTc1NzM0NjIzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Streetlight', 'Safety', 'Night'],
    likes: 8,
    comments: 12,
    upvotes: 34,
    isLiked: false,
    isUpvoted: true
  }
];

export function HomeFeed({ user, language }: HomeFeedProps) {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [filter, setFilter] = useState('latest');
  
  const t = translations[language];

  const getStatusBadge = (status: Issue['status']) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle, label: t.pending },
      'in-progress': { color: 'bg-blue-100 text-blue-800', icon: Clock, label: t.inProgress },
      resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle2, label: t.resolved },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: t.rejected }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const handleLike = (issueId: string) => {
    if (user.isGuest) {
      alert(t.signUpToInteract);
      return;
    }
    setIssues(issues.map(issue => 
      issue.id === issueId 
        ? { ...issue, isLiked: !issue.isLiked, likes: issue.isLiked ? issue.likes - 1 : issue.likes + 1 }
        : issue
    ));
  };

  const handleUpvote = (issueId: string) => {
    if (user.isGuest) {
      alert(t.signUpToInteract);
      return;
    }
    setIssues(issues.map(issue => 
      issue.id === issueId 
        ? { ...issue, isUpvoted: !issue.isUpvoted, upvotes: issue.isUpvoted ? issue.upvotes - 1 : issue.upvotes + 1 }
        : issue
    ));
  };

  const handleComment = () => {
    if (user.isGuest) {
      alert(t.signUpToInteract);
      return;
    }
  };

  const handleShare = () => {
    if (user.isGuest) {
      alert(t.signUpToInteract);
      return;
    }
  };

  const filterOptions = [
    { value: 'latest', label: t.latest, icon: Clock },
    { value: 'nearby', label: t.nearby, icon: MapPin },
    { value: 'trending', label: t.trending, icon: TrendingUp },
    { value: 'resolved', label: t.resolved, icon: CheckCircle2 }
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Welcome Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {user.isGuest ? t.guestWelcome : `Welcome back, ${user.name}! 👋`}
        </h2>
        <p className="text-gray-600">
          {user.isGuest ? t.guestSubtitle : 'Stay updated with community issues and help make your neighborhood better.'}
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Community Reports</h3>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-2xl border-gray-200 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              {t.filterBy}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl">
            {filterOptions.map(option => {
              const Icon = option.icon;
              return (
                <DropdownMenuItem 
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className="rounded-xl"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {option.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Issues Feed */}
      <div className="space-y-4">
        {issues.map((issue) => (
          <Card key={issue.id} className="rounded-3xl border-0 shadow-sm bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 relative">
            <CardContent className="p-6">
              {user.isGuest && (
                <div className="absolute top-3 right-3 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                  View Only
                </div>
              )}
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10 ring-2 ring-blue-100">
                    <AvatarImage src={issue.reporter.avatar} />
                    <AvatarFallback>{issue.reporter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{issue.reporter.name}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                      <MapPin className="w-3 h-3" />
                      <span>{issue.location}</span>
                      <span>•</span>
                      <span>{issue.timeAgo} {t.ago}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(issue.status)}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{issue.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{issue.description}</p>
                </div>

                {/* Image */}
                <div className="rounded-2xl overflow-hidden">
                  <ImageWithFallback 
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {issue.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => handleLike(issue.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        issue.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${issue.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{issue.likes}</span>
                    </button>

                    <button 
                      onClick={handleComment}
                      className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{issue.comments}</span>
                    </button>

                    <button 
                      onClick={() => handleUpvote(issue.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        issue.isUpvoted ? 'text-green-500' : 'text-gray-500 hover:text-green-500'
                      }`}
                    >
                      <ChevronUp className={`w-5 h-5 ${issue.isUpvoted ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{issue.upvotes}</span>
                    </button>
                  </div>

                  <button 
                    onClick={handleShare}
                    className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <Share className="w-5 h-5" />
                    <span className="text-sm font-medium">{t.share}</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-6">
        <Button variant="outline" className="rounded-2xl px-8 border-gray-200 hover:bg-gray-50">
          Load More Issues
        </Button>
      </div>
    </div>
  );
}