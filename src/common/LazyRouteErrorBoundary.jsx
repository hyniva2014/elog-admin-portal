import React from "react";

class LazyRouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    const message = error.message || "";
    // Check if the error is a dynamic import failure
    const isChunkError =
      /module|chunk|fetch|dynamically|imported|loading|failed/i.test(message);
    if (isChunkError) {
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    const message = error.message || "";
    const isChunkError =
      /module|chunk|fetch|dynamically|imported|loading|failed/i.test(message);

    if (isChunkError) {
      console.warn("Chunk load error detected. Refreshing page...", error);

      const now = Date.now();
      const lastReload = sessionStorage.getItem("last_chunk_reload");

      // Only reload if the last reload was more than 10 seconds ago
      // (prevents infinite reload loops if the error persists)
      if (!lastReload || now - parseInt(lastReload) > 10000) {
        sessionStorage.setItem("last_chunk_reload", now.toString());
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        console.error(
          "Chunk error persists after refresh. Stopping automatic reload to prevent loop.",
        );
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI if you want,
      // but the component will trigger a reload anyway.
      return null;
    }

    return this.props.children;
  }
}

export default LazyRouteErrorBoundary;
