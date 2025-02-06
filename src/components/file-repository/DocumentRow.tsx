
import { ChevronDown, ChevronUp, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

interface ClickableValueProps {
  values: string[];
  maxDisplay?: number;
  className?: string;
}

const ClickableValue = ({ values, maxDisplay = 5, className }: ClickableValueProps) => {
  if (!values.length) return <span className={className}>N/A</span>;

  const displayValues = values.slice(0, maxDisplay);
  const remainingValues = values.slice(maxDisplay);

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {displayValues.map((value, index) => (
        <>
          <Link
            key={value}
            to={`/search?value=${encodeURIComponent(value)}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {value}
          </Link>
          {index < displayValues.length - 1 && ", "}
        </>
      ))}
      {remainingValues.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-gray-500 hover:text-gray-700">
              {` + ${remainingValues.length} other`}
            </TooltipTrigger>
            <TooltipContent className="p-2">
              <div className="flex flex-col gap-1">
                {remainingValues.map((value, index) => (
                  <Link
                    key={value}
                    to={`/search?value=${encodeURIComponent(value)}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap"
                  >
                    {value}
                    {index < remainingValues.length - 1 && ", "}
                  </Link>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

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
        return <ClickableValue values={[document.database || "N/A"]} />;
      case "property": {
        const uniqueProperties = Array.from(
          new Set(
            document.extractions.flatMap((ext) =>
              ext.properties.map((prop) => prop.name)
            )
          )
        );
        return <ClickableValue values={uniqueProperties} />;
      }
      case "project": {
        const uniqueProjects = Array.from(
          new Set(
            document.extractions
              .map((ext) => ext.project?.name)
              .filter(Boolean) as string[]
          )
        );
        return <ClickableValue values={uniqueProjects} />;
      }
      case "portfolio": {
        const uniquePortfolios = Array.from(
          new Set(
            document.extractions
              .map((ext) => ext.portfolio?.name)
              .filter(Boolean) as string[]
          )
        );
        return <ClickableValue values={uniquePortfolios} />;
      }
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
