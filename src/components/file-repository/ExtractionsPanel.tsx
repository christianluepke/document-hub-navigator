import { FileSpreadsheet, FileText, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type Extraction, type ExtractionUpdate } from "./types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ExtractionsPanelProps {
  extractions: Extraction[];
}

export function ExtractionsPanel({ extractions }: ExtractionsPanelProps) {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ExtractionUpdate>({
    type: "",
    property: { id: "", name: "" }
  });

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

  const handleEdit = (extraction: Extraction) => {
    setEditingId(extraction.id);
    setEditForm({
      type: extraction.type,
      property: { ...extraction.property }
    });
  };

  const handleSave = (extractionId: string) => {
    toast({
      title: "Changes saved",
      description: "The extraction has been updated successfully"
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ type: "", property: { id: "", name: "" } });
  };

  const handleNavigate = (type: string, name: string) => {
    toast({
      title: "Navigation",
      description: `Navigating to ${type}: ${name}`,
    });
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
            {editingId === extraction.id ? (
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={editForm.type}
                    onChange={(e) =>
                      setEditForm({ ...editForm, type: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property">Property Name</Label>
                  <Input
                    id="property"
                    value={editForm.property.name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        property: { ...editForm.property, name: e.target.value }
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleSave(extraction.id)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
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
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Property:</span>
                        <Button
                          variant="link"
                          className="text-xs p-0 h-auto font-medium"
                          onClick={() => handleNavigate('property', extraction.property.name)}
                        >
                          {extraction.property.name}
                        </Button>
                      </div>
                      {extraction.project && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Project:</span>
                          <Button
                            variant="link"
                            className="text-xs p-0 h-auto font-medium"
                            onClick={() => handleNavigate('project', extraction.project!.name)}
                          >
                            {extraction.project.name}
                          </Button>
                        </div>
                      )}
                      {extraction.portfolio && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Portfolio:</span>
                          <Button
                            variant="link"
                            className="text-xs p-0 h-auto font-medium"
                            onClick={() => handleNavigate('portfolio', extraction.portfolio!.name)}
                          >
                            {extraction.portfolio.name}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={extraction.uploadedBy.avatarUrl} />
                      <AvatarFallback>{extraction.uploadedBy.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{extraction.uploadedBy.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(extraction.date).toLocaleDateString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(extraction)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}