import { useMantineColorScheme } from "@mantine/core";
import { useEffect, useState } from "react";

export const useColorScheme = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const toggle = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return [colorScheme, toggle];
};

/**
 * Hook that calls handler if fire is true and click outside element
 */
export const useOutsideAlerter = (ref, fire, handler) => {
  useEffect(() => {
    /**
     * Call handler if clicked outside of element
     */
    function handleClickOutside(event) {
      if (fire && ref.current && !ref.current.contains(event.target)) {
        // handler();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

// calls handler on esc click
export const useEscClose = (fire, handler) => {
  useEffect(() => {
    /**
     * Call handler if esc is clicked
     */
    function handleClickOutside(event) {
      if (fire && event.keyCode === 27) {
        handler();
      }
    }
    // Bind the event listener
    document.addEventListener("keydown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleClickOutside);
    };
  });
};
