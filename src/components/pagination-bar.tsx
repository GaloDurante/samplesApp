import { buildPageWindow } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { PageSizeSelector } from "@/components/samples/page-size-selector";

interface PaginationBarProps {
  page: number;
  total: number;
  pageSize: number;
  basePath: string;
  extraParams?: Record<string, string | number | undefined>;
}

export function PaginationBar({ page, total, pageSize, basePath, extraParams = {} }: PaginationBarProps) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const buildUrl = (p: number) => {
    const params = new URLSearchParams({
      page: p.toString(),
      pageSize: pageSize.toString(),
      ...Object.fromEntries(Object.entries(extraParams).map(([k, v]) => [k, String(v)])),
    });

    return `${basePath}?${params.toString()}`;
  };

  const windowPages = buildPageWindow(page, totalPages);

  return (
    <div className="flex justify-between items-center relative">
      <p className="hidden md:block text-sm text-muted-foreground absolute">
        Mostrando {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} de {total} registros
      </p>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              label="Anterior"
              to={buildUrl(page - 1)}
              tabIndex={page <= 1 ? -1 : 0}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {windowPages.map((p, idx) => (
            <PaginationItem key={idx}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink to={buildUrl(p)} isActive={page === p}>
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              label="Siguiente"
              to={buildUrl(page + 1)}
              tabIndex={page >= totalPages ? -1 : 0}
              className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex gap-2 items-center absolute right-0">
        <span className="hidden md:block text-sm min-w-fit text-muted-foreground">Registros por página</span>
        <PageSizeSelector current={pageSize} />
      </div>
    </div>
  );
}
