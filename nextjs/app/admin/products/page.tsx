"use client";
import React, { useEffect } from "react";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./_components/columns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/store/products/productsSlice";
import { useRouter } from "next/navigation";
import { getProductById } from "@/lib/actions/product.action";

function Page() {
  const products = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    // load if there is no items in order
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  return (
    <div>
      <h1>All Products</h1>
      <DataTable
        columns={columns}
        data={products}
        actionDisabled={false}
        buttonName="Add Products"
        filterBy="name"
        filterByPlaceholder="Product Name"
        buttonAction={() => {
          router.push("/admin/products/new");
        }}
      />
    </div>
  );
}

export default Page;
