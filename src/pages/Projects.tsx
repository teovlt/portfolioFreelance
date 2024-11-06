import { Link } from "react-router-dom";

export const Projects = () => {
  return (
    <div className="h-screen">
      <h1>Vous etes dans projets</h1>
      <Link to="/" className="bg-blue-300">
        Revenir à la maison
      </Link>
    </div>
  );
};
