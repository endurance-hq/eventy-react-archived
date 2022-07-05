import React from "react";

import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

import SidebarContent from "./SidebarContent";

const Sidebar = ({ navItems }) => {
  const { isOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
        navItems={navItems}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
