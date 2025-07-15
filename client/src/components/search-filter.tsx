import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories, subjects, semesters } from "@shared/schema";

export default function SearchFilter() {
  const [, navigate] = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/resources?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "all") {
      navigate("/resources");
    } else {
      navigate(`/resources?category=${filter}`);
    }
  };

  const filterTags = [
    { value: "all", label: "All" },
    { value: "computer-science", label: "Computer Science" },
    { value: "electrical", label: "Electrical" },
    { value: "mechanical", label: "Mechanical" },
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Find Exactly What You Need
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Advanced search and filtering to help you discover the perfect resources
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative mb-8">
            <Input
              type="text"
              placeholder="Search for notes, books, PYQs, or topics..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-12 pr-16 py-4 text-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm"
            />
            <i className="fas fa-search absolute left-4 top-4 text-slate-400 text-xl"></i>
            <Button
              type="submit"
              className="absolute right-2 top-2 px-6 py-2 rounded-lg"
            >
              Search
            </Button>
          </form>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {filterTags.map((tag) => (
              <Button
                key={tag.value}
                variant={activeFilter === tag.value ? "default" : "outline"}
                onClick={() => handleFilterClick(tag.value)}
                className="px-4 py-2 rounded-lg font-medium"
              >
                {tag.label}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => navigate("/resources")}
              className="px-4 py-2 rounded-lg"
            >
              More Filters
            </Button>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Popular Subjects */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                Popular Subjects
              </h3>
              <div className="space-y-2">
                {subjects.slice(0, 6).map((subject) => (
                  <button
                    key={subject}
                    onClick={() => navigate(`/resources?subject=${encodeURIComponent(subject)}`)}
                    className="block w-full text-left px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Categories */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                Browse by Category
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const getHref = (value: string) => {
                    switch (value) {
                      case 'notes': return '/notes';
                      case 'pyqs': return '/pyqs';
                      case 'books': return '/books';
                      case 'interview': return '/interview';
                      default: return `/resources?category=${value}`;
                    }
                  };
                  
                  return (
                    <button
                      key={category.value}
                      onClick={() => navigate(getHref(category.value))}
                      className="block w-full text-left px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
