import { useEffect, useState } from "react";
import CommonSnackbar from "../../common/CommonSnackbar";

const Test = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    const hasShownLoginMessage = sessionStorage.getItem(
      "hasShownLoginMessage",
    );

    if (!hasShownLoginMessage) {
      showSnackbar("Logged In Successfully !", "success");
      sessionStorage.setItem("hasShownLoginMessage", "true");
    }
  }, []);

  return (
    <>
      Hii
      <CommonSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default Test;
