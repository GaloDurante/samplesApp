import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { NavLink } from "react-router";

interface BreadcrumProps {
  baseUrl: string;
  baseUrlTitle: string;
  currentPathTitle: string;
}

export function Breadcrum({ baseUrl, baseUrlTitle, currentPathTitle }: BreadcrumProps) {
  return (
    <Breadcrumb className="absolute top-4 left-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <NavLink to={baseUrl}>{baseUrlTitle}</NavLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPathTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
