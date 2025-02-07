import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type Extraction } from "./types";
import { Badge } from "@/components/ui/badge";
import { Edit2, FileSpreadsheet, File, Save, X, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface ExtractionsPanelProps {
  extractions: Extraction[];
  selectedExtractions: string[];
  onSelectExtraction: (extractionId: string) => void;
}

export function ExtractionsPanel({
  extractions,
  selectedExtractions,
  onSelectExtraction,
}: ExtractionsPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedType, setEditedType] = useState("");
  const [areaUnit, setAreaUnit] = useState<"sqm" | "sqft">("sqm");
  const { toast } = useToast();

  const handleSave = (extraction: Extraction) => {
    toast({
      title: "Changes saved",
      description: "The extraction has been updated successfully.",
    });
    setEditingId(null);
  };

  const toggleAreaUnit = () => {
    setAreaUnit(prev => prev === "sqm" ? "sqft" : "sqm");
  };

  const formatArea = (area?: { sqm: number; sqft: number }) => {
    if (!area) return "N/A";
    const value = areaUnit === "sqm" ? area.sqm : area.sqft;
    return `${value.toLocaleString()} ${areaUnit}`;
  };

  const formatProperties = (properties: { id: string; name: string }[]) => {
    if (properties.length <= 3) {
      return properties.map((p, index) => (
        <span key={p.id}>
          <Link
            to={`/properties/${p.id}`}
            className="text-blue-600 hover:underline"
          >
            {p.name}
          </Link>
          {index < properties.length - 1 ? ", " : ""}
        </span>
      ));
    }
    const displayed = properties.slice(0, 3);
    const remaining = properties.length - 3;
    return (
      <>
        {displayed.map((p, index) => (
          <span key={p.id}>
            <Link
              to={`/properties/${p.id}`}
              className="text-blue-600 hover:underline"
            >
              {p.name}
            </Link>
            {index < displayed.length - 1 ? ", " : ""}
          </span>
        ))}
        <span>{` + ${remaining} Others`}</span>
      </>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm text-gray-700">Extractions</h3>
      <div className="space-y-3">
        {extractions.map((extraction) => (
          <div
            key={extraction.id}
            className="bg-white p-4 rounded-lg border space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedExtractions.includes(extraction.id)}
                  onCheckedChange={() => onSelectExtraction(extraction.id)}
                />
                <div className="space-y-1">
                  {editingId === extraction.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editedType}
                        onChange={(e) => setEditedType(e.target.value)}
                        className="w-48"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSave(extraction)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingId(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{extraction.type}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingId(extraction.id);
                          setEditedType(extraction.type);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      {extraction.fileType === "excel" ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          <FileSpreadsheet className="h-3 w-3 mr-1" />
                          Excel
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200"
                        >
                          <File className="h-3 w-3 mr-1" />
                          PDF
                        </Badge>
                      )}
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    Properties: {formatProperties(extraction.properties)}
                  </div>
                  {extraction.project && (
                    <div className="text-sm text-gray-500">
                      Project:{" "}
                      <Link
                        to={`/projects/${extraction.project.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {extraction.project.name}
                      </Link>
                    </div>
                  )}
                  {extraction.portfolio && (
                    <div className="text-sm text-gray-500">
                      Portfolio:{" "}
                      <Link
                        to={`/portfolios/${extraction.portfolio.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {extraction.portfolio.name}
                      </Link>
                    </div>
                  )}
                  {extraction.status === "completed" && (
                    <div className="mt-4 space-y-2 border-t pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-700">Asset Class</div>
                          <div className="text-sm text-gray-600">{extraction.assetClass || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">Rent Roll Date</div>
                          <div className="text-sm text-gray-600">{extraction.rentRollDate || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">Unit Count</div>
                          <div className="text-sm text-gray-600">{extraction.unitCount?.toLocaleString() || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Lettable Area
                            <Button
                              variant="ghost"
                              size="sm"
                              className="ml-1 h-4 w-4 p-0"
                              onClick={toggleAreaUnit}
                            >
                              <ChevronsUpDown className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-sm text-gray-600">{formatArea(extraction.lettableArea)}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">Contracted Rent p.a.</div>
                          <div className="text-sm text-gray-600">
                            {extraction.contractedRentPerAnnum
                              ? `$${extraction.contractedRentPerAnnum.toLocaleString()}`
                              : "N/A"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700">Occupancy</div>
                          <div className="text-sm text-gray-600">
                            {extraction.occupancyRate
                              ? `${extraction.occupancyRate.toFixed(1)}%`
                              : "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  extraction.status === "completed" && "badge-completed",
                  extraction.status === "processing" && "badge-processing"
                )}
              >
                {extraction.status.charAt(0).toUpperCase() + extraction.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Uploaded by {extraction.uploadedBy.name}</span>
              <span>•</span>
              <span>{new Date(extraction.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
