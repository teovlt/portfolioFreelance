import { Languages, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "../providers/theme-provider";

export const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between p-4 bg-primary text-secondary px-8">
      <div className="font-extrabold text-3xl">
        <Link to="/">VILLET</Link>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-4">
          <Link className="hover:font-bold" to="/">
            Home
          </Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
        |
        <div className="flex gap-4 items-center justify-between">
          <Languages />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
