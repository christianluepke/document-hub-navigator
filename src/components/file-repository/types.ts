export interface Document {
  id: string;
  name: string;
  type: "Rent Roll" | "Operating Statement";
  dateUploaded: string;
  extractions: Extraction[];
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
}

export interface ExtractionUpdate {
  type: string;
  property: {
    id: string;
    name: string;
  };
}