import {
  Button,
  Box,
  Center,
  Container,
  HStack,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { Link } from "@chakra-ui/react";

import {
  CustomButton,
  CustomChakraLink,
  CustomHeading,
  CustomSecondaryHeading,
  CustomText,
} from "../src/components/CustomComponents";
import { CustomIkonButton } from "../src/components/Ikons";
import { Work } from "../src/components/Work";

export default function Home() {
  return (
    <div>
      <Container
        maxW="full"
        padding="4"
        marginTop={{ base: "5", md: "10", lg: "20" }}
      >
        <Box>
          <CustomHeading>
            Mechatronics engineer Turned into Software Product designer,
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
                Email Me ->
              </CustomButton>
            </HStack>
          </Stack>
        </Box>
      </Container>
      <Container maxW="full" paddingBottom={"10"}>
        <CustomText color={"ash"}>
          I’m Veerabhadra Sai Sreenivas Sonthena, a product designer from India.
          I specialise in interface design for mobile and web-based applications
          with a focus on simplicity & usability.
        </CustomText>
      </Container>
      <Container maxW="full">
        <CustomText color={"ash"}>
          I’ve just joined{" "}
          <CustomChakraLink href="https://chakra-ui.com" isExternal>
            LeafCraft Studios
          </CustomChakraLink>{" "}
          where I’ll be working on some of the best user based products. In the
          past Triennium, I’ve tried various hats freelancing as a communication
          desinger, Logo designer, UI desinger, UX researcher and Full stack web
          developer.
        </CustomText>
      </Container>

      {/* <Divider borderTop={"2px dashed"} my={"10"} />

      <Container maxW="full">
        <CustomSecondaryHeading>Recent Work</CustomSecondaryHeading>
        <CustomText>Here are some of my most recent projects.</CustomText>
      </Container>
      <Container maxW="full">
        <Work
          Name="Datametrix"
          desc={
            "My previous full-time role, where I led the design team to work on modern solutions for data presentation."
          }
          images={[
            { src: "/images/dmetrix1.png", key: "1" },
            { key: "2", src: "images/dmetrix1.png" },
          ]}
        />
      </Container> */}
    </div>
  );
}
