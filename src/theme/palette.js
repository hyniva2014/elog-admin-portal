/*
 * Copyright (c) 2023.
 * File Name: palette.ts
 * Author: Coderthemes
 */

import { darken, lighten } from "@mui/material";

export const getColorVariants = (color, contrastText) => {
  return {
    lighter: lighten(color, 0.6),

    light: lighten(color, 0.35),
    GreenLight: "#E8F8F0",
    RedLight : "#FFF5F5",
    main: color,

    dark: darken(color, 0.35),

    darker: darken(color, 0.6),

    contrastText,
  };
};

const paletteTheme = (themeMode) => {
  let palette = {
    mode: "light",

    tonalOffset: 0.2,

    contrastThreshold: 3,

    common: {
      white: "#fff",
      sidebar:"rgba(255,255,255,0.1)",
      black: "#000",
    },

    grey: {
      50: "#f8f8f8",
      100: "#f4f6fa",
      200: "#eaecf0",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#aab8c5",
      600: "#818e9e",
      700: "#444d57",
      800: "#3f4650",
      900: "#3a444b",
    },

    primary: getColorVariants("#3e60d5", "#fff"),

    sidebar: getColorVariants("#284394", "#fff"),

    secondary: getColorVariants("#6c757d", "#fff"),

    success: getColorVariants("#26c362", "#fff"),

    info: getColorVariants("#3FC6FC", "#fff"),

    warning: getColorVariants("#fdb906", "#fff"),

    error: getColorVariants("#ff0a0a", "#fff"),

    light: getColorVariants("#eef2f7", "#6c757d"),

    dark: getColorVariants("#313a46", "#fff"),

    brand: getColorVariants("#284495", "#fff"),
    avatarGrey: "#9b9b9b",    
    custom: {
      blue: "#2563EB",

      errorRed: "#d32f2f",

      lightBorder: "#E5E7EB",

      border: "#DDE5DC",

      cardBackground: "#F6FBF6",

      hoverBackground: "#F3F4F6",

      mutedText: "#9CA3AF",

      lightGreen: "#00C24E0D",

      successGreen: "#22C55E",

      dangerRed: "#DC2626",

      activeGreen: "#10B981",

      inStockBlue: "#2563EB",

      retiredGrey: "#CAD5E2",
      // Alert Center Colors
      alertActiveBackground: "#f5f7ff",
      navyBlue: "#1e3a8a",
      navyBlueBorder: "#93c5fd",
      blueBadgeBackground: "#dbeafe",
      statusBadgeBackground: "#dcfce7",
      statusBadgeText: "#15803d",
      accentBar: "#0a1f5c",
      triggerBackground: "#fffef5",
      triggerBorder: "#fef08a",
      teal: "#0D9488",
    },

    background: {
      paper: "#fff",

      default: "#F8FAFC",
    },

    text: {
      primary: "#111827",

      secondary: "#6B7280",

      disabled: "#82878c",
    },

    divider: "#dee2e6",
  };

  if (themeMode === "dark") {
    palette = {
      ...palette,

      mode: "dark",

      background: {
        paper: "#1e2328",

        default: "#171c21",
      },

      text: {
        primary: "#ebedf0",

        secondary: "#c8c8c8",

        disabled: "#8c9196",
      },

      divider: "#3d454f",
    };
  }

  return palette;
};

export default paletteTheme;
