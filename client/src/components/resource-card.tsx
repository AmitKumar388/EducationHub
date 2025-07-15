import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Resource } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { downloadResource } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import DownloadModal from "@/components/download-modal";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const downloadMutation = useMutation({
    mutationFn: (id: number) => downloadResource(id),
    onSuccess: (data) => {
      // Invalidate and refetch resources to update download count
      queryClient.invalidateQueries({ queryKey: ['/api/resources'] });
      queryClient.invalidateQueries({ queryKey: ['/api/resources/featured'] });
      
      // Start actual download
      window.open(data.downloadUrl, '_blank');
      
      toast({
        title: "Download Started",
        description: `${resource.title} is being downloaded.`,
      });
      
      setShowDownloadModal(false);
    },
    onError: () => {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the resource.",
        variant: "destructive",
      });
    },
  });

  const getCategoryIcon = (category: string) => {
    const icons = {
      notes: "fas fa-file-alt",
      pyqs: "fas fa-question-circle",
      books: "fas fa-book",
      "company-pyqs": "fas fa-building",
      interview: "fas fa-user-tie",
      "study-materials": "fas fa-clipboard-list",
    };
    return icons[category as keyof typeof icons] || "fas fa-file";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      notes: "bg-primary/10 text-primary",
      pyqs: "bg-secondary/10 text-secondary",
      books: "bg-accent/10 text-accent",
      "company-pyqs": "bg-purple-100 dark:bg-purple-900/50 text-purple-600",
      interview: "bg-red-100 dark:bg-red-900/50 text-red-600",
      "study-materials": "bg-teal-100 dark:bg-teal-900/50 text-teal-600",
    };
    return colors[category as keyof typeof colors] || "bg-slate-100 text-slate-600";
  };

  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const confirmDownload = () => {
    downloadMutation.mutate(resource.id);
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(resource.category)}`}>
              <i className={getCategoryIcon(resource.category)}></i>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                {resource.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {resource.subject} {resource.semester && `• ${resource.semester}`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <i className="fas fa-star text-amber-400"></i>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {resource.rating}
            </span>
          </div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {resource.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
            <span>
              <i className="fas fa-download mr-1"></i>
              {resource.downloads.toLocaleString()}
            </span>
            <span>
              <i className="fas fa-file-pdf mr-1"></i>
              {resource.fileType.toUpperCase()}
            </span>
            <span>
              <i className="fas fa-hdd mr-1"></i>
              {resource.fileSize}
            </span>
          </div>
          <Button
            onClick={handleDownload}
            className="bg-primary text-white hover:bg-primary/90 text-sm font-medium"
            disabled={downloadMutation.isPending}
          >
            <i className="fas fa-download mr-1"></i>
            {downloadMutation.isPending ? "Downloading..." : "Download"}
          </Button>
        </div>
      </div>

      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        onConfirm={confirmDownload}
        resource={resource}
        isLoading={downloadMutation.isPending}
      />
    </>
  );
}
