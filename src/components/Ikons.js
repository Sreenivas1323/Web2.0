import { Button } from "@chakra-ui/react";
import Link from "next/link";
import {
  ImTwitter,
  ImDribbble,
  ImLinkedin2,
  ImBehance,
  ImGithub,
} from "react-icons/im";
import { CustomButton } from "./CustomComponents";

export const CustomIkonButton = ({ children, variant, props }) => {
  switch (variant.toLowerCase()) {
    case "twitter":
      return (
        <Link href="https://twitter.com/ssaisreenivas" passHref>
          <a target={"_blank"}>
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
          </a>
        </Link>
      );
    case "dribbble":
      return (
        <Link href={"https://dribbble.com/sonthena"} passHref>
          <a target={"_blank"}>
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
          </a>
        </Link>
      );
    case "linkedin":
      return (
        <Link href={"https://www.linkedin.com/in/ssaisreenivas/"} passHref>
          <a target={"_blank"}>
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
          </a>
        </Link>
      );
    case "behance":
      return (
        <Link href={"http://be.net/ssaisreenivas"} passHref>
          <a target={"_blank"}>
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
          </a>
        </Link>
      );
    case "github":
      return (
        <Link href={"https://github.com/Sreenivas1323"} passHref>
          <a target={"_blank"}>
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
          </a>
        </Link>
      );
    default:
      return <Button>{children}</Button>;
  }
};
