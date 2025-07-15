import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { getFeaturedResources } from "@/lib/api";
import ResourceCard from "@/components/resource-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedResources() {
  const { data: resources, isLoading } = useQuery({
    queryKey: ['/api/resources/featured'],
    queryFn: getFeaturedResources,
  });

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
              Featured Resources
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Most popular downloads this week
            </p>
          </div>
          <Link
            href="/resources"
            className="text-primary hover:text-primary/80 font-medium"
          >
            View All →
          </Link>
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">
              No featured resources available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
