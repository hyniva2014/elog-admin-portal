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

const CustomPagination = ({ collapsed, setCollapsed, disableCollapse = false }) => {
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
  <PaginationContainer
    onClick={disableCollapse ? undefined : () => setCollapsed((prev) => !prev)}
    sx={{ cursor: disableCollapse ? "default" : "pointer" }}
    disablecollapse={disableCollapse ? 1 : 0}
  >
    <PaginationCount variant="body2">
      {`${start}-${end} of ${rowCount}`}
    </PaginationCount>

    {!disableCollapse && (
      <PaginationButtonWrapper>
        <PaginationToggleButton disableRipple>
          <ExpandMoreIcon
            fontSize="small"
            sx={ExpandIconSx(collapsed)}
          />
        </PaginationToggleButton>
      </PaginationButtonWrapper>
    )}

      <PaginationActions>
        <StyledPagination
          color="primary"
          page={page + 1}
          count={Math.ceil(rowCount / pageSize)}
          onChange={handlePageChange}
          size="small"
          onClick={(e) => e.stopPropagation()}
        />
      </PaginationActions>
    </PaginationContainer>
  );
};

export default CustomPagination;
