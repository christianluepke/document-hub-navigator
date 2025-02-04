import { Checkbox } from "@/components/ui/checkbox";
import { type TableHeaderProps } from "./types";

export function TableHeader({
  selectedDocs,
  documents,
  visibleColumns,
  onSelectAll,
}: TableHeaderProps) {
  return (
    <thead>
      <tr className="border-b">
        <th className="p-4 text-left">
          <Checkbox
            checked={selectedDocs.length === documents.length}
            onCheckedChange={onSelectAll}
          />
        </th>
        <th className="p-4 text-left font-medium text-sm text-gray-600">
          Document
        </th>
        <th className="p-4 text-left font-medium text-sm text-gray-600">
          Type
        </th>
        {visibleColumns.map(
          (col) =>
            col.visible && (
              <th
                key={col.id}
                className="p-4 text-left font-medium text-sm text-gray-600"
              >
                {col.label}
              </th>
            )
        )}
        <th className="p-4 text-left font-medium text-sm text-gray-600">
          Date Uploaded
        </th>
        <th className="p-4 text-left font-medium text-sm text-gray-600">
          Actions
        </th>
      </tr>
    </thead>
  );
}