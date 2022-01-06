import { Button, Heading, Box, Center } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../src/components/Button";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Box>
        <Heading>
          Mechatronics engineer Turned into Software Product designer, creating
          thoughtful, intutive interfaces.
        </Heading>
      </Box>

      <Button>Hello World</Button>
      <CustomButton variant="primary">Hello</CustomButton>
    </div>
  );
}
