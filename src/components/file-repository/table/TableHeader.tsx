import { Checkbox } from "@/components/ui/checkbox";
import { type TableHeaderProps } from "./types";
import { SortableHeader } from "./SortableHeader";

export function TableHeader({
  selectedDocs,
  documents,
  visibleColumns,
  onSelectAll,
}: TableHeaderProps) {
  return (
    <thead>
      <tr className="border-b">
        <th className="p-4 text-left bg-[#030630] text-white">
          <Checkbox
            checked={selectedDocs.length === documents.length}
            onCheckedChange={onSelectAll}
          />
        </th>
        <th className="p-4 text-left font-medium text-sm text-white bg-[#030630]">
          Document
        </th>
        <th className="p-4 text-left font-medium text-sm text-white bg-[#030630]">
          Uploaded By
        </th>
        {visibleColumns.map((column) => (
          <SortableHeader
            key={column.id}
            id={column.id}
            label={column.label}
          />
        ))}
        <th className="p-4 text-left font-medium text-sm text-white bg-[#030630]">
          Date Uploaded
        </th>
        <th className="p-4 text-left font-medium text-sm text-white bg-[#030630]">
          Actions
        </th>
      </tr>
    </thead>
  );
}