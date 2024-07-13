"use client";
import {
  getProductById,
  updateProductById,
} from "@/lib/actions/product.action";
import { ProductType } from "@/lib/models/product.model";

import React, { useEffect, useState } from "react";
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
import { useParams, useRouter } from "next/navigation";
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
import {
  addProductToCategory,
  removeProductFromCategory,
} from "@/lib/actions/category.action";
import { Checkbox } from "@/components/ui/checkbox";

function Page() {
  const router = useRouter();
  const { id } = useParams();
  /*  const product = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>(); */
  const [product, setProduct] = useState<ProductType | null>(null);
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchProduct() {
      const product = await getProductById(id as string);
      setProduct(product);

      console.log(product);
    }

    fetchProduct();

    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch, id]);

  console.log(product);

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
    //   rating: "",
      /* imagePath: "",
      filePath: "", */
      isAvaliableForPurchase: false,
    },
  });

  /*  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: `${product.price}`,
        category: product.category,
        imagePath: product.imagePath,
        filePath: product.filePath,
        isAvaliableForPurchase: product.isAvaliableForPurchase,
      });
    }
  }, [product, form]); */

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    console.log("starts submitting");

    const submittedValues = {
      ...values,
      price: Number(values.price),
      rating: Number(product!.rating),
    };

    console.log("starts submitting");

    const categoryChanged = product!.category !== submittedValues.category;

    // Update the product
    const updatedProduct = await updateProductById(
      id as string,
      submittedValues
    );

    // If category has changed, update the category references
    if (categoryChanged) {
      await removeProductFromCategory({
        categoryId: product!.category,
        productId: updatedProduct._id,
      });
      await addProductToCategory({
        categoryId: updatedProduct.category,
        productId: updatedProduct._id,
      });
    }

    form.reset();
    /* console.log(submittedValues); */
    router.push("/admin/products");
  }

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        imagePath: product.imagePath,
        // rating: product.rating,
        filePath: product.filePath,
        isAvaliableForPurchase: product.isAvaliableForPurchase,
      });
    }
  }, [product, form.reset]);
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                        <SelectItem
                          key={category.id}
                          value={category.id as string}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Update a Category</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAvaliableForPurchase"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Is available For Purchase</FormLabel>
                </div>

                {/* <FormDescription>Update </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
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
          /> */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default Page;
