import {
  Grid,
  MenuItem,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  countryCodeToName,
} from "./Constants";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import {
  ButtonContainer,
  CancelButton,
  SubmitButton,
  ImagePreviewModal,
  ImagePreviewContainer,
  ClosePreviewButton,
  PreviewImageSx,
} from "./CareerManagement.styled";
import { useServices } from "../../../services/services";
import UserPageHeader from "./HeaderComponents/UserPageHeader";
import CareerUserFormFields, {
  userManagementValidationSchema,
  geocodeAddress,
} from "./CareerUserFormFields";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

const CareerUserForm = ({
  formData,
  onSubmit,
  mode,
  editMode,
  setEditMode,
  handleBack,
  breadcrumbs,
  canUpdate,
  headerOnly = false,
  onFormValuesChange,
  fetchUserData,
}) => {
  const navigate = useNavigate();
  const { fetchApi } = useServices();
  const [existingProfileFiles, setExistingProfileFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [existingMedicalFiles, setExistingMedicalFiles] = useState([]);
  const [deletedDocumentIds, setDeletedDocumentIds] = useState([]);
  const [medicalUploaded, setMedicalUploaded] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [showEmploymentHistory, setShowEmploymentHistory] = useState(true);
  const [dynamicStates, setDynamicStates] = useState([]);

  const handlePreviewModalClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClosePreview();
    }
  };

  const stopPreviewContainerPropagation = (event) => {
    event.stopPropagation();
  };
  const [loadingStates, setLoadingStates] = useState(false);
  const [secondaryDynamicStates, setSecondaryDynamicStates] = useState([]);
  const [loadingSecondaryStates, setLoadingSecondaryStates] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const deletedIdsRef = useRef([]);
//   const rolesOptions = useSelector((state) => state.userFilterSlice.roles);
const rolesOptions = useSelector(
  (state) => state.userFilterSlice?.roles || [],
);

//   const filteredRoles = rolesOptions?.filter(
//     (role) => role.label.toLowerCase() !== "driver",
//   );
const filteredRoles = rolesOptions.filter(
  (role) => role.label?.toLowerCase() !== "driver",
);
  useEffect(() => {
    const existing = control._formValues.emp_history;

    if (!existing || existing.length === 0) {
      setValue("emp_history", [
        {
          emp_history_details: "",
          emp_history_start_date: null,
          emp_history_end_date: null,
          emp_history_duration: "",
        },
      ]);
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    watch,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(userManagementValidationSchema),
    defaultValues: {
      language: [1],
    },
    context: {
      existingProfileFiles,
      editMode,
    },
  });

  const selectedCountry = watch("country");
  const secondaryCountry = watch("secondary_country");
  const sameAsPrimary = watch("same_as_primary");
  const formValues = watch();

  useEffect(() => {
    if (selectedCountry) {
      loadStatesByCountry(selectedCountry, false);
    } else {
      setDynamicStates([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (onFormValuesChange && formValues) {
      onFormValuesChange(formValues);
    }
  }, [formValues, onFormValuesChange]);

  useEffect(() => {
    if (secondaryCountry) {
      loadStatesByCountry(secondaryCountry, true);
    } else {
      setSecondaryDynamicStates([]);
    }
  }, [secondaryCountry]);

  const selectedSecondaryCountry = watch("secondary_country");

  useEffect(() => {
    if (selectedSecondaryCountry) {
      loadStatesByCountry(selectedSecondaryCountry, true);
    } else {
      setSecondaryDynamicStates([]);
    }
  }, [selectedSecondaryCountry]);

//   useEffect(() => {
//     if (selectedSecondaryCountry) {
//       setValue("secondary_states", "");
//     }
//   }, [selectedSecondaryCountry, setValue]);

  const handleAddEmployment = () => {
    setShowEmploymentHistory(true);

    const current = control._formValues.emp_history || [];

    const newItem = {
      emp_history_details: "",
      emp_history_start_date: null,
      emp_history_end_date: null,
      emp_history_duration: "",
    };

    setValue("emp_history", [...current, newItem]);
  };

  const handleRemoveEmployment = (index) => {
    const current = watch("emp_history") || [];

    const updated = current.filter((_, i) => i !== index);

    setValue("emp_history", updated);
  };

  const loadStatesByCountry = async (countryCode, isSecondary = false) => {
    if (isSecondary) {
      setLoadingSecondaryStates(true);
    } else {
      setLoadingStates(true);
    }

    try {
      const countryName = countryCodeToName[countryCode];

      if (!countryName) {
        console.warn("Invalid country code:", countryCode);
        if (isSecondary) {
          setSecondaryDynamicStates([]);
        } else {
          setDynamicStates([]);
        }
        return;
      }

      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: countryName,
          }),
        },
      );

      const data = await response.json();

      if (!data?.data?.states) {
        console.error("Invalid API response:", data);
        if (isSecondary) {
          setSecondaryDynamicStates([]);
        } else {
          setDynamicStates([]);
        }
        return;
      }

      const states = data.data.states.map((state) => ({
        label: state.name,
        value: state.state_code,
      }));

      if (isSecondary) {
        setSecondaryDynamicStates(states);
      } else {
        setDynamicStates(states);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      if (isSecondary) {
        setSecondaryDynamicStates([]);
      } else {
        setDynamicStates([]);
      }
    } finally {
      if (isSecondary) {
        setLoadingSecondaryStates(false);
      } else {
        setLoadingStates(false);
      }
    }
  };

  const prepareFormResetData = (data) => {
    return {
      first_name: data.first_name || "",
      middle_name: data.middle_name || "",
      last_name: data.last_name || "",
      gender:
        data.gender !== null && data.gender !== undefined
          ? Number(data.gender)
          : null,
      profile_photo: data.profile_pic
        ? [
            {
              url: data.profile_pic,
              name: data.profile_pic.split("/").pop(),
            },
          ]
        : data.profile_photo || [],
      dob: data.dob ? dayjs(data.dob) : null,
      email: data.email || "",
      hire_date: data.hire_date ? dayjs(data.hire_date) : null,
      address_line1: data.address_line1 || "",
      city: data.city || "",
      states: data.states || "",
      zip_code: data.zip_code || "",
      country: data.country || "",
      citizenship_country: data.work_permit_country || "",
      phone: data.phone || "",
      alternate_contact_number: data.alternate_contact_number || "",
      secondary_address_line: data.secondary_address_line || "",
      secondary_city: data.secondary_city || "",
      secondary_states: data.secondary_states || "",
      secondary_zip_code: data.secondary_zip_code || "",
      secondary_country: data.secondary_country || "",
      same_as_primary:
        data.same_as_primary ||
        (data.secondary_address_line === data.address_line1 &&
          data.secondary_city === data.city &&
          data.secondary_states === data.states &&
          data.secondary_country === data.country &&
          data.secondary_zip_code === data.zip_code &&
          data.secondary_address_line !== ""),
      employment_type: data.employment_type ?? null,
      status: data.status || "",
      username: data.username || "",
      last_drug_test: data.last_drug_test ? dayjs(data.last_drug_test) : null,
      ssn: data.ssn || "",
      role: data.role || "",
      language: Array.isArray(data.language)
        ? data.language
        : typeof data.language === "string"
          ? data.language
              .split(",")
              .map((l) => Number(l.trim()))
              .filter((l) => !isNaN(l))
          : [Number(data.language) || 1],
      citizenship: data.citizenship ?? null,
      total_years_of_experince: data.total_years_of_experince || "",
      passport_visa_number: data.passport_visa_number || "",
      passport_visa_expiry: data.passport_visa_expiry
        ? dayjs(data.passport_visa_expiry)
        : null,
      work_permit: data.work_permit ? dayjs(data.work_permit) : null,
      work_permit_country: data.work_permit_country || "",
      termination_date: data.termination_date
        ? dayjs(data.termination_date)
        : null,
      contract_information: data.contract_information || "",
      medical_document_files: [], 
      emp_history: Array.isArray(data.emp_history)
        ? data.emp_history.map((item) => ({
            emp_history_details: item.emp_history_details || "",
            emp_history_start_date: item.emp_history_start_date
              ? dayjs(item.emp_history_start_date)
              : null,
            emp_history_end_date: item.emp_history_end_date
              ? dayjs(item.emp_history_end_date)
              : null,
            emp_history_duration: item.emp_history_duration || "",
          }))
        : [],
      insurance_number: data.insurance_number || "",
      insurance_state: data.insurance_state || "",
      policy_number: data.policy_number || "",
      created_by: data.created_by || "",
    };
  };

  useEffect(() => {
    if (mode === "edit" && formData && Object.keys(formData).length > 0) {
      setIsInitializing(true);
      setFiles([]);
      console.log("Medical files from API:", {
        medical_files: formData.medical_files,
        documents: formData.documents,
        allKeys: Object.keys(formData),
      });

      if (formData?.medical_files?.length || formData?.documents?.length) {
        const medicalFiles = formData.medical_files || formData.documents || [];
        console.log("Processing medical files:", medicalFiles);
        const processedFiles = medicalFiles
          .map((file) => {
            let fileName = "";
            let fileUrl = "";

            if (typeof file === "string") {
              fileName = file.split("/").pop();
              fileUrl = file;
            } else if (file && typeof file === "object") {
              if (file.document_path) {
                fileName =
                  file.document_name ||
                  file.document_path.split("/").pop() ||
                  "unknown";
                fileUrl = file.document_path;
              } else if (file.url) {
                fileName = file.url.split("/").pop() || file.name || "unknown";
                fileUrl = file.url;
              } else if (file instanceof File) {
                fileName = file.name;
                fileUrl = URL.createObjectURL(file);
              } else {
                fileName = "unknown";
                fileUrl = "";
              }
            } else {
              fileName = "unknown";
              fileUrl = "";
            }

            return {
              id: file.document_id,
              name: fileName,
              url: fileUrl,
              isExisting: true,
            };
          })
          .filter((file) => file.url);

        console.log("Processed medical files for preview:", processedFiles);
        console.log("Setting existingMedicalFiles to:", processedFiles);
        setExistingMedicalFiles(processedFiles);
        setMedicalUploaded(true);
      } else {
        console.log("No medical files found, clearing existing files");
        setExistingMedicalFiles([]);
        setMedicalUploaded(false);
      }

      const primaryAddress = formData.primary_address || {};
      const secondaryAddress = formData.secondary_address || {};

    //   reset(prepareFormResetData(formData));
      const resetData = {
        first_name: formData.first_name || "",
        middle_name: formData.middle_name || "",
        last_name: formData.last_name || "",
        gender:
          formData.gender !== null && formData.gender !== undefined
            ? Number(formData.gender)
            : null,

        profile_photo: formData.profile_pic
          ? [
              {
                url: formData.profile_pic,
                name: formData.profile_pic.split("/").pop(),
              },
            ]
          : formData.profile_photo || [],

        dob: formData.dob ? dayjs(formData.dob) : null,
        email: formData.email || "",
        hire_date: formData.hire_date ? dayjs(formData.hire_date) : null,
        citizenship_country: formData.country || "",

        address_line1: primaryAddress.street || "",
        city: primaryAddress.city || "",
        states: primaryAddress.state || "",
        zip_code: primaryAddress.zipcode || "",
        country: primaryAddress.country || "",

        phone: formData.phone || "",
        alternate_contact_number: formData.alternate_contact_number || "",
        total_years_of_experince: formData.total_years_of_experince || "",

        secondary_address_line: secondaryAddress.street || "",
        secondary_city: secondaryAddress.city || "",
        secondary_states: secondaryAddress.state || "",
        secondary_zip_code: secondaryAddress.zipcode || "",
        secondary_country: secondaryAddress.country || "",

        same_as_primary:
          formData.same_as_primary ||
          (secondaryAddress.street === primaryAddress.street &&
            secondaryAddress.city === primaryAddress.city &&
            secondaryAddress.state === primaryAddress.state &&
            secondaryAddress.country === primaryAddress.country &&
            secondaryAddress.zipcode === primaryAddress.zipcode &&
            secondaryAddress.street !== "" &&
            secondaryAddress.street !== undefined),

        employment_type: formData.employment_type ?? null,
        status: formData.status || "",

        username: formData.username || "",
        last_drug_test: formData.last_drug_test
          ? dayjs(formData.last_drug_test)
          : null,

        ssn: formData.ssn || "",
        role: formData.role || "",

        language: Array.isArray(formData.language)
          ? formData.language
          : typeof formData.language === "string"
            ? formData.language
                .split(",")
                .map((l) => Number(l.trim()))
                .filter((l) => !isNaN(l))
            : [Number(formData.language) || 1],

        citizenship: formData.citizenship ?? null,

        passport_visa_number: formData.passport_visa_number || "",
        passport_visa_expiry: formData.passport_visa_expiry
          ? dayjs(formData.passport_visa_expiry)
          : null,

        work_permit: formData.work_permit ? dayjs(formData.work_permit) : null,
        work_permit_country: formData.work_permit_country || "",

        termination_date: formData.termination_date
          ? dayjs(formData.termination_date)
          : null,

        contract_information: formData.contract_information || "",

        medical_document_files: [], 

        emp_history: Array.isArray(formData.emp_history)
          ? formData.emp_history.map((item) => ({
              emp_history_details: item.emp_history_details || "",
              emp_history_start_date: item.emp_history_start_date
                ? dayjs(item.emp_history_start_date)
                : null,
              emp_history_end_date: item.emp_history_end_date
                ? dayjs(item.emp_history_end_date)
                : null,
              emp_history_duration: item.emp_history_duration || "",
            }))
          : [],

        insurance_number: formData.insurance_number || "",
        insurance_state: formData.insurance_state || "",
        policy_number: formData.policy_number || "",
        created_by: formData.created_by || "",
      };

      reset(resetData);

      if (formData.profile_pic) {
        setExistingProfileFiles([
          {
            name: formData.profile_pic.split("/").pop(),
            url: formData.profile_pic,
          },
        ]);
      } else {
        setExistingProfileFiles([]);
      }
       setTimeout(() => {
        setIsInitializing(false);
      }, 100);

    }
  }, [formData, mode, reset]);

  useEffect(() => {
  }, [existingMedicalFiles]);

  const handleCancelEdit = async () => {
    console.log("handleCancelEdit called", { mode, formData, fetchUserData });
    if (mode === "edit" && formData && Object.keys(formData).length > 0) {
      if (fetchUserData) {
        console.log("Calling fetchUserData...");
        await fetchUserData();
        console.log("fetchUserData completed");
      } else {
        console.log("fetchUserData is not defined");
      }
      setDeletedDocumentIds([]);
    } else {
      reset({
        language: [1],
        emp_history: [
          {
            emp_history_details: "",
            emp_history_start_date: null,
            emp_history_end_date: null,
            emp_history_duration: "",
          },
        ],
      });
      setFiles([]);
      setExistingProfileFiles([]);
      setExistingMedicalFiles([]);
      setMedicalUploaded(false);
      setImageUploaded(false);
    }
    setEditMode(false);
    if (setEditMode) setEditMode(false);
  };

  const handleDiscard = () => {
    if (formData && Object.keys(formData).length > 0) {
      reset(prepareFormResetData(formData));
      setDeletedDocumentIds([]);
      setFiles([]);
      if (formData.profile_pic) {
        setExistingProfileFiles([
          {
            name: formData.profile_pic.split("/").pop(),
            url: formData.profile_pic,
          },
        ]);
      } else {
        setExistingProfileFiles([]);
      }

      if (formData?.medical_files?.length || formData?.documents?.length) {
        const medicalFiles = formData.medical_files || formData.documents || [];
        const processedFiles = medicalFiles
          .map((file) => {
            let fileName = "";
            let fileUrl = "";
            if (typeof file === "string") {
              fileName = file.split("/").pop();
              fileUrl = file;
            } else if (file && typeof file === "object") {
              if (file.document_path) {
                fileName =
                  file.document_name ||
                  file.document_path.split("/").pop() ||
                  "unknown";
                fileUrl = file.document_path;
              } else if (file.url) {
                fileName = file.url.split("/").pop() || file.name || "unknown";
                fileUrl = file.url;
              } else if (file instanceof File) {
                fileName = file.name;
                fileUrl = URL.createObjectURL(file);
              } else {
                fileName = "unknown";
                fileUrl = "";
              }
            } else {
              fileName = "unknown";
              fileUrl = "";
            }
            return {
              id: file.document_id,
              name: fileName,
              url: fileUrl,
              isExisting: true,
            };
          })
          .filter((file) => file.url);
        setExistingMedicalFiles(processedFiles);
        setMedicalUploaded(true);
      } else {
        setExistingMedicalFiles([]);
        setMedicalUploaded(false);
      }
    } else {
      reset({
        language: [1],
        emp_history: [
          {
            emp_history_details: "",
            emp_history_start_date: null,
            emp_history_end_date: null,
            emp_history_duration: "",
          },
        ],
      });
      setFiles([]);
      setExistingProfileFiles([]);
      setExistingMedicalFiles([]);
      setMedicalUploaded(false);
      setImageUploaded(false);
    }
    setEditMode(false);
  };

  const handleSaveChanges = () => {
    handleSubmit(submitHandler)();
    setEditMode(false);
  };

  const submitHandler = (data) => {
    const errors = {};
    if (
      !data.employment_type ||
      data.employment_type === "" ||
      data.employment_type === null ||
      data.employment_type === undefined
    ) {
      errors.employment_type = "Employment Type is required";
    }
    if (
      !data.citizenship ||
      data.citizenship === "" ||
      data.citizenship === null ||
      data.citizenship === undefined
    ) {
      errors.citizenship = "Citizenship is required";
    }

    if (data.citizenship !== 1) {
      if (
        !data.passport_visa_number ||
        data.passport_visa_number.trim() === ""
      ) {
        errors.passport_visa_number =
          "Passport/Visa Number is required for Non-USA citizenship";
      } else if (!/^[A-Za-z0-9]+$/.test(data.passport_visa_number)) {
        errors.passport_visa_number = "Special characters are not allowed";
      } else if (data.passport_visa_number.length > 20) {
        errors.passport_visa_number =
          "Passport/Visa Number cannot exceed 20 characters";
      }

      if (!data.passport_visa_expiry) {
        errors.passport_visa_expiry =
          "Passport/Visa Expiry Date is required for Non-USA citizenship";
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(data.passport_visa_expiry) < today) {
          errors.passport_visa_expiry =
            "Passport/Visa Expiry Date cannot be in past";
        }
      }

      if (!data.work_permit) {
        errors.work_permit =
          "Work Permit Expiry Date is required for Non-USA citizenship";
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(data.work_permit) < today) {
          errors.work_permit = "Work Permit Expiry Date cannot be in past";
        }
      }

      if (!data.country || data.country.trim() === "") {
        errors.country =
          "Work Permit Country is required for Others citizenship";
      }
    }

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        setError(field, { type: "manual", message });
      });
      return;
    }

    const submissionData = {
      ...data,
      medical_document_files: data.medical_document_files || [],
    };

    onSubmit?.({
      ...submissionData,
      deleted_document_ids: deletedIdsRef.current,
    });
  };

  useEffect(() => {
    if (mode === "edit") {
      setEditMode(false);
    } else if (mode === "add") {
      setEditMode(true);
    }
  }, [mode]);

  const companyId = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.company_id,
  );

  useEffect(() => {
    if (!canUpdate) {
      setEditMode(false);
    }
  }, [canUpdate]);

  const selectedCitizenship = watch("citizenship");
  const selectedEmploymentType = watch("employment_type");
  const contractInformation = watch("contract_information");
  const hireDate = watch("hire_date");
  const selectedStatus = watch("status");
  const totalExperience = watch("total_years_of_experince");

  useEffect(() => {
    const isEditModeWithData =
      mode === "edit" && formData && Object.keys(formData).length > 0;

    if (selectedCitizenship === 1) {
      if (!isEditModeWithData) {
        setValue("passport_visa_number", "");
        setValue("passport_visa_expiry", null);
        setValue("work_permit", null);
        setValue("country", "");
      }
      clearErrors("passport_visa_number");
      clearErrors("passport_visa_expiry");
      clearErrors("work_permit");
      clearErrors("country");
    } else {
      clearErrors("citizenship");
      if (!isEditModeWithData) {
        setValue("passport_visa_number", "");
        setValue("passport_visa_expiry", null);
        setValue("work_permit", null);
        if (selectedCitizenship === 4) {
          setValue("country", "");
        }
      }
      clearErrors("passport_visa_number");
      clearErrors("passport_visa_expiry");
      clearErrors("work_permit");
      clearErrors("country");
    }
  }, [selectedCitizenship, setValue, clearErrors, mode, formData]);

  useEffect(() => {
    if (selectedEmploymentType !== 2) {
      setValue("contract_information", "");
    }
  }, [selectedEmploymentType, setValue]);

  const handleClick = () => {
    setShowImagePreview(true);
    const currentImage = control._formValues.profile_photo || [];
    const newImage = {
      name: "",
      url: "",
    };
    setValue("profile_photo", [...currentImage, newImage]);
  };

  const handleImagePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setShowImagePreview(true);
  };

  const handleClosePreview = () => {
    setShowImagePreview(false);
    setPreviewImage(null);
  };

  const handleRemoveExistingFile = (file, index) => {
    const updatedFiles = [...existingMedicalFiles];
    updatedFiles.splice(index, 1);
    setExistingMedicalFiles(updatedFiles);

    const id = file.document_id || file.id;

    if (id) {
      deletedIdsRef.current = [...deletedIdsRef.current, id];
      setDeletedDocumentIds(deletedIdsRef.current);
    }

    console.log("DELETED IDS REF:", deletedIdsRef.current);
  };
  const handleAddressChange = debounce(async (address) => {
    if (address && address.length > 3) {
      try {
        const geocodedData = await geocodeAddress(address);
        if (geocodedData) {
          if (geocodedData.city) {
            setValue("city", geocodedData.city);
          }
          if (geocodedData.state) {
            setValue("states", geocodedData.state);
          }
          if (geocodedData.country) {
            setValue("country", geocodedData.country);
          }
          if (geocodedData.zipCode) {
            setValue("zip_code", geocodedData.zipCode);
          } else {
          }

          trigger(["city", "states", "country", "zip_code"]);
        } else {
        }
      } catch (error) {
        console.error("Address geocoding failed:", error);
      }
    } else {
      console.log("Address too short or empty, skipping geocoding");
    }
  }, 500);

  const handleSecondaryAddressChange = debounce(async (address) => {
    if (address && address.length > 3) {
      try {
        const geocodedData = await geocodeAddress(address);
        if (geocodedData) {
          if (geocodedData.city) {
            setValue("secondary_city", geocodedData.city);
          }
          if (geocodedData.state) {
            setValue("secondary_states", geocodedData.state);
          }
          if (geocodedData.country) {
            setValue("secondary_country", geocodedData.country);
          }
          if (geocodedData.zipCode) {
            setValue("secondary_zip_code", geocodedData.zipCode);
          } else {
          }

          trigger([
            "secondary_city",
            "secondary_states",
            "secondary_country",
            "secondary_zip_code",
          ]);
        } else {
        }
      } catch (error) {
        console.error("Address geocoding failed:", error);
      }
    } else {
      console.log("Address too short or empty, skipping geocoding");
    }
  }, 500);

  useEffect(() => {
    console.log("Deleted IDs:", deletedDocumentIds);
  }, [deletedDocumentIds]);

  const handleSameAddressToggle = (checked) => {
    if (checked) {
      const primaryCountry = watch("country");
      const primaryState = watch("states");

      setValue("secondary_address_line", watch("address_line1"));
      setValue("secondary_city", watch("city"));
      setValue("secondary_country", primaryCountry);
      setValue("secondary_zip_code", watch("zip_code"));

      if (primaryCountry) {
        loadStatesByCountry(primaryCountry, true);
      }

      setTimeout(() => {
        setValue("secondary_states", primaryState);
      }, 100);

      clearErrors([
        "secondary_address_line",
        "secondary_city",
        "secondary_states",
        "secondary_country",
        "secondary_zip_code",
      ]);
    } else {
      setValue("secondary_address_line", "");
      setValue("secondary_city", "");
      setValue("secondary_states", "");
      setValue("secondary_country", "");
      setValue("secondary_zip_code", "");
      clearErrors([
        "secondary_address_line",
        "secondary_city",
        "secondary_states",
        "secondary_country",
        "secondary_zip_code",
      ]);
    }
  };

  if (headerOnly) {
    return (
      <UserPageHeader
        handleBack={handleBack}
        editMode={editMode}
        setEditMode={setEditMode}
        handleCancelEdit={handleCancelEdit}
        handleDiscard={handleDiscard}
        handleSaveChanges={handleSaveChanges}
        canUpdate={canUpdate}
        formData={formData}
        mode={mode}
      />
    );
  }

  return (
    <form id="userForm" onSubmit={handleSubmit(submitHandler)}>
      <CareerUserFormFields
        control={control}
        errors={errors}
        watch={watch}
        setValue={setValue}
        trigger={trigger}
        clearErrors={clearErrors}
        editMode={editMode}
        existingProfileFiles={existingProfileFiles}
        setExistingProfileFiles={setExistingProfileFiles}
        handleImagePreview={handleImagePreview}
        handleRemoveExistingFile={handleRemoveExistingFile}
        dynamicStates={dynamicStates}
        loadingStates={loadingStates}
        secondaryDynamicStates={secondaryDynamicStates}
        loadingSecondaryStates={loadingSecondaryStates}
        existingMedicalFiles={existingMedicalFiles}
        setExistingMedicalFiles={setExistingMedicalFiles}
        medicalUploaded={medicalUploaded}
        setMedicalUploaded={setMedicalUploaded}
        imageUploaded={imageUploaded}
        setImageUploaded={setImageUploaded}
        filteredRoles={filteredRoles}
        handleAddressChange={handleAddressChange}
        handleSecondaryAddressChange={handleSecondaryAddressChange}
        handleAddEmployment={handleAddEmployment}
        handleRemoveEmployment={handleRemoveEmployment}
        isInitializing={isInitializing}
        mode={mode}
        sameAsPrimary={sameAsPrimary}
        selectedCountry={selectedCountry}
        selectedCitizenship={selectedCitizenship}
        selectedEmploymentType={selectedEmploymentType}
        selectedStatus={selectedStatus}
        selectedSecondaryCountry={selectedSecondaryCountry}
        handleSameAddressToggle={handleSameAddressToggle}
      />

      {editMode && (
        <ButtonContainer>
          <CancelButton variant="outlined" onClick={handleCancelEdit}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit" variant="contained" disabled={!canUpdate}>
            {mode === "edit" ? "Update Career User" : "Add Career User"}
          </SubmitButton>
        </ButtonContainer>
      )}

      {showImagePreview && (
        <ImagePreviewModal onClick={handlePreviewModalClick}>
          <ImagePreviewContainer onClick={stopPreviewContainerPropagation}>
            <ClosePreviewButton onClick={handleClosePreview}>
              {/* {editMode && (
                <IconButton
                  onClick={() => handleRemoveExistingFile?.(files, index)}
                >
                  <CloseIcon />
                </IconButton>
              )} */}
                <CloseIcon />
            </ClosePreviewButton>
          </ImagePreviewContainer>
          <Box
            component="img"
            src={previewImage}
            alt="Profile Photo Preview"
            sx={PreviewImageSx}
          />
        </ImagePreviewModal>
      )}
    </form>
  );
};

export default CareerUserForm;
