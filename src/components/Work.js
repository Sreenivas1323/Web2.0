import { Badge, Box, Center, HStack, Stack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {
  CustomButton,
  CustomSecondaryHeading,
  CustomText,
} from "./CustomComponents";

export function Work({ Name, desc, images, web, link, tags }) {
  return (
    <>
      <Stack
        my="10"
        direction={{ base: "column", md: "row" }}
        justifyContent={{ base: "space-between" }}
        alignItems={{ base: "center", md: "flex-start" }}
        w="full"
      >
        <Box marginY="auto" flex="1">
          <VStack
            spacing="5"
            alignItems={"baseline"}
            maxW={{ base: "full", md: "lg", lg: "xl" }}
          >
            <CustomSecondaryHeading>{Name}</CustomSecondaryHeading>{" "}
            <HStack spacing={"5px"} style={{ marginTop: "10px" }}>
              {tags.map(({ name, color }, index) => (
                <Badge colorScheme={color} key={index}>
                  {name}
                </Badge>
              ))}
            </HStack>
            {desc.map(({ data }, index) => (
              <CustomText key={index}>{data}</CustomText>
            ))}
            {link ? (
              <Link href={link} target={"_blank"}>
                <CustomButton variant="sm-hover">
                  {web} -{">"}
                </CustomButton>
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
          paddingTop={{ base: "10px", md: "0px" }}
          justifyContent={{ base: "center", md: "initial" }}
        >
          {images.map(({ src, words }, index) => (
            <Box key={index} borderRadius={"10px"} overflow="hidden">
              <Center>
                <Image
                  src={src}
                  width={450}
                  height={222}
                  placeholder="blur"
                  layout="intrinsic"
                  blurDataURL={src}
                  alt={words || Name}
                />
              </Center>
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  );
}
