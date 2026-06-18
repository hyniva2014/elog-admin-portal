import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  ActionBox,
  BackButton,
  CreatedOnWrapper,
  CreatedDateText,
  CreatedTimeText,
  DataGridWrapper,
  ActionContainer,
  GroupIconImage,
} from "./UserManagementGroupDialog.styles";

const theme = createTheme();

const renderWithTheme = (component) =>
  render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );

describe("UserManagementGroupDialog.styles", () => {
  test("renders ActionBox", () => {
    renderWithTheme(<ActionBox data-testid="action-box" />);

    expect(screen.getByTestId("action-box")).toBeInTheDocument();
  });

  test("renders BackButton", () => {
    renderWithTheme(<BackButton>Back</BackButton>);

    expect(
      screen.getByRole("button", { name: /back/i })
    ).toBeInTheDocument();
  });

  test("renders CreatedOnWrapper", () => {
    renderWithTheme(
      <CreatedOnWrapper data-testid="created-wrapper" />
    );

    expect(
      screen.getByTestId("created-wrapper")
    ).toBeInTheDocument();
  });

  test("renders CreatedDateText", () => {
    renderWithTheme(
      <CreatedDateText>Date Text</CreatedDateText>
    );

    expect(screen.getByText("Date Text")).toBeInTheDocument();
  });

  test("renders CreatedTimeText", () => {
    renderWithTheme(
      <CreatedTimeText>Time Text</CreatedTimeText>
    );

    expect(screen.getByText("Time Text")).toBeInTheDocument();
  });

  test("renders DataGridWrapper", () => {
    renderWithTheme(
      <DataGridWrapper data-testid="grid-wrapper" />
    );

    expect(
      screen.getByTestId("grid-wrapper")
    ).toBeInTheDocument();
  });

  test("renders ActionContainer", () => {
    renderWithTheme(
      <ActionContainer data-testid="action-container" />
    );

    expect(
      screen.getByTestId("action-container")
    ).toBeInTheDocument();
  });

  test("renders GroupIconImage", () => {
    renderWithTheme(
      <GroupIconImage data-testid="group-icon" />
    );

    expect(
      screen.getByTestId("group-icon")
    ).toBeInTheDocument();
  });
});