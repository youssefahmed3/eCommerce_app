import React from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
function Footer() {
  return (
    <footer className="flex flex-col bg-customColors-black text-customColors-white gap-6 py-3 px-5">
      <div className=" flex justify-between">
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl">Logo</h4>
          <p className="w-[300px]">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl">Popular Categories</h4>
          <ul className="flex flex-col">
            <Link href={"/"}>Category 1</Link>
            <Link href={"/"}>Category 2</Link>
            <Link href={"/"}>Category 3</Link>
            <Link href={"/"}>Category 4</Link>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl">Main Store</h4>
          <p>13 street of Egypt</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p>Copyright © 2024 By Joo</p>
        <Select>
          <SelectTrigger className="w-[180px] bg-customColors-black text-customColors-white">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="bg-customColors-black text-customColors-white">
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="arabic">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </footer>
  );
}

export default Footer;
