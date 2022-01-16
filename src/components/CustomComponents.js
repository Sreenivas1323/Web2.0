import React from "react";
import {
  Button,
  Heading,
  Box,
  Center,
  Container,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

export const CustomHeading = ({ children }) => {
  return (
    <Heading fontSize={{ base: "35px", md: "35px", lg: "45px" }}>
      {children}
    </Heading>
  );
};
export const CustomSecondaryHeading = ({ children }) => {
  return (
    <Heading fontSize={{ base: "25px", md: "28px", lg: "30px" }}>
      {children}
    </Heading>
  );
};

export const TopLine = ({}) => {
  return (
    <Box
      style={{
        background: "linear-gradient(90deg, #FC466B -2.22%, #3F5EFB 99.02%)",
        height: "0.5rem",
      }}
      display={{ base: "none", md: "block" }}
      marginBottom="3vh"
      width="full"
    />
  );
};

export const BottomPortion = ({}) => {
  return (
    <Box
      style={{
        background: "black",
        padding: "20px",
      }}
      display={{ base: "none", md: "block" }}
      marginBottom="3vh"
      width="full"
    />
  );
};

export const CustomChakraLink = ({ children, ...props }) => {
  return (
    <ChakraLink
      {...props}
      color={"white"}
      _hover={{
        bgGradient: "linear(to-l, brand.50, brand.100)",
        bgClip: "text",
        fontWeight: "700",
        color: "brand.100",
      }}
      transition={"0.2s ease-in-out"}
    >
      {children}
    </ChakraLink>
  );
};

export const CustomText = ({ children }, props) => {
  return (
    <Text {...props} fontFamily={"MonolisaBold"} color={"ash"}>
      {children}
    </Text>
  );
};

export const CustomButton = ({ children, variant, props, href }) => {
  switch (variant.toLowerCase()) {
    case "default":
      return (
        <Button
          {...props}
          color={"ash"}
          _hover={{
            color: "white",
          }}
        >
          {children}
        </Button>
      );

    case "med":
      return (
        <Button {...props} size="md" fontSize={"12px"}>
          {" "}
          {children}
        </Button>
      );

    case "ghost":
      return (
        <Button {...props} variant={"ghost"} size="md" fontSize={"12px"}>
          {" "}
          {children}
        </Button>
      );
    case "themed":
      return (
        <Link href={href}>
          <Button
            {...props}
            _hover={{ transform: "translateY(-0.25rem)" }}
            style={{
              background:
                "linear-gradient(90deg, #FC466B -2.22%, #3F5EFB 99.02%)",
            }}
            size="sm"
          >
            {children}
          </Button>
        </Link>
      );

    case "primary":
      return (
        <Box
          {...props}
          as="button"
          height="24px"
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          border="1px"
          px="8px"
          borderRadius="2px"
          fontSize="14px"
          fontWeight="semibold"
          bg="#f5f6f7"
          borderColor="#ccd0d5"
          color="#4b4f56"
          _hover={{ bg: "#ebedf0" }}
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
          }}
        >
          {children}
        </Box>
      );

    default:
      return <Button {...props}>{children}</Button>;
  }
};
