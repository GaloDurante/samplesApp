import { useSearchParams } from "react-router";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PAGE_SIZES } from "@/lib/constants";

export function PageSizeSelector({ current }: { current: number }) {
  const [, setParams] = useSearchParams();

  const onSelect = (size: number) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set("pageSize", String(size));
      next.set("page", "1");

      return next;
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          {current}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {PAGE_SIZES.map((size) => (
          <DropdownMenuItem
            key={size}
            onClick={() => onSelect(size)}
            className={size === current ? "font-semibold" : ""}
          >
            {size}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
