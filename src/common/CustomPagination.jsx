import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  gridPageSelector,
  gridPageSizeSelector,
  gridRowCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

import {
  PaginationContainer,
  PaginationCount,
  PaginationButtonWrapper,
  PaginationToggleButton,
  PaginationActions,
  StyledPagination,
  ExpandIconSx,
} from "./CustomPagination.styles";

const CustomPagination = ({ collapsed, setCollapsed }) => {
  const apiRef = useGridApiContext();

  const page = useGridSelector(apiRef, gridPageSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const rowCount = useGridSelector(apiRef, gridRowCountSelector);

  const start = rowCount === 0 ? 0 : page * pageSize + 1;
  const end = Math.min(rowCount, (page + 1) * pageSize);

  const handlePageChange = (_, value) => {
    apiRef.current.setPage(value - 1);
  };

  return (
    <PaginationContainer>
      <PaginationCount variant="body2">
        {`${start}-${end} of ${rowCount}`}
      </PaginationCount>

      <PaginationButtonWrapper>
        <PaginationToggleButton
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <ExpandMoreIcon
            fontSize="small"
            sx={ExpandIconSx(collapsed)}
          />
        </PaginationToggleButton>
      </PaginationButtonWrapper>

      <PaginationActions>
        <StyledPagination
          color="primary"
          page={page + 1}
          count={Math.ceil(rowCount / pageSize)}
          onChange={handlePageChange}
          size="small"
        />
      </PaginationActions>
    </PaginationContainer>
  );
};

export default CustomPagination;