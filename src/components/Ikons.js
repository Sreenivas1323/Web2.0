import { Button } from "@chakra-ui/react";
import Link from "next/link";
import {
  ImTwitter,
  ImDribbble,
  ImLinkedin2,
  ImBehance,
  ImGithub,
} from "react-icons/im";

export const CustomIkonButton = ({ children, variant, props }) => {
  switch (variant.toLowerCase()) {
    case "twitter":
      return (
        <Link href="https://x.com/sreeeeenivas" target={"_blank"}>
          <Button
            {...props}
            color={"ash"}
            _hover={{
              color: "white",
            }}
            variant={"link"}
            fontSize={{ base: "25", lg: "30" }}
          >
            <ImTwitter />
          </Button>
        </Link>
      );
    case "dribbble":
      return (
        <Link href={"https://dribbble.com/sonthena"} target={"_blank"}>
          <Button
            {...props}
            color={"ash"}
            _hover={{
              color: "white",
            }}
            variant={"link"}
            fontSize={{ base: "25", lg: "30" }}
          >
            <ImDribbble />
          </Button>
        </Link>
      );
    case "linkedin":
      return (
        <Link href={"https://www.linkedin.com/in/ssaisreenivas/"} target={"_blank"}>
          <Button
            {...props}
            color={"ash"}
            _hover={{
              color: "white",
            }}
            variant={"link"}
            fontSize={{ base: "25", lg: "30" }}
          >
            <ImLinkedin2 />
          </Button>
        </Link>
      );
    case "behance":
      return (
        <Link href={"http://be.net/ssaisreenivas"} target={"_blank"}>
          <Button
            {...props}
            color={"ash"}
            _hover={{
              color: "white",
            }}
            variant={"link"}
            fontSize={{ base: "25", lg: "30" }}
          >
            <ImBehance />
          </Button>
        </Link>
      );
    case "github":
      return (
        <Link href={"https://github.com/Sreenivas1323"} target={"_blank"}>
          <Button
            {...props}
            color={"ash"}
            _hover={{
              color: "white",
            }}
            variant={"link"}
            fontSize={{ base: "25", lg: "30" }}
          >
            <ImGithub />
          </Button>
        </Link>
      );
    default:
      return <Button>{children}</Button>;
  }
};
