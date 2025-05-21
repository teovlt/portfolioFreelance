export const scrollToSection = (id: string, event: any) => {
  event.preventDefault();
  const section = document.getElementById(id);
  if (section) {
    const navbarHeight = document.querySelector("header").getBoundingClientRect().height;
    const position = section.offsetTop - navbarHeight;
    window.scrollTo({ top: position, behavior: "smooth" });
  }
};
