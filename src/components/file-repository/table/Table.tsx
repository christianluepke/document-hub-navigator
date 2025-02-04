import { TableHeader } from "./TableHeader";
import { DocumentRow } from "../DocumentRow";
import { type TableProps } from "./types";

export function Table({
  documents,
  selectedDocs,
  selectedExtractions,
  expandedRows,
  visibleColumns,
  onSelect,
  onSelectExtraction,
  onExpand,
}: TableProps) {
  const handleSelectAll = () => {
    if (selectedDocs.length === documents.length) {
      onSelect("", []);
    } else {
      const allDocIds = documents.map((doc) => doc.id);
      const allExtractionIds = documents.flatMap((doc) =>
        doc.extractions.map((ext) => ext.id)
      );
      onSelect(allDocIds.join(","), allExtractionIds);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <table className="w-full">
        <TableHeader
          selectedDocs={selectedDocs}
          documents={documents}
          visibleColumns={visibleColumns}
          onSelectAll={handleSelectAll}
        />
        <tbody>
          {documents.map((doc) => (
            <DocumentRow
              key={doc.id}
              document={doc}
              isSelected={selectedDocs.includes(doc.id)}
              selectedExtractions={selectedExtractions}
              isExpanded={expandedRows.includes(doc.id)}
              onSelect={onSelect}
              onSelectExtraction={onSelectExtraction}
              onExpand={onExpand}
              visibleColumns={visibleColumns}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}