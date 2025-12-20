import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useClientSearch } from "@/hooks/use-client-search";
import { useDebounce } from "@/hooks/use-debounce";

interface ClientComboboxProps {
  value?: number;
  onChange: (value?: number) => void;
  isError?: boolean;
}

export function ClientCombobox({ value, onChange, isError }: ClientComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(value ? String(value) : "");

  const debounced = useDebounce(search, 300);
  const { data: clients, loading } = useClientSearch(debounced);

  const selected = clients.find((c) => c.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between font-normal data-[error=true]:border-destructive!"
          data-error={isError}
        >
          {selected?.name ?? "Seleccione un cliente"}
          <ChevronsUpDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="center" className="p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Buscar cliente..." onValueChange={setSearch} />
          <CommandList>
            {loading && <CommandEmpty>Cargando...</CommandEmpty>}
            {!loading && clients.length === 0 && <CommandEmpty>No hay resultados.</CommandEmpty>}

            <CommandGroup>
              {clients.map((c) => (
                <CommandItem
                  key={c.id}
                  onSelect={() => {
                    onChange(c.id);
                    setOpen(false);
                  }}
                >
                  {c.name}
                  <Check className={cn("ml-auto", value === c.id ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
