import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import Link from "next/link";

import { getCraftSlugs, getCraftBySlug } from "../../src/lib/craft";
import {
  CustomText,
  SectionLabel,
} from "../../src/components/CustomComponents";

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

const components = {
  h1: (props) => (
    <Text
      as="h1"
      fontFamily="MonolisaBold"
      fontSize={{ base: "22px", md: "26px" }}
      color="white"
      mt={12}
      mb={4}
      lineHeight="1.3"
      letterSpacing="-0.3px"
      {...props}
    />
  ),
  h2: (props) => (
    <Text
      as="h2"
      fontFamily="MonolisaBold"
      fontSize={{ base: "18px", md: "20px" }}
      color="white"
      mt={10}
      mb={3}
      lineHeight="1.3"
      {...props}
    />
  ),
  h3: (props) => (
    <Text
      as="h3"
      fontFamily="MonolisaBold"
      fontSize={{ base: "15px", md: "16px" }}
      color="white"
      mt={8}
      mb={3}
      lineHeight="1.4"
      {...props}
    />
  ),
  p: (props) => (
    <Text
      my={4}
      fontSize={{ base: "13px", md: "14px" }}
      lineHeight="2"
      color="#B0B0B0"
      fontFamily="MonolisaRegular"
      {...props}
    />
  ),
  ul: (props) => <Box as="ul" ml={5} my={4} color="#B0B0B0" {...props} />,
  ol: (props) => <Box as="ol" ml={5} my={4} color="#B0B0B0" {...props} />,
  li: (props) => (
    <Box
      as="li"
      my={2}
      fontSize={{ base: "13px", md: "14px" }}
      lineHeight="1.9"
      fontFamily="MonolisaRegular"
      {...props}
    />
  ),
  strong: (props) => (
    <Text as="strong" color="white" fontFamily="MonolisaBold" {...props} />
  ),
  code: (props) => (
    <Box
      as="code"
      bg="whiteAlpha.100"
      px={2}
      py={1}
      borderRadius="4px"
      fontSize="0.9em"
      color="white"
      fontFamily="MonolisaRegular"
      {...props}
    />
  ),
};

const MetaRow = ({ label, children }) => (
  <Box>
    <Text
      fontSize="9px"
      fontFamily="MonolisaRegular"
      color="dim"
      textTransform="uppercase"
      letterSpacing="1.5px"
      mb={1}
    >
      {label}
    </Text>
    <Box fontSize="12px" fontFamily="MonolisaRegular" color="white">
      {children}
    </Box>
  </Box>
);

export default function CraftPost({ source, frontmatter }) {
  const dateStr = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Head>
        <title>{frontmatter.title} — Craft / Sreenivas Sonthena</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="twitter:creator" content="@sreeeeenivas" />
      </Head>

      <Container maxW="full" px={4} pt={{ base: 10, md: 16 }} pb={20}>
        <Box maxW="720px">
          <VStack align="start" spacing={3} mb={8}>
            <Link href="/craft" passHref>
              <Text
                as="span"
                fontSize="10px"
                fontFamily="MonolisaRegular"
                color="ash"
                letterSpacing="2px"
                textTransform="uppercase"
                cursor="pointer"
                _hover={{ color: "white" }}
              >
                ← back to craft
              </Text>
            </Link>

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
              <Text
                fontSize="10px"
                fontFamily="MonolisaRegular"
                color="ash"
                letterSpacing="0.5px"
              >
                · {dateStr}
              </Text>
            </HStack>

            <Text
              as="h1"
              fontFamily="MonolisaBold"
              fontSize={{ base: "24px", md: "30px" }}
              lineHeight="1.2"
              letterSpacing="-0.5px"
              color="white"
            >
              {frontmatter.title}
            </Text>

            <CustomText lineHeight="1.8">
              {frontmatter.description}
            </CustomText>
          </VStack>

          <Box h="1px" bg="whiteAlpha.100" mb={8} />

          {/* Meta */}
          {(frontmatter.tags?.length || frontmatter.demoLink || frontmatter.sourceLink) && (
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={5} mb={10}>
              {frontmatter.tags?.length > 0 && (
                <MetaRow label="TAGS">
                  <HStack spacing={1.5} flexWrap="wrap">
                    {frontmatter.tags.map((t) => (
                      <Text
                        key={t}
                        as="span"
                        fontSize="11px"
                        color="white"
                      >
                        {t}
                      </Text>
                    ))}
                  </HStack>
                </MetaRow>
              )}
              {frontmatter.demoLink && (
                <MetaRow label="DEMO">
                  <Link href={frontmatter.demoLink} target="_blank">
                    <Text
                      as="span"
                      textDecoration="underline"
                      textDecorationColor="whiteAlpha.400"
                      textUnderlineOffset="3px"
                      _hover={{ textDecorationColor: "white" }}
                    >
                      open ↗
                    </Text>
                  </Link>
                </MetaRow>
              )}
              {frontmatter.sourceLink && (
                <MetaRow label="SOURCE">
                  <Link href={frontmatter.sourceLink} target="_blank">
                    <Text
                      as="span"
                      textDecoration="underline"
                      textDecorationColor="whiteAlpha.400"
                      textUnderlineOffset="3px"
                      _hover={{ textDecorationColor: "white" }}
                    >
                      github ↗
                    </Text>
                  </Link>
                </MetaRow>
              )}
            </SimpleGrid>
          )}

          {/* Article body */}
          <Box>
            <MDXRemote {...source} components={components} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getCraftSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug: slug.replace(/\.mdx?$/, "") },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { content, frontmatter } = getCraftBySlug(params.slug);
  const mdxSource = await serialize(content);
  return { props: { source: mdxSource, frontmatter } };
}
