"use client"; // This makes it a Client Component

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function NavWrapper() {
  const pathname = usePathname();
  const hideNav = pathname === "/sign-in" || pathname === "/sign-up";

  return !hideNav ? <NavBar /> : null;
}
