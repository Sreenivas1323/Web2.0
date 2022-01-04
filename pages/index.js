import { Button, Heading, Box, Center } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Box height="100vh">
        <Heading>
          Mechatronics engineer Turned into Software Product designer, creating
          thoughtful, intutive interfaces.
        </Heading>
      </Box>
      <Center>
        {" "}
        <Heading>
          Mechatronics engineer Turned into Software Product designer, creating
          thoughtful, intutive interfaces.
        </Heading>
      </Center>

      <Button>Hello World</Button>
    </div>
  );
}
