import { Box, Container, HStack, Stack, Divider, SimpleGrid, VStack, Text, Tag, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  CustomButton,
  CustomHeading,
  CustomTeritoryHeading,
  CustomText,
  GradientText,
  SectionLabel,
} from "../src/components/CustomComponents";
import { CustomIkonButton } from "../src/components/Ikons";
import { Work } from "../src/components/Work";
import { Data } from "../src/Data";
import { getAllBlogPosts } from "../src/lib/blog";

const MotionBox = motion(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
          content="Tech Lead, Product Designer, UI/UX Designer, Frontend Developer, Mechatronics Engineer, AI, Intripid, React, Next.js"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ssaisreenivas.in/" />
        <meta
          property="og:title"
          content="Sreenivas Sonthena — Engineer, Designer, Builder"
        />
        <meta
          property="og:description"
          content="Mechatronics engineer turned Tech Lead. I build AI-powered products, design intuitive interfaces, and lead frontend teams."
        />
        <meta
          property="og:image"
          content="https://ssaisreenivas.in/images/profile-og.png"
        />
        <meta property="og:site_name" content="Sreenivas Sonthena" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ssaisreenivas.in/" />
        <meta
          property="twitter:title"
          content="Sreenivas Sonthena — Engineer, Designer, Builder"
        />
        <meta
          property="twitter:description"
          content="Mechatronics engineer turned Tech Lead. I build AI-powered products, design intuitive interfaces, and lead frontend teams."
        />
        <meta
          property="twitter:image"
          content="https://ssaisreenivas.in/images/profile-og.png"
        />
        <meta name="twitter:creator" content="@sreeeeenivas" />
        <meta name="twitter:site" content="@sreeeeenivas" />

        {/* Additional Meta Tags */}
        <meta name="author" content="Sreenivas Sonthena" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FC466B" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://ssaisreenivas.in/" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sreenivas Sonthena",
              jobTitle: "Tech Lead",
              worksFor: {
                "@type": "Organization",
                name: "Intripid",
              },
              url: "https://ssaisreenivas.in",
              sameAs: [
                "https://x.com/sreeeeenivas",
                "https://instagram.com/sreeeeenivas",
                "https://www.linkedin.com/in/ssaisreenivas/",
                "https://github.com/Sreenivas1323",
                "https://dribbble.com/sonthena",
                "https://be.net/ssaisreenivas",
              ],
              knowsAbout: [
                "Tech Leadership",
                "Frontend Development",
                "User Interface Design",
                "AI Integration",
                "Product Design",
                "Mechatronics Engineering",
              ],
              description:
                "Mechatronics engineer turned Tech Lead. Building AI-powered products, designing intuitive interfaces, and leading frontend teams at Intripid.",
            }),
          }}
        />
      </Head>

      <div>
        {/* Hero Section */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Container
            maxW="full"
            padding="4"
            marginTop={{ base: "5", md: "10", lg: "20" }}
          >
            <SectionLabel mb={4}>SREENIVAS SONTHENA</SectionLabel>
            <Box>
              <CustomHeading fontSize={{ base: "32px", md: "42px", lg: "52px" }} lineHeight="1.2">
                I turn complex problems into{" "}
                <GradientText>simple interfaces</GradientText> — from mechanical
                systems to AI-powered products.
              </CustomHeading>
            </Box>
            <Box>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={{ base: "4", md: "10" }}
                align={{ md: "center" }}
              >
                <HStack
                  spacing={{ base: "5", md: "10" }}
                  py={{ base: "5", md: "10" }}
                  alignItems={"normal"}
                >
                  <CustomIkonButton variant={"twitter"} />
                  <CustomIkonButton variant={"instagram"} />
                  <CustomIkonButton variant={"dribbble"} />
                  <CustomIkonButton variant={"linkedin"} />
                  <CustomIkonButton variant={"behance"} />
                  <CustomIkonButton variant={"github"} />
                </HStack>
                <HStack spacing={3}>
                  <CustomButton
                    variant={"themed"}
                    href={"mailto:ssaisreenivas@gmail.com"}
                  >
                    Get in touch →
                  </CustomButton>
                  <CustomButton
                    variant={"outline-gradient"}
                    href={"/blog"}
                  >
                    Read my writing
                  </CustomButton>
                </HStack>
              </Stack>
            </Box>
          </Container>
        </MotionBox>

        {/* Stats + Now Section */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={{
            ...fadeInUp,
            visible: { ...fadeInUp.visible, transition: { ...fadeInUp.visible.transition, delay: 0.15 } },
          }}
        >
          <Container maxW="full" py={8}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {/* Stats */}
              <VStack spacing={6} align="stretch">
                <HStack spacing={6} flexWrap="wrap">
                  {[
                    { number: "4+", label: "Years building products" },
                    { number: "3", label: "Companies shipped at" },
                    { number: "25", label: "Person team led" },
                  ].map((stat) => (
                    <Box key={stat.label} flex="1" minW="120px">
                      <Text
                        fontSize={{ base: "3xl", md: "4xl" }}
                        fontWeight="bold"
                        fontFamily="MonolisaBold"
                        bgGradient="linear(to-r, brand.50, brand.100)"
                        bgClip="text"
                      >
                        {stat.number}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="ash"
                        fontFamily="MonolisaBold"
                        mt={1}
                      >
                        {stat.label}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </VStack>

              {/* What I'm doing now */}
              <Box
                border="1px solid"
                borderColor="whiteAlpha.200"
                borderRadius="16px"
                p={6}
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  h="3px"
                  bgGradient="linear(to-r, brand.50, brand.100)"
                />
                <HStack mb={3}>
                  <Box w={2} h={2} borderRadius="full" bg="green.400" />
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="2px"
                    color="white"
                    fontFamily="MonolisaBold"
                  >
                    What I&apos;m doing now
                  </Text>
                </HStack>
                <CustomText fontSize="sm" lineHeight="1.7">
                  Leading frontend at Intripid — building AI-powered travel
                  experiences. Exploring LLM integration patterns, shipping
                  design systems, and writing about the craft of building
                  products.
                </CustomText>
              </Box>
            </SimpleGrid>
          </Container>
        </MotionBox>

        <Divider borderTop={"2px dashed"} borderColor="whiteAlpha.200" my={"10"} />

        {/* Selected Work Section */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={{
            ...fadeInUp,
            visible: { ...fadeInUp.visible, transition: { ...fadeInUp.visible.transition, delay: 0.3 } },
          }}
        >
          <Container maxW="full">
            <SectionLabel mb={3}>SELECTED WORK</SectionLabel>
            <CustomTeritoryHeading mb={2}>Projects I&apos;ve shipped</CustomTeritoryHeading>
          </Container>
          <Container maxW="full">
            {Data.map(({ Name, web, link, desc, images, tags }, index) => (
              <Work
                Name={Name}
                web={web}
                link={link}
                desc={desc}
                images={images}
                tags={tags}
                key={index}
              />
            ))}
          </Container>
        </MotionBox>

        <Divider borderTop={"2px dashed"} borderColor="whiteAlpha.200" my={"10"} />

        {/* Latest Writing Section */}
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={{
            ...fadeInUp,
            visible: { ...fadeInUp.visible, transition: { ...fadeInUp.visible.transition, delay: 0.3 } },
          }}
        >
          <Container maxW="full" pb={10}>
            <SectionLabel mb={3}>LATEST WRITING</SectionLabel>
            <HStack justify="space-between" align="center" mb={6}>
              <CustomTeritoryHeading>Recent thoughts & articles</CustomTeritoryHeading>
              <Link href="/blog">
                <Text
                  fontSize="sm"
                  color="ash"
                  fontFamily="MonolisaBold"
                  _hover={{ color: "white" }}
                  transition="0.2s"
                >
                  View all →
                </Text>
              </Link>
            </HStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {posts.slice(0, 4).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} passHref style={{ textDecoration: "none" }}>
                  <Box
                    p={6}
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    borderRadius="16px"
                    bg="whiteAlpha.50"
                    transition="all 0.3s cubic-bezier(.08,.52,.52,1)"
                    _hover={{
                      transform: "translateY(-4px)",
                      borderColor: "brand.50",
                      shadow: "lg",
                    }}
                    cursor="pointer"
                    role="group"
                    height="full"
                  >
                    <VStack align="start" spacing={3}>
                      <HStack spacing={3}>
                        <Tag
                          size="sm"
                          bgGradient="linear(to-r, brand.50, brand.100)"
                          color="white"
                          borderRadius="full"
                          px={3}
                          fontSize="9px"
                          fontWeight="bold"
                        >
                          ARTICLE
                        </Tag>
                        <Text fontSize="9px" color="ash" fontWeight="bold" letterSpacing="1px" fontFamily="MonolisaBold">
                          {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }).toUpperCase()}
                        </Text>
                      </HStack>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        fontFamily="MonolisaBold"
                        color="white"
                        lineHeight="1.4"
                        _groupHover={{ color: "brand.50" }}
                        transition="0.2s"
                      >
                        {post.frontmatter.title}
                      </Text>
                      <CustomText fontSize="sm" noOfLines={2} lineHeight="1.6">
                        {post.frontmatter.description}
                      </CustomText>
                      <Flex align="center" color="brand.100" fontWeight="bold" fontSize="10px" letterSpacing="1px" fontFamily="MonolisaBold">
                        READ STORY <Box as="span" ml={2} transition="0.2s" _groupHover={{ ml: 4 }}>→</Box>
                      </Flex>
                    </VStack>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          </Container>
        </MotionBox>
      </div>
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
