import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CommonDialogForm from "../../../common/CommonDialogForm";
import {
  getHeaderCellSx,
  getBodyCellSx,
  dateTextSx,
  getTimeTextSx,
  tableContainerSx,
  backButtonWrapperSx,
  backButtonSx,
} from "./PlatformUserAuditDialog.styled";

const STATIC_GROUP_DATA = [
  { id: 1, createdBy: "John Miller", createdDate: "Dec 11, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 2, createdBy: "John Miller", createdDate: "Dec 12, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 3, createdBy: "John Miller", createdDate: "Dec 12, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 4, createdBy: "John Miller", createdDate: "Dec 12, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
  { id: 5, createdBy: "John Miller", createdDate: "Dec 15, 2025", createdTime: "06:15 AM", notes: "Note Content Here" },
];


const HeaderCell = ({ children, theme }) => (
  <TableCell sx={getHeaderCellSx(theme)}>{children}</TableCell>
);

const BodyCell = ({ children, theme }) => (
  <TableCell sx={getBodyCellSx(theme)}>{children}</TableCell>
);


const GroupDialogContent = ({ onClose }) => {
  const theme = useTheme();

  return (
    <Box>
      <TableContainer sx={tableContainerSx}>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderCell theme={theme}>Created By</HeaderCell>
              <HeaderCell theme={theme}>Created On</HeaderCell>
              <HeaderCell theme={theme}>Notes</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {STATIC_GROUP_DATA.map((row) => (
              <TableRow key={row.id} hover>
                <BodyCell theme={theme}>{row.createdBy}</BodyCell>
                <BodyCell theme={theme}>
                  <Typography sx={dateTextSx}>{row.createdDate}</Typography>
                  <Typography sx={getTimeTextSx(theme)}>{row.createdTime}</Typography>
                </BodyCell>
                <BodyCell theme={theme}>{row.notes}</BodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={backButtonWrapperSx}>
        <Button variant="contained" onClick={onClose} sx={backButtonSx}>
          Back
        </Button>
      </Box>
    </Box>
  );
};


const PlatformUserAuditDialog = ({ open, onClose }) => {
  return (
    <CommonDialogForm
      open={open}
      title="Platform User Audit History"
      content={<GroupDialogContent onClose={onClose} />}
      onCancel={onClose}
      onClose={onClose}
      mode="view"
      maxWidth="md"
    />
  );
};

export default PlatformUserAuditDialog;
