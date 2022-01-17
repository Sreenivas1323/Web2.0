import { Box, Center, Stack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {
  CustomButton,
  CustomHeading,
  CustomSecondaryHeading,
  CustomText,
} from "./CustomComponents";

export function Work({ Name, desc, images, web, link }) {
  return (
    <>
      <Stack
        my="10"
        direction={{ base: "column", md: "row" }}
        justifyContent={{ base: "space-between" }}
      >
        <Box marginY="auto">
          <VStack
            spacing="5"
            alignItems={"baseline"}
            maxW={{ base: "full", md: "500px" }}
          >
            <CustomSecondaryHeading>{Name}</CustomSecondaryHeading>
            {desc.map(({ data, key }) => (
              <CustomText key={key}>{data}</CustomText>
            ))}
            {link ? (
              <Link href={link} passHref>
                <a target={"_blank"}>
                  <CustomButton variant="sm-hover">
                    {web} -{">"}
                  </CustomButton>
                </a>
              </Link>
            ) : (
              <></>
            )}
          </VStack>
        </Box>

        <Stack
          my="8px"
          direction="column"
          spacing="14px"
          justifyContent={{ base: "center", md: "initial" }}
        >
          {images.map(({ src, key, words }) => (
            <Box key={key} borderRadius={"10px"} overflow="hidden">
              <Center>
                <Image
                  src={src}
                  width={450}
                  height={222}
                  placeholder="blur"
                  layout="intrinsic"
                  blurDataURL={src}
                />
              </Center>
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  );
}
