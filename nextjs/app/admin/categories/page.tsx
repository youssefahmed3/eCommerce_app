"use client";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect } from "react";
import { columns } from "./_components/columns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { fetchCategories } from "@/store/categories/categoriesSlice";
import { getProductById } from "@/lib/actions/product.action";

function Page() {
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    // load if there is no items in order
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  console.log(categories);

  
  return (
    <div>
      <h1>All Categories</h1>
      <DataTable
        columns={columns}
        data={categories}
        actionDisabled={false}
        buttonName="Add Category"
        filterBy="name"
        filterByPlaceholder="Category name"
        buttonAction={() => {
          router.push("/admin/categories/new");
        }}
      />
    </div>
  );
}

export default Page;
