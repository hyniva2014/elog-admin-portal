import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { STATUS_TRANSITION_OPTIONS } from "./Constants";
import { StatusDropdownContainer } from "./AccountManagement.styled";

const StatusSelectDropdown = ({ currentStatus, value, onChange }) => {
  const statusOptions = STATUS_TRANSITION_OPTIONS[currentStatus] || STATUS_TRANSITION_OPTIONS.Active;

  return (
    <StatusDropdownContainer>
      <FormControl fullWidth size="small">
        <InputLabel id="target-status-label">Select Status</InputLabel>
        <Select
          labelId="target-status-label"
          value={value}
          onChange={onChange}
          label="Select Status"
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StatusDropdownContainer>
  );
};

export default StatusSelectDropdown;
