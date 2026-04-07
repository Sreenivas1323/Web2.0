import {
  Button,
  Heading,
  Box,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

// --- Type Scale ---
// display: 32-38px  — hero headings
// h1: 26-30px       — page headings
// h2: 20-22px       — section headings
// h3: 15-16px       — sub-section headings
// body: 13px        — paragraph text
// sm: 12px          — small text, captions
// label: 10px       — labels, tags, uppercase markers

export const CustomHeading = ({ children, ...props }) => {
  return (
    <Heading
      fontSize={{ base: "26px", md: "28px", lg: "30px" }}
      fontFamily="MonolisaBold"
      color="white"
      letterSpacing="-0.5px"
      {...props}
    >
      {children}
    </Heading>
  );
};

export const CustomSecondaryHeading = ({ children, ...props }) => {
  return (
    <Heading
      fontSize={{ base: "18px", md: "20px", lg: "22px" }}
      fontFamily="MonolisaBold"
      color="white"
      letterSpacing="-0.3px"
      {...props}
    >
      {children}
    </Heading>
  );
};

export const CustomTeritoryHeading = ({ children, ...props }) => {
  return (
    <Heading
      fontSize={{ base: "15px", md: "16px" }}
      fontFamily="MonolisaBold"
      color="white"
      {...props}
    >
      {children}
    </Heading>
  );
};

export const TopLine = ({}) => {
  return (
    <Box
      bg="white"
      height="2px"
      display={{ base: "none", md: "block" }}
      width="full"
    />
  );
};

export const BottomPortion = ({}) => {
  return (
    <Box height="60px" display={{ base: "block", md: "block" }} width="full" />
  );
};

export const CustomChakraLink = ({ children, ...props }) => {
  return (
    <ChakraLink
      {...props}
      color="white"
      textDecoration="underline"
      textDecorationColor="whiteAlpha.400"
      textUnderlineOffset="3px"
      _hover={{
        textDecorationColor: "white",
      }}
      transition="0.2s ease-in-out"
    >
      {children}
    </ChakraLink>
  );
};

export const CustomText = ({ children, ...props }) => {
  return (
    <Text fontFamily="MonolisaRegular" color="ash" fontSize="13px" {...props}>
      {children}
    </Text>
  );
};

export const AccentText = ({ children, ...props }) => {
  return (
    <Box
      as="span"
      color="white"
      {...props}
    >
      {children}
    </Box>
  );
};

export const SectionLabel = ({ children, ...props }) => {
  return (
    <Text
      fontSize="10px"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="2.5px"
      color="dim"
      fontFamily="MonolisaBold"
      {...props}
    >
      {children}
    </Text>
  );
};

export const CustomButton = ({ children, variant, href, ...props }) => {
  switch (variant.toLowerCase()) {
    case "default":
      return (
        <Button
          {...props}
          color="ash"
          _hover={{ color: "white" }}
        >
          {children}
        </Button>
      );

    case "med":
      return (
        <Button {...props} size="sm" fontSize="12px">
          {children}
        </Button>
      );

    case "sm-hover":
      return (
        <Button
          _hover={{
            transform: "translateY(-2px)",
            bg: "white",
            color: "black",
          }}
          {...props}
          size="xs"
          fontSize="11px"
          bg="whiteAlpha.100"
          color="white"
        >
          {children}
        </Button>
      );

    case "ghost":
      return (
        <Button {...props} variant="ghost" size="sm" fontSize="12px">
          {children}
        </Button>
      );

    case "themed":
      return (
        <Link href={href}>
          <Button
            {...props}
            _hover={{ transform: "translateY(-2px)", opacity: 0.85 }}
            bg="white"
            color="black"
            size="xs"
            fontSize="11px"
            fontFamily="MonolisaBold"
            px={4}
            py={4}
          >
            {children}
          </Button>
        </Link>
      );

    case "outline-gradient":
      return (
        <Link href={href || "#"}>
          <Button
            {...props}
            variant="outline"
            borderColor="whiteAlpha.300"
            color="white"
            _hover={{
              borderColor: "white",
              transform: "translateY(-2px)",
            }}
            transition="all 0.2s"
            size="xs"
            fontSize="11px"
            fontFamily="MonolisaBold"
            px={4}
            py={4}
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
