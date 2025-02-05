
import { ChevronDown, ChevronUp, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Document, type ColumnConfig } from "./types";
import { ExtractionsPanel } from "./ExtractionsPanel";
import { Link } from "react-router-dom";

interface DocumentRowProps {
  document: Document;
  isSelected: boolean;
  selectedExtractions: string[];
  isExpanded: boolean;
  onSelect: (id: string, extractionIds: string[]) => void;
  onSelectExtraction: (extractionId: string, docId: string) => void;
  onExpand: (id: string) => void;
  visibleColumns: ColumnConfig[];
}

export function DocumentRow({
  document,
  isSelected,
  selectedExtractions,
  isExpanded,
  onSelect,
  onSelectExtraction,
  onExpand,
  visibleColumns,
}: DocumentRowProps) {
  const getColumnValue = (columnId: string) => {
    switch (columnId) {
      case "database":
        return document.database || "N/A";
      case "property":
        return document.extractions
          .flatMap((ext) => ext.properties.map((prop) => prop.name))
          .join(", ") || "N/A";
      case "project":
        return document.extractions
          .map((ext) => ext.project?.name)
          .filter(Boolean)
          .join(", ") || "N/A";
      case "portfolio":
        return document.extractions
          .map((ext) => ext.portfolio?.name)
          .filter(Boolean)
          .join(", ") || "N/A";
      default:
        return "N/A";
    }
  };

  const allExtractionIds = document.extractions.map((ext) => ext.id);
  const allExtractionsSelected = allExtractionIds.every((id) =>
    selectedExtractions.includes(id)
  );

  return (
    <>
      <tr
        key={document.id}
        className={cn("border-b transition-colors", "hover:bg-gray-50")}
      >
        <td className="p-4">
          <Checkbox
            checked={allExtractionsSelected}
            onCheckedChange={() =>
              onSelect(
                document.id,
                allExtractionsSelected ? [] : allExtractionIds
              )
            }
          />
        </td>
        <td className="p-4">
          <div className="flex items-center gap-3">
            <File className="w-5 h-5 text-gray-400" />
            <span className="font-medium">{document.name}</span>
          </div>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={document.uploadedBy.avatarUrl} />
              <AvatarFallback>
                {document.uploadedBy.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">
              {document.uploadedBy.name}
            </span>
          </div>
        </td>
        {visibleColumns.map((column) => (
          <td key={column.id} className="p-4 text-sm text-gray-600">
            {getColumnValue(column.id)}
          </td>
        ))}
        <td className="p-4 text-sm text-gray-600">
          {new Date(document.dateUploaded).toLocaleDateString()}
        </td>
        <td className="p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onExpand(document.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50 animate-slide-down">
          <td colSpan={6 + visibleColumns.length} className="p-4">
            <ExtractionsPanel
              extractions={document.extractions}
              selectedExtractions={selectedExtractions}
              onSelectExtraction={(extractionId) =>
                onSelectExtraction(extractionId, document.id)
              }
            />
          </td>
        </tr>
      )}
    </>
  );
}
