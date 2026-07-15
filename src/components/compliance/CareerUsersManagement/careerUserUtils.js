import dayjs from "dayjs";

/**
 * Transform employment history data for API payload
 * @param {Array} empHistory - Employment history array from form
 * @returns {Array} - Transformed employment history
 */
export const transformEmploymentHistory = (empHistory = []) => {
  if (!Array.isArray(empHistory)) return [];

  return empHistory.map((item) => ({
    emp_history_details: item.emp_history_details || "",
    emp_history_start_date: item.emp_history_start_date
      ? dayjs(item.emp_history_start_date).format("YYYY-MM-DD")
      : null,
    emp_history_end_date: item.emp_history_end_date
      ? dayjs(item.emp_history_end_date).format("YYYY-MM-DD")
      : null,
    emp_history_duration: item.emp_history_duration || "",
    emp_history_reason: item.emp_history_reason || "",
  }));
};

/**
 * Transform CDL data for API payload
 * @param {Object} cdlData - CDL data from form
 * @returns {Object} - Transformed CDL data
 */
export const transformCDLData = (cdlData = {}) => {
  return {
    cdl_number: cdlData.cdl_number || "",
    cdl_state: cdlData.cdl_state || "",
    cdl_class: cdlData.cdl_class || "",
    cdl_expiry_date: cdlData.cdl_expiry_date
      ? dayjs(cdlData.cdl_expiry_date).format("YYYY-MM-DD")
      : null,
  };
};

/**
 * Transform form data to API payload
 * @param {Object} formData - Form data object
 * @param {string} companyId - Company ID
 * @param {string} userId - User ID (optional for edit mode)
 * @returns {Object} - API payload
 */
export const transformCareerUserPayload = (formData, companyId, userId = null) => {
  const payload = {
    company_id: companyId || "",
    user_name: formData.email || "",
    first_name: formData.first_name || "",
    middle_name: formData.middle_name || "",
    last_name: formData.last_name || "",
    email: formData.email || "",
    phone: formData.phone?.replace(/\D/g, "") || "",
    role_id: formData.role || "",
    status_id: formData.status || 1,
    hire_date: formData.hire_date
      ? dayjs(formData.hire_date).format("YYYY-MM-DD")
      : null,
    last_drug_test: formData.last_drug_test
      ? dayjs(formData.last_drug_test).format("YYYY-MM-DD")
      : null,
    primary_address: {
      street: formData.address_line1 || "",
      city: formData.city || "",
      state: formData.states || "",
      zip: formData.zip_code || "",
      country: formData.country || "",
    },
    secondary_address: {
      street: formData.secondary_address_line || "",
      city: formData.secondary_city || "",
      state: formData.secondary_states || "",
      country: formData.secondary_country || "",
      zip: formData.secondary_zip_code || "",
    },
    emp_history: transformEmploymentHistory(formData.emp_history),
    cdl_info: transformCDLData(formData.cdl_info),
    citizenship: formData.citizenship || 1,
    employment_type: formData.employment_type || 1,
    gender: formData.gender,
    dob: formData.dob ? dayjs(formData.dob).format("YYYY-MM-DD") : null,
    ssn: formData.ssn?.replace(/\D/g, "") || "",
    language: Array.isArray(formData.language)
      ? formData.language.join(",")
      : formData.language || "1",
    contract_information:
      formData.employment_type === 2
        ? formData.contract_information || ""
        : "",
    termination_date: formData.termination_date
      ? dayjs(formData.termination_date).format("YYYY-MM-DD")
      : null,
  };

  if (formData.citizenship !== 1) {
    payload.passport_number = formData.passport_visa_number || "";
    payload.passport_expiry_date = formData.passport_visa_expiry
      ? dayjs(formData.passport_visa_expiry).format("YYYY-MM-DD")
      : null;
    payload.work_permit = formData.work_permit
      ? dayjs(formData.work_permit).format("YYYY-MM-DD")
      : null;
    payload.country = formData.citizenship_country || "";
  }

  if (userId) {
    payload.user_id = userId;
  }

  return payload;
};

/**
 * Transform API response to form data
 * @param {Object} apiData - Data from API
 * @returns {Object} - Form data object
 */
export const transformApiToFormData = (apiData = {}) => {
  return {
    user_id: apiData.user_id || "",
    user_name: apiData.user_name || "",
    first_name: apiData.first_name || "",
    middle_name: apiData.middle_name || "",
    last_name: apiData.last_name || "",
    email: apiData.email || "",
    phone: apiData.phone || "",
    role_id: apiData.role_id || "",
    role: apiData.role_id || "",
    status_id: apiData.status_id || 1,
    hire_date: apiData.hire_date ? dayjs(apiData.hire_date) : null,
    last_drug_test: apiData.last_drug_test ? dayjs(apiData.last_drug_test) : null,
    termination_date: apiData.termination_date ? dayjs(apiData.termination_date) : null,
    profile_pic: apiData.profile_pic || "",
    profile_photo: apiData.profile_pic || "",
    citizenship: apiData.citizenship ? Number(apiData.citizenship) : 1,
    employment_type: apiData.employment_type ? Number(apiData.employment_type) : 1,
    gender: apiData.gender,
    dob: apiData.dob ? dayjs(apiData.dob) : null,
    ssn: apiData.ssn || "",
    language: apiData.language ? apiData.language.split(",").map(Number) : [1],
    contract_information: apiData.contract_information || "",
    total_years_of_experince: apiData.total_years_of_experince || "",
    alternate_contact_number: apiData.emergency_contact_number || apiData.alternate_contact_number || "",
    passport_visa_number: apiData.passport_number || "",
    passport_visa_expiry: apiData.passport_expiry_date ? dayjs(apiData.passport_expiry_date) : null,
    work_permit: apiData.work_permit ? dayjs(apiData.work_permit) : null,
    citizenship_country: apiData.country || "",
    address_line1: apiData.primary_address?.street || "",
    city: apiData.primary_address?.city || "",
    states: apiData.primary_address?.state || "",
    zip_code: apiData.primary_address?.zipcode || "",
    country: apiData.primary_address?.country || "",
    secondary_address_line: apiData.secondary_address?.street || "",
    secondary_city: apiData.secondary_address?.city || "",
    secondary_states: apiData.secondary_address?.state || "",
    secondary_country: apiData.secondary_address?.country || "",
    secondary_zip_code: apiData.secondary_address?.zipcode || "",
    emp_history: (apiData.employee_experience || []).map((item) => ({
      emp_history_details: item.emp_history_details || "",
      emp_history_start_date: item.emp_history_start_date
        ? dayjs(item.emp_history_start_date)
        : null,
      emp_history_end_date: item.emp_history_end_date
        ? dayjs(item.emp_history_end_date)
        : null,
      emp_history_duration: item.emp_history_duration || "",
    })),
    cdl_info: {
      cdl_number: apiData.cdl_info?.cdl_number || "",
      cdl_state: apiData.cdl_info?.cdl_state || "",
      cdl_class: apiData.cdl_info?.cdl_class || "",
      cdl_expiry_date: apiData.cdl_info?.cdl_expiry_date
        ? dayjs(apiData.cdl_info.cdl_expiry_date)
        : null,
    },
    documents: apiData.documents || [],
  };
};

/**
 * Calculate profile completion percentage
 * @param {Object} formData - Form data object
 * @returns {number} - Completion percentage (0-100)
 */
export const calculateProfileCompletion = (formData = {}) => {
  const fields = [
    formData.first_name,
    formData.last_name,
    formData.email,
    formData.phone,
    formData.role_id,
    formData.hire_date,
    formData.primary_address?.city,
    formData.primary_address?.state,
    formData.emp_history?.[0]?.emp_history_details,
    formData.cdl_info?.cdl_number,
  ];

  const filledFields = fields.filter((field) => field && field !== "").length;
  return Math.round((filledFields / fields.length) * 100);
};

/**
 * Calculate section completion status
 * @param {Object} formData - Form data object
 * @returns {Object} - Section completion status
 */
export const calculateSectionCompletion = (formData = {}) => {
  return {
    basic: !!(formData.first_name && formData.last_name && formData.email),
    contact: !!(formData.phone && formData.primary_address?.city),
    employment: !!(formData.role_id && formData.hire_date),
    history: !!(formData.emp_history?.[0]?.emp_history_details),
    documents: !!(formData.cdl_info?.cdl_number),
  };
};

/**
 * Validate employment history dates
 * @param {Object} empHistory - Employment history entry
 * @returns {Object} - Validation result with errors
 */
export const validateEmploymentDates = (empHistory) => {
  const errors = {};

  if (empHistory.emp_history_start_date && empHistory.emp_history_end_date) {
    const start = dayjs(empHistory.emp_history_start_date);
    const end = dayjs(empHistory.emp_history_end_date);

    if (end.isBefore(start)) {
      errors.emp_history_end_date = "End date must be after start date";
    }
  }

  return errors;
};

/**
 * Format user status for display
 * @param {number|string} statusId - Status ID
 * @param {Object} statusConfig - Status configuration object
 * @returns {Object} - Formatted status with label and color
 */
export const formatUserStatus = (statusId, statusConfig = {}) => {
  const status = statusConfig[statusId];
  
  if (!status) {
    return { label: "-", color: "text.primary" };
  }

  return {
    label: status.label || "-",
    color: status.colorKey || "text.primary",
  };
};

/**
 * Transform states data from API response
 * @param {Array} statesData - Raw states data from API
 * @returns {Array} - Transformed states options
 */
export const transformStatesData = (statesData = []) => {
  if (!Array.isArray(statesData)) return [];
  
  return statesData.map((state) => ({
    label: state.name || state.label || "",
    value: state.state_code || state.value || "",
  }));
};

/**
 * Transform language string to array of numbers
 * @param {string|number} languageData - Language data (comma-separated string or number)
 * @returns {Array<number>} - Array of language IDs
 */
export const transformLanguageData = (languageData) => {
  if (!languageData) return [1]; // Default language

  // If it's already a number, return as array
  if (typeof languageData === 'number') {
    return [languageData];
  }

  // If it's a string, split and convert
  if (typeof languageData === 'string') {
    return languageData
      .split(",")
      .map((l) => Number(l.trim()))
      .filter((l) => !isNaN(l));
  }

  // If it's an array, ensure all are numbers
  if (Array.isArray(languageData)) {
    return languageData.map((l) => Number(l)).filter((l) => !isNaN(l));
  }

  return [1]; // Default fallback
};

/**
 * Transform medical/document files from API response
 * @param {Array} filesData - Raw files data from API
 * @returns {Array} - Transformed files array
 */
export const transformMedicalFiles = (filesData = []) => {
  if (!Array.isArray(filesData)) return [];

  return filesData
    .map((file) => {
      let fileName = "";
      let fileUrl = "";

      // Handle different file object structures
      if (typeof file === "string") {
        // If file is just a URL string
        fileUrl = file;
        fileName = file.split("/").pop() || "document";
      } else if (file && typeof file === "object") {
        // If file is an object with properties
        fileName = file.file_name || file.fileName || file.name || "";
        fileUrl = file.file_url || file.fileUrl || file.url || "";
      }

      // Only return valid files
      if (fileName && fileUrl) {
        return {
          file_name: fileName,
          file_url: fileUrl,
          name: fileName,
          url: fileUrl,
        };
      }

      return null;
    })
    .filter((file) => file !== null);
};

/**
 * Transform employment history from form data for API payload
 * @param {Array} empHistoryData - Employment history from form
 * @returns {Array} - Transformed employment history for API
 */
export const transformEmploymentHistoryForPayload = (empHistoryData = []) => {
  if (!Array.isArray(empHistoryData)) return [];

  return empHistoryData.map((item) => ({
    emp_history_details: item.emp_history_details || "",
    emp_history_start_date: item.emp_history_start_date
      ? dayjs(item.emp_history_start_date).format("YYYY-MM-DD")
      : null,
    emp_history_end_date: item.emp_history_end_date
      ? dayjs(item.emp_history_end_date).format("YYYY-MM-DD")
      : null,
    emp_history_duration: item.emp_history_duration || "",
    emp_history_reason: item.emp_history_reason || "",
  }));
};

/**
 * Process and validate file uploads
 * @param {Array} files - Array of file objects
 * @returns {Array} - Processed files array
 */
export const processFileUploads = (files = []) => {
  if (!Array.isArray(files)) return [];

  return files
    .map((file) => {
      // Validate file object
      if (!file || typeof file !== "object") return null;

      // Check if it's a File object or a processed file object
      if (file instanceof File) {
        return {
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
        };
      }

      // If it's already processed, return as is
      if (file.file_name || file.name) {
        return file;
      }

      return null;
    })
    .filter((file) => file !== null);
};

/**
 * Extract file names from file objects
 * @param {Array} files - Array of file objects
 * @returns {Array<string>} - Array of file names
 */
export const extractFileNames = (files = []) => {
  if (!Array.isArray(files)) return [];

  return files
    .map((file) => {
      if (typeof file === "string") return file;
      if (file && typeof file === "object") {
        return file.file_name || file.fileName || file.name || "";
      }
      return "";
    })
    .filter((name) => name !== "");
};

/**
 * Transform citizenship data
 * @param {string|number} citizenshipValue - Citizenship value
 * @param {Object} citizenshipMap - Citizenship mapping object
 * @returns {string} - Transformed citizenship value
 */
export const transformCitizenshipData = (citizenshipValue, citizenshipMap = {}) => {
  if (!citizenshipValue) return "";
  
  // If it's already a valid key, return it
  if (citizenshipMap[citizenshipValue]) {
    return citizenshipValue;
  }

  // Try to find by label
  const entry = Object.entries(citizenshipMap).find(
    ([, value]) => value.toLowerCase() === String(citizenshipValue).toLowerCase()
  );

  return entry ? entry[0] : citizenshipValue;
};

/**
 * Build career user payload as FormData for API submission
 * @param {Object} formValues - Form values from react-hook-form
 * @param {string} companyId - Company ID
 * @param {string|null} userId - User ID for edit mode
 * @param {string} createdByName - Name of the user creating/updating
 * @returns {FormData} - FormData object ready for API submission
 */
export const buildCareerUserPayload = (formValues, companyId, userId = null, createdByName = "") => {
  const payload = new FormData();

  const empHistoryPayload = (formValues.emp_history || []).map((item) => ({
    emp_history_details: item.emp_history_details || "",
    emp_history_start_date: item.emp_history_start_date
      ? dayjs(item.emp_history_start_date).format("YYYY-MM-DD")
      : "",
    emp_history_end_date: item.emp_history_end_date
      ? dayjs(item.emp_history_end_date).format("YYYY-MM-DD")
      : "",
    emp_history_duration: item.emp_history_duration || "",
  }));

  const payloadData = {
    user_name: formValues.email || "",
    company_id: companyId || "",
    role_id: formValues.role,

    first_name: formValues.first_name || "",
    middle_name: formValues.middle_name || "",
    last_name: formValues.last_name || "",
    gender: formValues.gender,

    dob: formValues.dob
      ? new Date(formValues.dob).toISOString().split("T")[0]
      : "",

    citizenship: formValues.citizenship || 1,
    employment_type: formValues.employment_type || 1,

    email: formValues.email || "",
    phone: formValues.phone?.replace(/\D/g, "") || "",
    emergency_contact_number:
      formValues.alternate_contact_number?.replace(/\D/g, "") || "",
    total_years_of_experince: formValues.total_years_of_experince,

    primary_address: JSON.stringify({
      street: formValues.address_line1 || "",
      city: formValues.city || "",
      state: formValues.states || "",
      zipcode: formValues.zip_code || "",
      country: formValues.country || "",
    }),

    secondary_address: JSON.stringify({
      street: formValues.secondary_address_line || "",
      city: formValues.secondary_city || "",
      state: formValues.secondary_states || "",
      country: formValues.secondary_country || "",
      zipcode: formValues.secondary_zip_code || "",
    }),

    hire_date: formValues.hire_date
      ? new Date(formValues.hire_date).toISOString().split("T")[0]
      : "",

    status_id: formValues.status || 1,

    termination_date: formValues.termination_date
      ? new Date(formValues.termination_date).toISOString().split("T")[0]
      : "",

    last_drug_test: formValues.last_drug_test
      ? new Date(formValues.last_drug_test).toISOString().split("T")[0]
      : "",

    ssn: formValues.ssn?.replace(/\D/g, "") || "",

    language: Array.isArray(formValues.language)
      ? formValues.language.join(",")
      : formValues.language || "1",

    contract_information:
      formValues.employment_type === 2
        ? formValues.contract_information || ""
        : "",

    emp_history: JSON.stringify(empHistoryPayload),

    created_by: createdByName,
  };

  if (formValues.citizenship !== 1) {
    payloadData.passport_number = formValues.passport_visa_number || "";
    payloadData.passport_expiry_date = formValues.passport_visa_expiry
      ? new Date(formValues.passport_visa_expiry)
          .toISOString()
          .split("T")[0]
      : "";

    payloadData.work_permit = formValues.work_permit
      ? dayjs(formValues.work_permit).format("YYYY-MM-DD")
      : "";

    payloadData.country = formValues.citizenship_country || "";
  }

  Object.entries(payloadData).forEach(([key, value]) => {
    payload.append(key, value ?? "");
  });
  
  payload.append(
    "deleted_document_ids",
    JSON.stringify(formValues.deleted_document_ids || []),
  );

  if (userId) {
    payload.append("user_id", userId);
  }

  const profilePicFiles = formValues.profile_photo || [];
  if (profilePicFiles.length > 0) {
    const profilePic = profilePicFiles[0];
    if (profilePic instanceof File) {
      payload.append("profile_pic", profilePic);
    }
  } else {
    payload.append("profile_pic", "");
  }

  const medicalCardFiles = formValues.medical_document_files || [];
  if (medicalCardFiles.length > 0) {
    medicalCardFiles.forEach((file, index) => {
      if (file instanceof File) {
        payload.append(`file_${index + 1}`, file);
      }
    });
  }

  return payload;
};
