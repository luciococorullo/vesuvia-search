"use client";

import { NavigationMenu } from "@/components/ui/navigation-menu";
import { LanguageSelector } from "@/components/LanguageSelector";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import InstallButton to avoid chunk loading issues
const InstallButton = dynamic(() => import("@/components/InstallButton"), {
  ssr: false,
  loading: () => null,
});

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full p-4 border-b-2 border-red-500 bg-white shadow-lg">
      <NavigationMenu className="flex items-center h-full">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-red-500">VesuviaSearch</h1>
        </div>
        {/* <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Treni</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Da Napoli</NavigationMenuLink>
              <NavigationMenuLink>Da Sorrento</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Autobus</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Da Napoli</NavigationMenuLink>
              <NavigationMenuLink>Da Sorrento</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList> */}
      </NavigationMenu>

      <div className="flex items-center gap-3">
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<div className="w-24 h-16" />}>
            <InstallButton />
          </Suspense>
        </ErrorBoundary>
        <LanguageSelector />
      </div>
    </div>
  );
}
