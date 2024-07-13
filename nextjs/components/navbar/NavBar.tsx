"use client";
import React, { Children } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import ButtonWithLogo from "../ButtonWithLogo/ButtonWithLogo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

function NavBar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <nav className="bg-customColors-black text-customColors-white flex justify-between items-center p-3">
      <div>Logo</div>
      <div className="flex gap-6">
        <ul className="flex justify-between items-center gap-6">{children}</ul>
        
        {!pathname.startsWith("/admin") ? (
          <div className="flex gap-5 ">
            <ButtonWithLogo variant={"primary"} name="Login / Register" />
            <ButtonWithLogo variant={"primary"} name="$0.00 (0)" />
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default NavBar;

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  // Ensure pathname is a string before calling replace
  const pathname = usePathname().toString().replace(/\/$/, ""); // Normalize by removing trailing slash
  
  // Ensure props.href is a string before calling replace
  const href = props.href.toString().replace(/\/$/, ""); // Normalize props.href by removing trailing slash

  return (
    <Link
      {...props}
      className={cn(
        "p-2 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground rounded-md transition-colors duration-200",
        pathname.startsWith(href) && "bg-background text-foreground" // Check if pathname starts with href
      )}
    />
  );
}
