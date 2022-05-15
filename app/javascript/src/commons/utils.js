import { createStandaloneToast } from "@chakra-ui/react";
import { isEmpty } from "ramda";

export const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

export const showToast = (status, message) => {
  const toast = createStandaloneToast();

  toast({
    title: message,
    status,
    isClosable: true,
  });
};

export const isPresent = obj => !isEmpty(obj);
