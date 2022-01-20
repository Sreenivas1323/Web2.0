import { Box, Container } from "@chakra-ui/react";
import React from "react";
import {
  CustomHeading,
  CustomText,
} from "../../src/components/CustomComponents";

function index() {
  return (
    <>
      <Container
        maxW="full"
        padding="4"
        marginTop={{ base: "5", md: "10", lg: "20" }}
      >
        <Box>
          {" "}
          <CustomHeading>Blog</CustomHeading>
        </Box>
      </Container>
      <Container maxW="full" paddingBottom={"10"}>
        <CustomText color={"ash"}>
          I've just started to write online, sharing my thoughts and tutorial on
          design, development, deployment, work-life, and personal life.
        </CustomText>
      </Container>
    </>
  );
}

export default index;
