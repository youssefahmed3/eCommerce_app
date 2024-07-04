import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function NavBar() {
  return (
    <nav className="bg-customColors-black text-customColors-white flex justify-between items-center p-3">
      <div>Logo</div>
      <div className="flex gap-6">
        <ul className="flex justify-between items-center gap-6">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>About</Link>
          <Link href={"/"}>Services</Link>
          <Link href={"/"}>Contact</Link>
        </ul>

        <div className="flex gap-5">
          <Button type="button">Login/Register</Button>
          <Button type="button">$0.00</Button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
