import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";
import CommonDialogForm from "../../../common/CommonDialogForm";
import { ADD_DEVICE_FORM_ID } from "./Constants";
import { useEffect, useState } from "react";
import { useServices } from "../../../services/services";

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
    fetchCarriers();
  }, []);

  const fetchCarriers = async () => {
    try {
      const response = await fetchApi("/masteradmin/dropdown/companies");
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

  const content = (
    <div style={{ padding: "16px" }}>
      <CommonAutocompleteDropdown
        name="carrier"
        label="Carrier Name"
        options={carrierOptions}
        value={selectedCarrier}
        onChange={(value) => setSelectedCarrier(value)}
        disabled={false}
      />
    </div>
  );

  return (
    <CommonDialogForm
      open={open}
      title="Assign Device to Carrier"
      content={content}
      formId={ADD_DEVICE_FORM_ID}
      onCancel={handleCancel}
      onSubmit={() => handleSubmit(selectedCarrier)}
      loading={loading}
      submitButtonText="Assign"
      maxWidth="md"
    />
  );
};

export default AssignDevicesToCarriers;
