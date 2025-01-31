export interface Document {
  id: string;
  name: string;
  type: "Rent Roll" | "Operating Statement";
  dateUploaded: string;
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
  type: string;
  status: "completed" | "processing" | "failed" | "draft";
  date: string;
  fileType: "excel" | "pdf";
  property: {
    id: string;
    name: string;
  };
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
}

export interface ExtractionUpdate {
  type: string;
  property: {
    id: string;
    name: string;
  };
}