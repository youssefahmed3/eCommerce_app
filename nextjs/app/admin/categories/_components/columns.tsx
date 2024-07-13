"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductType } from "@/lib/models/product.model";
import { formatCurrency } from "@/lib/formatters";
import { deleteProductById } from "@/lib/actions/product.action";
import { CategoryType } from "@/lib/models/category.model";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import ProductCard from "../../orders/_components/productCard";

export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    accessorKey: "products",
    header: "Products associated with this Category",
    cell: ({ cell }) => {
      // console.log(cell.row.original.products);
      const products = cell.row.original.products
      
      return (
        <Drawer>
          <DrawerTrigger className="bg-customColors-blue text-customColors-white p-2 rounded-md flex">
            Show
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className="flex justify-between">
                <DrawerTitle>Products Specific for This Category</DrawerTitle>
                <DrawerClose>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </div>
              <DrawerDescription>
                <ScrollArea className="h-[200px] w-auto rounded-md p-4">
                  {products.length ? products?.map((product: any) => (
                    <ProductCard
                      key={product.product.id}
                      name={product.product.name}
                      price={product.product.price}
                    />
                  )): <p>No Products Here</p>}
                  
                </ScrollArea>
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },

  {
    accessorKey: "updatedAt",
    header: "Total Products Count",
    cell: ({ cell }) => {
      return (
        <div>{cell.row.original.products?.length}</div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(product.id as string)
              }
            >
              Copy Category  Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="bg-customColors-red text-customColors-white"
              onClick={async () =>
                await deleteProductById(product.id as string)
              }
            >
              Delete Category
            </DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
