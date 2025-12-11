import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { clientSchema } from "@/validations/client";
import type { Client } from "@/types/client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ClientFormProps {
  editData?: Client;
}

export function ClientForm({ editData }: ClientFormProps) {
  const form = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: editData ?? {
      name: "",
      cuit: undefined,
      address: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: Client) => {
    try {
      if (editData) {
        const result = await window.clientApi.updateClient(values);

        if (result.success) {
          toast.success(result.message);
          form.reset(values);
        } else {
          toast.error(result.message || "No se pudo modificar el cliente solicitado.");
        }
      } else {
        const result = await window.clientApi.createClient(values);

        if (result.success) {
          toast.success(result.message);
          form.reset();
        } else {
          toast.error(result.message || "No se pudo crear el cliente solicitado.");
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No se pudo ejecutar la operación solicitada por un problema en el servidor.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Form {...form}>
        <form
          id="client-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:grid sm:grid-cols-2 gap-x-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ignacio" {...field} />
                </FormControl>
                <FormMessage className="min-h-5" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cuit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  CUIT <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: 20301234567"
                    type="number"
                    className="no-spinner"
                    onWheel={(e) => e.currentTarget.blur()}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    value={field.value ? String(field.value) : ""}
                  />
                </FormControl>
                <FormMessage className="min-h-5" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Dirección <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Laprida 1201" {...field} />
                </FormControl>
                <FormMessage className="min-h-5" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="ignacion@gmail.com" {...field} />
                </FormControl>
                <FormMessage className="min-h-5" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Teléfono <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="-"
                    type="number"
                    className="no-spinner"
                    onWheel={(e) => e.currentTarget.blur()}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="min-h-5" />
              </FormItem>
            )}
          />
        </form>
        <Button
          form="client-form"
          type="submit"
          className="self-end"
          disabled={editData ? !form.formState.isDirty : form.formState.isSubmitting}
        >
          Guardar cambios
        </Button>
      </Form>
    </div>
  );
}
