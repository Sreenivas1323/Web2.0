import {
  Box,
  Container,
  VStack,
  HStack,
  Tag,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import {
  CustomHeading,
  CustomText,
} from "../../src/components/CustomComponents";
import { getAllBlogPosts } from "../../src/lib/blog";

const BlogCard = ({ post }) => {
  const bg = useColorModeValue("white", "#111");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Link href={`/blog/${post.slug}`} passHref style={{ textDecoration: 'none' }}>
      <Box
        p={8}
        bg={bg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="24px"
        transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
        _hover={{
          transform: "translateY(-8px)",
          shadow: "2xl",
          borderColor: "brand.50",
        }}
        height="full"
        cursor="pointer"
        role="group"
      >
        <VStack align="start" spacing={5}>
          <HStack spacing={2} wrap="wrap">
            <Tag
              size="sm"
              bgGradient="linear(to-r, brand.50, brand.100)"
              color="white"
              borderRadius="full"
              px={3}
            >
              Latest
            </Tag>
            <Text fontSize="xs" color="ash" fontWeight="bold">
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </Text>
          </HStack>
          
          <VStack align="start" spacing={2}>
            <CustomHeading 
              fontSize={{ base: "xl", md: "2xl" }} 
              _groupHover={{ color: "brand.50" }}
              transition="0.2s"
            >
              {post.frontmatter.title}
            </CustomHeading>
            <CustomText noOfLines={3} fontSize="sm">
              {post.frontmatter.description}
            </CustomText>
          </VStack>

          <Flex align="center" color="brand.100" fontWeight="bold" fontSize="xs">
            READ MORE <Box as="span" ml={2} transition="0.2s" _groupHover={{ ml: 4 }}>→</Box>
          </Flex>
        </VStack>
      </Box>
    </Link>
  );
};

function BlogIndex({ posts }) {
  return (
    <>
      <Head>
        <title>Blog - Veerabhadra Sai Sreenivas Sonthena</title>
        <meta name="description" content="Technical deep dives and reflections on product engineering by Sreenivas Sonthena." />
      </Head>

      <Container maxW="6xl" py={{ base: 10, md: 20 }}>
        <VStack spacing={12} align="stretch">
          <VStack align="start" spacing={4}>
            <Box
              w="40px"
              h="6px"
              bgGradient="linear(to-r, brand.50, brand.100)"
              borderRadius="full"
            />
            <CustomHeading fontSize={{ base: "4xl", md: "6xl" }}>
              Writing & <br /> Reflections
            </CustomHeading>
            <CustomText maxW="2xl" fontSize="lg">
              Notes on building products, engineering leadership, and the 
              ever-evolving landscape of AI.
            </CustomText>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
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
  return {
    props: {
      posts,
    },
  };
}

export default BlogIndex;
