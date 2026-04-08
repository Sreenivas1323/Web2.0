import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS =
  "abcdefghijklmnopqrstuvwxyz0123456789@.!#$%&*/\\";

// A small hook that reveals `target` with a scramble/decode animation.
// Re-runs whenever `trigger` changes.
const useScrambleReveal = (target, { duration = 700, trigger = 0 } = {}) => {
  const [output, setOutput] = useState(target);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!target) return undefined;

    const totalFrames = Math.max(target.length * 2, 14);
    const frameDuration = duration / totalFrames;
    let frame = 0;

    const tick = () => {
      const revealCount = Math.floor((frame / totalFrames) * target.length);
      const next = target
        .split("")
        .map((ch, i) => {
          if (i < revealCount) return ch;
          if (/\s/.test(ch)) return ch;
          return SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ];
        })
        .join("");
      setOutput(next);
      frame += 1;
      if (frame <= totalFrames) {
        timerRef.current = setTimeout(tick, frameDuration);
      } else {
        setOutput(target);
      }
    };

    tick();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [target, duration, trigger]);

  return output;
};

const ScrambleLine = ({ href, label, meaning, isExternal, delay = 0 }) => {
  const [trigger, setTrigger] = useState(0);
  const [mounted, setMounted] = useState(false);
  const scrambled = useScrambleReveal(label, { duration: 650, trigger });

  // Stagger the initial reveal for a nicer "brand drop" effect.
  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(true);
      setTrigger((n) => n + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Box
      as="a"
      href={href}
      {...linkProps}
      onMouseEnter={() => setTrigger((n) => n + 1)}
      onFocus={() => setTrigger((n) => n + 1)}
      display="block"
      py={{ base: 2, md: 2.5 }}
      role="group"
      cursor="pointer"
      opacity={mounted ? 1 : 0}
      transform={mounted ? "translateY(0)" : "translateY(6px)"}
      transition="opacity 0.4s ease, transform 0.4s ease"
      borderBottom="1px dashed"
      borderColor="whiteAlpha.100"
      _hover={{ borderColor: "whiteAlpha.300" }}
    >
      <Flex
        align={{ base: "flex-start", md: "baseline" }}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 1, md: 4 }}
      >
        <Text
          fontSize={{ base: "16px", md: "20px" }}
          fontFamily="MonolisaBold"
          color="white"
          letterSpacing="-0.4px"
          minW={{ base: "auto", md: "280px" }}
          sx={{ fontVariantLigatures: "none" }}
        >
          {scrambled}
        </Text>
        <Text
          fontSize={{ base: "11px", md: "12px" }}
          fontFamily="MonolisaRegular"
          color="ash"
          _groupHover={{ color: "dim" }}
          transition="color 0.2s ease"
        >
          {meaning}
        </Text>
      </Flex>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box
      as="footer"
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      mt={{ base: 16, md: 20 }}
      pt={{ base: 10, md: 14 }}
      pb={{ base: "110px", md: 14 }}
      bg="rgba(11, 11, 11, 0.4)"
    >
      <Container maxW="1080px" mx="auto" px={4}>
        <HStack spacing={2} mb={6}>
          <Box w="6px" h="6px" borderRadius="full" bg="white" />
          <Text
            fontSize="10px"
            fontFamily="MonolisaBold"
            textTransform="uppercase"
            letterSpacing="2.5px"
            color="dim"
          >
            elsewhere
          </Text>
        </HStack>

        <VStack align="stretch" spacing={0}>
          <ScrambleLine
            href="/"
            label="ssaisreenivas.in"
            meaning="— where you can read more"
            delay={0}
          />
          <ScrambleLine
            href="mailto:ssaisreenivas@gmail.com"
            label="ssaisreenivas@gmail.com"
            meaning="— where you can reach me"
            delay={120}
          />
          <ScrambleLine
            href="https://x.com/sreeeeenivas"
            label="sreeeeenivas"
            meaning="— on X"
            isExternal
            delay={240}
          />
          <ScrambleLine
            href="https://instagram.com/sreeeeenivas"
            label="sreeeeenivas"
            meaning="— on Instagram"
            isExternal
            delay={360}
          />
        </VStack>

        <Flex
          mt={10}
          pt={6}
          borderTop="1px dashed"
          borderColor="whiteAlpha.100"
          align="center"
          justify="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <Text
            fontSize="10px"
            fontFamily="MonolisaRegular"
            color="ash"
            letterSpacing="0.5px"
          >
            © {new Date().getFullYear()} sreenivas sonthena
          </Text>
          <Text
            fontSize="10px"
            fontFamily="MonolisaRegular"
            color="ash"
            letterSpacing="0.5px"
          >
            built end-to-end, shipped with care
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
