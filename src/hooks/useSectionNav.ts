import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "@/utils/scrollToSection";

// Section ids (home-section, contact-section, ...) live on the home page, and
// some of them on other pages too (the trade pages repeat the pricing,
// projects, process and contact sections). When the section is on the
// current page, scroll to it; otherwise go to the home page with the section
// as a hash and let it scroll into view on mount.
export function useSectionNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isHere = (id: string) => isHome || document.getElementById(id) !== null;

  const handleNavLinkClick = (id: string, e: any) => {
    if (isHere(id)) scrollToSection(id, e);
  };

  const handleSectionButtonClick = (id: string, e: any) => {
    if (isHere(id)) {
      scrollToSection(id, e);
    } else {
      e.preventDefault();
      navigate(`/#${id}`);
    }
  };

  return { isHome, handleNavLinkClick, handleSectionButtonClick };
}
