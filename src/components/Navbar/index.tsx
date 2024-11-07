import { Link } from "react-router-dom";
import { ThemeChanger } from "./ThemeChanger";
import { LanguageChanger } from "./LanguageChanger";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 text-primary px-8 select-none">
      <div className="font-extrabold text-3xl">
        <Link to="/">VILLET</Link>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
        |
        <div className="flex gap-4 items-center justify-between">
          <LanguageChanger />
          <ThemeChanger />
        </div>
      </div>
    </div>
  );
};
