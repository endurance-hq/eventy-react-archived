import React from "react";

import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Image,
  Text,
  Icon,
  Link,
} from "@chakra-ui/react";

import { logout } from "apis/authentication";
import { useAuthDispatch } from "contexts/auth";
import { useUserState } from "contexts/user";
import IcBell from "images/ic_bell.svg";
import IcUsers from "images/ic_users.svg";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUserState();
  const authDispatch = useAuthDispatch();

  const handleLogout = async () => {
    await logout();
    authDispatch({ type: "LOGOUT" });
  };

  return (
    <Box
      bg="white"
      w="100%"
      borderBottom="1px"
      borderBottomColor="gray.200"
      as="header"
      pos="fixed"
      px={4}
      h={16}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Image
            className="w-[100px] bg-cover bg-center bg-no-repeat"
            objectFit="cover"
            src="/assets/logo.svg"
            alt="Logo"
          />
        </HStack>
        <Flex alignItems={"center"}>
          <Link>
            <Icon
              mr="4"
              fontSize="24"
              _groupHover={{
                color: "white",
              }}
              as={IcUsers}
            />
          </Link>
          <Link>
            <Icon
              mr="4"
              fontSize="24"
              _groupHover={{
                color: "white",
              }}
              as={IcBell}
            />
          </Link>

          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              bg="white"
              borderWidth="0px"
              _hover={{ bg: "white" }}
              _expanded={{ bg: "white" }}
              _focus={{ boxShadow: "none" }}
              cursor={"pointer"}
              minW={0}
              rightIcon={<ChevronDownIcon />}
            >
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Avatar size={"sm"} />
                <Text ml={2}>{user.user_name}</Text>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
