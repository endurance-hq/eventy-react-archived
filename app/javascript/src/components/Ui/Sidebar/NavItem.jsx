import React from "react";

import { Flex, Link, Icon } from "@chakra-ui/react";
import classNames from "classnames";
import { Link as ReactRouterLink } from "react-router-dom";

const NavItem = ({ icon, to = "#", children, ...rest }) => {
  const url = new URL(to, window.location.href);

  const isActive = location.pathname.includes(url.pathname);

  return (
    <Link
      as={ReactRouterLink}
      to={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        bg={classNames({ "indigo.50": isActive })}
        color={classNames({ "indigo.500": isActive })}
        p="4"
        mx="2"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "indigo.50",
          color: "indigo.500",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
