import { useCallback, useState } from "react";

const useDeviceManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState({ isLoading: false });
  const [mode, setMode] = useState("");
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsAddDeviceOpen(true);
  }, []);

  const handleCloseAddDevice = useCallback(() => {
    setIsAddDeviceOpen(false);
  }, []);

  const handleAddDevice = useCallback((deviceData) => {
    console.log("New device submitted:", deviceData);
    setIsAddDeviceOpen(false);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    data,
    setData,
    mode,
    setMode,
    handleClick,
    isAddDeviceOpen,
    handleCloseAddDevice,
    handleAddDevice,
  };
};

export default useDeviceManagement;
