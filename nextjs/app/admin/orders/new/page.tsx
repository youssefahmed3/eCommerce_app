"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { orderFormSchema, productFormSchema } from "@/lib/validators";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/lib/actions/product.action";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      email: "",
      products: [],
      totalPrice: 0,
      status: "",
      paymentMethod: "",
    },
  });

  async function onSubmit(values: z.infer<typeof orderFormSchema>) {
    console.log("starts submitting");

    console.log(values);

    form.reset();
    // router.push("/admin/products");
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Email</FormLabel>
                <FormControl>
                  <Input placeholder="bla bla bla..." {...field} />
                </FormControl>
                <FormDescription>
                  The Name of the product should be between 2 and 50 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="products"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Products</FormLabel>
                <FormControl>
                  <Textarea placeholder="bla bla bla..." {...field} />
                </FormControl>
                <FormDescription>
                  Choose The products you want to add to the Order
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="bla bla bla..."
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Calculated Price For the Order Based on the Total Products
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input placeholder="bla bla bla..." type="text" {...field} />
                </FormControl>
                <FormDescription>
                  Status of the current Order (Pending, Delivered)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <Input placeholder="bla bla bla..." type="text" {...field} />
                </FormControl>
                <FormDescription>Payment Method for the Order</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default Page;
