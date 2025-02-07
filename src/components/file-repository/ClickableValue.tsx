import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ClickableValueProps {
  values: string[];
  maxDisplay?: number;
  className?: string;
}

export function ClickableValue({ values, maxDisplay = 5, className }: ClickableValueProps) {
  if (!values.length) return <span className={className}>N/A</span>;

  const displayValues = values.slice(0, maxDisplay);
  const remainingValues = values.slice(maxDisplay);

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {displayValues.map((value, index) => (
        <>
          <Link
            key={value}
            to={`/search?value=${encodeURIComponent(value)}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {value}
          </Link>
          {index < displayValues.length - 1 && ", "}
        </>
      ))}
      {remainingValues.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-gray-500 hover:text-gray-700">
              {` + ${remainingValues.length} other`}
            </TooltipTrigger>
            <TooltipContent className="p-2">
              <div className="flex flex-col gap-1">
                {remainingValues.map((value, index) => (
                  <Link
                    key={value}
                    to={`/search?value=${encodeURIComponent(value)}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap"
                  >
                    {value}
                    {index < remainingValues.length - 1 && ", "}
                  </Link>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}