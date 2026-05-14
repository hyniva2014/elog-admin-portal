import { useState } from "react";

const useDeviceManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState({ isLoading: false });
  const [mode, setMode] = useState("");

  const handleClick = () => {
    console.log("Add device asset clicked");
  };

  return {
    searchQuery,
    setSearchQuery,
    data,
    setData,
    mode,
    setMode,
    handleClick,
  };
};

export default useDeviceManagement;
