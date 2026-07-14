import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";
import CommonDialogForm from "../../../common/CommonDialogForm";
import { ADD_DEVICE_FORM_ID } from "./Constants";
import { useEffect, useState } from "react";
import { useServices } from "../../../services/services";
import { Grid } from "@mui/material";

const AssignDevicesToCarriers = ({
  open,
  handleCancel,
  handleSubmit,
  loading,
}) => {
  const { fetchApi } = useServices();
  const [carrierOptions, setCarrierOptions] = useState([]);
  const [selectedCarrier, setSelectedCarrier] = useState(null);

  useEffect(() => {
    if (!open) {
      setSelectedCarrier(null);
    }
  }, [open]);

  useEffect(() => {
    fetchCarriers();
  }, []);

  const fetchCarriers = async () => {
    try {
      const response = await fetchApi("/masteradmin/dropdown/companies?is_active=1");
      const dropdownData = response?.body?.data || [];
      const formattedOptions = dropdownData.map((item) => ({
        value: item.company_id,
        label: item.company_name,
      }));

      setCarrierOptions(formattedOptions);
    } catch (error) {
      console.error("Device Model Dropdown Error:", error);
    }
  };

  const handleFormSubmit = () => {
    handleSubmit(selectedCarrier);
  };

  const content = (
    <Grid sx={{ p: 3 }}>
      <CommonAutocompleteDropdown
        name="carrier"
        label="Carrier Name"
        options={carrierOptions}
        value={selectedCarrier}
        onChange={(value) => setSelectedCarrier(value)}
        disabled={false}
      />
    </Grid>
  );

  return (
    <CommonDialogForm
      open={open}
      title="Assign Device to Carrier"
      content={content}
      formId={ADD_DEVICE_FORM_ID}
      onCancel={handleCancel}
      onSubmit={handleFormSubmit}
      loading={loading}
      submitButtonText="Assign"
      maxWidth="md"
    />
  );
};

export default AssignDevicesToCarriers;
