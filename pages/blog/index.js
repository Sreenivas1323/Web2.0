import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import {
  CustomHeading,
  CustomText,
} from "../../src/components/CustomComponents";

function BlogIndex() {
  return (
    <>
      <Head>
        <title>Blog - Veerabhadra Sai Sreenivas Sonthena</title>
        <meta name="description" content="Read thoughts and tutorials on design, development, deployment, and work-life by Veerabhadra Sai Sreenivas Sonthena, Tech Lead at Intripid." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ssaisreenivas.in/blog" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog - Veerabhadra Sai Sreenivas Sonthena" />
        <meta property="og:description" content="Read thoughts and tutorials on design, development, deployment, and work-life." />
        <meta property="og:url" content="https://ssaisreenivas.in/blog" />
        
        {/* Twitter */}
        <meta property="twitter:title" content="Blog - Veerabhadra Sai Sreenivas Sonthena" />
        <meta property="twitter:description" content="Read thoughts and tutorials on design, development, deployment, and work-life." />
      </Head>
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
          I&apos;ve just started to write online, sharing my thoughts and tutorial on
          design, development, deployment, work-life, and personal life.
        </CustomText>
      </Container>
    </>
  );
}

export default BlogIndex;
