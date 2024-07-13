"use client";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect } from "react";
import { columns } from "./_components/columns";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchOrders } from "@/store/orders/ordersSlice";
import { Button } from "@/components/ui/button";
import { createOrder, getOrderById, updateOrderStatusById } from "@/lib/actions/order.action";

function Page() {
  const router = useRouter();
  const orders = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // load if there is no items in order 
    if (!orders.length) {
      dispatch(fetchOrders());
    }
  }, [orders.length, dispatch]);

  console.log(orders);

  async function createOrderDetails() {
    const userOrder = {
      user: "668bbcfb02adf4c196441071",
      products: [
        {
          product: "66918b9aa04daf99838fa5e1",
          quantity: 10,
        },
      ],
      
      status: "pending",
      paymentMethod: "visa",
    };

    const ordered = await createOrder(userOrder);

    console.log(ordered);
  }

  async function getOrder() {
    const order = await getOrderById("66925c83a14b6f9c37af3eea");
    console.log(order);
  }

/*   async function updateOrder() {
    const order = await updateOrderStatusById("66925c83a14b6f9c37af3eea")
    console.log(order);

  } */

  return (
    <div>
      <h1>All Orders</h1>
      <Button onClick={createOrderDetails}>Create Order</Button>
      <Button onClick={getOrder}>get Order</Button>
      <DataTable
        columns={columns}
        data={orders}
        actionDisabled={true}
        buttonName="Add Order"
        filterBy="email"
        filterByPlaceholder="email"
        buttonAction={() => {
          router.push("/admin/orders/new");
        }}
      />
    </div>
  );
}

export default Page;
