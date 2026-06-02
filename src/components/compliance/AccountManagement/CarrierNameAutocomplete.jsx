import { useCallback, useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import CommonTextField from "../../../common/CommonTextField";
import {
  AutocompleteWrapper,
  SuggestionsDropdown,
  SuggestionItem,
  SuggestionText,
  LoadingText,
} from "./CarrierNameAutocomplete.styled";

const MIN_SEARCH_LENGTH = 3;
const DEBOUNCE_DELAY_MS = 300;

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const CarrierSuggestionItem = ({ carrier, index, highlightedIndex, onSelect, onHighlight }) => {
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

const SuggestionsList = ({ suggestions, loadingState, highlightedIndex, onSelect, onMouseEnter }) => {
  if (loadingState) {
    return <LoadingText>Searching...</LoadingText>;
  }

  if (suggestions.length === 0) {
    return <LoadingText>No carriers found</LoadingText>;
  }

  return suggestions.map((carrier, index) => (
    <CarrierSuggestionItem
      key={carrier.carrier_id}
      carrier={carrier}
      index={index}
      highlightedIndex={highlightedIndex}
      onSelect={onSelect}
      onHighlight={onMouseEnter}
    />
  ));
};

const CarrierNameAutocomplete = ({
  control,
  errors,
  disabled,
  fetchCarrierOptions,
  onCarrierSelect,
}) => {
  const suggestionsRef = useRef([]);
  const suppressNextLoadRef = useRef(false);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);

  const debouncedInput = useDebounce(inputValue, DEBOUNCE_DELAY_MS);

  const loadSuggestions = useCallback(
    async (searchTerm) => {
      if (suppressNextLoadRef.current) {
        suppressNextLoadRef.current = false;
        return;
      }

      if (searchTerm.length < MIN_SEARCH_LENGTH) {
        setSuggestions([]);
        suggestionsRef.current = [];
        setShowDropdown(false);
        return;
      }

      setLoadingState(true);
      setShowDropdown(true);

      const results = await fetchCarrierOptions({ carrier_name: searchTerm });

      suggestionsRef.current = results;
      setSuggestions(results);
      setHighlightedIndex(-1);
      setLoadingState(false);
    },
    [fetchCarrierOptions],
  );

  useEffect(() => {
    loadSuggestions(debouncedInput);
  }, [debouncedInput, loadSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCarrier = useCallback(
    async (carrier) => {
      suppressNextLoadRef.current = true;
      setShowDropdown(false);
      setSuggestions([]);
      setInputValue(carrier.carrier_name);

      const fullDetails = await fetchCarrierOptions({ carrier_id: carrier.carrier_id });

      if (fullDetails) {
        onCarrierSelect(fullDetails);
      }
    },
    [fetchCarrierOptions, onCarrierSelect],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (!showDropdown) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestionsRef.current.length - 1 ? prev + 1 : prev,
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (event.key === "Enter" && highlightedIndex >= 0) {
        event.preventDefault();
        const selected = suggestionsRef.current[highlightedIndex];
        if (selected) {
          handleSelectCarrier(selected);
        }
      } else if (event.key === "Escape") {
        setShowDropdown(false);
      }
    },
    [showDropdown, highlightedIndex, handleSelectCarrier],
  );

  const handleHighlight = useCallback((index) => {
    setHighlightedIndex(index);
  }, []);

  const fieldRef = useRef(null);

  const handleChange = useCallback((event) => {
    const value = event.target.value;
    fieldRef.current?.onChange(value);
    setInputValue(value);
  }, []);

  const handleFocus = useCallback(() => {
    if (
      inputValue.length >= MIN_SEARCH_LENGTH &&
      suggestionsRef.current.length > 0
    ) {
      setShowDropdown(true);
    }
  }, [inputValue]);

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name="carrierName"
        control={control}
        render={({ field }) => {
          fieldRef.current = field;

          return (
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
                onChange={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
              />

              {showDropdown && (
                <SuggestionsDropdown>
                  <SuggestionsList
                    suggestions={suggestions}
                    loadingState={loadingState}
                    highlightedIndex={highlightedIndex}
                    onSelect={handleSelectCarrier}
                    onMouseEnter={handleHighlight}
                  />
                </SuggestionsDropdown>
              )}
            </AutocompleteWrapper>
          );
        }}
      />
    </Grid>
  );
};

export default CarrierNameAutocomplete;
