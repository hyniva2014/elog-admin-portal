import { useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "./useDebounce";
import { MIN_SEARCH_LENGTH, DEBOUNCE_DELAY_MS, SELECTION_SUPPRESSION_MS } from "./Constants";

export const useCarrierAutocomplete = (fetchCarrierOptions) => {
  const suggestionsRef = useRef([]);
  const suppressSearchUntilRef = useRef(0);
  const lastSearchedTermRef = useRef("");
  const isRequestInProgressRef = useRef(false);
  const fetchCarrierOptionsRef = useRef(fetchCarrierOptions);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const debouncedInput = useDebounce(inputValue, DEBOUNCE_DELAY_MS);

  fetchCarrierOptionsRef.current = fetchCarrierOptions;

  const loadSuggestions = useCallback(
    async (searchTerm) => {
      const now = Date.now();
      if (now < suppressSearchUntilRef.current) {
        return;
      }

      if (isRequestInProgressRef.current) {
        return;
      }

      if (searchTerm === lastSearchedTermRef.current) {
        return;
      }

      if (searchTerm.length < MIN_SEARCH_LENGTH) {
        setSuggestions([]);
        suggestionsRef.current = [];
        setShowDropdown(false);
        lastSearchedTermRef.current = "";
        return;
      }

      lastSearchedTermRef.current = searchTerm;
      isRequestInProgressRef.current = true;
      setLoadingState(true);
      setShowDropdown(true);

      try {
        const results = await fetchCarrierOptionsRef.current({ carrier_name: searchTerm });

        suggestionsRef.current = results;
        setSuggestions(results);
        setHighlightedIndex(-1);
      } finally {
        isRequestInProgressRef.current = false;
        setLoadingState(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadSuggestions(debouncedInput);
  }, [debouncedInput, loadSuggestions]);

  const handleSelectCarrier = useCallback(
    async (carrier) => {
      suppressSearchUntilRef.current = Date.now() + SELECTION_SUPPRESSION_MS;
      setShowDropdown(false);
      setSuggestions([]);
      setInputValue(carrier.carrier_name);

      const fullDetails = await fetchCarrierOptions({ carrier_id: carrier.carrier_id });

      return fullDetails;
    },
    [fetchCarrierOptions],
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

  const handleChange = useCallback((value) => {
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

  const closeDropdown = useCallback(() => {
    setShowDropdown(false);
  }, []);

  return {
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
  };
};
