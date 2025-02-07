import { GroupBySelect, type GroupByOption } from "./GroupBySelect";
import { ColumnManager } from "./ColumnManager";
import { UploadDialog } from "./UploadDialog";
import { BulkActions } from "./BulkActions";
import { type ColumnConfig } from "./types";

interface FileRepositoryHeaderProps {
  groupBy: GroupByOption;
  columns: ColumnConfig[];
  selectedCount: number;
  onGroupByChange: (value: GroupByOption) => void;
  onColumnToggle: (columnId: string) => void;
  onDownload: () => void;
  onDelete: () => void;
}

export function FileRepositoryHeader({
  groupBy,
  columns,
  selectedCount,
  onGroupByChange,
  onColumnToggle,
  onDownload,
  onDelete,
}: FileRepositoryHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">File Repository</h1>
      <div className="flex gap-4">
        <GroupBySelect value={groupBy} onChange={onGroupByChange} />
        <ColumnManager columns={columns} onColumnToggle={onColumnToggle} />
        <UploadDialog />
        <BulkActions
          selectedCount={selectedCount}
          onDownload={onDownload}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}