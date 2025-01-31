import { useState } from "react";
import { ChevronDown, ChevronUp, Download, Trash2, File, FileSpreadsheet, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

interface Document {
  id: string;
  name: string;
  type: "Rent Roll" | "Operating Statement";
  dateUploaded: string;
  extractions: Extraction[];
}

interface Extraction {
  id: string;
  type: string;
  status: "completed" | "processing" | "failed" | "draft";
  date: string;
  fileType: "excel" | "pdf";
  property: {
    id: string;
    name: string;
  };
}

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
      prev.includes(id)
        ? prev.filter((docId) => docId !== id)
        : [...prev, id]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
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

  const getStatusColor = (status: Extraction["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700";
      case "processing":
        return "bg-yellow-50 text-yellow-700";
      case "failed":
        return "bg-red-50 text-red-700";
      case "draft":
        return "bg-gray-50 text-gray-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const FileTypeIcon = ({ type }: { type: "excel" | "pdf" }) => {
    return type === "excel" ? (
      <FileSpreadsheet className="w-4 h-4 text-green-600" />
    ) : (
      <FileText className="w-4 h-4 text-red-600" />
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Document Repository</h1>
        {selectedDocs.length > 0 && (
          <div className="flex gap-3 animate-slide-down">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkDownload}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Selected
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </Button>
          </div>
        )}
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
              <th className="p-4 text-left font-medium text-sm text-gray-600">Document</th>
              <th className="p-4 text-left font-medium text-sm text-gray-600">Type</th>
              <th className="p-4 text-left font-medium text-sm text-gray-600">Date Uploaded</th>
              <th className="p-4 text-left font-medium text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <>
                <tr
                  key={doc.id}
                  className={cn(
                    "border-b transition-colors",
                    "hover:bg-gray-50"
                  )}
                >
                  <td className="p-4">
                    <Checkbox
                      checked={selectedDocs.includes(doc.id)}
                      onCheckedChange={() => toggleSelect(doc.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        doc.type === "Rent Roll"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-purple-50 text-purple-700"
                      )}
                    >
                      {doc.type}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(doc.dateUploaded).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(doc.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedRows.includes(doc.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </td>
                </tr>
                {expandedRows.includes(doc.id) && (
                  <tr className="bg-gray-50 animate-slide-down">
                    <td colSpan={5} className="p-4">
                      <div className="pl-12">
                        <h4 className="text-sm font-medium mb-3">Extractions</h4>
                        <div className="space-y-2">
                          {doc.extractions.map((extraction) => (
                            <div
                              key={extraction.id}
                              className="flex items-center justify-between bg-white p-3 rounded-md border"
                            >
                              <div className="flex items-center gap-4">
                                <FileTypeIcon type={extraction.fileType} />
                                <div className="space-y-1">
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium">
                                      {extraction.type}
                                    </span>
                                    <span
                                      className={cn(
                                        "px-2 py-1 rounded-full text-xs",
                                        getStatusColor(extraction.status)
                                      )}
                                    >
                                      {extraction.status}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">
                                      Property:
                                    </span>
                                    <Button
                                      variant="link"
                                      className="text-xs p-0 h-auto font-medium"
                                      onClick={() => {
                                        toast({
                                          title: "Navigation",
                                          description: `Navigating to ${extraction.property.name}`,
                                        });
                                      }}
                                    >
                                      {extraction.property.name}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(extraction.date).toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}