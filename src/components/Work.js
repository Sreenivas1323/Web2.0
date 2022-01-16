import { Stack, VStack } from "@chakra-ui/react";
import Image from "next/image";
import {
  CustomHeading,
  CustomSecondaryHeading,
  CustomText,
} from "./CustomComponents";

export function Work({ Name, desc, images }) {
  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <VStack alignItems={"baseline"}>
        <CustomSecondaryHeading>{Name}</CustomSecondaryHeading>
        <CustomText>{desc}</CustomText>
      </VStack>
      <div>
        <Image src={images[0].src} width={"305.54"} height={"151.04"} />
      </div>
    </Stack>
  );
}
