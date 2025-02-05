
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { type Document } from "./types";

interface FilterBarProps {
  documents: Document[];
  onFiltersChange: (filters: Filters) => void;
  onSearchChange: (search: string) => void;
}

export interface Filters {
  submitter?: string;
  documentType?: "Rent Roll" | "Operating Statement";
  property?: string;
  project?: string;
  portfolio?: string;
  fileType?: "excel" | "pdf";
}

export function FilterBar({ documents, onFiltersChange, onSearchChange }: FilterBarProps) {
  const [filters, setFilters] = useState<Filters>({});
  const [search, setSearch] = useState("");

  // Extract unique values for each filter
  const submitters = Array.from(
    new Set(documents.map((doc) => doc.uploadedBy.name))
  );
  const documentTypes = Array.from(
    new Set(
      documents.flatMap((doc) => doc.extractions.map((ext) => ext.type))
    )
  );
  const properties = Array.from(
    new Set(
      documents.flatMap((doc) =>
        doc.extractions.flatMap((ext) => ext.properties.map((prop) => prop.name))
      )
    )
  );
  const projects = Array.from(
    new Set(
      documents.flatMap((doc) =>
        doc.extractions.map((ext) => ext.project?.name)
      ).filter(Boolean)
    )
  );
  const portfolios = Array.from(
    new Set(
      documents.flatMap((doc) =>
        doc.extractions.map((ext) => ext.portfolio?.name)
      ).filter(Boolean)
    )
  );
  const fileTypes = ["excel", "pdf"];

  const handleFilterChange = (key: keyof Filters, value: string | undefined) => {
    const newFilters = { ...filters, [key]: value };
    if (!value) {
      delete newFilters[key];
    }
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={filters.submitter}
          onValueChange={(value) => handleFilterChange("submitter", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by submitter" />
          </SelectTrigger>
          <SelectContent>
            {submitters.map((submitter) => (
              <SelectItem key={submitter} value={submitter}>
                {submitter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.documentType}
          onValueChange={(value) =>
            handleFilterChange(
              "documentType",
              value as "Rent Roll" | "Operating Statement"
            )
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by document type" />
          </SelectTrigger>
          <SelectContent>
            {documentTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.property}
          onValueChange={(value) => handleFilterChange("property", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by property" />
          </SelectTrigger>
          <SelectContent>
            {properties.map((property) => (
              <SelectItem key={property} value={property}>
                {property}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.project}
          onValueChange={(value) => handleFilterChange("project", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project} value={project}>
                {project}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.portfolio}
          onValueChange={(value) => handleFilterChange("portfolio", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by portfolio" />
          </SelectTrigger>
          <SelectContent>
            {portfolios.map((portfolio) => (
              <SelectItem key={portfolio} value={portfolio}>
                {portfolio}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.fileType}
          onValueChange={(value) => handleFilterChange("fileType", value as "excel" | "pdf")}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by file type" />
          </SelectTrigger>
          <SelectContent>
            {fileTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {Object.keys(filters).length > 0 && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="text-sm"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
