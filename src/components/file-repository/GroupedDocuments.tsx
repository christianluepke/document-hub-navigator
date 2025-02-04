import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table } from "./table/Table";
import { Document, ColumnConfig } from "./types";
import { GroupByOption } from "./GroupBySelect";

interface GroupedDocumentsProps {
  documents: Document[];
  groupBy: GroupByOption;
  selectedDocs: string[];
  selectedExtractions: string[];
  expandedRows: string[];
  visibleColumns: ColumnConfig[];
  onSelect: (docId: string, extractionIds: string[]) => void;
  onSelectExtraction: (extractionId: string, docId: string) => void;
  onExpand: (id: string) => void;
}

export function GroupedDocuments({
  documents,
  groupBy,
  selectedDocs,
  selectedExtractions,
  expandedRows,
  visibleColumns,
  onSelect,
  onSelectExtraction,
  onExpand,
}: GroupedDocumentsProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  if (groupBy === "none") {
    return (
      <Table
        documents={documents}
        selectedDocs={selectedDocs}
        selectedExtractions={selectedExtractions}
        expandedRows={expandedRows}
        visibleColumns={visibleColumns}
        onSelect={onSelect}
        onSelectExtraction={onSelectExtraction}
        onExpand={onExpand}
      />
    );
  }

  const getGroupValue = (doc: Document, groupBy: GroupByOption): string[] => {
    switch (groupBy) {
      case "uploader":
        return [doc.uploadedBy.name];
      case "fileType":
        return Array.from(new Set(doc.extractions.map((ext) => ext.fileType.toUpperCase())));
      case "project":
        return Array.from(new Set(doc.extractions.map((ext) => ext.project?.name || "No Project")));
      case "property":
        return Array.from(new Set(doc.extractions.flatMap((ext) => 
          ext.properties.map((prop) => prop.name)
        )));
      case "portfolio":
        return Array.from(new Set(doc.extractions.map((ext) => ext.portfolio?.name || "No Portfolio")));
      default:
        return [""];
    }
  };

  const groupedDocs = documents.reduce((acc, doc) => {
    const groupValues = getGroupValue(doc, groupBy);
    
    groupValues.forEach(groupValue => {
      if (!acc[groupValue]) {
        acc[groupValue] = [];
      }
      acc[groupValue].push(doc);
    });
    
    return acc;
  }, {} as Record<string, Document[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedDocs).map(([groupName, groupDocs]) => (
        <div key={groupName} className="border rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
            onClick={() => toggleGroup(groupName)}
          >
            <span className="font-medium">
              {groupName} ({groupDocs.length} {groupDocs.length === 1 ? "document" : "documents"})
            </span>
            {expandedGroups.includes(groupName) ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          {expandedGroups.includes(groupName) && (
            <Table
              documents={groupDocs}
              selectedDocs={selectedDocs}
              selectedExtractions={selectedExtractions}
              expandedRows={expandedRows}
              visibleColumns={visibleColumns}
              onSelect={onSelect}
              onSelectExtraction={onSelectExtraction}
              onExpand={onExpand}
            />
          )}
        </div>
      ))}
    </div>
  );
}