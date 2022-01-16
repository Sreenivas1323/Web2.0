import { Center, Container, Flex, Icon, Spacer } from "@chakra-ui/react";
import React from "react";
import { CustomButton } from "./CustomComponents";

const FavIcon = (props) => (
  <Icon
    width="104"
    height="22"
    viewBox="0 0 104 22"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentcolor"
      d="M1.82012 14.0733V16.363C3.08036 16.718 4.34059 16.8777 5.33458 16.8777C8.28105 16.8777 10.056 15.5642 10.056 13.1325C10.056 8.58856 3.9501 10.5943 3.9501 7.71882C3.9501 6.93783 4.41159 6.26334 6.00908 6.26334C6.91432 6.26334 7.99706 6.45858 9.45254 7.06208V4.80785C8.4053 4.36411 7.14506 4.09786 5.97358 4.09786C3.18686 4.09786 1.50062 5.51784 1.50062 7.96732C1.50062 12.458 7.62431 10.7008 7.62431 13.3633C7.62431 14.1088 7.10956 14.73 5.22808 14.73C4.1631 14.73 3.16911 14.5525 1.82012 14.0733ZM16.9545 16.8777C19.8832 16.8777 21.6049 14.872 21.6049 11.5173C21.6049 8.51756 20.0252 6.76033 17.3095 6.76033C14.3985 6.76033 12.659 8.76606 12.659 12.1208C12.659 15.1205 14.2387 16.8777 16.9545 16.8777ZM17.132 14.8187C15.5522 14.8187 15.002 14.0378 15.002 11.819C15.002 9.6003 15.5522 8.81931 17.132 8.81931C18.7117 8.81931 19.2619 9.6003 19.2619 11.819C19.2619 14.0378 18.7117 14.8187 17.132 14.8187ZM29.7991 6.76033C28.4501 6.76033 27.3141 7.47032 26.4266 8.71281L26.1426 6.93783H24.3499V16.7002H26.6041V10.2393C27.5271 9.10331 28.1484 8.67731 29.0358 8.67731C30.0298 8.67731 30.4381 9.20981 30.4381 10.257V16.7002H32.6746V9.8843C32.6746 7.82532 31.5918 6.76033 29.7991 6.76033ZM43.7797 8.85481V6.93783H39.6972V4.7546H37.869L37.4608 6.93783L35.4195 7.38157V8.85481H37.4608V13.381C37.4608 15.3335 38.6855 16.8777 41.2947 16.8777C42.1112 16.8777 42.9987 16.718 43.7797 16.4517V14.4105C43.0697 14.6767 42.3242 14.8187 41.6497 14.8187C40.212 14.8187 39.6972 14.233 39.6972 13.0615V8.85481H43.7797ZM52.5064 6.76033C51.2639 6.76033 50.2166 7.38157 49.4002 8.46431V3.56537H47.1637V16.7002H49.4002V10.2215C50.2876 9.10331 50.8911 8.67731 51.7254 8.67731C52.6484 8.67731 53.0211 9.20981 53.0211 10.257V16.7002H55.2753V9.8843C55.2753 7.82532 54.2281 6.76033 52.5064 6.76033ZM67.055 11.5528C67.055 8.53531 65.6527 6.76033 62.8305 6.76033C59.7421 6.76033 58.0736 8.90806 58.0736 12.1385C58.0736 15.156 59.7243 16.8777 62.5998 16.8777C63.8245 16.8777 65.1912 16.576 66.274 16.008V14.0023C65.28 14.517 64.0198 14.8365 62.8838 14.8365C61.3928 14.8365 60.6295 14.2508 60.452 12.6533H67.0195C67.0372 12.2983 67.055 11.961 67.055 11.5528ZM62.6885 8.80156C64.0198 8.80156 64.5522 9.3518 64.6942 10.9138H60.452C60.6295 9.36955 61.304 8.80156 62.6885 8.80156ZM75.2136 6.76033C73.8647 6.76033 72.7287 7.47032 71.8412 8.71281L71.5572 6.93783H69.7645V16.7002H72.0187V10.2393C72.9417 9.10331 73.5629 8.67731 74.4504 8.67731C75.4444 8.67731 75.8526 9.20981 75.8526 10.257V16.7002H78.0891V9.8843C78.0891 7.82532 77.0064 6.76033 75.2136 6.76033ZM89.709 16.7002L89.1943 13.9135V10.0618C89.1943 8.03832 87.8453 6.76033 85.4845 6.76033C84.4196 6.76033 83.1416 7.02658 81.8636 7.48807V9.51155C82.9996 8.97906 83.9758 8.74831 85.0763 8.74831C86.3543 8.74831 86.94 9.26305 86.94 10.4345V10.5943C82.5558 10.6298 80.9051 11.9433 80.9051 14.1265C80.9051 15.8305 81.9701 16.8777 83.9581 16.8777C85.449 16.8777 86.4963 16.292 87.1885 15.1205L87.4903 16.7002H89.709ZM84.6503 14.872C83.6563 14.872 83.2481 14.446 83.2481 13.7183C83.2481 12.5645 84.2421 12.0675 86.94 12.0498V12.7065C86.94 14.0378 86.0348 14.872 84.6503 14.872ZM95.0987 13.452V16.7002H98.1162V13.452H95.0987Z"
    />
  </Icon>
);

const Header = () => {
  return (
    <>
      <Container maxW="full" display={{ base: "none", md: "block" }}>
        <Flex>
          <CustomButton variant="ghost">
            <FavIcon />
          </CustomButton>
          <Spacer />
          <CustomButton variant="med">About</CustomButton>
        </Flex>
      </Container>

      <Container display={{ base: "block", md: "none" }} p={4}>
        <Center>
          <FavIcon />
        </Center>
      </Container>

      <Container
        maxW="full"
        display={{ base: "block", md: "none" }}
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          background: "linear-gradient(90deg, #FC466B -2.22%, #3F5EFB 99.02%)",
          zIndex: "99",
        }}
        py={4}
      >
        <Center justifyContent="space-evenly">
          <CustomButton variant="med">About</CustomButton>
          <CustomButton variant="med">About</CustomButton>
          <CustomButton variant="med">About</CustomButton>
        </Center>
      </Container>
    </>
  );
};

export default Header;
