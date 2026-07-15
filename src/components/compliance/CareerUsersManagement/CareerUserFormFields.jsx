import {
  Grid,
  Box,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import dayjs from "dayjs";
import CommonTextField from "../../../common/CommonTextField";
import CommonSingleDateSelector from "../../../common/CommonSingleDateSelector";
import CommonAutocompleteDropdown from "../../../common/CommonAutocompleteDropdown";
import CommonMultiSelectDropdown from "../../../common/CommonMultiSelectDropdown";
import CommonFileUpload from "../../../common/CommonFileUpload";
import ImagePreview from "./HeaderComponents/ImagePreview";
import {
  citizenship_options,
  employment_type_options,
  LANGUAGE_OPTIONS,
  genderOptions,
  filterNameInput,
  formatZipCode,
  countryCodeToName,
  RegistrationState,
  DRIVER_STATUS_FORM,
  MEXICO_STATE_SHORT_NAME_TO_CODE,
} from "./Constants";
import FormSection from "./HeaderComponents/FormSection";
import { CategoryTitle } from "./CareerManagement.styled";
import BasicInformationSection from "./FormSections/BasicInformationSection";
import ContactInformationSection from "./FormSections/ContactInformationSection";
import EmploymentDetailsSection from "./FormSections/EmploymentDetailsSection";
import EmploymentHistorySection from "./FormSections/EmploymentHistorySection";
import DocumentationSection from "./FormSections/DocumentationSection";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/\D/g, "");
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  }
  if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

const formatSSN = (value) => {
  if (!value) return value;
  const ssn = value.replace(/\D/g, "");
  if (ssn.length <= 3) {
    return ssn;
  }
  if (ssn.length <= 5) {
    return `${ssn.slice(0, 3)}-${ssn.slice(3)}`;
  }
  return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 9)}`;
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const geocodeAddress = async (address) => {
  try {
    if (!GOOGLE_API_KEY) {
      return null;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`,
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      let bestResult = null;
      let resultWithPostalCode = null;

      for (const result of data.results) {
        const addressComponents = result.address_components;
        const hasPostalCode = addressComponents.some((comp) =>
          comp.types.includes("postal_code"),
        );

        if (hasPostalCode && !resultWithPostalCode) {
          resultWithPostalCode = result;
        }
        if (!bestResult) {
          bestResult = result;
        }
      }

      const selectedResult = resultWithPostalCode || bestResult;
      const addressComponents = selectedResult.address_components;

      let city = "";
      let state = "";
      let country = "";
      let zipCode = "";

      addressComponents.forEach((component) => {
        const types = component.types;

        if (
          types.includes("locality") ||
          types.includes("sublocality") ||
          types.includes("neighborhood")
        ) {
          city = component.long_name;
        } else if (types.includes("country")) {
          country = component.short_name === "US" ? "USA" : component.short_name || component.long_name;
        } else if (types.includes("administrative_area_level_1")) {
          if (MEXICO_STATE_SHORT_NAME_TO_CODE[component.short_name]) {
            state = MEXICO_STATE_SHORT_NAME_TO_CODE[component.short_name];
          } else {
            state = component.short_name || component.long_name;
          }
        } else if (types.includes("postal_code")) {
          zipCode = component.long_name;
        }
      });

      const resultData = { city, state, country, zipCode };
      return resultData;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const empHistoryItemSchema = yup.object().shape({
  emp_history_details: yup
    .string()
    .required("Employer name is required")
    .matches(
      /^[A-Za-z0-9\s'-]+$/,
      "Only letters, numbers, spaces, hyphens allowed",
    )
    .min(2, "Minimum 2 characters")
    .max(50, "Max 50 characters"),
  emp_history_start_date: yup.mixed().required("Start date is required"),
  emp_history_end_date: yup
    .mixed()
    .required("End date is required")
    .test(
      "is-after-fromDate",
      "End date must be after Start date",
      function (value) {
        const { emp_history_start_date } = this.parent;
        if (!value || !emp_history_start_date) return true;
        return (
          dayjs(value).isAfter(dayjs(emp_history_start_date)) ||
          dayjs(value).isSame(dayjs(emp_history_start_date))
        );
      },
    ),
  emp_history_duration: yup.string().optional(),
});

export const userManagementValidationSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  middle_name: yup.string().optional("Middle name is required"),
  last_name: yup.string().required("Last Name is required"),
  dob: yup.mixed()
    .required("Date of Birth is required")
    .test("min-age", "Age must be at least 18 years", (value) => {
      if (!value) return true;
      const dob = dayjs(value);
      return dayjs().diff(dob, "year") >= 18;
    }),
  gender: yup.mixed().required("Gender is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  hire_date: yup.mixed().required("Hiring Date is required"),
  address_line1: yup.string().required("Address Line is required"),
  city: yup.string().required("City is required"),
  secondary_address_line: yup.string().optional(),
  secondary_city: yup.string().optional(),
  secondary_states: yup.string().optional(),
  secondary_country: yup.string().optional(),
  secondary_zip_code: yup
    .string()
    .transform((value) => value?.replace(/[^A-Za-z0-9]/g, ""))
    .notRequired()
    .test(
      "valid-zip",
      "ZIP/Postal Code must be 5 to 10 letters or numbers",
      (value) => {
        if (!value) return true;
        return /^[A-Za-z0-9]{5,10}$/.test(value);
      },
    ),
  phone: yup
    .string()
    .required("Phone Number is required")
    .matches(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      "Phone number must be in format (XXX) XXX-XXXX",
    ),
  alternate_contact_number: yup
    .string()
    .optional("Phone Number is required")
    .nullable()
    .test(
      "is-valid-phone",
      "Phone number must be in format (XXX) XXX-XXXX",
      (value) => {
        if (!value) return true;
        return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
      },
    ),
  states: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  status: yup.mixed().required("Status is required"),
  employment_type: yup.mixed().required("Employment Type is required"),
  zip_code: yup
    .string()
    .ensure()
    .required("Zip/Postal Code is required")
    .min(5, "Zip/Postal Code must be at least 5 characters")
    .max(10, "Zip/Postal Code must not exceed 10 characters")
    .test(
      "valid-zipcode",
      "Invalid ZIP/Postal Code format (USA: 12345 or 12345-6789, Canada: A1A 1A1, Mexico: 12345)",
      function (value) {
        if (!value || value === "undefined" || value === "null") return false;
        const cleanValue = value.replace(/\s/g, "").toUpperCase();
        const usaZip = /^\d{5}(-?\d{4})?$/;
        const canadaPostal = /^[A-Z]\d[A-Z][\s-]?\d[A-Z]\d$/;
        const mexicoZip = /^\d{5}$/;
        return (
          usaZip.test(cleanValue) ||
          canadaPostal.test(value.toUpperCase()) ||
          mexicoZip.test(cleanValue)
        );
      },
    ),
  profile_photo: yup
    .array()
    .test("profile_photo", "Profile photo is required", function (value) {
      const existingProfileFiles =
        this.options.context?.existingProfileFiles || [];
      if (existingProfileFiles.length > 0) {
        return true;
      }
      return value && value.length > 0;
    }),
  username: yup.string().optional(),
  last_drug_test: yup.mixed().required("Last Drug Test is required"),
  ssn: yup
    .string()
    .required("SSN is required")
    .matches(/^\d{3}-\d{2}-\d{4}$/, "SSN must be in format XXX-XX-XXXX"),
  role: yup.number().required("Role is required").typeError("Role is required"),
  language: yup
    .array()
    .of(yup.number())
    .min(1, "At least one language is required")
    .required("Language is required")
    .typeError("Language is required"),
  citizenship: yup.mixed().required("Citizenship is required"),
  passport_visa_number: yup
    .string()
    .test(
      "passport-required",
      "Passport/Visa Number is required for Non-USA citizenship",
      function (value) {
        const citizenship = this.parent.citizenship;
        if (citizenship !== 1) {
          return value && value.trim() !== "";
        }
        return true;
      },
    )
    .test(
      "passport-alphanumeric",
      "Special characters are not allowed",
      function (value) {
        const citizenship = this.parent.citizenship;
        if (citizenship !== 1 && value) {
          return /^[A-Za-z0-9]+$/.test(value);
        }
        return true;
      },
    )
    .test(
      "passport-min-length",
      "Passport/Visa Number must be at least 6 characters",
      function (value) {
        const citizenship = this.parent.citizenship;
        if (citizenship !== 1 && value) {
          return value.length >= 6;
        }
        return true;
      },
    )
    .test(
      "passport-max-length",
      "Passport/Visa Number cannot exceed 20 characters",
      function (value) {
        const citizenship = this.parent.citizenship;
        if (citizenship !== 1 && value) {
          return value.length <= 20;
        }
        return true;
      },
    ),
  passport_visa_expiry: yup
    .mixed()
    .test(
      "passport-expiry-required",
      "Passport/Visa Expiry Date is required for Non-USA citizenship",
      function (value) {
        const citizenship = this.parent.citizenship;
        if (citizenship !== 1) {
          return value !== null && value !== undefined;
        }
        return true;
      },
    )
    .test(
      "passport-expiry-future",
      "Passport/Visa Expiry Date cannot be in the past",
      function (value) {
        const citizenship = this.parent.citizenship;
        if (citizenship !== 1 && value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return new Date(value) >= today;
        }
        return true;
      },
    )
    .nullable(),
  work_permit: yup
    .mixed()
    .test(
      "work-permit-expiry-required",
      "Work Permit Expiry Date is required for Non-USA citizenship",
      function (value) {
        const citizenship = this.parent.citizenship;
        if (citizenship !== 1) {
          return value !== null && value !== undefined;
        }
        return true;
      },
    )
    .test(
      "work-permit-expiry-future",
      "Work Permit Expiry Date cannot be in past",
      function (value) {
        const citizenship = this.parent.citizenship;
        if (citizenship !== 1 && value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return new Date(value) >= today;
        }
        return true;
      },
    )
    .nullable(),
  citizenship_country: yup
    .string()
    .test(
      "work-permit-country-required",
      "Country is required for Others citizenship",
      function (value) {
        const citizenship = this.parent.citizenship;
        if (citizenship === 4) {
          return value && value.trim() !== "";
        }
        return true;
      },
    ),
  termination_date: yup
    .mixed()
    .nullable()
    .test(
      "termination-date-required",
      "Termination Date is required for Inactive status",
      function (value) {
        const status = this.parent.status;
        if (status === 2) {
          return value !== null && value !== undefined;
        }
        return true;
      },
    )
    .test(
      "termination-date",
      "Termination Date cannot be earlier than Hire Date",
      function (value) {
        if (!value) return true;
        const hireDate = this.parent.hire_date;
        if (!hireDate) return true;
        return new Date(value) >= new Date(hireDate);
      },
    ),
  contract_information: yup
    .string()
    .test(
      "contract-required",
      "Contract Information is required for Contract employment type",
      function (value) {
        const employmentType = this.parent.employment_type;
        if (employmentType === 2) {
          return value && value.trim() !== "";
        }
        return true;
      },
    )
    .test(
      "contract-max-length",
      "Contract Information cannot exceed 500 characters",
      function (value) {
        const employmentType = this.parent.employment_type;
        if (employmentType === 2) {
          return !value || value.length <= 500;
        }
        return true;
      },
    ),
  medical_document_files: yup.array().optional(),
  emp_history: yup.array().when("total_years_of_experince", {
    is: (val) => Number(val) > 0,
    then: (schema) =>
      schema
        .of(empHistoryItemSchema)
        .min(1, "At least one employment history is required"),
    otherwise: (schema) =>
      schema.of(
        yup.object().shape({
          emp_history_details: yup.string().optional(),
          emp_history_start_date: yup.mixed().nullable().optional(),
          emp_history_end_date: yup.mixed().nullable().optional(),
          emp_history_duration: yup.string().optional(),
        }),
      ),
  }),
  total_years_of_experince: yup
    .string()
    .optional()
    .nullable()
    .matches(/^\d*$/, "Total years of experience must be a number"),
});

const CareerUserFormFields = ({
  control,
  errors,
  watch,
  setValue,
  trigger,
  clearErrors,
  editMode,
  existingProfileFiles,
  setExistingProfileFiles,
  handleImagePreview,
  handleRemoveExistingFile,
  dynamicStates,
  loadingStates,
  secondaryDynamicStates,
  loadingSecondaryStates,
  existingMedicalFiles,
  setExistingMedicalFiles,
  medicalUploaded,
  setMedicalUploaded,
  imageUploaded,
  setImageUploaded,
  roles,
  handleAddressChange,
  handleSecondaryAddressChange,
  handleAddEmployment,
  handleRemoveEmployment,
  isInitializing,
  mode,
  sameAsPrimary,
  selectedCountry,
  selectedCitizenship,
  selectedEmploymentType,
  selectedStatus,
  selectedSecondaryCountry,
  handleSameAddressToggle,
}) => {
  const sectionProps = {
    control,
    errors,
    watch,
    setValue,
    trigger,
    clearErrors,
    editMode,
    existingProfileFiles,
    setExistingProfileFiles,
    handleImagePreview,
    handleRemoveExistingFile,
    dynamicStates,
    loadingStates,
    secondaryDynamicStates,
    loadingSecondaryStates,
    existingMedicalFiles,
    setExistingMedicalFiles,
    medicalUploaded,
    setMedicalUploaded,
    imageUploaded,
    setImageUploaded,
    roles,
    handleAddressChange,
    handleSecondaryAddressChange,
    handleAddEmployment,
    handleRemoveEmployment,
    isInitializing,
    mode,
    sameAsPrimary,
    selectedCountry,
    selectedCitizenship,
    selectedEmploymentType,
    selectedStatus,
    selectedSecondaryCountry,
    handleSameAddressToggle,
  };
  return (
    <>
      <BasicInformationSection {...sectionProps} />

      <ContactInformationSection {...sectionProps} />

      <EmploymentDetailsSection {...sectionProps} />

      <EmploymentHistorySection {...sectionProps} />

      <DocumentationSection {...sectionProps} />
    </>
  );
};

export default CareerUserFormFields;
