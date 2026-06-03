import { useCallback, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { useController } from "react-hook-form";
import CommonTextField from "../../../common/CommonTextField";
import { useCarrierAutocomplete } from "./useCarrierAutocomplete";
import {
  AutocompleteWrapper,
  SuggestionsDropdown,
  SuggestionItem,
  SuggestionText,
  LoadingText,
} from "./CarrierNameAutocomplete.styled";

const CarrierSuggestionItem = ({ itemProps: { carrier, index, highlightedIndex }, handlers: { onSelect, onHighlight } }) => {
  const handleMouseDown = useCallback(() => onSelect(carrier), [onSelect, carrier]);
  const handleMouseEnter = useCallback(() => onHighlight(index), [onHighlight, index]);

  return (
    <SuggestionItem
      highlighted={index === highlightedIndex}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
    >
      <SuggestionText>{carrier.carrier_name}</SuggestionText>
    </SuggestionItem>
  );
};

const SuggestionsList = ({ listProps: { suggestions, loadingState, highlightedIndex }, handlers: { onSelect, onMouseEnter } }) => {
  if (loadingState) {
    return <LoadingText>Searching...</LoadingText>;
  }

  if (suggestions.length === 0) {
    return <LoadingText>No carriers found</LoadingText>;
  }

  return suggestions.map((carrier, index) => (
    <CarrierSuggestionItem
      key={carrier.carrier_id}
      itemProps={{ carrier, index, highlightedIndex }}
      handlers={{ onSelect, onHighlight: onMouseEnter }}
    />
  ));
};

const CarrierNameAutocomplete = ({
  formProps: { control, errors },
  carrierProps: { fetchCarrierOptions, onCarrierSelect },
  disabled,
}) => {
  const { field } = useController({ name: "carrierName", control });
  const wrapperRef = useRef(null);

  const {
    inputValue,
    showDropdown,
    suggestions,
    loadingState,
    highlightedIndex,
    handleChange,
    handleFocus,
    handleKeyDown,
    handleHighlight,
    handleSelectCarrier,
    closeDropdown,
  } = useCarrierAutocomplete(fetchCarrierOptions);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  const handleInputChange = useCallback(
    (event) => {
      const value = event.target.value;
      field.onChange(value);
      handleChange(value);
    },
    [field, handleChange],
  );

  const handleCarrierSelect = useCallback(
    async (carrier) => {
      const fullDetails = await handleSelectCarrier(carrier);
      if (fullDetails) {
        onCarrierSelect(fullDetails);
      }
    },
    [handleSelectCarrier, onCarrierSelect],
  );

  return (
    <Grid item xs={12} sm={6}>
      <AutocompleteWrapper ref={wrapperRef}>
        <CommonTextField
          {...field}
          label="Carrier Name"
          required
          disabled={disabled}
          error={!!errors.carrierName}
          helperText={errors.carrierName?.message}
          fullWidth
          size="small"
          autoComplete="off"
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />

        {showDropdown && (
          <SuggestionsDropdown>
            <SuggestionsList
              listProps={{ suggestions, loadingState, highlightedIndex }}
              handlers={{ onSelect: handleCarrierSelect, onMouseEnter: handleHighlight }}
            />
          </SuggestionsDropdown>
        )}
      </AutocompleteWrapper>
    </Grid>
  );
};

export default CarrierNameAutocomplete;
