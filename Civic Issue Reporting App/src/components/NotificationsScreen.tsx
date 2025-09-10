import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Bell,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  Clock,
  Trash2,
  MoreHorizontal,
  Settings,
  Filter
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface NotificationsScreenProps {
  user: any;
  language: 'en' | 'hi';
}

interface Notification {
  id: string;
  type: 'status_update' | 'comment' | 'authority_response' | 'resolution' | 'general';
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
  issueId?: string;
  issueTitle?: string;
  avatar?: string;
  authorName?: string;
  priority: 'high' | 'medium' | 'low';
}

const translations = {
  en: {
    notifications: 'Notifications',
    markAllRead: 'Mark all as read',
    settings: 'Settings',
    filter: 'Filter',
    all: 'All',
    unread: 'Unread',
    updates: 'Updates',
    comments: 'Comments',
    noNotifications: 'No notifications yet',
    noNotificationsDesc: 'You\'ll see updates about your reports and community activities here',
    statusUpdate: 'Status Update',
    newComment: 'New Comment',
    authorityResponse: 'Authority Response',
    issueResolved: 'Issue Resolved',
    general: 'General',
    ago: 'ago',
    markAsRead: 'Mark as read',
    delete: 'Delete',
    viewIssue: 'View Issue',
    high: 'High',
    medium: 'Medium',
    low: 'Low'
  },
  hi: {
    notifications: 'अधिसूचनाएं',
    markAllRead: 'सभी को पढ़ा गया के रूप में चिह्नित करें',
    settings: 'सेटिंग्स',
    filter: 'फिल्टर',
    all: 'सभी',
    unread: 'अपठित',
    updates: 'अपडेट',
    comments: 'टिप्पणियां',
    noNotifications: 'अभी तक कोई सूचना नहीं',
    noNotificationsDesc: 'आपको यहां अपनी रिपोर्ट और सामुदायिक गतिविधियों के बारे में अपडेट दिखाई देंगे',
    statusUpdate: 'स्थिति अपडेट',
    newComment: 'नई टिप्पणी',
    authorityResponse: 'प्राधिकरण प्रतिक्रिया',
    issueResolved: 'समस्या हल हो गई',
    general: 'सामान्य',
    ago: 'पहले',
    markAsRead: 'पढ़ा गया के रूप में चिह्नित करें',
    delete: 'डिलीट करें',
    viewIssue: 'समस्या देखें',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कम'
  }
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'authority_response',
    title: 'Authority Response',
    message: 'Municipal Corporation has responded to your pothole report on Main Street. Work will begin next week.',
    timeAgo: '2 hours',
    isRead: false,
    issueId: '1',
    issueTitle: 'Pothole on Main Street',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    authorName: 'Municipal Corporation',
    priority: 'high'
  },
  {
    id: '2',
    type: 'status_update',
    title: 'Status Update',
    message: 'Your reported streetlight issue has been marked as "In Progress". Repair team has been assigned.',
    timeAgo: '4 hours',
    isRead: false,
    issueId: '2',
    issueTitle: 'Broken streetlight at Liberty Square',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'comment',
    title: 'New Comment',
    message: 'Priya Sharma commented on the garbage bin issue: "This has been going on for weeks now!"',
    timeAgo: '6 hours',
    isRead: true,
    issueId: '3',
    issueTitle: 'Overflowing garbage bin',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    authorName: 'Priya Sharma',
    priority: 'low'
  },
  {
    id: '4',
    type: 'resolution',
    title: 'Issue Resolved',
    message: 'Great news! The water supply issue you reported has been resolved. Thank you for helping improve our community.',
    timeAgo: '1 day',
    isRead: true,
    issueId: '4',
    issueTitle: 'Water supply disruption',
    priority: 'high'
  },
  {
    id: '5',
    type: 'general',
    title: 'Weekly Community Report',
    message: 'This week: 12 issues reported, 8 resolved, 4 in progress. Your neighborhood ranking: #3 most active!',
    timeAgo: '2 days',
    isRead: true,
    priority: 'low'
  }
];

export function NotificationsScreen({ user, language }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'updates' | 'comments'>('all');

  const t = translations[language];

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'status_update':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-green-500" />;
      case 'authority_response':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'resolution':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'general':
        return <Bell className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-gray-300';
      default:
        return 'border-l-gray-300';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead;
      case 'updates':
        return notification.type === 'status_update' || notification.type === 'authority_response' || notification.type === 'resolution';
      case 'comments':
        return notification.type === 'comment';
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-semibold text-gray-900">{t.notifications}</h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="rounded-2xl border-gray-200 hover:bg-gray-50"
            disabled={unreadCount === 0}
          >
            {t.markAllRead}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="rounded-2xl border-gray-200 hover:bg-gray-50"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-gray-100 p-1">
          <TabsTrigger value="all" className="rounded-xl">{t.all}</TabsTrigger>
          <TabsTrigger value="unread" className="rounded-xl">{t.unread}</TabsTrigger>
          <TabsTrigger value="updates" className="rounded-xl">{t.updates}</TabsTrigger>
          <TabsTrigger value="comments" className="rounded-xl">{t.comments}</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noNotifications}</h3>
          <p className="text-gray-600">{t.noNotificationsDesc}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`rounded-3xl border-0 shadow-sm bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.isRead ? 'bg-blue-50/50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Icon or Avatar */}
                  <div className="flex-shrink-0 mt-1">
                    {notification.avatar ? (
                      <Avatar className="w-10 h-10 ring-2 ring-blue-100">
                        <AvatarImage src={notification.avatar} />
                        <AvatarFallback>{notification.authorName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mb-2">
                          {notification.message}
                        </p>
                        
                        {notification.issueTitle && (
                          <Badge variant="secondary" className="rounded-full px-2 py-1 text-xs bg-gray-100 text-gray-600 mb-2">
                            {notification.issueTitle}
                          </Badge>
                        )}
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{notification.timeAgo} {t.ago}</span>
                          {notification.authorName && (
                            <>
                              <span>•</span>
                              <span>{notification.authorName}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="rounded-2xl">
                          {!notification.isRead && (
                            <DropdownMenuItem 
                              onClick={() => markAsRead(notification.id)}
                              className="rounded-xl"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              {t.markAsRead}
                            </DropdownMenuItem>
                          )}
                          {notification.issueId && (
                            <DropdownMenuItem className="rounded-xl">
                              <Bell className="w-4 h-4 mr-2" />
                              {t.viewIssue}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => deleteNotification(notification.id)}
                            className="rounded-xl text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {t.delete}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Action Buttons */}
                    {notification.issueId && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl border-gray-200 hover:bg-gray-50"
                        >
                          {t.viewIssue}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}