import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { clientFormSchema, type clientFormType } from "@/validations/client-form";
import type { Client } from "@/types/client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ClientForm() {
  const form = useForm({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      lastName: "",
      cuit: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = async (values: clientFormType) => {
    const data: Client = {
      ...values,
      cuit: Number(values.cuit),
    };
    const result = await window.clientApi.createClient(data);
    console.log(result);
  };

  return (
    <div className="flex flex-col gap-8">
      <Form {...form}>
        <form
          id="client-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:grid md:grid-cols-2 gap-x-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="min-h-5" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>CUIT</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="min-h-5" />
              </FormItem>
            )}
          />
        </form>
        <Button form="client-form" type="submit" className="self-end">
          Guardar
        </Button>
      </Form>
    </div>
  );
}
