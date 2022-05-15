import React from "react";

import { Button } from "@chakra-ui/react";

import { HOVER_PROPS } from "./constants";

const TabButton = ({ text, active }) => {
  const hoverProps = active ? HOVER_PROPS.ACTIVE : HOVER_PROPS.INACTIVE;

  return (
    <Button
      pl="0"
      _hover={{ ...hoverProps, transform: "scale(1.02)" }}
      _active={{
        transform: "scale(0.98)",
        color: "indigo.500",
        transition: "transform 300ms ease-in",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
      }}
      _focus={{}}
      color="indigo.200"
      isActive={active}
      className="uppercase"
    >
      {text}
    </Button>
  );
};

export default TabButton;
