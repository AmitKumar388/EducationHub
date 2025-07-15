import { useQuery } from "@tanstack/react-query";
import { getResourceStats } from "@/lib/api";

export default function Hero() {
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: getResourceStats,
  });

  return (
    <section className="bg-gradient-to-r from-primary to-secondary py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Academic Success Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Access thousands of notes, PYQs, books, and interview resources - all in one place
          </p>
          
          {/* Statistics */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.notes.toLocaleString()}+</div>
                <div className="text-blue-100">Study Notes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.pyqs.toLocaleString()}+</div>
                <div className="text-blue-100">PYQ Papers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.books.toLocaleString()}+</div>
                <div className="text-blue-100">Reference Books</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.interviews.toLocaleString()}+</div>
                <div className="text-blue-100">Interview Prep</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
