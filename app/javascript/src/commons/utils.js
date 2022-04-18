import { createStandaloneToast } from "@chakra-ui/react";

export const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

export const showToast = (status, message) => {
  const toast = createStandaloneToast();

  toast({
    title: message,
    status,
    isClosable: true,
  });
};

export const isEmpty = obj => {
  // eslint-disable-next-line eqeqeq
  if (obj == null) return true;

  if (typeof obj === "number") return false;

  if (typeof obj === "string" || obj instanceof String) return obj === "";

  if (Array.isArray(obj)) return obj?.length === 0 || false;

  if (typeof obj === "object") return Object.keys(obj).length === 0;

  return !!obj;
};

export const isPresent = obj => !isEmpty(obj);
