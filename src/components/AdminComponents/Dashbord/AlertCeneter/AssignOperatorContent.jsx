import { List } from "@mui/material";
import { ScrollableListBox } from "./AlertCenterScreenCard.styles.jsx";

const AssignOperatorContent = ({ operators = [], renderOperator }) => {
  return (
    <ScrollableListBox>
      <List disablePadding>
        {operators.map(renderOperator)}
      </List>
    </ScrollableListBox>
  );
};

export default AssignOperatorContent;
