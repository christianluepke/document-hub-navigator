export interface Document {
  id: string;
  name: string;
  dateUploaded: string;
  database?: string;
  extractions: Extraction[];
  uploadedBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

export interface Extraction {
  id: string;
  type: "Rent Roll" | "Operating Statement";
  status: "completed" | "processing" | "failed" | "draft";
  date: string;
  fileType: "excel" | "pdf";
  properties: {
    id: string;
    name: string;
  }[];
  project?: {
    id: string;
    name: string;
  };
  portfolio?: {
    id: string;
    name: string;
  };
  uploadedBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  selected?: boolean;
  assetClass?: "Office" | "Residential" | "Logistics" | "Retail" | "Mixed Use";
  rentRollDate?: string;
  unitCount?: number;
  lettableArea?: {
    sqm: number;
    sqft: number;
  };
  contractedRentPerAnnum?: number;
  occupancyRate?: number;
}

export interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
}

export interface ExtractionUpdate {
  type: string;
  properties: {
    id: string;
    name: string;
  }[];
}