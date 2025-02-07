import { Document, Extraction } from "../types";

export const getUniqueProperties = (extractions: Extraction[]) => {
  return Array.from(
    new Set(
      extractions.flatMap((ext) =>
        ext.properties.map((prop) => prop.name)
      )
    )
  );
};

export const getUniqueProjects = (extractions: Extraction[]) => {
  return Array.from(
    new Set(
      extractions
        .map((ext) => ext.project?.name)
        .filter(Boolean) as string[]
    )
  );
};

export const getUniquePortfolios = (extractions: Extraction[]) => {
  return Array.from(
    new Set(
      extractions
        .map((ext) => ext.portfolio?.name)
        .filter(Boolean) as string[]
    )
  );
};

export const filterDocuments = (
  documents: Document[],
  searchTerm: string,
  filters: {
    submitter?: string;
    documentType?: string;
    property?: string;
    project?: string;
    portfolio?: string;
    fileType?: string;
  }
) => {
  return documents.filter((doc) => {
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
};