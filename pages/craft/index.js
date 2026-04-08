import {
  Box,
  Container,
  VStack,
  SimpleGrid,
  Text,
  HStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

import {
  CustomText,
  SectionLabel,
} from "../../src/components/CustomComponents";
import { getAllCraft } from "../../src/lib/craft";

const STATUS_LABEL = {
  wip: "Work in progress",
  shipped: "Shipped",
  exploring: "Exploring",
};

const StatusDot = ({ status }) => {
  const color =
    status === "shipped"
      ? "#4ade80"
      : status === "wip"
      ? "#fbbf24"
      : "#94a3b8";
  return (
    <Box
      w="6px"
      h="6px"
      borderRadius="full"
      bg={color}
      boxShadow={`0 0 8px ${color}55`}
    />
  );
};

const CraftCard = ({ item }) => {
  const { frontmatter, slug } = item;
  return (
    <Link href={`/craft/${slug}`} passHref style={{ textDecoration: "none" }}>
      <Box
        p={5}
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="12px"
        transition="all 0.3s ease"
        _hover={{
          transform: "translateY(-3px)",
          borderColor: "whiteAlpha.300",
        }}
        height="full"
        cursor="pointer"
        role="group"
      >
        <VStack align="start" spacing={3}>
          <HStack spacing={2}>
            <StatusDot status={frontmatter.status} />
            <Text
              fontSize="10px"
              fontFamily="MonolisaRegular"
              color="dim"
              letterSpacing="0.5px"
            >
              {STATUS_LABEL[frontmatter.status] || "Note"}
            </Text>
          </HStack>

          <Text
            fontSize="15px"
            fontFamily="MonolisaBold"
            color="white"
            lineHeight="1.35"
            _groupHover={{
              textDecoration: "underline",
              textDecorationColor: "whiteAlpha.400",
              textUnderlineOffset: "3px",
            }}
            transition="0.2s"
          >
            {frontmatter.title}
          </Text>

          <CustomText noOfLines={3} lineHeight="1.7">
            {frontmatter.description}
          </CustomText>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <HStack spacing={2} flexWrap="wrap">
              {frontmatter.tags.map((tag) => (
                <Text
                  key={tag}
                  fontSize="9px"
                  color="ash"
                  fontFamily="MonolisaRegular"
                  px={2}
                  py={0.5}
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  borderRadius="full"
                >
                  {tag}
                </Text>
              ))}
            </HStack>
          )}

          <Text
            fontSize="10px"
            color="ash"
            fontFamily="MonolisaRegular"
            letterSpacing="1px"
            mt={1}
          >
            {new Date(frontmatter.date)
              .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              .toUpperCase()}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

function CraftIndex({ items }) {
  return (
    <>
      <Head>
        <title>Craft — Sreenivas Sonthena</title>
        <meta
          name="description"
          content="Experiments, side projects, and tinkering. Where I test ideas before they become anything real."
        />
        <meta name="twitter:creator" content="@sreeeeenivas" />
      </Head>

      <Container maxW="full" px={4} py={{ base: 10, md: 16 }}>
        <VStack spacing={12} align="stretch">
          <VStack align="start" spacing={4}>
            <SectionLabel>CRAFT</SectionLabel>
            <Text
              fontFamily="MonolisaBold"
              fontSize={{ base: "26px", md: "30px" }}
              color="white"
              letterSpacing="-0.5px"
              lineHeight="1.2"
            >
              Things I&apos;m tinkering<br />with
            </Text>
            <CustomText maxW="560px" lineHeight="1.8">
              Experiments, AI findings, weekend builds, and half-finished
              ideas. The place where things start before they become real
              projects.
            </CustomText>
          </VStack>

          {items.length === 0 ? (
            <CustomText>Nothing here yet. Soon.</CustomText>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
              {items.map((item) => (
                <CraftCard key={item.slug} item={item} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const items = getAllCraft();
  return { props: { items } };
}

export default CraftIndex;
