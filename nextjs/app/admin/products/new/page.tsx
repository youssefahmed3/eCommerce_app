"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productFormSchema } from "@/lib/validators";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCategories } from "@/store/categories/categoriesSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addProductToCategory } from "@/lib/actions/category.action";
function Page() {
  const router = useRouter();
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // load if there is no items in order
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      imagePath: "",
      filePath: "",
    },
  });

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    console.log("starts submitting");

    const submittedValues = {
      ...values,
      price: Number(values.price),
      rating: 0,
      isAvaliableForPurchase: false,
    };
    
    console.log("starts submitting");

    const new_product = await createProduct(submittedValues);
    console.log(new_product);

    const CategoryUpdated = await addProductToCategory({categoryId: new_product.category, productId: new_product._id});

    form.reset();
    /* console.log(submittedValues); */
    router.push("/admin/products");

  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="bla bla bla..." {...field} />
                </FormControl>
                <FormDescription>
                  The description of the product should be between 2 and 255
                  characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="bla bla bla..."
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Price of the product starts at 1
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select A Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {/* <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem> */}
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id as string}>
                          {category.name}
                        </SelectItem>
                      ))}
                      
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Choose a Category
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imagePath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <Input placeholder="bla bla bla..." type="file" {...field} />
                </FormControl>
                <FormDescription>
                  Price of the product starts at 1
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="filePath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload File</FormLabel>
                <FormControl>
                  <Input placeholder="bla bla bla..." type="file" {...field} />
                </FormControl>
                <FormDescription>
                  Price of the product starts at 1
                </FormDescription>
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
