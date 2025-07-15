import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import ResourceCard from "@/components/resource-card";
import { getResources } from "@/lib/api";
import { categories, subjects, semesters } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Resources() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  
  const [filters, setFilters] = useState({
    category: urlParams.get('category') || 'all',
    subject: 'all',
    semester: 'all',
    search: '',
    sortBy: 'popular',
  });

  const { data: resources, isLoading } = useQuery({
    queryKey: ['/api/resources', filters],
    queryFn: () => getResources(filters),
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger refetch by updating filters
    setFilters(prev => ({ ...prev }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Browse Resources
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Find exactly what you need from our comprehensive collection
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for notes, books, PYQs, or topics..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-12 pr-16 py-4 text-lg"
              />
              <i className="fas fa-search absolute left-4 top-4 text-slate-400 text-xl"></i>
              <Button type="submit" className="absolute right-2 top-2">
                Search
              </Button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.subject} onValueChange={(value) => handleFilterChange('subject', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.semester} onValueChange={(value) => handleFilterChange('semester', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Semesters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {semesters.map(semester => (
                  <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Sort by: Popular</SelectItem>
                <SelectItem value="latest">Sort by: Latest</SelectItem>
                <SelectItem value="rating">Sort by: Rating</SelectItem>
                <SelectItem value="downloads">Sort by: Downloads</SelectItem>
                <SelectItem value="name">Sort by: Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                  <Skeleton className="w-full h-4 mb-4" />
                  <Skeleton className="w-3/4 h-4 mb-2" />
                  <Skeleton className="w-full h-16 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-20 h-8" />
                  </div>
                </div>
              ))}
            </div>
          ) : resources && resources.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-slate-600 dark:text-slate-400">
                  Found {resources.length} resources
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-slate-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No resources found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
