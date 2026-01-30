import {
  Box,
  Container,
  VStack,
  Text,
  Flex,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import { getBlogSlugs, getBlogPostBySlug } from "../../src/lib/blog";
import { CustomHeading, CustomText } from "../../src/components/CustomComponents";

const components = {
  h1: (props) => <CustomHeading as="h1" size="2xl" my={6} {...props} />,
  h2: (props) => <CustomHeading as="h2" size="xl" mt={10} mb={4} {...props} />,
  h3: (props) => <CustomHeading as="h3" size="lg" mt={8} mb={4} {...props} />,
  p: (props) => <CustomText my={6} fontSize="lg" lineHeight="1.8" color="whiteAlpha.800" {...props} />,
  ul: (props) => <Box as="ul" ml={6} my={6} {...props} />,
  li: (props) => <Box as="li" my={3} fontSize="lg" color="whiteAlpha.800" {...props} />,
  code: (props) => (
    <Box
      as="code"
      bg="whiteAlpha.100"
      px={2}
      py={1}
      borderRadius="md"
      fontSize="0.9em"
      color="brand.50"
      {...props}
    />
  ),
};

export default function Post({ source, frontmatter }) {
  const dateStr = new Date(frontmatter.date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <>
      <Head>
        <title>{frontmatter.title} - Sreenivas</title>
        <meta name="description" content={frontmatter.description} />
      </Head>

      <Container maxW="3xl" pt={{ base: 20, md: 32 }} pb={20}>
        <VStack align="start" spacing={8}>
          <VStack align="start" spacing={3}>
            <Text 
              fontWeight="bold" 
              fontSize="sm" 
              letterSpacing="widest" 
              bgGradient="linear(to-r, brand.50, brand.100)"
              bgClip="text"
              textTransform="uppercase"
            >
              Published {dateStr}
            </Text>
            <CustomHeading fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1.1">
              {frontmatter.title}
            </CustomHeading>
          </VStack>

          <Divider borderColor="whiteAlpha.100" />

          <Box w="full" className="article-content">
            <MDXRemote {...source} components={components} />
          </Box>

          <Box pt={20} w="full">
            <Divider borderColor="whiteAlpha.100" mb={10} />
            <VStack align="start" spacing={4}>
              <Text fontWeight="bold" color="ash">Written by</Text>
              <CustomHeading size="md">Sreenivas Sonthena</CustomHeading>
              <CustomText fontSize="sm">
                Tech Lead at Intripid building the future of travel platforms.
              </CustomText>
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

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { content, frontmatter } = getBlogPostBySlug(params.slug);
  const mdxSource = await serialize(content);

  return {
    props: {
      source: mdxSource,
      frontmatter,
    },
  };
}
