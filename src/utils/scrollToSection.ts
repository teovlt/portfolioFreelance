export const scrollToId = (id: string, behavior: ScrollBehavior = "smooth") => {
  const section = document.getElementById(id);
  if (section) {
    const header = document.querySelector("header");
    const navbarHeight = header ? header.getBoundingClientRect().height : 0;
    const position = section.offsetTop - navbarHeight;
    window.scrollTo({ top: position, behavior });
  }
};

export const scrollToSection = (id: string, event: any) => {
  event.preventDefault();
  scrollToId(id);
};
