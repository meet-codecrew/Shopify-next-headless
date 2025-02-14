"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { ShopDetails } from "@/types/shopify";

const getPathName = (url: string) => {
  const urlParts = new URL(url);
  const pathName = urlParts.pathname.replace("/all", "");
  return pathName;
};

const Header = ({
  menus,
  shopDetails,
}: {
  menus: MenuItem[];
  shopDetails: ShopDetails;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="shadow-sm">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-sm lg:text-2xl md:text-xl font-bold uppercase">
              {shopDetails.shop.name}
            </Link>
          </div>

          <div className="justify-center hidden md:flex items-center space-x-8">
            {menus.map((item) => (
              <Link
                key={item.title}
                href={getPathName(item.url)}
                className="text-gray-200 font-bold hover:text-white transition-colors whitespace-nowrap"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center justify-end space-x-4">
            <button className="p-2 hover:bg-gray-500 rounded-full">
              <Search className="h-5 w-5 text-gray-200" />
            </button>
            <Link
              href="/account"
              className="p-2 hover:bg-gray-500 rounded-full"
            >
              <User className="h-5 w-5 text-gray-200" />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-gray-500 rounded-full">
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-200" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </Link>
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-200" />
              ) : (
                <Menu className="h-5 w-5 text-gray-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            {menus.map((item) => (
              <Link
                key={item.id}
                href={getPathName(item.url)}
                className="block py-2 text-gray-200 hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
