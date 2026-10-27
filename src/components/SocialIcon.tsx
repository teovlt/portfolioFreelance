import { Briefcase, Dribbble, Facebook, Github, Globe, Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import type { SocialIcon as SocialIconName } from "@/types/content";

const icons: Record<SocialIconName, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  x: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  dribbble: Dribbble,
  malt: Briefcase,
  website: Globe,
};

export const socialIconLabels: Record<SocialIconName, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  mail: "Email",
  x: "X / Twitter",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  dribbble: "Dribbble",
  malt: "Malt",
  website: "Site web",
};

export const SocialIcon = ({ icon, className }: { icon: SocialIconName; className?: string }) => {
  const Icon = icons[icon] ?? Globe;
  return <Icon className={className} />;
};

export const isExternalUrl = (url: string) => /^https?:\/\//.test(url);
