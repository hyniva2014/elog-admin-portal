import { Box, CircularProgress, styled } from "@mui/material";
import { useState } from "react";
import image from "../assets/images/Logo-small.png";

export const LoadingOverlay = styled(Box)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpinnerWrapper = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommonLoading = () => {
  const [loading, setLoading] = useState(false);

  const LoadingContainer = () =>
    loading ? (
      <LoadingOverlay>
        <SpinnerWrapper>
          <CircularProgress size={80} thickness={2} sx={{ color: "#284495" }} />
          <Box
            component="img"
            src={image}
            alt="Loading"
            sx={{
              position: "absolute",
              width: 100,
              height: 100,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </SpinnerWrapper>
      </LoadingOverlay>
    ) : null;

  return {
    loading,
    setLoading,
    LoadingContainer,
  };
};
export default CommonLoading;

// const CommonLoading = () => {
//   const [loadingCount, setLoadingCount] = useState(0);
//   const setLoading = useCallback((value) => {
//     setLoadingCount((prev) => (value ? prev + 1 : Math.max(prev - 1, 0)));
//   }, []);
//   const LoadingContainer = () =>
//     loadingCount > 0 ? (
//       <LoadingStyles>
//         <CircularProgress />
//       </LoadingStyles>
//     ) : null;

//   return {
//     setLoading,
//     LoadingContainer,
//   };
// };
// export default CommonLoading;
