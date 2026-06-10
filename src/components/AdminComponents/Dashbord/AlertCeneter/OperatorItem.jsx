import { ListItemText } from "@mui/material";
import {
  OperatorListItemButton,
  OperatorRadio,
  OperatorPrimaryText,
  OperatorSecondaryText,
} from "./AlertCenterScreenCard.styles.jsx";

const OperatorItem = ({ op, selectedOperator, onSelect }) => {
  const { id, name, role } = op;
  const isSelected = selectedOperator === id;

  const handleClick = () => onSelect(id);

  return (
    <OperatorListItemButton
      key={id}
      onClick={handleClick}
      selected={isSelected}
    >
      <OperatorRadio checked={isSelected} size="small" />
      <ListItemText
        primary={<OperatorPrimaryText>{name}</OperatorPrimaryText>}
        secondary={<OperatorSecondaryText>{role}</OperatorSecondaryText>}
      />
    </OperatorListItemButton>
  );
};

export default OperatorItem;
