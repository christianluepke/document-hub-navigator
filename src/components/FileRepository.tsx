import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { BulkActions } from "./file-repository/BulkActions";
import { DocumentRow } from "./file-repository/DocumentRow";
import { type Document } from "./file-repository/types";

const documents: Document[] = [
  {
    id: "1",
    name: "Q4_2023_RentRoll.pdf",
    type: "Rent Roll",
    dateUploaded: "2024-01-15",
    extractions: [
      {
        id: "e1",
        type: "Tenant Data",
        status: "completed",
        date: "2024-01-15",
        fileType: "excel",
        property: {
          id: "p1",
          name: "Sunset Plaza"
        }
      },
      {
        id: "e2",
        type: "Revenue Analysis",
        status: "draft",
        date: "2024-01-15",
        fileType: "pdf",
        property: {
          id: "p1",
          name: "Sunset Plaza"
        }
      },
    ],
  },
  {
    id: "2",
    name: "2023_OperatingStatement.pdf",
    type: "Operating Statement",
    dateUploaded: "2024-01-14",
    extractions: [
      {
        id: "e3",
        type: "Expense Analysis",
        status: "processing",
        date: "2024-01-14",
        fileType: "excel",
        property: {
          id: "p2",
          name: "Downtown Heights"
        }
      },
    ],
  },
];

export function FileRepository() {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleSelectAll = () => {
    if (selectedDocs.length === documents.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(documents.map((doc) => doc.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleBulkDownload = () => {
    toast({
      title: "Starting download",
      description: `Downloading ${selectedDocs.length} documents`,
    });
  };

  const handleBulkDelete = () => {
    toast({
      title: "Documents deleted",
      description: `${selectedDocs.length} documents have been deleted`,
      variant: "destructive",
    });
    setSelectedDocs([]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Document Repository</h1>
        <BulkActions
          selectedCount={selectedDocs.length}
          onDownload={handleBulkDownload}
          onDelete={handleBulkDelete}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                <Checkbox
                  checked={selectedDocs.length === documents.length}
                  onCheckedChange={toggleSelectAll}
                />
              </th>
              <th className="p-4 text-left font-medium text-sm text-gray-600">
                Document
              </th>
              <th className="p-4 text-left font-medium text-sm text-gray-600">
                Type
              </th>
              <th className="p-4 text-left font-medium text-sm text-gray-600">
                Date Uploaded
              </th>
              <th className="p-4 text-left font-medium text-sm text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <DocumentRow
                key={doc.id}
                document={doc}
                isSelected={selectedDocs.includes(doc.id)}
                isExpanded={expandedRows.includes(doc.id)}
                onSelect={toggleSelect}
                onExpand={toggleExpand}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
