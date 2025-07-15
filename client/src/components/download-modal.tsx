import { useState, useEffect } from "react";
import type { Resource } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  resource: Resource;
  isLoading: boolean;
}

export default function DownloadModal({
  isOpen,
  onClose,
  onConfirm,
  resource,
  isLoading,
}: DownloadModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 300);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Download Resource</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <i className={`${getCategoryIcon(resource.category)} text-primary text-xl`}></i>
            </div>
            <div>
              <h4 className="font-medium text-lg text-slate-900 dark:text-white">
                {resource.title}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {resource.subject} • {resource.fileSize}
              </p>
            </div>
          </div>
          
          {isLoading && (
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-700 dark:text-slate-300">Download Progress</span>
                <span className="text-slate-700 dark:text-slate-300">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "Downloading..." : "Start Download"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
