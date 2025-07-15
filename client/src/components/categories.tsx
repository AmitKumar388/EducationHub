import { Link } from "wouter";
import { categories } from "@shared/schema";

const categoryIcons = {
  notes: "fas fa-file-alt",
  pyqs: "fas fa-question-circle", 
  books: "fas fa-book",
  "company-pyqs": "fas fa-building",
  interview: "fas fa-user-tie",
  "study-materials": "fas fa-clipboard-list",
};

const categoryColors = {
  notes: "bg-blue-100 dark:bg-blue-900/50 text-primary group-hover:bg-primary group-hover:text-white",
  pyqs: "bg-green-100 dark:bg-green-900/50 text-secondary group-hover:bg-secondary group-hover:text-white",
  books: "bg-amber-100 dark:bg-amber-900/50 text-accent group-hover:bg-accent group-hover:text-white",
  "company-pyqs": "bg-purple-100 dark:bg-purple-900/50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
  interview: "bg-red-100 dark:bg-red-900/50 text-red-600 group-hover:bg-red-600 group-hover:text-white",
  "study-materials": "bg-teal-100 dark:bg-teal-900/50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
};

export default function Categories() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Explore Resources
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Choose your category and start learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <Link
              key={category.value}
              href={getHref(category.value)}
              className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 block"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${categoryColors[category.value as keyof typeof categoryColors]}`}>
                <i className={`${categoryIcons[category.value as keyof typeof categoryIcons]} text-xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                {category.label}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {getCategoryDescription(category.value)}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {getCategoryCount(category.value)} Resources
                </span>
                <span className="text-primary hover:text-primary/80 font-medium">
                  Browse →
                </span>
              </div>
            </Link>
          )
          })}
        </div>
      </div>
    </section>
  );
}

function getCategoryDescription(category: string): string {
  const descriptions = {
    notes: "Comprehensive study notes for all subjects and semesters",
    pyqs: "Semester PYQs and company-specific question papers", 
    books: "Essential textbooks and reference materials",
    "company-pyqs": "Previous questions from top companies and placements",
    interview: "Comprehensive interview preparation and tips",
    "study-materials": "Additional study resources and practice materials",
  };
  return descriptions[category as keyof typeof descriptions] || "";
}

function getCategoryCount(category: string): string {
  const counts = {
    notes: "2,500+",
    pyqs: "1,200+",
    books: "800+",
    "company-pyqs": "600+", 
    interview: "500+",
    "study-materials": "300+",
  };
  return counts[category as keyof typeof counts] || "0";
}
