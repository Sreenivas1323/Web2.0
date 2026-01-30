import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import { getBlogSlugs, getBlogPostBySlug } from "../../src/lib/blog";
import { CustomHeading, CustomText } from "../../src/components/CustomComponents";

const components = {
  h1: (props) => <CustomHeading as="h1" size="2xl" my={4} {...props} />,
  h2: (props) => <CustomHeading as="h2" size="xl" my={4} {...props} />,
  h3: (props) => <CustomHeading as="h3" size="lg" my={4} {...props} />,
  p: (props) => <CustomText my={4} {...props} />,
  ul: (props) => <Box as="ul" ml={4} my={4} {...props} />,
  li: (props) => <Box as="li" my={2} {...props} />,
};

export default function Post({ source, frontmatter }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title} - Sreenivas</title>
        <meta name="description" content={frontmatter.description} />
      </Head>
      <Container maxW="3xl" py={20}>
        <VStack align="start" spacing={4} mb={10}>
          <Heading size="2xl">{frontmatter.title}</Heading>
          <Text color="gray.500">{frontmatter.date}</Text>
        </VStack>
        <Box className="markdown-body">
          <MDXRemote {...source} components={components} />
        </Box>
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
