import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/resources?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/notes", label: "Notes" },
    { href: "/pyqs", label: "PYQs" },
    { href: "/books", label: "Books" },
    { href: "/interview", label: "Interview" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <i className="fas fa-graduation-cap text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">EduHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium ${
                  location === item.href ? "text-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search and Controls */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
              />
              <i className="fas fa-search absolute left-3 top-2.5 text-slate-400"></i>
            </form>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
            >
              {theme === "dark" ? (
                <i className="fas fa-sun text-slate-300"></i>
              ) : (
                <i className="fas fa-moon text-slate-600"></i>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <i className="fas fa-bars text-slate-600 dark:text-slate-300"></i>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative sm:hidden">
                    <Input
                      type="text"
                      placeholder="Search resources..."
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full pl-10 pr-4 py-2"
                    />
                    <i className="fas fa-search absolute left-3 top-2.5 text-slate-400"></i>
                  </form>

                  {/* Mobile Navigation */}
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg font-medium transition-colors ${
                        location === item.href
                          ? "text-primary"
                          : "text-slate-700 dark:text-slate-300 hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
