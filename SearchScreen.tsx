import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search,
  MapPin,
  Filter,
  Map,
  List,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface SearchScreenProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    searchPlaceholder: 'Search issues, tags, or locations...',
    filterBy: 'Filter',
    mapView: 'Map',
    listView: 'List',
    nearMe: 'Near Me',
    trending: 'Trending',
    recent: 'Recent',
    resolved: 'Resolved',
    pending: 'Pending',
    inProgress: 'In Progress',
    rejected: 'Rejected',
    noResults: 'No results found',
    tryDifferent: 'Try different keywords or adjust filters',
    popularSearches: 'Popular Searches',
    recentSearches: 'Recent Searches',
    clearAll: 'Clear All',
    search: 'Search',
    results: 'results',
    ago: 'ago',
    km: 'km away'
  },
  hi: {
    searchPlaceholder: 'समस्याएं, टैग या स्थान खोजें...',
    filterBy: 'फिल्टर',
    mapView: 'नक्शा',
    listView: 'सूची',
    nearMe: 'मेरे पास',
    trending: 'ट्रेंडिंग',
    recent: 'हाल ही में',
    resolved: 'हल हो गया',
    pending: 'लंबित',
    inProgress: 'प्रगति में',
    rejected: 'अस्वीकृत',
    noResults: 'कोई परिणाम नहीं मिला',
    tryDifferent: 'अलग कीवर्ड आज़माएं या फ़िल्टर समायोजित करें',
    popularSearches: 'लोकप्रिय खोजें',
    recentSearches: 'हाल की खोजें',
    clearAll: 'सभी साफ करें',
    search: 'खोजें',
    results: 'परिणाम',
    ago: 'पहले',
    km: 'किमी दूर'
  }
};

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  location: string;
  distance: string;
  timeAgo: string;
  reporter: {
    name: string;
    avatar: string;
  };
  tags: string[];
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Pothole on Main Street causing traffic issues',
    description: 'Large pothole near intersection causing vehicle damage',
    category: 'Road',
    status: 'pending',
    location: 'Main Street, Sector 15',
    distance: '0.5',
    timeAgo: '2 hours',
    reporter: {
      name: 'Rajesh Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    tags: ['Pothole', 'Traffic', 'Safety']
  },
  {
    id: '2',
    title: 'Broken streetlight causing safety concerns',
    description: 'Non-functional streetlight making area unsafe',
    category: 'Electricity',
    status: 'in-progress',
    location: 'Liberty Square, Gate 2',
    distance: '1.2',
    timeAgo: '1 day',
    reporter: {
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
    },
    tags: ['Streetlight', 'Safety', 'Night']
  },
  {
    id: '3',
    title: 'Overflowing garbage bin at Park Avenue',
    description: 'Garbage bin overflowing for days, attracting animals',
    category: 'Garbage',
    status: 'resolved',
    location: 'Park Avenue, Block C',
    distance: '2.1',
    timeAgo: '3 days',
    reporter: {
      name: 'Amit Singh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    tags: ['Garbage', 'Hygiene', 'Health']
  }
];

const popularSearches = [
  'Pothole', 'Streetlight', 'Garbage', 'Water shortage', 'Road repair', 'Traffic light'
];

const recentSearches = [
  'Broken streetlight sector 12', 'Pothole main road', 'Garbage collection'
];

export function SearchScreen({ language }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filter, setFilter] = useState('all');
  const [hasSearched, setHasSearched] = useState(false);

  const t = translations[language];

  const getStatusBadge = (status: SearchResult['status']) => {
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

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // Simulate API search
    setTimeout(() => {
      const filtered = mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        result.location.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 1000);
  };

  const handlePopularSearch = (search: string) => {
    setSearchQuery(search);
    handleSearch(search);
  };

  const clearRecentSearches = () => {
    // In a real app, this would clear from local storage
  };

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'near', label: t.nearMe, icon: MapPin },
    { value: 'trending', label: t.trending, icon: TrendingUp },
    { value: 'recent', label: t.recent, icon: Clock }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!e.target.value.trim()) {
                setSearchResults([]);
                setHasSearched(false);
              }
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            placeholder={t.searchPlaceholder}
            className="pl-12 pr-4 py-4 rounded-2xl border-gray-200 focus:border-blue-500 text-base"
          />
          <Button
            onClick={() => handleSearch(searchQuery)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          >
            {t.search}
          </Button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-2xl border-gray-200">
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
                      {Icon && <Icon className="w-4 h-4 mr-2" />}
                      {option.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {hasSearched && (
              <span className="text-sm text-gray-600">
                {searchResults.length} {t.results}
              </span>
            )}
          </div>

          <div className="flex items-center bg-gray-100 rounded-2xl p-1">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-xl"
            >
              <List className="w-4 h-4 mr-1" />
              {t.listView}
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('map')}
              className="rounded-xl"
            >
              <Map className="w-4 h-4 mr-1" />
              {t.mapView}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {!hasSearched ? (
        /* Initial State */
        <div className="space-y-6">
          {/* Popular Searches */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.popularSearches}</h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handlePopularSearch(search)}
                  className="rounded-full border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                >
                  #{search}
                </Button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{t.recentSearches}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearRecentSearches}
                className="text-gray-500 hover:text-gray-700"
              >
                {t.clearAll}
              </Button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handlePopularSearch(search)}
                  className="flex items-center w-full p-3 text-left bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <Clock className="w-4 h-4 text-gray-400 mr-3" />
                  <span className="text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : isSearching ? (
        /* Loading State */
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-3xl border-0 bg-gray-50 animate-pulse">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : searchResults.length === 0 ? (
        /* No Results */
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noResults}</h3>
          <p className="text-gray-600">{t.tryDifferent}</p>
        </div>
      ) : viewMode === 'list' ? (
        /* Search Results - List View */
        <div className="space-y-4">
          {searchResults.map((result) => (
            <Card key={result.id} className="rounded-3xl border-0 shadow-sm bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10 ring-2 ring-blue-100">
                      <AvatarImage src={result.reporter.avatar} />
                      <AvatarFallback>{result.reporter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{result.reporter.name}</p>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <MapPin className="w-3 h-3" />
                        <span>{result.location}</span>
                        <span>•</span>
                        <span>{result.distance} {t.km}</span>
                        <span>•</span>
                        <span>{result.timeAgo} {t.ago}</span>
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(result.status)}
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900">{result.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{result.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="rounded-full px-3 py-1 text-xs bg-gray-100 text-gray-700">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Map View */
        <Card className="rounded-3xl border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Map className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map View</h3>
                <p className="text-gray-600">Map integration would show issue locations here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}