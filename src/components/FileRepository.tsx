import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FileRepositoryHeader } from "./file-repository/FileRepositoryHeader";
import { FilterBar, type Filters } from "./file-repository/FilterBar";
import { GroupedDocuments } from "./file-repository/GroupedDocuments";
import { type Document, type ColumnConfig } from "./file-repository/types";
import { GroupBySelect, type GroupByOption } from "./file-repository/GroupBySelect";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { filterDocuments } from "./file-repository/utils/documentUtils";

const documents: Document[] = [
  {
    id: "1",
    name: "2024_Q1_RentRoll.xlsx",
    dateUploaded: "2024-01-20",
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
        date: "2024-01-20",
        fileType: "excel",
        assetClass: "Office",
        rentRollDate: "31/12/2023",
        unitCount: 245,
        lettableArea: {
          sqm: 45000,
          sqft: 484376
        },
        contractedRentPerAnnum: 12500000,
        occupancyRate: 94.5,
        properties: [
          {
            id: "p1",
            name: "North Tower"
          },
          {
            id: "p2",
            name: "South Tower"
          }
        ],
        project: {
          id: "pr1",
          name: "Downtown Business District"
        },
        portfolio: {
          id: "pf1",
          name: "Urban Office Portfolio"
        },
        uploadedBy: {
          id: "u1",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        }
      },
      {
        id: "e2",
        type: "Rent Roll",
        status: "completed",
        date: "2024-01-20",
        fileType: "excel",
        properties: [
          {
            id: "p3",
            name: "East Wing"
          },
          {
            id: "p4",
            name: "West Wing"
          }
        ],
        project: {
          id: "pr1",
          name: "Downtown Business District"
        },
        portfolio: {
          id: "pf1",
          name: "Urban Office Portfolio"
        },
        uploadedBy: {
          id: "u1",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        }
      },
      {
        id: "e3",
        type: "Rent Roll",
        status: "completed",
        date: "2024-01-20",
        fileType: "excel",
        properties: [
          {
            id: "p5",
            name: "Plaza Building"
          },
          {
            id: "p6",
            name: "Garden Tower"
          }
        ],
        project: {
          id: "pr1",
          name: "Downtown Business District"
        },
        portfolio: {
          id: "pf1",
          name: "Urban Office Portfolio"
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { toast } = useToast();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleSelect = (docId: string, extractionIds: string[]) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;

    const allDocExtractionIds = doc.extractions.map(e => e.id);
    
    setSelectedExtractions(prev => {
      if (extractionIds.length === 0) {
        // Unselect all extractions for this document
        return prev.filter(id => !allDocExtractionIds.includes(id));
      } else {
        // Select all extractions for this document
        const otherDocsExtractions = prev.filter(id => !allDocExtractionIds.includes(id));
        return [...otherDocsExtractions, ...allDocExtractionIds];
      }
    });
  };

  const toggleExtraction = (extractionId: string, docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;

    setSelectedExtractions(prev => {
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

  const filteredDocuments = filterDocuments(documents, searchTerm, filters);

  return (
    <div className="w-full max-w-[1800px] mx-auto p-6 space-y-6 animate-fade-in">
      <FileRepositoryHeader
        groupBy={groupBy}
        columns={columns}
        selectedCount={selectedExtractions.length}
        onGroupByChange={setGroupBy}
        onColumnToggle={toggleColumn}
        onDownload={handleBulkDownload}
        onDelete={handleBulkDelete}
      />

      <FilterBar 
        documents={documents} 
        onFiltersChange={setFilters} 
        onSearchChange={setSearchTerm}
      />

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={columns.map(col => col.id)}
          strategy={horizontalListSortingStrategy}
        >
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
        </SortableContext>
      </DndContext>
    </div>
  );
}

