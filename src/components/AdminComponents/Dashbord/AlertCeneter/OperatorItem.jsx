import {
  OperatorListItemButton,
  OperatorRadio,
  OperatorPrimaryText,
} from "./AlertCenterScreenCard.styles.jsx";

const OperatorItem = ({ op, selectedOperator, onSelect }) => {
  const { id, name } = op;
  const isSelected = selectedOperator === id;

  const handleClick = () => onSelect(id);

  return (
    <OperatorListItemButton
      key={id}
      onClick={handleClick}
      selected={isSelected}
    >
      <OperatorRadio checked={isSelected} size="small" />
      <OperatorPrimaryText>{name}</OperatorPrimaryText>
    </OperatorListItemButton>
  );
};

export default OperatorItem;
