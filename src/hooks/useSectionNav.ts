import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "@/utils/scrollToSection";

// Section ids (home-section, contact-section, ...) only exist in the DOM on
// the home page. Elsewhere, there's nothing to scroll to: navigate to the
// home page with the section as a hash and let it scroll into view on mount.
export function useSectionNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const handleNavLinkClick = (id: string, e: any) => {
    if (isHome) scrollToSection(id, e);
  };

  const handleSectionButtonClick = (id: string, e: any) => {
    if (isHome) {
      scrollToSection(id, e);
    } else {
      e.preventDefault();
      navigate(`/#${id}`);
    }
  };

  return { isHome, handleNavLinkClick, handleSectionButtonClick };
}
