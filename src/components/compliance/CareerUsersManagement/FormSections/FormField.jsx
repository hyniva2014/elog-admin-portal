import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";

const FormField = ({
  name,
  control,
  children,
  xs = 12,
  sm = 6,
  md = 4,
  lg,
  xl,
}) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => children(field, error)}
      />
    </Grid>
  );
};

export default FormField;
