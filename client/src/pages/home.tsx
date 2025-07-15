import Header from "@/components/header";
import Hero from "@/components/hero";
import Categories from "@/components/categories";
import FeaturedResources from "@/components/featured-resources";
import SearchFilter from "@/components/search-filter";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Header />
      <Hero />
      <Categories />
      <FeaturedResources />
      <SearchFilter />
      
      {/* Footer */}
      <footer className="bg-slate-800 dark:bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-white text-sm"></i>
                </div>
                <span className="text-xl font-bold">EduHub</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Your one-stop destination for academic excellence. Access thousands of study resources, 
                notes, and interview materials to boost your learning journey.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/resources?category=notes" className="text-slate-300 hover:text-white transition-colors">Study Notes</a></li>
                <li><a href="/resources?category=pyqs" className="text-slate-300 hover:text-white transition-colors">PYQ Papers</a></li>
                <li><a href="/resources?category=books" className="text-slate-300 hover:text-white transition-colors">Reference Books</a></li>
                <li><a href="/resources?category=interview" className="text-slate-300 hover:text-white transition-colors">Interview Resources</a></li>
                <li><a href="/resources?category=company-pyqs" className="text-slate-300 hover:text-white transition-colors">Company PYQs</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Report Issue</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 EduHub. All rights reserved. Made with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
