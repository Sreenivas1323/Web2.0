import {
  Box,
  Container,
  VStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import {
  CustomText,
  SectionLabel,
} from "../../src/components/CustomComponents";
import { getAllBlogPosts } from "../../src/lib/blog";

const BlogCard = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`} passHref style={{ textDecoration: "none" }}>
      <Box
        p={7}
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
        <VStack align="start" spacing={4}>
          <Text fontSize="10px" color="ash" fontFamily="MonolisaRegular" letterSpacing="1px">
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).toUpperCase()}
          </Text>

          <VStack align="start" spacing={3}>
            <Text
              fontSize={{ base: "15px", md: "16px" }}
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
              {post.frontmatter.title}
            </Text>
            <CustomText noOfLines={3} lineHeight="1.8">
              {post.frontmatter.description}
            </CustomText>
          </VStack>

          <Text
            fontSize="10px"
            color="dim"
            fontFamily="MonolisaBold"
            letterSpacing="1px"
            _groupHover={{ color: "white" }}
            transition="0.2s"
          >
            READ →
          </Text>
        </VStack>
      </Box>
    </Link>
  );
};

function BlogIndex({ posts }) {
  return (
    <>
      <Head>
        <title>Writing — Sreenivas Sonthena</title>
        <meta name="description" content="Notes on building products, engineering leadership, and the ever-evolving landscape of AI. By Sreenivas Sonthena." />
        <meta name="twitter:creator" content="@sreeeeenivas" />
      </Head>

      <Container maxW="full" px={4} py={{ base: 10, md: 20 }}>
        <VStack spacing={16} align="stretch">
          <VStack align="start" spacing={4}>
            <SectionLabel>WRITING</SectionLabel>
            <Text
              fontFamily="MonolisaBold"
              fontSize={{ base: "26px", md: "32px" }}
              color="white"
              letterSpacing="-0.5px"
              lineHeight="1.2"
            >
              Writing &<br />Reflections
            </Text>
            <CustomText maxW="560px" lineHeight="1.8">
              Notes on building products, engineering leadership, and the
              ever-evolving landscape of AI.
            </CustomText>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllBlogPosts();
  return { props: { posts } };
}

export default BlogIndex;
