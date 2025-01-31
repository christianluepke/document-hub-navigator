import { ChevronDown, ChevronUp, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { type Document } from "./types";
import { ExtractionsPanel } from "./ExtractionsPanel";

interface DocumentRowProps {
  document: Document;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: (id: string) => void;
  onExpand: (id: string) => void;
}

export function DocumentRow({
  document,
  isSelected,
  isExpanded,
  onSelect,
  onExpand,
}: DocumentRowProps) {
  return (
    <>
      <tr
        key={document.id}
        className={cn("border-b transition-colors", "hover:bg-gray-50")}
      >
        <td className="p-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(document.id)}
          />
        </td>
        <td className="p-4">
          <div className="flex items-center gap-3">
            <File className="w-5 h-5 text-gray-400" />
            <span className="font-medium">{document.name}</span>
          </div>
        </td>
        <td className="p-4">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              document.type === "Rent Roll"
                ? "bg-blue-50 text-blue-700"
                : "bg-purple-50 text-purple-700"
            )}
          >
            {document.type}
          </span>
        </td>
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
          <td colSpan={5} className="p-4">
            <ExtractionsPanel extractions={document.extractions} />
          </td>
        </tr>
      )}
    </>
  );
}