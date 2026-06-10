import { ListItemText } from "@mui/material";
import {
  OperatorListItemButton,
  OperatorRadio,
} from "./AlertCenterScreenCard.styles.jsx";

const OperatorItem = ({ op, selectedOperator, onSelect }) => {
  const handleClick = () => onSelect(op.id);
  return (
    <OperatorListItemButton
      key={op.id}
      onClick={handleClick}
      selected={selectedOperator === op.id}
    >
      <OperatorRadio checked={selectedOperator === op.id} size="small" />
      <ListItemText
        primary={op.name}
        secondary={op.role}
        primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
        secondaryTypographyProps={{ fontSize: 12 }}
      />
    </OperatorListItemButton>
  );
};

export default OperatorItem;
