import { type Document, type ColumnConfig } from "../types";

export interface TableProps {
  documents: Document[];
  selectedDocs: string[];
  selectedExtractions: string[];
  expandedRows: string[];
  visibleColumns: ColumnConfig[];
  onSelect: (docId: string, extractionIds: string[]) => void;
  onSelectExtraction: (extractionId: string, docId: string) => void;
  onExpand: (id: string) => void;
}

export interface TableHeaderProps {
  selectedDocs: string[];
  documents: Document[];
  visibleColumns: ColumnConfig[];
  onSelectAll: () => void;
}