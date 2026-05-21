import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const vendorChunk = (id) => {
  if (!id.includes("node_modules")) {
    return undefined;
  }

  if (id.includes("@mui") || id.includes("@emotion") || id.includes("@popperjs")) {
    return "mui-vendor";
  }

  if (
    id.includes("react-router-dom") ||
    id.includes("react-redux") ||
    id.includes("redux-persist") ||
    id.includes("@reduxjs") ||
    id.includes("react-helmet-async") ||
    id.includes("notistack")
  ) {
    return "react-vendor";
  }

  if (id.includes("apexcharts") || id.includes("react-apexcharts")) {
    return "apex-vendor";
  }

  if (id.includes("chart.js")) {
    return "chartjs-vendor";
  }

  if (id.includes("recharts")) {
    return "recharts-vendor";
  }

  if (id.includes("@fullcalendar")) {
    return "fullcalendar-vendor";
  }

  if (id.includes("jsvectormap")) {
    return "maps-vendor";
  }

  if (
    id.includes("swiper") ||
    id.includes("react-quill") ||
    id.includes("simplebar-react") ||
    id.includes("sortablejs") ||
    id.includes("react-sortablejs") ||
    id.includes("react-dropzone") ||
    id.includes("react-datepicker") ||
    id.includes("react-draggable") ||
    id.includes("react-scroll-parallax") ||
    id.includes("react-swipeable-views") ||
    id.includes("lucide-react")
  ) {
    return "ui-vendor";
  }

  return "vendor";
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks: vendorChunk,
      },
    },
  },
  resolve: {
    alias: {
      "@src": path.resolve("./src"),
      "@": path.resolve("./")
    }
  }
});