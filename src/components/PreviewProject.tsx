import { Link } from "react-router-dom";

export const PreviewProject = () => {
  return (
    <div>
      <h1>PreviewProject</h1>
      <Link className="bg-blue-300" to="/projects">
        Projects
      </Link>
    </div>
  );
};
