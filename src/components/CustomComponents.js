import React from "react";
import { Button, Heading, Box, Center, Container } from "@chakra-ui/react";

export const CustomHeading = ({ children }) => {
  return (
    <Heading fontSize={{ base: "24px", md: "35px", lg: "45px" }}>
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

export const CustomButton = ({ children, variant, props }) => {
  switch (variant.toLowerCase()) {
    case "default":
      return <Button {...props}>{children}</Button>;

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
        <Button
          style={{
            background:
              "linear-gradient(90deg, #FC466B -2.22%, #3F5EFB 99.02%)",
          }}
          size="sm"
        >
          {children}
        </Button>
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
