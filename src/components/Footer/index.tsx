import { ArrowUpIcon, FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div>
      {/* Section pour mobile */}
      <div className="sm:hidden flex p-8 flex-col gap-8">
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

      {/* Section pour écrans plus grands */}
      <div className="hidden sm:block ">
        <div className="flex items-start justify-between p-8 px-16">
          <h1 className="font-bold text-xl">VILLET</h1>
          <div>
            <h2 className="font-bold pb-4">Réseaux sociaux</h2>
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
            <h2 className="font-bold pb-4">Réseaux sociaux</h2>
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
            <h2 className="font-bold pb-4">Réseaux sociaux</h2>
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
        </div>
        <Separator />
        <div className="flex justify-between p-4 px-16 ">
          <p>© {new Date().getFullYear()} VILLET Téo | Tout droit reservés</p>
          <ArrowUpIcon className="h-6 w-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
        </div>
      </div>
    </div>
  );
};
