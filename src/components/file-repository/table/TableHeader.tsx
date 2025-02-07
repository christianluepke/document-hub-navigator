import { Checkbox } from "@/components/ui/checkbox";
import { type TableHeaderProps } from "./types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function TableHeader({
  selectedDocs,
  documents,
  visibleColumns,
  onSelectAll,
}: TableHeaderProps) {
  const renderSortableHeader = (column: { id: string; label: string }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: column.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      cursor: 'grab',
    };

    return (
      <th
        key={column.id}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="p-4 text-left font-medium text-sm text-white bg-[#030630]"
      >
        {column.label}
      </th>
    );
  };

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
          Type
        </th>
        {visibleColumns.map(renderSortableHeader)}
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