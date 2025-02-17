"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Define links dynamically based on the current page
  const links = [
    { href: "/", label: "Home" },
    { href: "/registry", label: "Registry" },
    { href: "/rsvp", label: "RSVP" },
  ];

  // Filter out the current page so it doesn't appear in the footer
  const filteredLinks = links.filter((link) => link.href !== pathname);

  return (
    <footer className="bg-[var(--top-text-color)] text-[--top-background] py-6 px-4 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        {/* Center: Navigation Links (Dynamically Filtered) */}
        <div className="flex space-x-6 my-4 md:my-0 underline">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:underline font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Contact Email */}
        <a
          href="mailto:sergiorodriguez610@gmail.com"
          className="text-blue-500 hover:underline font-medium"
        >
          Contact: sergiorodriguez610@gmail.com
        </a>

        {/* Left: Copyright Text */}
        <p className="text-sm font-semibold pt-4 roboto-font">
          © {new Date().getFullYear()} Sergio and Ashley
        </p>
      </div>
    </footer>
  );
}
