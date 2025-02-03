import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type Extraction } from "./types";
import { Badge } from "@/components/ui/badge";
import { Edit2, FileSpreadsheet, File, Save, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ExtractionsPanelProps {
  extractions: Extraction[];
}

export function ExtractionsPanel({ extractions }: ExtractionsPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedType, setEditedType] = useState("");
  const { toast } = useToast();

  const handleSave = (extraction: Extraction) => {
    toast({
      title: "Changes saved",
      description: "The extraction has been updated successfully.",
    });
    setEditingId(null);
  };

  const formatProperties = (properties: { id: string; name: string }[]) => {
    if (properties.length <= 3) {
      return properties.map((p, index) => (
        <>
          <Link
            to={`/properties/${p.id}`}
            className="text-blue-600 hover:underline"
            key={p.id}
          >
            {p.name}
          </Link>
          {index < properties.length - 1 ? ", " : ""}
        </>
      ));
    }
    const displayed = properties.slice(0, 3);
    const remaining = properties.length - 3;
    return (
      <>
        {displayed.map((p, index) => (
          <>
            <Link
              to={`/properties/${p.id}`}
              className="text-blue-600 hover:underline"
              key={p.id}
            >
              {p.name}
            </Link>
            {index < displayed.length - 1 ? ", " : ""}
          </>
        ))}
        {` + ${remaining} Others`}
      </>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm text-gray-700">Extractions</h3>
      <div className="space-y-3">
        {extractions.map((extraction) => (
          <div
            key={extraction.id}
            className="bg-white p-4 rounded-lg border space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                {editingId === extraction.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editedType}
                      onChange={(e) => setEditedType(e.target.value)}
                      className="w-48"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSave(extraction)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{extraction.type}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(extraction.id);
                        setEditedType(extraction.type);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    {extraction.fileType === 'excel' ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <FileSpreadsheet className="h-3 w-3 mr-1" />
                        Excel
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <File className="h-3 w-3 mr-1" />
                        PDF
                      </Badge>
                    )}
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  Properties: {formatProperties(extraction.properties)}
                </div>
                {extraction.project && (
                  <div className="text-sm text-gray-500">
                    Project:{" "}
                    <Link
                      to={`/projects/${extraction.project.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {extraction.project.name}
                    </Link>
                  </div>
                )}
                {extraction.portfolio && (
                  <div className="text-sm text-gray-500">
                    Portfolio:{" "}
                    <Link
                      to={`/portfolios/${extraction.portfolio.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {extraction.portfolio.name}
                    </Link>
                  </div>
                )}
              </div>
              <Badge
                variant={
                  extraction.status === "completed"
                    ? "default"
                    : extraction.status === "processing"
                    ? "secondary"
                    : "destructive"
                }
              >
                {extraction.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Uploaded by {extraction.uploadedBy.name}</span>
              <span>•</span>
              <span>{new Date(extraction.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}