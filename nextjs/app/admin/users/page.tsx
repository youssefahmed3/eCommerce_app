"use client";
import { AppDispatch, RootState } from "@/store/store";
import { fetchUsers } from "@/store/users/UsersSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/columns";

function Page() {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // load if there is no items in order 
    if (!users.length) {
      dispatch(fetchUsers());
    }
  }, [users.length, dispatch]);
  return (
    <div>
      {/* {users.map((user) => {
        return <div key={user.id}>{user.id}</div>;
      })} */}
      <h1>All Users</h1>
      <DataTable
        columns={columns}
        data={users}
        actionDisabled={true}
        buttonName="Add Users"
        filterBy="email"
        filterByPlaceholder="Emails"
      />
    </div>
  );
}

export default Page;
