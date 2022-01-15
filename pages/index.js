import { Button, Box, Center, Container } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import {
  CustomButton,
  CustomHeading,
} from "../src/components/CustomComponents";

export default function Home() {
  return (
    <div>
      <Container maxW="full" padding="4" my={{ base: "5", md: "10", lg: "20" }}>
        <Box>
          <CustomHeading>
            Mechatronics engineer Turned into Software Product designer,
            creating thoughtful, intuitive interfaces.
          </CustomHeading>
        </Box>
        <Box></Box>
      </Container>
    </div>
  );
}
