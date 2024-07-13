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
import { formatCurrency } from "@/lib/formatters";
import { OrderType } from "@/lib/models/order.model";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductCard from "./productCard";
import { deleteOrderById, updateOrderStatusById } from "@/lib/actions/order.action";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey:"email",
    accessorFn: (row) => row.user.email,
    header: "Email",
    cell: ({ cell }: any) => {
      return cell.row.original.user.email;
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ cell }) => {
      /*  console.log(cell.row.original); */
      const products = cell.row.original.products;
      console.log(products);

      return (
        <Drawer>
          <DrawerTrigger className="bg-customColors-blue text-customColors-white p-2 rounded-md">
            Show
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className="flex justify-between">
                <DrawerTitle>Products Specific for This Order</DrawerTitle>
                <DrawerClose>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </div>
              <DrawerDescription>
                <ScrollArea className="h-[200px] w-auto rounded-md p-4">
                  {products.map((product) =>
                    product.product ? (
                      <ProductCard
                        key={product.product.id}
                        name={product.product.name}
                        quantity={product.quantity}
                        price={product.product.price}
                      />
                    ) : <ProductCard
                    key={product._id}
                    name={"This product Have been Deleted"}
                    quantity={product.quantity}
                    price={"Error"}
                  />
                  )}
                </ScrollArea>
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ cell }) => {
      const price = cell.row.original.totalPrice;
      return `${formatCurrency(price)}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
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
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

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
              onClick={() => navigator.clipboard.writeText(order.id as string)}
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-customColors-blue text-customColors-white"
              onClick={async () => await updateOrderStatusById(order.id as string)}
              disabled={order.status === "Delivered"}
            >
              Mark as Delivered
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="bg-customColors-red text-customColors-white"
              onClick={async () => await deleteOrderById(order.id as string)}
            >
              Delete Order
            </DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
