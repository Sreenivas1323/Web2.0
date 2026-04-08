import { Box, Container, HStack, Stack, SimpleGrid, VStack, Text, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  CustomButton,
  CustomTeritoryHeading,
  CustomText,
  AccentText,
  SectionLabel,
} from "../src/components/CustomComponents";
import { CustomIkonButton } from "../src/components/Ikons";
import { Work } from "../src/components/Work";
import { Data } from "../src/Data";
import { getAllBlogPosts } from "../src/lib/blog";

const MotionBox = motion(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Sreenivas Sonthena — Engineer, Designer, Builder</title>
        <meta
          name="description"
          content="Mechatronics engineer turned Tech Lead. I build AI-powered products, design intuitive interfaces, and lead frontend teams. Currently at Intripid."
        />
        <meta
          name="keywords"
          content="Tech Lead, Product Designer, Frontend Developer, Mechatronics Engineer, AI, Intripid, React, Next.js"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ssaisreenivas.in/" />
        <meta property="og:title" content="Sreenivas Sonthena — Engineer, Designer, Builder" />
        <meta property="og:description" content="Mechatronics engineer turned Tech Lead. Building AI-powered products and intuitive interfaces." />
        <meta property="og:image" content="https://ssaisreenivas.in/images/profile-og.png" />
        <meta property="og:site_name" content="Sreenivas Sonthena" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ssaisreenivas.in/" />
        <meta name="twitter:title" content="Sreenivas Sonthena — Engineer, Designer, Builder" />
        <meta name="twitter:description" content="Mechatronics engineer turned Tech Lead. Building AI-powered products and intuitive interfaces." />
        <meta name="twitter:image" content="https://ssaisreenivas.in/images/profile-og.png" />
        <meta name="twitter:creator" content="@sreeeeenivas" />
        <meta name="twitter:site" content="@sreeeeenivas" />

        <meta name="author" content="Sreenivas Sonthena" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0B0B0B" />

        <link rel="canonical" href="https://ssaisreenivas.in/" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sreenivas Sonthena",
              jobTitle: "Tech Lead",
              worksFor: { "@type": "Organization", name: "Intripid" },
              url: "https://ssaisreenivas.in",
              sameAs: [
                "https://x.com/sreeeeenivas",
                "https://instagram.com/sreeeeenivas",
                "https://www.linkedin.com/in/ssaisreenivas/",
                "https://github.com/Sreenivas1323",
                "https://dribbble.com/sonthena",
                "https://be.net/ssaisreenivas",
              ],
            }),
          }}
        />
      </Head>

      <div>
        {/* Hero */}
        <MotionBox initial="hidden" animate="visible" variants={fadeInUp}>
          <Container maxW="full" px={4} pt={{ base: 8, md: 14, lg: 16 }}>
            <SectionLabel mb={5}>SREENIVAS SONTHENA</SectionLabel>
            <Text
              fontFamily="MonolisaBold"
              fontSize={{ base: "22px", md: "28px", lg: "32px" }}
              lineHeight="1.35"
              color="white"
              letterSpacing="-0.6px"
              maxW="780px"
            >
              I build software products{" "}
              <AccentText textDecoration="underline" textDecorationColor="whiteAlpha.400" textUnderlineOffset="5px">
                end-to-end
              </AccentText>
              . Currently building Tia at Intripid, writing about AI, and
              shipping experiments on the side.
            </Text>
          </Container>
        </MotionBox>

        {/* Contact stack — vertical, left-aligned */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { delay: 0.1, duration: 0.5, ease: "easeOut" } } }}
        >
          <Container maxW="full" px={4} pt={{ base: 6, md: 8 }}>
            <VStack align="start" spacing={4}>
              <HStack spacing={3}>
                <CustomButton variant="themed" href="mailto:ssaisreenivas@gmail.com">
                  Get in touch →
                </CustomButton>
                <CustomButton variant="outline-gradient" href="/blog">
                  Read my writing
                </CustomButton>
              </HStack>
              <HStack spacing={5}>
                <CustomIkonButton variant="twitter" />
                <CustomIkonButton variant="instagram" />
                <CustomIkonButton variant="dribbble" />
                <CustomIkonButton variant="linkedin" />
                <CustomIkonButton variant="behance" />
                <CustomIkonButton variant="github" />
              </HStack>
            </VStack>
          </Container>
        </MotionBox>

        {/* Stats + Now */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { delay: 0.2, duration: 0.5, ease: "easeOut" } } }}
        >
          <Container maxW="full" px={4} py={10}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <HStack spacing={{ base: 6, md: 10 }} flexWrap="wrap">
                {[
                  { number: "4+", label: "Years building products" },
                  { number: "3", label: "Companies shipped at" },
                  { number: "25", label: "Person team led" },
                ].map((stat) => (
                  <Box key={stat.label} flex="1" minW="100px">
                    <Text
                      fontSize={{ base: "28px", md: "32px" }}
                      fontFamily="MonolisaBold"
                      color="white"
                      lineHeight="1"
                    >
                      {stat.number}
                    </Text>
                    <Text fontSize="10px" color="ash" fontFamily="MonolisaRegular" mt={2} letterSpacing="0.5px">
                      {stat.label}
                    </Text>
                  </Box>
                ))}
              </HStack>

              <Box
                border="1px solid"
                borderColor="whiteAlpha.100"
                borderRadius="12px"
                p={6}
                position="relative"
                overflow="hidden"
              >
                <Box position="absolute" top={0} left={0} right={0} h="1px" bg="white" />
                <HStack mb={3}>
                  <Box w="6px" h="6px" borderRadius="full" bg="white" />
                  <Text fontSize="10px" fontFamily="MonolisaBold" textTransform="uppercase" letterSpacing="2px" color="dim">
                    What I&apos;m doing now
                  </Text>
                </HStack>
                <CustomText lineHeight="1.8">
                  Leading frontend at Intripid — building AI-powered travel
                  experiences. Exploring LLM integration patterns, shipping
                  design systems, and writing about the craft of building
                  products.
                </CustomText>
              </Box>
            </SimpleGrid>
          </Container>
        </MotionBox>

        {/* Divider */}
        <Container maxW="full" px={4}>
          <Box borderTop="1px dashed" borderColor="whiteAlpha.200" />
        </Container>

        {/* Selected Work */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { delay: 0.3, duration: 0.5, ease: "easeOut" } } }}
        >
          <Container maxW="full" px={4} pt={10}>
            <SectionLabel mb={3}>SELECTED WORK</SectionLabel>
            <CustomTeritoryHeading mb={2}>Projects I&apos;ve shipped</CustomTeritoryHeading>
          </Container>
          <Container maxW="full" px={4}>
            {Data.map(({ Name, web, link, desc, images, tags }, index) => (
              <Work Name={Name} web={web} link={link} desc={desc} images={images} tags={tags} key={index} />
            ))}
          </Container>
        </MotionBox>

        {/* Divider */}
        <Container maxW="full" px={4}>
          <Box borderTop="1px dashed" borderColor="whiteAlpha.200" />
        </Container>

        {/* Latest Writing */}
        <Container maxW="full" px={4} py={10}>
          <SectionLabel mb={3}>LATEST WRITING</SectionLabel>
          <Flex justify="space-between" align="center" mb={8}>
            <CustomTeritoryHeading>Recent thoughts</CustomTeritoryHeading>
            <Link href="/blog">
              <Text fontSize="11px" color="ash" fontFamily="MonolisaRegular" _hover={{ color: "white" }} transition="0.2s">
                View all →
              </Text>
            </Link>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {posts.slice(0, 4).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} passHref style={{ textDecoration: "none" }}>
                <Box
                  p={6}
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  borderRadius="12px"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-3px)",
                    borderColor: "whiteAlpha.300",
                  }}
                  cursor="pointer"
                  role="group"
                  height="full"
                >
                  <VStack align="start" spacing={3}>
                    <Text fontSize="10px" color="ash" fontFamily="MonolisaRegular" letterSpacing="1px">
                      {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }).toUpperCase()}
                    </Text>
                    <Text
                      fontSize={{ base: "14px", md: "15px" }}
                      fontFamily="MonolisaBold"
                      color="white"
                      lineHeight="1.4"
                      _groupHover={{ textDecoration: "underline", textDecorationColor: "whiteAlpha.400", textUnderlineOffset: "3px" }}
                      transition="0.2s"
                    >
                      {post.frontmatter.title}
                    </Text>
                    <CustomText noOfLines={2} lineHeight="1.7">
                      {post.frontmatter.description}
                    </CustomText>
                    <Text fontSize="10px" color="dim" fontFamily="MonolisaBold" letterSpacing="1px" _groupHover={{ color: "white" }} transition="0.2s">
                      READ →
                    </Text>
                  </VStack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllBlogPosts();
  return { props: { posts } };
}
