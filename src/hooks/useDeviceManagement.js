import { useCallback, useState } from "react";

const useDeviceManagement = () => {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsAddDeviceOpen(true);
  }, []);

  const handleCloseAddDevice = useCallback(() => {
    setIsAddDeviceOpen(false);
  }, []);

  const handleAddDevice = useCallback(() => {
    setIsAddDeviceOpen(false);
  }, []);

  return {
    isAddDeviceOpen,
    handleClick,
    handleCloseAddDevice,
    handleAddDevice,
  };
};

export default useDeviceManagement;
