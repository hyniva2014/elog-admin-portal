import { useMemo, useState } from "react";
import { InputAdornment, List } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  AssignOperatorContentWrapper,
  AssignOperatorSearchField,
  ScrollableListBox,
} from "./AlertCenterScreenCard.styles.jsx";

const AssignOperatorContent = ({ operators = [], renderOperator }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOperators = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return operators;

    return operators.filter(({ name }) => name?.toLowerCase().includes(query));
  }, [operators, searchQuery]);

  return (
    <AssignOperatorContentWrapper>
      <AssignOperatorSearchField
        placeholder="Search here..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        }
      />
      <ScrollableListBox>
        <List disablePadding>
          {filteredOperators.map(renderOperator)}
        </List>
      </ScrollableListBox>
    </AssignOperatorContentWrapper>
  );
};

export default AssignOperatorContent;
