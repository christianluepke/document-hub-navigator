import { FileSpreadsheet, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type Extraction } from "./types";

interface ExtractionsPanelProps {
  extractions: Extraction[];
}

export function ExtractionsPanel({ extractions }: ExtractionsPanelProps) {
  const { toast } = useToast();

  const getStatusColor = (status: Extraction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700";
      case "processing":
        return "bg-yellow-50 text-yellow-700";
      case "failed":
        return "bg-red-50 text-red-700";
      case "draft":
        return "bg-gray-50 text-gray-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const FileTypeIcon = ({ type }: { type: "excel" | "pdf" }) => {
    return type === "excel" ? (
      <FileSpreadsheet className="w-4 h-4 text-green-600" />
    ) : (
      <FileText className="w-4 h-4 text-red-600" />
    );
  };

  return (
    <div className="pl-12">
      <h4 className="text-sm font-medium mb-3">Extractions</h4>
      <div className="space-y-2">
        {extractions.map((extraction) => (
          <div
            key={extraction.id}
            className="flex items-center justify-between bg-white p-3 rounded-md border"
          >
            <div className="flex items-center gap-4">
              <FileTypeIcon type={extraction.fileType} />
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{extraction.type}</span>
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs",
                      getStatusColor(extraction.status)
                    )}
                  >
                    {extraction.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Property:</span>
                  <Button
                    variant="link"
                    className="text-xs p-0 h-auto font-medium"
                    onClick={() => {
                      toast({
                        title: "Navigation",
                        description: `Navigating to ${extraction.property.name}`,
                      });
                    }}
                  >
                    {extraction.property.name}
                  </Button>
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(extraction.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}