"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface ExportError {
  error: string;
}

export default function ExportButton() {
  const handleExport = async () => {
    try {
      const response = await fetch('/api/export');
      
      if (!response.ok) {
        const errorData = await response.json() as ExportError;
        throw new Error(errorData.error || 'Failed to export data');
      }

      // Get the CSV content
      const csvContent = await response.text();

      // Create a blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'training-data.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Export successful",
        description: "Your training data has been downloaded as a CSV file.",
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Export Data
    </Button>
  );
}