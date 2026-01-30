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
  h1: (props) => <CustomHeading as="h1" fontSize={{ base: "3xl", md: "4xl" }} mt={12} mb={6} color="white" {...props} />,
  h2: (props) => <CustomHeading as="h2" fontSize={{ base: "2xl", md: "3xl" }} mt={12} mb={4} color="white" {...props} />,
  h3: (props) => <CustomHeading as="h3" fontSize={{ base: "xl", md: "2xl" }} mt={10} mb={4} color="white" {...props} />,
  p: (props) => <Text my={6} fontSize="lg" lineHeight="1.8" color="ash" fontFamily="MonolisaRegular" {...props} />,
  ul: (props) => <Box as="ul" ml={6} my={6} color="ash" {...props} />,
  li: (props) => <Box as="li" my={3} fontSize="lg" lineHeight="1.6" fontFamily="MonolisaRegular" {...props} />,
  code: (props) => (
    <Box
      as="code"
      bg="whiteAlpha.100"
      px={2}
      py={1}
      borderRadius="md"
      fontSize="0.9em"
      color="brand.50"
      fontFamily="MonolisaRegular"
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
        <VStack align="start" spacing={12}>
          <VStack align="start" spacing={4}>
            <Text 
              fontWeight="bold" 
              fontSize="xs" 
              letterSpacing="3px" 
              bgGradient="linear(to-r, brand.50, brand.100)"
              bgClip="text"
              textTransform="uppercase"
              fontFamily="MonolisaBold"
            >
              Published {dateStr}
            </Text>
            <CustomHeading fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1.1" letterSpacing="-1px">
              {frontmatter.title}
            </CustomHeading>
          </VStack>

          <Divider borderColor="whiteAlpha.100" />

          <Box w="full" className="article-content">
            <MDXRemote {...source} components={components} />
          </Box>

          <Box pt={20} w="full">
            <Divider borderColor="whiteAlpha.100" mb={10} />
            <VStack align="start" spacing={6}>
              <Text fontWeight="bold" color="ash" fontSize="xs" letterSpacing="2px" textTransform="uppercase">Written by</Text>
              <VStack align="start" spacing={1}>
                <CustomHeading fontSize="3xl">Sreenivas Sonthena</CustomHeading>
                <CustomText fontSize="md">
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
