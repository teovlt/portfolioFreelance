import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon, Youtube, YoutubeIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="p-8 flex flex-col gap-8">
      {/* <div>
        <h2 className="font-bold">Réseaux sociaus</h2>
        <ul className="flex flex-col gap-2 pl-4">
          <div className="flex gap-2 items-center">
            <GithubIcon className="h-4 w-4" />
            <Link target="_blank" className="hover:underline" to="https://github.com/teovlt">
              Github
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            <InstagramIcon className="h-4 w-4" />
            <Link target="_blank" className="hover:underline" to="https://www.instagram.com/teo_vlt/">
              Instagram
            </Link>
          </div>
        </ul>
      </div>
      <div>
        <h2 className="font-bold">Liens utiles</h2>
        <ul className="flex flex-col gap-2 pl-4">...</ul>
      </div> */}
      <Separator />
      <div className="flex gap-2">
        <FacebookIcon className="h-5 w-5" />
        <GithubIcon className="h-5 w-5" />
        <InstagramIcon className="h-5 w-5" />
        <TwitterIcon className="h-5 w-5" />
        <YoutubeIcon className="h-5 w-5" />
      </div>
      <div className="flex flex-col gap-4">
        <Link className="underline" to="/">
          Mentions légales
        </Link>
        <Link className="underline" to="/">
          Politique de confidentialité
        </Link>
        <Link className="underline" to="/">
          Politique de cookies
        </Link>
      </div>
      <div>
        <p>Copyright © {new Date().getFullYear()} par VILLET Téo | Tout droit reservés.</p>
      </div>
    </div>
  );
};
