import {
  Box,
  Container,
  VStack,
  HStack,
  SimpleGrid,
  Text,
  Flex,
  Tag,
} from "@chakra-ui/react";
import Head from "next/head";
import { motion } from "framer-motion";

import {
  CustomButton,
  CustomHeading,
  CustomTeritoryHeading,
  CustomText,
  AccentText,
  SectionLabel,
} from "../src/components/CustomComponents";
import { CustomIkonButton } from "../src/components/Ikons";

const MotionBox = motion(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const beliefs = [
  {
    title: "Simplicity is the hardest problem",
    desc: "Anyone can make something complicated. The real craft is removing everything that doesn't serve the user.",
  },
  {
    title: "Engineers make the best designers",
    desc: "Understanding constraints doesn't limit creativity — it focuses it. I design what I can build, and build what I design.",
  },
  {
    title: "AI changes everything (and nothing)",
    desc: "The tools are new. The principles aren't. Users still want things that work, feel good, and respect their time.",
  },
  {
    title: "Build in public, learn faster",
    desc: "Sharing the process — the wins and the failures — accelerates learning and creates genuine connections.",
  },
];

const timeline = [
  {
    year: "2024",
    role: "Tech Lead",
    company: "Intripid",
    desc: "Leading frontend development for an AI-powered travel platform.",
    isCurrent: true,
  },
  {
    year: "2023",
    role: "Frontend Dev & Product Designer",
    company: "LeafCraft Studios",
    desc: "Designed and shipped financial wellness products from zero to launch.",
    isCurrent: false,
  },
  {
    year: "2022",
    role: "UI/UX & Brand Designer",
    company: "Datametrix",
    desc: "Built brand identity, marketing site, and data visualization platform.",
    isCurrent: false,
  },
  {
    year: "2021",
    role: "Team Lead — ATV Project",
    company: "FMAE-BAJA Competition",
    desc: "Led a 25-person team to design and fabricate an all-terrain vehicle.",
    isCurrent: false,
  },
];

const tools = [
  "React", "Next.js", "TypeScript", "Chakra UI", "Figma",
  "Framer Motion", "Node.js", "Python", "AI/LLM Integration",
  "Product Design", "Brand Design", "Design Systems",
  "Responsive Design", "SEO",
];

const About = () => {
  return (
    <>
      <Head>
        <title>About — Sreenivas Sonthena</title>
        <meta name="description" content="Mechatronics engineer turned Tech Lead. From building all-terrain vehicles to shipping AI-powered products — here's my story." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ssaisreenivas.in/about" />
        <meta property="og:title" content="About — Sreenivas Sonthena" />
        <meta property="og:description" content="Mechatronics engineer turned Tech Lead. From all-terrain vehicles to AI-powered products." />
        <meta property="og:url" content="https://ssaisreenivas.in/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About — Sreenivas Sonthena" />
        <meta name="twitter:description" content="Mechatronics engineer turned Tech Lead. From all-terrain vehicles to AI-powered products." />
        <meta name="twitter:creator" content="@sreeeeenivas" />
      </Head>

      <Container maxW="full" px={4} py={{ base: 8, md: 16 }}>
        <VStack spacing={{ base: 16, md: 24 }} align="stretch">

          {/* The Hook */}
          <MotionBox initial="hidden" animate="visible" variants={fadeInUp}>
            <SectionLabel mb={5}>ABOUT</SectionLabel>
            <Text
              fontFamily="MonolisaBold"
              fontSize={{ base: "28px", md: "36px", lg: "44px" }}
              lineHeight="1.25"
              color="white"
              letterSpacing="-0.5px"
              maxW="800px"
            >
              I started with{" "}
              <AccentText textDecoration="underline" textDecorationColor="whiteAlpha.400" textUnderlineOffset="5px">
                gears and motors
              </AccentText>
              . Now I build with{" "}
              <AccentText textDecoration="underline" textDecorationColor="whiteAlpha.400" textUnderlineOffset="5px">
                pixels and code
              </AccentText>
              .
            </Text>
          </MotionBox>

          {/* The Story */}
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { delay: 0.1, duration: 0.5, ease: "easeOut" } } }}
          >
            <VStack spacing={6} align="stretch" maxW="680px">
              <CustomText fontSize={{ base: "14px", md: "15px" }} lineHeight="1.9">
                I&apos;m Sreenivas — a mechatronics engineer from India who fell
                in love with interfaces. My engineering degree taught me systems
                thinking: how mechanical, electrical, and software components
                work together. Turns out, that&apos;s exactly how great products
                are built too.
              </CustomText>
              <CustomText fontSize={{ base: "14px", md: "15px" }} lineHeight="1.9">
                I led a team of 25 to build an all-terrain vehicle from scratch
                for the FMAE-BAJA competition. That experience — designing
                physical systems under real constraints, coordinating across
                disciplines, shipping something that actually works — shaped
                everything I do in software today. The vehicle had to survive
                rough terrain. Good software has to survive real users. Same
                energy.
              </CustomText>
              <CustomText fontSize={{ base: "14px", md: "15px" }} lineHeight="1.9">
                From there, I moved into product design and development.
                I&apos;ve designed brand identities, built data visualization
                platforms, shipped financial wellness apps, and now I&apos;m
                leading frontend at Intripid — where we&apos;re building the
                future of AI-powered travel. My work sits at the intersection of
                design and engineering, and I like it there.
              </CustomText>
            </VStack>
          </MotionBox>

          {/* What I Believe */}
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { delay: 0.2, duration: 0.5, ease: "easeOut" } } }}
          >
            <SectionLabel mb={5}>WHAT I BELIEVE</SectionLabel>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {beliefs.map((belief) => (
                <Box
                  key={belief.title}
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  borderRadius="12px"
                  p={6}
                  transition="all 0.2s"
                  _hover={{ borderColor: "whiteAlpha.300" }}
                >
                  <Text fontFamily="MonolisaBold" fontSize="16px" color="white" mb={3}>
                    {belief.title}
                  </Text>
                  <CustomText lineHeight="1.8">
                    {belief.desc}
                  </CustomText>
                </Box>
              ))}
            </SimpleGrid>
          </MotionBox>

          {/* Journey Timeline */}
          <Box>
            <SectionLabel mb={8}>THE JOURNEY</SectionLabel>
            <VStack spacing={0} align="stretch">
              {timeline.map((item, index) => (
                <Flex
                  key={item.year + item.company}
                  direction={{ base: "column", md: "row" }}
                  borderLeft="1px solid"
                  borderColor="whiteAlpha.200"
                  pl={{ base: 6, md: 8 }}
                  pb={index < timeline.length - 1 ? 10 : 0}
                  position="relative"
                  _before={{
                    content: '""',
                    position: "absolute",
                    left: "-3px",
                    top: "8px",
                    w: "5px",
                    h: "5px",
                    borderRadius: "full",
                    bg: item.isCurrent ? "white" : "whiteAlpha.400",
                  }}
                >
                  <HStack spacing={3} mb={1} minW={{ md: "100px" }}>
                    <Text fontFamily="MonolisaBold" fontSize="13px" color="white">
                      {item.year}
                    </Text>
                    {item.isCurrent && (
                      <Tag size="sm" bg="white" color="black" borderRadius="full" fontSize="9px" fontFamily="MonolisaBold">
                        NOW
                      </Tag>
                    )}
                  </HStack>
                  <Box ml={{ md: 8 }}>
                    <Text fontFamily="MonolisaBold" color="white" fontSize={{ base: "16px", md: "18px" }}>
                      {item.role}
                    </Text>
                    <Text fontFamily="MonolisaRegular" color="dim" fontSize="13px" mb={1}>
                      {item.company}
                    </Text>
                    <CustomText lineHeight="1.7">
                      {item.desc}
                    </CustomText>
                  </Box>
                </Flex>
              ))}
            </VStack>
          </Box>

          {/* Tools & Technologies */}
          <Box>
            <SectionLabel mb={5}>TOOLS & TECHNOLOGIES</SectionLabel>
            <Flex flexWrap="wrap" gap={2}>
              {tools.map((tool) => (
                <Box
                  key={tool}
                  px={4}
                  py={2}
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  borderRadius="full"
                  fontSize="13px"
                  fontFamily="MonolisaRegular"
                  color="ash"
                  transition="all 0.2s"
                  _hover={{ borderColor: "whiteAlpha.400", color: "white" }}
                >
                  {tool}
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Let's Connect */}
          <Box>
            <SectionLabel mb={5}>LET&apos;S CONNECT</SectionLabel>
            <CustomText fontSize={{ base: "14px", md: "15px" }} lineHeight="1.9" maxW="580px" mb={6}>
              I&apos;m always open to conversations about product engineering,
              design systems, AI, or just nerding out about mechanical keyboards
              and motorsport. Drop me a line or find me on social.
            </CustomText>
            <HStack spacing={5} mb={5}>
              <CustomIkonButton variant="twitter" />
              <CustomIkonButton variant="instagram" />
              <CustomIkonButton variant="dribbble" />
              <CustomIkonButton variant="linkedin" />
              <CustomIkonButton variant="behance" />
              <CustomIkonButton variant="github" />
            </HStack>
            <CustomButton variant="themed" href="mailto:ssaisreenivas@gmail.com">
              Get in touch →
            </CustomButton>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default About;
