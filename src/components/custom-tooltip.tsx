import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CustomTooltipProps {
  children: React.ReactNode;
  helperText: string;
}

export function CustomTooltip({ children, helperText }: CustomTooltipProps) {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{helperText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
