import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/vite.svg";

function Gnb() {
  const navItems = [
    { id: "skills", label: "Skills & Tools" },
    { id: "libraries", label: "Libraries" },
    { id: "works", label: "Works" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
  ];

  const [activeId, setActiveId] = useState(null);

  return (
    <header className="fixed left-0 top-0 z-20 h-12 w-full bg-transparent backdrop-blur-2xl md:h-15">
      <div className="flex h-full w-full items-center justify-center md:justify-between px-4 sm:px-10 md:px-15">
        {/* 로고 */}
        <Link
          to="/#main"
          className="flex w-21 items-center justify-center gap-2 md:w-41 md:justify-start"
          onClick={() => setActiveId(null)}
        >
         <div className="text-2xl font-bold">The B</div>
          {/* <img src={logo} alt="로고" /> */}
        </Link>

        {/* 네비게이션 */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex gap-1 md:gap-6">
            {navItems.map((item) => {
              const isActive = activeId === item.id;

              return (
                <NavigationMenuItem
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`
                    w-[125px]
                    transition-colors duration-200
                    ${isActive
                      ? "font-semibold text-[var(--primary)]"
                      : "text-[var(--primary-foreground)]"}
                  `}
                >
                  <NavigationMenuLink href={`#${item.id}`}>
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

export default Gnb;