import React from "react";

import { Box } from "@chakra-ui/react";

import NavItem from "./NavItem";

const SidebarContent = ({ navItems = [], ...rest }) => (
  <Box
    bg="white"
    borderRight="1px"
    borderRightColor="gray.200"
    w={{ base: "full", md: 60 }}
    pos="fixed"
    h="full"
    {...rest}
  >
    <div className="mt-4">
      {navItems.map(item => (
        <NavItem key={item.label} icon={item.icon} to={item.to}>
          {item.label}
        </NavItem>
      ))}
    </div>
  </Box>
);

export default SidebarContent;
