import {
  Box,
  Container,
  VStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import { getBlogSlugs, getBlogPostBySlug } from "../../src/lib/blog";
import { CustomText } from "../../src/components/CustomComponents";

const components = {
  h1: (props) => (
    <Text
      as="h1"
      fontFamily="MonolisaBold"
      fontSize={{ base: "22px", md: "26px" }}
      color="white"
      mt={14}
      mb={5}
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
      mt={12}
      mb={4}
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
      mt={10}
      mb={3}
      lineHeight="1.4"
      {...props}
    />
  ),
  p: (props) => (
    <Text
      my={5}
      fontSize={{ base: "13px", md: "14px" }}
      lineHeight="2"
      color="#B0B0B0"
      fontFamily="MonolisaRegular"
      {...props}
    />
  ),
  ul: (props) => <Box as="ul" ml={5} my={5} color="#B0B0B0" {...props} />,
  li: (props) => (
    <Box
      as="li"
      my={3}
      fontSize={{ base: "13px", md: "14px" }}
      lineHeight="1.9"
      fontFamily="MonolisaRegular"
      {...props}
    />
  ),
  strong: (props) => <Text as="strong" color="white" fontFamily="MonolisaBold" {...props} />,
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

export default function Post({ source, frontmatter }) {
  const dateStr = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Head>
        <title>{frontmatter.title} — Sreenivas Sonthena</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="twitter:creator" content="@sreeeeenivas" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Container maxW="680px" pt={{ base: 14, md: 24 }} pb={20} px={4}>
        <VStack align="start" spacing={10}>
          {/* Header */}
          <VStack align="start" spacing={4}>
            <Text
              fontSize="10px"
              letterSpacing="2.5px"
              textTransform="uppercase"
              fontFamily="MonolisaRegular"
              color="ash"
            >
              {dateStr}
            </Text>
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
          </VStack>

          <Box w="full" h="1px" bg="whiteAlpha.100" />

          {/* Article */}
          <Box w="full">
            <MDXRemote {...source} components={components} />
          </Box>

          {/* Author */}
          <Box pt={16} w="full">
            <Box h="1px" bg="whiteAlpha.100" mb={10} />
            <VStack align="start" spacing={4}>
              <Text fontSize="10px" color="ash" letterSpacing="2px" textTransform="uppercase" fontFamily="MonolisaRegular">
                Written by
              </Text>
              <VStack align="start" spacing={1}>
                <Text fontFamily="MonolisaBold" fontSize="18px" color="white">
                  Sreenivas Sonthena
                </Text>
                <CustomText>
                  Tech Lead at Intripid building the future of travel platforms.
                </CustomText>
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getBlogSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug: slug.replace(/\.mdx?$/, "") },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { content, frontmatter } = getBlogPostBySlug(params.slug);
  const mdxSource = await serialize(content);
  return { props: { source: mdxSource, frontmatter } };
}
