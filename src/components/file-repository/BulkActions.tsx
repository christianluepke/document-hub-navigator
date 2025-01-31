import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface BulkActionsProps {
  selectedCount: number;
  onDownload: () => void;
  onDelete: () => void;
}

export function BulkActions({
  selectedCount,
  onDownload,
  onDelete,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex gap-3 animate-slide-down">
      <Button
        variant="outline"
        size="sm"
        onClick={onDownload}
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Download Selected
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={onDelete}
        className="flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Delete Selected
      </Button>
    </div>
  );
}