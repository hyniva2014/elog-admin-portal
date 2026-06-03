import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import CommonMultiSelectDropdown from "../../../../common/CommonMultiSelectDropdown";

const FormMultiSelect = ({
  name,
  label,
  control,
  errors,
  disabled,
  required,
  xs = 12,
  sm = 6,
  md = 4,
  lg,
  xl,
  options,
  dataKey,
}) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const multiSelectProps = {
            label,
            required,
            value: field.value,
            options: options || [],
            dataKey: dataKey || name,
            onChange: field.onChange,
            disabled,
            error: !!errors[name],
            helperText: errors[name]?.message,
          };

          return <CommonMultiSelectDropdown {...multiSelectProps} />;
        }}
      />
    </Grid>
  );
};

export default FormMultiSelect;
