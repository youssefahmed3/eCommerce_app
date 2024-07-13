"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatters";
import { ProductType } from "@/lib/models/product.model";
import ProductActionsCell from './ProductActionCell'; // Import the new component
import { BadgeCheck, BadgeX } from "lucide-react";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "isAvaliableForPurchase",
    header: "Availability",
    cell: ({ cell }) => {
      const isAvaliableForPurchase = cell.row.original.isAvaliableForPurchase;
      return isAvaliableForPurchase? <BadgeCheck /> : <BadgeX />;
    },
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ cell }) => {
      const price = cell.row.original.price;
      return `${formatCurrency(price)}`;
    },
  },
  {
    accessorKey: "imagePath",
    header: "Image",
  },
  {
    accessorKey: "filePath",
    header: "File",
  },
  {
    accessorKey: "rating",
    header: "Rating",
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
    cell: ({ row }) => <ProductActionsCell product={row.original} />, // Use the new component
  },
];