import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import Head from "next/head";

import {
  CustomText,
  SectionLabel,
} from "../src/components/CustomComponents";

// TODO(now-page): keep these fields fresh — update monthly. Pull real data
// from Spotify / Goodreads / GitHub later if we want it automated.
const NOW_DATA = {
  lastUpdated: "April 2026",
  location: "Hyderabad, India",
  building: {
    title: "Tia at Intripid",
    detail:
      "Leading frontend for our AI travel assistant. Shipping the first end-to-end version this quarter.",
  },
  focus: [
    "Frontend architecture for AI-first products",
    "Agent design patterns and tool-use UX",
    "Writing more — moving from notes to published posts",
  ],
  reading: [
    { title: "The Pragmatic Engineer", by: "Gergely Orosz" },
    { title: "Working in Public", by: "Nadia Eghbal" },
  ],
  shipping: [
    "Tia v1 — internal beta",
    "OpenClaw shell agent (see /craft)",
    "Daily AI experiments cross-posted to X",
  ],
  notLearning: [
    "Saying yes to things I shouldn't",
    "Polishing instead of shipping",
  ],
};

const Section = ({ label, children }) => (
  <Box>
    <SectionLabel mb={4}>{label}</SectionLabel>
    {children}
  </Box>
);

const ListBlock = ({ items }) => (
  <VStack align="start" spacing={2}>
    {items.map((item, i) => (
      <HStack key={i} align="start" spacing={3}>
        <Text
          fontSize="13px"
          color="ash"
          fontFamily="MonolisaRegular"
          mt="2px"
        >
          —
        </Text>
        <CustomText lineHeight="1.8">
          {typeof item === "string" ? item : `${item.title} — ${item.by}`}
        </CustomText>
      </HStack>
    ))}
  </VStack>
);

const Now = () => {
  return (
    <>
      <Head>
        <title>Now — Sreenivas Sonthena</title>
        <meta
          name="description"
          content="What I'm building, reading, and focused on right now. Updated monthly."
        />
        <meta name="twitter:creator" content="@sreeeeenivas" />
      </Head>

      <Container maxW="full" px={4} py={{ base: 10, md: 16 }}>
        <Box maxW="720px">
          <VStack align="start" spacing={12}>
            {/* Header */}
            <VStack align="start" spacing={4}>
              <SectionLabel>NOW</SectionLabel>
              <Text
                fontFamily="MonolisaBold"
                fontSize={{ base: "26px", md: "30px" }}
                color="white"
                letterSpacing="-0.5px"
                lineHeight="1.2"
              >
                What I&apos;m doing<br />right now
              </Text>
              <CustomText lineHeight="1.8" maxW="560px">
                A snapshot of where my attention is. Inspired by Derek
                Sivers&apos; <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>now page</a> idea — updated monthly so you know
                this is current, not stale.
              </CustomText>
              <HStack spacing={4}>
                <HStack spacing={2}>
                  <Box
                    w="6px"
                    h="6px"
                    borderRadius="full"
                    bg="#4ade80"
                    boxShadow="0 0 8px rgba(74,222,128,0.6)"
                  />
                  <Text
                    fontSize="11px"
                    fontFamily="MonolisaRegular"
                    color="dim"
                  >
                    Updated {NOW_DATA.lastUpdated}
                  </Text>
                </HStack>
                <Text
                  fontSize="11px"
                  fontFamily="MonolisaRegular"
                  color="dim"
                >
                  · {NOW_DATA.location}
                </Text>
              </HStack>
            </VStack>

            <Box w="full" h="1px" bg="whiteAlpha.100" />

            {/* Building */}
            <Section label="BUILDING">
              <Text
                fontSize="16px"
                fontFamily="MonolisaBold"
                color="white"
                mb={2}
              >
                {NOW_DATA.building.title}
              </Text>
              <CustomText lineHeight="1.8">
                {NOW_DATA.building.detail}
              </CustomText>
            </Section>

            {/* Focus */}
            <Section label="FOCUS THIS MONTH">
              <ListBlock items={NOW_DATA.focus} />
            </Section>

            {/* Shipping */}
            <Section label="SHIPPING">
              <ListBlock items={NOW_DATA.shipping} />
            </Section>

            {/* Reading */}
            <Section label="READING">
              <ListBlock items={NOW_DATA.reading} />
            </Section>

            {/* Saying no */}
            <Section label="ACTIVELY SAYING NO TO">
              <ListBlock items={NOW_DATA.notLearning} />
            </Section>

            <Box w="full" h="1px" bg="whiteAlpha.100" />

            <CustomText fontSize="12px" lineHeight="1.7">
              This page changes monthly. If you&apos;re reading something here
              and it feels stale, ping me on{" "}
              <a
                href="https://x.com/sreeeeenivas"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline" }}
              >
                X
              </a>{" "}
              and I&apos;ll update it.
            </CustomText>
          </VStack>
        </Box>
      </Container>
    </>
  );
};

export default Now;
