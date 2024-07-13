"use client";
import React, { useEffect, useState } from "react";
import { UserType } from "@/lib/models/user.model";
import { createUser } from "@/lib/actions/user.action";
import DashboardCard from "@/app/admin/_components/dashboardCard";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/store/products/productsSlice";
import { fetchUsers } from "@/store/users/UsersSlice";
import { fetchOrders } from "@/store/orders/ordersSlice";

function Dashboard() {
  const products = useSelector((state: RootState) => state.products);
  const users = useSelector((state: RootState) => state.users);
  const orders = useSelector((state: RootState) => state.orders);
  const [totalSales, setTotalSales] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      try {
        // Use Promise.all to wait for all dispatch calls
        await Promise.all([
          dispatch(fetchProducts()),
          dispatch(fetchOrders()),
          dispatch(fetchUsers()),
        ]);

        // Handle success if needed
      } catch (error) {
        // Handle error
        console.error("Failed to fetch data:", error);
      }
    };

    // Call the async function
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Calculate total sales when orders change
    const sales = orders
      .filter((order) => order.status === "Delivered")
      .reduce((sum, order) => sum + order.totalPrice, 0);
    setTotalSales(sales);
  }, [orders.length]);

  console.log(totalSales);

  const availableProductsLength = products.filter(
    (product) => product.isAvaliableForPurchase
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 justify-items-stretch mx-2">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(orders.length)} Orders`}
        content={formatCurrency(totalSales)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatNumber(users.length)} Customers`}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(availableProductsLength)} Products`}
        content={`${formatNumber(products.length)} Total Products`}
      />
    </div>
  );
}

export default Dashboard;
