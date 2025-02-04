import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Document } from "./types";

interface FilterBarProps {
  documents: Document[];
  onFiltersChange: (filters: Filters) => void;
}

export interface Filters {
  submitter?: string;
  documentType?: "Rent Roll" | "Operating Statement";
  property?: string;
  project?: string;
  portfolio?: string;
  fileType?: "excel" | "pdf";
}

export function FilterBar({ documents, onFiltersChange }: FilterBarProps) {
  const [filters, setFilters] = useState<Filters>({});

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

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select
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
        onValueChange={(value) => handleFilterChange("fileType", value)}
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
  );
}