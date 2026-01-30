import { Box, Container, Link, SimpleGrid, VStack } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import {
  CustomHeading,
  CustomText,
} from "../../src/components/CustomComponents";
import { getAllBlogPosts } from "../../src/lib/blog";

function BlogIndex({ posts }) {
  return (
    <>
      <Head>
        <title>Blog - Veerabhadra Sai Sreenivas Sonthena</title>
        <meta name="description" content="Read thoughts and tutorials on design, development, deployment, and work-life by Veerabhadra Sai Sreenivas Sonthena." />
      </Head>
      <Container
        maxW="full"
        padding="4"
        marginTop={{ base: "5", md: "10", lg: "20" }}
      >
        <Box>
          <CustomHeading>Blog</CustomHeading>
        </Box>
      </Container>
      <Container maxW="full" paddingBottom={"10"}>
        <CustomText color={"ash"}>
          I&apos;ve just started to write online, sharing my thoughts and tutorials on
          design, development, deployment, work-life, and personal life.
        </CustomText>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={10}>
          {posts.map((post) => (
            <Box 
              key={post.slug} 
              p={5} 
              shadow="md" 
              borderWidth="1px" 
              borderRadius="md"
              _hover={{ shadow: "xl", transform: "translateY(-2px)" }}
              transition="all 0.2s"
            >
              <VStack align="start" spacing={3}>
                <CustomHeading size="md" textAlign="left">
                  <Link as={NextLink} href={`/blog/${post.slug}`} _hover={{ textDecoration: "none" }}>
                    {post.frontmatter.title}
                  </Link>
                </CustomHeading>
                <CustomText fontSize="sm" color="gray.500">
                  {post.frontmatter.date}
                </CustomText>
                <CustomText noOfLines={3}>
                  {post.frontmatter.description}
                </CustomText>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllBlogPosts();
  return {
    props: {
      posts,
    },
  };
}

export default BlogIndex;
