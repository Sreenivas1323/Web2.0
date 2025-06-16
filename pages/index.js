import {
  Box,
  Container,
  HStack,
  Stack,
  Divider,
} from "@chakra-ui/react";
import Head from "next/head";

import {
  CustomButton,
  CustomChakraLink,
  CustomHeading,
  CustomTeritoryHeading,
  CustomText,
} from "../src/components/CustomComponents";
import { CustomIkonButton } from "../src/components/Ikons";
import { Work } from "../src/components/Work";
import { Data } from "../src/Data";

export default function Home() {
  return (
    <>
      <Head>
        <title>Veerabhadra Sai Sreenivas Sonthena - Tech Lead & Product Designer</title>
        <meta name="description" content="Tech Lead at Intripid building the future of travel platform. Focusing on frontend development, user interfaces, interactions, and AI flows. Mechatronics engineer turned software product enthusiast." />
        <meta name="keywords" content="Tech Lead, Product Designer, UI/UX Designer, Full Stack Developer, Mechatronics Engineer, Travel Technology, Intripid, React, Next.js, Portfolio" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ssaisreenivas.in/" />
        <meta property="og:title" content="Veerabhadra Sai Sreenivas Sonthena - Tech Lead & Product Designer" />
        <meta property="og:description" content="Tech Lead at Intripid building the future of travel platform. Focusing on frontend development, user interfaces, interactions, and AI flows." />
        <meta property="og:image" content="https://ssaisreenivas.in/images/profile-og.png" />
        <meta property="og:site_name" content="Sonthena Portfolio" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ssaisreenivas.in/" />
        <meta property="twitter:title" content="Veerabhadra Sai Sreenivas Sonthena - Tech Lead & Product Designer" />
        <meta property="twitter:description" content="Tech Lead at Intripid building the future of travel platform. Focusing on frontend development, user interfaces, interactions, and AI flows." />
        <meta property="twitter:image" content="https://ssaisreenivas.in/images/profile-og.png" />
        <meta property="twitter:creator" content="@sreeeeenivas" />
        <meta property="twitter:site" content="@sreeeeenivas" />
        
        {/* Additional Meta Tags */}
        <meta name="author" content="Veerabhadra Sai Sreenivas Sonthena" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#FC466B" />
        <meta name="msapplication-TileColor" content="#FC466B" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://ssaisreenivas.in/" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Veerabhadra Sai Sreenivas Sonthena",
              "jobTitle": "Tech Lead",
              "worksFor": {
                "@type": "Organization",
                "name": "Intripid"
              },
              "url": "https://ssaisreenivas.in",
              "sameAs": [
                "https://x.com/sreeeeenivas",
                "https://www.linkedin.com/in/ssaisreenivas/",
                "https://github.com/Sreenivas1323",
                "https://dribbble.com/sonthena",
                "https://be.net/ssaisreenivas"
              ],
              "knowsAbout": [
                "Tech Leadership",
                "Frontend Development",
                "User Interface Design",
                "User Interactions",
                "AI Flows",
                "Travel Technology",
                "React",
                "Next.js",
                "Product Design"
              ],
              "description": "Tech Lead at Intripid building an end-to-end future of travel platform. Focusing on frontend development, user interfaces, interactions, and AI flows to make travel easier and more intuitive."
            })
          }}
        />
      </Head>
      <div>
      <Container
        maxW="full"
        padding="4"
        marginTop={{ base: "5", md: "10", lg: "20" }}
      >
        <Box>
          <CustomHeading>
            Mechatronics engineer Turned into Software Product enthusiast,
            creating thoughtful, intuitive interfaces.
          </CustomHeading>
        </Box>
        <Box>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "4", md: "10" }}
          >
            <HStack
              spacing={{ base: "5", md: "10" }}
              py={{ base: "5", md: "10" }}
              alignItems={"normal"}
            >
              <CustomIkonButton variant={"twitter"} />
              <CustomIkonButton variant={"dribbble"} />
              <CustomIkonButton variant={"linkedin"} />
              <CustomIkonButton variant={"behance"} />
              <CustomIkonButton variant={"github"} />
            </HStack>
            <HStack>
              <CustomButton
                variant={"themed"}
                href={"mailto:ssaisreenivas@gmail.com"}
              >
                Email Me -{">"}
              </CustomButton>
            </HStack>
          </Stack>
        </Box>
      </Container>
      <Container maxW="full" paddingBottom={"10"}>
        <CustomText color={"ash"}>
          I&apos;m Veerabhadra Sai Sreenivas Sonthena, a product designer from India.
          I specialise in interface design for mobile and web-based applications
          with a focus on simplicity & usability.
        </CustomText>
      </Container>
      <Container maxW="full">
        <CustomText color={"ash"}>
          I&apos;m currently working as Tech Lead at{" "}
          <CustomChakraLink href="https://intripid.com/" isExternal>
            Intripid
          </CustomChakraLink>{" "}
          since October 2024, focusing on frontend development, user interfaces, interactions, and AI flows.
          Previously, I&apos;ve worked across various roles including product design,
          UI/UX, and full-stack development at companies like LeafCraft Studios and Datametrix.
        </CustomText>
      </Container>

      <Divider borderTop={"2px dashed"} my={"10"} />

      <Container maxW="full">
        <CustomTeritoryHeading>Recent Work</CustomTeritoryHeading>
        <CustomText>Here are some of my most recent projects.</CustomText>
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
      </div>
    </>
  );
}