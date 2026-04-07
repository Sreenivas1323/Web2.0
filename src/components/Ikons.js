import { Button } from "@chakra-ui/react";
import Link from "next/link";
import {
  FaXTwitter,
  FaInstagram,
  FaDribbble,
  FaLinkedinIn,
  FaBehance,
  FaGithub,
} from "react-icons/fa6";

const ICON_CONFIG = {
  twitter: { icon: FaXTwitter, href: "https://x.com/sreeeeenivas" },
  instagram: { icon: FaInstagram, href: "https://instagram.com/sreeeeenivas" },
  dribbble: { icon: FaDribbble, href: "https://dribbble.com/sonthena" },
  linkedin: { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/ssaisreenivas/" },
  behance: { icon: FaBehance, href: "http://be.net/ssaisreenivas" },
  github: { icon: FaGithub, href: "https://github.com/Sreenivas1323" },
};

export const CustomIkonButton = ({ children, variant, ...props }) => {
  const config = ICON_CONFIG[variant?.toLowerCase()];

  if (!config) return <Button>{children}</Button>;

  const IconComponent = config.icon;

  return (
    <Link href={config.href} target="_blank">
      <Button
        {...props}
        color="ash"
        _hover={{ color: "white" }}
        variant="link"
        fontSize={{ base: "25", lg: "30" }}
      >
        <IconComponent />
      </Button>
    </Link>
  );
};
