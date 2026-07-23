import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import CommonMultiSelectDropdown from "../../../../common/CommonMultiSelectDropdown";
import CommonTextField from "../../../../common/CommonTextField";

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
          if (disabled) {
            const displayValue = Array.isArray(field.value)
              ? field.value
                  .map((val) => {
                    const opt = (options || []).find((o) => String(o.value) === String(val));
                    return opt ? opt.label : val;
                  })
                  .join(", ")
              : (field.value || "");
            return (
              <CommonTextField
                name={name}
                label={label}
                value={displayValue}
                disabled={true}
                shrinkLabel={Boolean(displayValue)}
                error={!!errors[name]}
                helperText={errors[name]?.message}
              />
            );
          }

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
