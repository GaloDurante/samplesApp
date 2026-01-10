import type { FullSample } from "@/types/sample";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SampleGeneralForm,
  AnalysisForm,
  PurityForm,
  GerminationForm,
  HumidityForm,
  CertificateForm,
} from "@/components/samples/forms/sub-forms/index";

interface FormsNavigationProps {
  data: FullSample;
}

export function FormsNavigation({ data }: FormsNavigationProps) {
  if (!data.id) return null;

  const { analysis, purity, germination, humidity, ...restData } = data;

  return (
    <Tabs defaultValue="general-info" className="bg-card rounded-md shadow-sm">
      <TabsList className="border-border border-b px-4 pt-4 sm:px-8">
        <TabsTrigger value="general-info">Información General</TabsTrigger>
        <TabsTrigger value="analysis">Análisis</TabsTrigger>
        <TabsTrigger value="purity">Pureza</TabsTrigger>
        <TabsTrigger value="germination">Germinación</TabsTrigger>
        <TabsTrigger value="humidity">Contenido de Humedad</TabsTrigger>
        <TabsTrigger value="certificate">Certificado</TabsTrigger>
      </TabsList>
      <TabsContent value="general-info" className="p-4 sm:p-8">
        <SampleGeneralForm editData={restData} />
      </TabsContent>
      <TabsContent value="analysis" className="p-4 sm:p-8">
        <AnalysisForm editData={analysis} sampleId={data.id} />
      </TabsContent>
      <TabsContent value="purity" className="p-4 sm:p-8">
        <PurityForm editData={purity} sampleId={data.id} />
      </TabsContent>
      <TabsContent value="germination" className="p-4 sm:p-8">
        <GerminationForm editData={germination} sampleId={data.id} />
      </TabsContent>
      <TabsContent value="humidity" className="p-4 sm:p-8">
        <HumidityForm editData={humidity} sampleId={data.id} />
      </TabsContent>
      <TabsContent value="certificate" className="p-4 sm:p-8">
        <CertificateForm editData={data} />
      </TabsContent>
    </Tabs>
  );
}
