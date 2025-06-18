"use client";

import { NavigationMenu } from "@/components/ui/navigation-menu";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full p-4 border-b-2 border-red-500 bg-white shadow-lg">
      <NavigationMenu className="flex items-center h-full">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-800">
            Vesuvia<span className="text-red-500">Search</span>
          </h1>
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

      <LanguageSelector />
    </div>
  );
}
