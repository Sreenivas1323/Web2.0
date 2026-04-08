import {
  Box,
  Container,
  Flex,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { label: "home", href: "/" },
  { label: "craft", href: "/craft" },
  { label: "writing", href: "/blog" },
  { label: "now", href: "/now" },
  { label: "about", href: "/about" },
];

const StatusChip = () => (
  <HStack
    spacing={2}
    px={2.5}
    py={1}
    border="1px solid"
    borderColor="whiteAlpha.100"
    borderRadius="full"
    bg="whiteAlpha.50"
  >
    <Box
      w="6px"
      h="6px"
      borderRadius="full"
      bg="#4ade80"
      boxShadow="0 0 8px rgba(74, 222, 128, 0.6)"
    />
    <Text
      fontSize="10px"
      fontFamily="MonolisaRegular"
      color="dim"
      letterSpacing="0.3px"
    >
      Building Tia at Intripid
    </Text>
  </HStack>
);

const NavLink = ({ label, href, isActive, isMobile }) => (
  <Link href={href} passHref>
    <Text
      as="span"
      fontSize={isMobile ? "11px" : "12px"}
      fontFamily="MonolisaRegular"
      color={isActive ? "white" : "ash"}
      _hover={{ color: "white" }}
      transition="color 0.15s ease"
      cursor="pointer"
    >
      {label}
    </Text>
  </Link>
);

const isActivePath = (current, href) => {
  if (href === "/") return current === "/";
  return current === href || current.startsWith(href + "/");
};

const Header = () => {
  const router = useRouter();
  const current = router.pathname;

  return (
    <>
      {/* Desktop chrome bar */}
      <Box
        display={{ base: "none", md: "block" }}
        position="sticky"
        top="0"
        zIndex="10"
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
        bg="rgba(11, 11, 11, 0.7)"
        style={{ backdropFilter: "saturate(180%) blur(20px)" }}
      >
        <Container maxW="1080px" mx="auto" px={4}>
          <Flex h="48px" align="center">
            <HStack spacing={3}>
              <Link href="/" passHref>
                <Text
                  as="span"
                  fontSize="13px"
                  fontFamily="MonolisaBold"
                  color="white"
                  cursor="pointer"
                  letterSpacing="-0.3px"
                >
                  ssaisreenivas.in
                </Text>
              </Link>
              <StatusChip />
            </HStack>
            <Spacer />
            <HStack spacing={6}>
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  isActive={isActivePath(current, item.href)}
                />
              ))}
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile top: name + status */}
      <Box
        display={{ base: "block", md: "none" }}
        px={4}
        pt={4}
        pb={3}
      >
        <HStack spacing={3} align="center">
          <Link href="/" passHref>
            <Text
              as="span"
              fontSize="13px"
              fontFamily="MonolisaBold"
              color="white"
              cursor="pointer"
              letterSpacing="-0.3px"
            >
              s.
            </Text>
          </Link>
          <StatusChip />
        </HStack>
      </Box>

      {/* Mobile bottom dock */}
      <Box
        display={{ base: "block", md: "none" }}
        position="fixed"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(11, 11, 11, 0.92)"
        borderTop="1px solid"
        borderColor="whiteAlpha.100"
        zIndex="99"
        style={{ backdropFilter: "saturate(180%) blur(20px)" }}
        py={3}
      >
        <Flex justify="space-around" align="center" px={2}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              label={item.label}
              href={item.href}
              isActive={isActivePath(current, item.href)}
              isMobile
            />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Header;
