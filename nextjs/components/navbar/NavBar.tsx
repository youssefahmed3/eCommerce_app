"use client"
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import ButtonWithLogo from "../ButtonWithLogo/ButtonWithLogo";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="bg-customColors-black text-customColors-white flex justify-between items-center p-3">
      <div>Logo</div>
      <div className="flex gap-6">
        <ul className="flex justify-between items-center gap-6">
          <Link href={"/"} className={`${pathname === "/" ? "active" : ""} `}>Home</Link>
          <Link href={"/Categories"} className={`${pathname === "/categories" ? "active" : ""} `}>Categories</Link>
          <Link href={"/about"} className={`${pathname === "/about" ? "active" : ""} `}>About us</Link>
        </ul>

        <div className="flex gap-5 ">
          <ButtonWithLogo variant={"primary"} name="Login / Register" />
          <ButtonWithLogo variant={"primary"} name="$0.00 (0)" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
