import { Grid } from "@mui/material";
import { ActionButton } from "./AlertCenterScreenCard.styles.jsx";

const AlertActionButton = ({ label, isResolve, isOpenChat, isAssignOperator, onClick }) => {
  const isNoEffects = isOpenChat || isAssignOperator;
  return (
    <Grid item xs={6}>
      <ActionButton
        fullWidth
        disableRipple={isNoEffects}
        isResolve={isResolve}
        isOpenChat={isOpenChat}
        isAssignOperator={isAssignOperator}
        onClick={onClick}
      >
        {label}
      </ActionButton>
    </Grid>
  );
};

export default AlertActionButton;
