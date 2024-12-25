import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

export default function Header() {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 text-wrap">
      <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />
      <div className="flex flex-row items-center justify-between gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="font-extrabold text-2xl text-gray-900">AI-Book \ Linear Algebra and Applications</div>
          <div className="font-base text-xs text-gray-600 ml-auto translate-y-1 "> Develop by
            <Link href={"https://thedlcrimson.vercel.app/"} className="text-red-500"> Crimson  </Link>
            \ A product from  <Link href={"https://naviai.io.vn/"} className="text-blue-500"> Navi </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
