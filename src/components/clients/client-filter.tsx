import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

import { useDebounce } from "@/hooks/use-debounce";

import { Search } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export function ClientFilter() {
  const [params, setParams] = useSearchParams();

  const initial = params.get("search") ?? "";
  const [query, setQuery] = useState(initial);

  const debounced = useDebounce(query, 300);

  useEffect(() => {
    params.set("search", debounced);
    params.set("page", "1");
    setParams(params);
  }, [debounced]);

  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupInput
        placeholder="Buscar por nombre, CUIT, dirección o email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
