import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { BulkActions } from "./file-repository/BulkActions";
import { DocumentRow } from "./file-repository/DocumentRow";
import { UploadDialog } from "./file-repository/UploadDialog";
import { FilterBar, type Filters } from "./file-repository/FilterBar";
import { type Document } from "./file-repository/types";

const documents: Document[] = [
  {
    id: "1",
    name: "Q4_2023_RentRoll.pdf",
    dateUploaded: "2024-01-15",
    uploadedBy: {
      id: "u1",
      name: "John Doe",
      email: "john@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    extractions: [
      {
        id: "e1",
        type: "Rent Roll",
        status: "completed",
        date: "2024-01-15",
        fileType: "excel",
        properties: [
          {
            id: "p1",
            name: "Sunset Plaza"
          },
          {
            id: "p2",
            name: "Downtown Heights"
          },
          {
            id: "p3",
            name: "Riverside Mall"
          },
          {
            id: "p4",
            name: "Ocean View Complex"
          }
        ],
        project: {
          id: "pr1",
          name: "West Coast Properties"
        },
        portfolio: {
          id: "pf1",
          name: "Commercial Real Estate"
        },
        uploadedBy: {
          id: "u2",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
        }
      },
      {
        id: "e2",
        type: "Operating Statement",
        status: "draft",
        date: "2024-01-15",
        fileType: "pdf",
        properties: [
          {
            id: "p1",
            name: "Sunset Plaza"
          }
        ],
        project: {
          id: "pr1",
          name: "West Coast Properties"
        },
        portfolio: {
          id: "pf1",
          name: "Commercial Real Estate"
        },
        uploadedBy: {
          id: "u1",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        }
      },
    ],
  },
  {
    id: "2",
    name: "2023_OperatingStatement.pdf",
    dateUploaded: "2024-01-14",
    uploadedBy: {
      id: "u2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
    },
    extractions: [
      {
        id: "e3",
        type: "Operating Statement",
        status: "processing",
        date: "2024-01-14",
        fileType: "excel",
        properties: [
          {
            id: "p2",
            name: "Downtown Heights"
          }
        ],
        project: {
          id: "pr2",
          name: "City Center Initiative"
        },
        portfolio: {
          id: "pf2",
          name: "Urban Development"
        },
        uploadedBy: {
          id: "u2",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
        }
      },
    ],
  },
  {
    id: "3",
    name: "Q3_2023_RentRoll.pdf",
    dateUploaded: "2023-12-15",
    uploadedBy: {
      id: "u3",
      name: "Robert Wilson",
      email: "robert@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert"
    },
    extractions: [
      {
        id: "e4",
        type: "Rent Roll",
        status: "completed",
        date: "2023-12-15",
        fileType: "excel",
        properties: [
          {
            id: "p5",
            name: "Mountain View Offices"
          }
        ],
        project: {
          id: "pr3",
          name: "Mountain Development"
        },
        portfolio: {
          id: "pf3",
          name: "Office Properties"
        },
        uploadedBy: {
          id: "u3",
          name: "Robert Wilson",
          email: "robert@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert"
        }
      }
    ]
  },
  {
    id: "4",
    name: "Q2_2023_RentRoll.pdf",
    dateUploaded: "2023-09-15",
    uploadedBy: {
      id: "u4",
      name: "Sarah Brown",
      email: "sarah@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    extractions: [
      {
        id: "e5",
        type: "Operating Statement",
        status: "failed",
        date: "2023-09-15",
        fileType: "pdf",
        properties: [
          {
            id: "p6",
            name: "Valley Shopping Center"
          }
        ],
        project: {
          id: "pr4",
          name: "Retail Portfolio Expansion"
        },
        portfolio: {
          id: "pf4",
          name: "Retail Properties"
        },
        uploadedBy: {
          id: "u4",
          name: "Sarah Brown",
          email: "sarah@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        }
      }
    ]
  },
  {
    id: "5",
    name: "2023_Q1_OperatingStatement.pdf",
    dateUploaded: "2023-06-15",
    uploadedBy: {
      id: "u5",
      name: "Michael Chen",
      email: "michael@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    extractions: [
      {
        id: "e6",
        type: "Operating Statement",
        status: "completed",
        date: "2023-06-15",
        fileType: "excel",
        properties: [
          {
            id: "p7",
            name: "Tech Hub Campus"
          }
        ],
        project: {
          id: "pr5",
          name: "Innovation District"
        },
        portfolio: {
          id: "pf5",
          name: "Tech Properties"
        },
        uploadedBy: {
          id: "u5",
          name: "Michael Chen",
          email: "michael@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
        }
      }
    ]
  },
  // Adding more documents with similar structure...
  {
    id: "6",
    name: "2023_AnnualReport.pdf",
    dateUploaded: "2023-12-31",
    uploadedBy: {
      id: "u1",
      name: "John Doe",
      email: "john@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    extractions: [
      {
        id: "e7",
        type: "Operating Statement",
        status: "completed",
        date: "2023-12-31",
        fileType: "pdf",
        properties: [
          {
            id: "p8",
            name: "Central Business Tower"
          },
          {
            id: "p9",
            name: "Harbor View Office"
          }
        ],
        project: {
          id: "pr6",
          name: "Downtown Revitalization"
        },
        portfolio: {
          id: "pf6",
          name: "Mixed-Use Properties"
        },
        uploadedBy: {
          id: "u1",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        }
      }
    ]
  },
  // ... Adding 11 more similar documents with varied data
  {
    id: "7",
    name: "Q4_2023_MarketAnalysis.pdf",
    dateUploaded: "2024-01-02",
    uploadedBy: {
      id: "u2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
    },
    extractions: [
      {
        id: "e8",
        type: "Rent Roll",
        status: "processing",
        date: "2024-01-02",
        fileType: "excel",
        properties: [
          {
            id: "p10",
            name: "Parkview Residences"
          }
        ],
        project: {
          id: "pr7",
          name: "Residential Expansion"
        },
        portfolio: {
          id: "pf7",
          name: "Residential Properties"
        },
        uploadedBy: {
          id: "u2",
          name: "Jane Smith",
          email: "jane@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
        }
      }
    ]
  },
];

export function FileRepository() {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const { toast } = useToast();

  const filteredDocuments = documents.filter((doc) => {
    if (filters.submitter && doc.uploadedBy.name !== filters.submitter) {
      return false;
    }

    if (filters.documentType) {
      const hasDocType = doc.extractions.some(
        (ext) => ext.type === filters.documentType
      );
      if (!hasDocType) return false;
    }

    if (filters.property) {
      const hasProperty = doc.extractions.some((ext) =>
        ext.properties.some((prop) => prop.name === filters.property)
      );
      if (!hasProperty) return false;
    }

    if (filters.project) {
      const hasProject = doc.extractions.some(
        (ext) => ext.project?.name === filters.project
      );
      if (!hasProject) return false;
    }

    if (filters.portfolio) {
      const hasPortfolio = doc.extractions.some(
        (ext) => ext.portfolio?.name === filters.portfolio
      );
      if (!hasPortfolio) return false;
    }

    return true;
  });

  const toggleSelectAll = () => {
    if (selectedDocs.length === filteredDocuments.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(filteredDocuments.map((doc) => doc.id));
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
        <div className="flex gap-4">
          <UploadDialog />
          <BulkActions
            selectedCount={selectedDocs.length}
            onDownload={handleBulkDownload}
            onDelete={handleBulkDelete}
          />
        </div>
      </div>

      <FilterBar documents={documents} onFiltersChange={setFilters} />

      <div className="bg-white rounded-lg shadow-sm border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                <Checkbox
                  checked={selectedDocs.length === filteredDocuments.length}
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
            {filteredDocuments.map((doc) => (
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
