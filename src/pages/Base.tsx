import { About } from "./About";
import { Services } from "./Services";
import { Contact } from "./Contact";
import { Home } from "./Home";
import { Projects } from "./Projects";

export const Base = () => {
  return (
    <>
      <Home />
      <About />
      <Services />
      <Projects />
      <Contact />
    </>
  );
};
