import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import { useDebounce } from "@/hooks/use-debounce";

import { Search as SearchIcon } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

interface SearchProps {
  placeholder?: string;
}

export function Search({ placeholder = "Buscar..." }: SearchProps) {
  const [params, setParams] = useSearchParams();

  const initial = params.get("search") ?? "";
  const [query, setQuery] = useState(initial);

  const debounced = useDebounce(query, 300);

  useEffect(() => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      const currentSearch = next.get("search") ?? "";

      if (currentSearch === debounced) {
        return prev;
      }

      next.set("search", debounced);
      next.set("page", "1");
      return next;
    });
  }, [debounced, setParams]);

  return (
    <div>
      <InputGroup className="w-full max-w-md">
        <InputGroupInput placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <p className="text-muted-foreground text-xs mt-2">
        Filtra por solicitante, N° muestra, código, especie, marca o lote.
      </p>
    </div>
  );
}
