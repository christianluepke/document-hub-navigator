import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { BulkActions } from "./file-repository/BulkActions";
import { UploadDialog } from "./file-repository/UploadDialog";
import { FilterBar, type Filters } from "./file-repository/FilterBar";
import { ColumnManager } from "./file-repository/ColumnManager";
import { GroupBySelect, type GroupByOption } from "./file-repository/GroupBySelect";
import { GroupedDocuments } from "./file-repository/GroupedDocuments";
import { type Document, type ColumnConfig } from "./file-repository/types";

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
  const [selectedExtractions, setSelectedExtractions] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState<GroupByOption>("none");
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { id: "database", label: "Database", visible: false },
    { id: "property", label: "Property", visible: false },
    { id: "project", label: "Project", visible: false },
    { id: "portfolio", label: "Portfolio", visible: false },
  ]);
  const { toast } = useToast();

  const filteredDocuments = documents.filter((doc) => {
    // Search filter
    if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

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

    if (filters.fileType) {
      const hasFileType = doc.extractions.some(
        (ext) => ext.fileType === filters.fileType
      );
      if (!hasFileType) return false;
    }

    return true;
  });

  const toggleSelect = (docId: string, extractionIds: string[]) => {
    setSelectedExtractions((prev) => {
      const newSelection = new Set(prev);
      extractionIds.forEach((extId) => {
        if (prev.includes(extId)) {
          newSelection.delete(extId);
        } else {
          newSelection.add(extId);
        }
      });
      return Array.from(newSelection);
    });
  };

  const toggleExtraction = (extractionId: string, docId: string) => {
    setSelectedExtractions((prev) => {
      const newSelection = new Set(prev);
      if (prev.includes(extractionId)) {
        newSelection.delete(extractionId);
      } else {
        newSelection.add(extractionId);
      }
      return Array.from(newSelection);
    });
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
    setSelectedExtractions([]);
  };

  const toggleColumn = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Document Repository</h1>
        <div className="flex gap-4">
          <GroupBySelect value={groupBy} onChange={setGroupBy} />
          <ColumnManager columns={columns} onColumnToggle={toggleColumn} />
          <UploadDialog />
          <BulkActions
            selectedCount={selectedExtractions.length}
            onDownload={handleBulkDownload}
            onDelete={handleBulkDelete}
          />
        </div>
      </div>

      <FilterBar 
        documents={documents} 
        onFiltersChange={setFilters} 
        onSearchChange={setSearchTerm}
      />

      <GroupedDocuments
        documents={filteredDocuments}
        groupBy={groupBy}
        selectedDocs={selectedDocs}
        selectedExtractions={selectedExtractions}
        expandedRows={expandedRows}
        visibleColumns={columns.filter(col => col.visible)}
        onSelect={toggleSelect}
        onSelectExtraction={toggleExtraction}
        onExpand={toggleExpand}
      />
    </div>
  );
}
