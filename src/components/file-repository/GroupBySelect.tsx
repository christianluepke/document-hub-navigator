import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type GroupByOption = 
  | "none" 
  | "uploader" 
  | "fileType" 
  | "project" 
  | "property" 
  | "portfolio";

interface GroupBySelectProps {
  value: GroupByOption;
  onChange: (value: GroupByOption) => void;
}

export function GroupBySelect({ value, onChange }: GroupBySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Group by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">No Grouping</SelectItem>
        <SelectItem value="uploader">Data Uploader</SelectItem>
        <SelectItem value="fileType">File Type</SelectItem>
        <SelectItem value="project">Project</SelectItem>
        <SelectItem value="property">Property</SelectItem>
        <SelectItem value="portfolio">Portfolio</SelectItem>
      </SelectContent>
    </Select>
  );
}