import { Box } from "@mui/material";
import CareerUserForm from "./CareerUserForm";
import {
  CareerFormContainer,
  CareerFormHeader,
  CareerFormStepper,
  StepRow,
  StepItem,
  StepLabel,
  CareerFormContent,
} from "./CareerForm.styled";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useCareerUsers } from "../../../hooks";
import { useSelector } from "react-redux";
import CommonLoading from "../../../common/CommonLoading";
import { buildCareerUserPayload } from "./careerUserUtils";

const CareerFormStepItem = ({ step, active, index, onClick }) => (
  <StepItem
    data-step-id={step.id}
    data-index={index}
    active={active}
    onClick={onClick}
  >
    <StepLabel active={active}>
      {step.number}. {step.label}
    </StepLabel>
  </StepItem>
);

const CareerFormStepperSection = ({
  mode,
  steps,
  activeStep,
  handleStepClick,
}) => {
  if (mode === "add") return null;

  return (
    <CareerFormStepper>
      <StepRow>
        {steps.map((step, index) => (
          <CareerFormStepItem
            key={step.label}
            step={step}
            active={index === activeStep}
            index={index}
            onClick={handleStepClick}
          />
        ))}
      </StepRow>
    </CareerFormStepper>
  );
};

const CareerFormHeaderSection = ({
  mode,
  formData,
  handleSubmit,
  handleBack,
  breadcrumbs,
  canUpdate,
  editMode,
  setEditMode,
  fetchUserData,
  activeStep,
  setActiveStep,
  sectionCompletion,
  profileCompletion,
  scrollContainerRef,
  handleDiscard,
  isEditMode,
}) => {
  const HeaderContent = () => {
    if (mode === "add") {
      return (
        <UserAddHeader
          handleBack={handleBack}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          sectionCompletion={sectionCompletion}
          profileCompletion={profileCompletion}
          scrollContainerRef={scrollContainerRef}
        />
      );
    }

    return (
      <CareerUserForm
        formData={formData}
        onSubmit={handleSubmit}
        mode={mode}
        handleBack={handleBack}
        breadcrumbs={breadcrumbs}
        canUpdate={canUpdate}
        headerOnly={true}
        editMode={editMode}
        setEditMode={setEditMode}
        fetchUserData={fetchUserData}
      />
    );
  };

  const EditModeHeader = () => {
    if (!isEditMode) return null;
    return (
      <UserTopHeader
        data={formData}
        editMode={editMode}
        setEditMode={setEditMode}
        handleDiscard={handleDiscard}
        canUpdate={canUpdate}
        mode={mode}
      />
    );
  };

  return (
    <>
      <HeaderContent />
      <EditModeHeader />
    </>
  );
};
import CommonSnackbar from "../../../common/CommonSnackbar";
import CommonBreadcrumb from "../../../common/CommonBreadcrumb";
import dayjs from "dayjs";
import { citizenshipMap, defaultPageSize, languageMap } from "./Constants";
import UserAddHeader from "./HeaderComponents/UserAddHeader";
import UserTopHeader from "./HeaderComponents/UserTopHeader";
import { formatPhoneNumber } from "../../../common/CommonUtils";

const formatSSN = (ssn) => {
  if (!ssn) return "";
  const cleaned = String(ssn).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{2})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return ssn;
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const CareerForm = () => {
  const { userId } = useParams();

  const isEditMode = Boolean(userId);
  const navigate = useNavigate();
  const { getCareerUserDetails, getCarrierList, saveCareerUser } =
    useCareerUsers();
  const { setLoading, LoadingContainer } = CommonLoading();
  const [formData, setFormData] = useState({});
  //   const [mode, setMode] = useState("add");
  // const [mode, setMode] = useState(userId ? "edit" : "add");
  const [loading, setLoadingState] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const scrollContainerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [sectionCompletion, setSectionCompletion] = useState({
    basic: false,
    contact: false,
    employment: false,
    history: false,
    documents: false,
  });
  const [profileCompletion, setProfileCompletion] = useState(0);
  const mode = userId ? "edit" : "add";

  const [editMode, setEditMode] = useState(mode === "add");

  const handleDiscard = () => {
    setEditMode(false);
  };

  useEffect(() => {
    if (mode === "add") {
      setEditMode(true);
    } else if (mode === "edit") {
      setEditMode(false);
    }
  }, [mode]);
  const companyId = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.company_id,
  );
  const carrierId = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.carrier_id || 1,
  );
  const name = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.name || "",
  );
  const createdUserId = useSelector(
    (state) =>
      state.loginSlice.loginDetails?.body?.data?.userdetails?.user_id || "",
  );

  //   const permissions = useSelector((state) => state.rolePermissions.permissions);

  //   const canUpdate = hasPermission(
  //     permissions,
  //     "CAREER_USER_MANAGEMENT",
  //     "USER_UPDATE",
  //   );
  const canUpdate = true;
  const breadcrumbs = [
    { label: "Compliance", path: "/compliance" },
    { label: "Platform Users", path: "/carrier-users" },
    { label: userId ? "Carrier User View" : "Add Carrier User" },
  ];

  const lastActiveStepRef = useRef(-1);
  useEffect(() => {
    if (isEditMode) {
      fetchUserData();
    }
  }, [isEditMode]);
  const fetchUserData = async () => {
    if (!userId) return;

    try {
      setLoadingState(true);
      setLoading(true);

      const data = await getCareerUserDetails({
        companyId,
        userId,
      });

      // const data = response?.body?.users?.[0] || response?.users?.[0];
      if (!data) return;

      let carrierName = "";

      if (data.carrier_id) {
        try {
          const carrierResponse = await getCarrierList(companyId);

          const carriers =
            carrierResponse?.data?.body?.carriers ||
            carrierResponse?.body?.carriers ||
            carrierResponse?.carriers ||
            [];

          const carrier = carriers.find((c) => c.carrier_id == data.carrier_id);
          carrierName = carrier?.carrier_name || "";
        } catch (error) {
          // Error fetching carrier name
        }
      }

      const primaryAddress = Array.isArray(data.address)
        ? data.address.find((addr) => String(addr.address_type) === "1") || {}
        : {};

      const secondaryAddress = Array.isArray(data.address)
        ? data.address.find((addr) => String(addr.address_type) === "2") || {}
        : {};

      const employeeExperience = Array.isArray(data.employee_experience)
        ? data.employee_experience
        : [];

      const processedData = {
        ...data,

        user_id: data.user_id || userId,
        carrier_name: carrierName || data.carrier_name || "",

        first_name: data.first_name || "",
        middle_name: data.middle_name || "",
        last_name: data.last_name || "",
        gender: data.gender || "",

        dob: data.dob ? dayjs(data.dob) : null,
        hire_date: data.hire_date ? dayjs(data.hire_date) : null,
        last_drug_test: data.last_drug_test ? dayjs(data.last_drug_test) : null,
        termination_date: data.termination_date
          ? dayjs(data.termination_date)
          : null,

        email: data.email || "",
        phone: formatPhoneNumber(data.phone || ""),

        alternate_contact_number: formatPhoneNumber(
          data.alternate_contact_number || "",
        ),
        total_years_of_experince: data.total_years_of_experince || "",

        address_line1:
          primaryAddress.street || data.street || data.address_line1 || "",
        city: primaryAddress.city || data.city || "",
        states: primaryAddress.state || data.state || "",
        zip_code: primaryAddress.zipcode || data.zipcode || "",
        country: primaryAddress.country || data.country || "",

        secondary_address_line: secondaryAddress.street || "",
        secondary_city: secondaryAddress.city || "",
        secondary_states: secondaryAddress.state || "",
        secondary_zip_code: secondaryAddress.zipcode || "",
        secondary_country: secondaryAddress.country || "",

        same_as_primary:
          secondaryAddress.street === primaryAddress.street &&
          secondaryAddress.city === primaryAddress.city &&
          secondaryAddress.state === primaryAddress.state &&
          secondaryAddress.country === primaryAddress.country &&
          secondaryAddress.zipcode === primaryAddress.zipcode &&
          secondaryAddress.street !== "" &&
          secondaryAddress.street !== undefined,

        citizenship:
          citizenshipMap[data.citizenship] ?? Number(data.citizenship) ?? null,
        employment_type: data.employment_type
          ? Number(data.employment_type)
          : null,
        status: data.status_id || "",

        passport_visa_number:
          Number(data.citizenship) !== 1
            ? data.passport_number || data.passport_visa_number || ""
            : "",

        passport_visa_expiry:
          Number(data.citizenship) !== 1 &&
          (data.passport_expiry_date || data.passport_visa_expiry)
            ? dayjs(data.passport_expiry_date || data.passport_visa_expiry)
            : null,

        work_permit: data.work_permit ? dayjs(data.work_permit) : null,

        work_permit_country:
          Number(data.citizenship) === 4 ? data.work_permit_country || "" : "",

        contract_information: data.contract_information || "",

        ssn: formatSSN(data.ssn || ""),

        role: data.role || "",

        language:
          typeof data.language === "string"
            ? data.language
                .split(",")
                .map((l) => languageMap[l.trim().toLowerCase()])
                .filter(Boolean)
            : [Number(data.language) || 1],

        profile_photo: data.profile_pic
          ? [
              {
                url: data.profile_pic,
                name: data.profile_pic.split("/").pop(),
              },
            ]
          : [],

        medical_document_files: data.documents || [],

        emp_history: employeeExperience.map((item) => ({
          experience: item.experience || "",
          emp_history_details: item.emp_history_details || "",
          emp_history_start_date: item.emp_history_start_date
            ? dayjs(item.emp_history_start_date)
            : null,
          emp_history_end_date: item.emp_history_end_date
            ? dayjs(item.emp_history_end_date)
            : null,
          emp_history_duration: item.emp_history_duration || "",
        })),

        created_by:
          data.created_by ||
          `${data.first_name || ""} ${data.last_name || ""}`.trim() ||
          "Unknown",
      };

      setFormData(processedData);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error loading user data",
        severity: "error",
      });
    } finally {
      setLoadingState(false);
      setLoading(false);
    }
  };

  const handleSubmit = async (formValues) => {
    setLoadingState(true);
    setLoading(true);
    try {
      const payload = buildCareerUserPayload(
        formValues,
        companyId,
        isEditMode ? userId : null,
        name,
      );

      const response = await saveCareerUser(payload);

      if (response?.statusCode === 200) {
        navigate("/carrier-users", {
          state: {
            snackbar: {
              message: `User ${isEditMode ? "updated" : "created"} successfully`,
              severity: "success",
            },
          },
        });
      } else {
        const errorMessage =
          response?.body?.message ||
          `Error ${isEditMode ? "updating" : "creating"} user`;
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: "error",
        });
      }
    } catch (err) {
      const errorMessage =
        err?.body?.message ||
        err?.message ||
        `Error ${isEditMode ? "updating" : "creating"} user`;
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    } finally {
      setLoadingState(false);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/platform-users");
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const calculateSectionCompletion = (formValues) => {
    const completion = {
      basic: false,
      contact: false,
      employment: false,
      history: false,
      documents: false,
    };

    // Basic Information section
    const basicFields = [
      "first_name",
      "last_name",
      "dob",
      "gender",
      "ssn",
      "citizenship",
      "last_drug_test",
      "profile_photo",
    ];
    const basicComplete = basicFields.every((field) => {
      const value = formValues[field];
      return value !== undefined && value !== null && value !== "";
    });
    completion.basic = basicComplete;

    // Contact Information section
    const contactFields = [
      "email",
      "phone",
      "address_line1",
      "city",
      "states",
      "zip_code",
      "country",
    ];
    const contactComplete = contactFields.every((field) => {
      const value = formValues[field];
      return value !== undefined && value !== null && value !== "";
    });
    completion.contact = contactComplete;

    // Employment section
    const employmentFields = ["role", "hire_date", "status", "employment_type"];
    const employmentComplete = employmentFields.every((field) => {
      const value = formValues[field];
      return value !== undefined && value !== null && value !== "";
    });
    completion.employment = employmentComplete;

    // Prior Employment History section
    const hasEmploymentHistory =
      formValues.emp_history &&
      Array.isArray(formValues.emp_history) &&
      formValues.emp_history.length > 0 &&
      formValues.emp_history.some(
        (item) => item.emp_history_start_date && item.emp_history_end_date,
      );
    completion.history = hasEmploymentHistory;

    // Documents section
    const hasDocuments =
      formValues.medical_document_files &&
      formValues.medical_document_files.length > 0;
    completion.documents = hasDocuments;

    // Calculate profile completion percentage
    const completedSections = Object.values(completion).filter(Boolean).length;
    const totalSections = Object.keys(completion).length;
    const percentage = Math.round((completedSections / totalSections) * 100);

    // setSectionCompletion(completion);
    // setProfileCompletion(percentage);
    return { completion, percentage };
  };

  //   const pageTitle = mode === "edit" ? "Edit User" : "Add New User";
  const pageTitle = isEditMode ? "View User" : "Add New User";

  const steps = useMemo(
    () => [
      { label: "Basic Info", number: 1, id: "basic-information" },
      { label: "Contact Info", number: 2, id: "contact-information" },
      { label: "Employment", number: 3, id: "employment-details" },
      { label: "Prior History", number: 4, id: "prior-employment-history" },
      { label: "Documents", number: 5, id: "upload-documentation" },
    ],
    [],
  );

  // Scroll-based stepper for edit/view mode
  useEffect(() => {
    if (mode === "add") return;

    let timeoutId = null;
    // let lastActiveStep = -1;

    const calculateBestStep = () => {
      let bestStep = 0;
      let maxScore = -Infinity;
      let sectionsFound = 0;

      steps.forEach((step, index) => {
        const sectionElement = document.getElementById(step.id);
        if (sectionElement) {
          sectionsFound++;
          const rect = sectionElement.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const sectionHeight = rect.height;

          const visibility =
            sectionHeight > 0 ? visibleHeight / sectionHeight : 0;

          const sectionCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);

          let score = visibility * 1000 - distanceFromCenter;

          if (rect.bottom >= windowHeight - 100) {
            score += 500;
          }

          if (index === steps.length - 1 && visibleHeight > 0) {
            score += 300;
          }

          if (score > maxScore) {
            maxScore = score;
            bestStep = index;
          }
        }
      });
      return bestStep;
    };

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const currentBestStep = calculateBestStep();

        if (
          currentBestStep !== lastActiveStepRef.current &&
          currentBestStep !== activeStep
        ) {
          setActiveStep(currentBestStep);
          lastActiveStepRef.current = currentBestStep;
        }
      }, 100);
    };

    const attachScrollListener = () => {
      const scrollContainer = scrollContainerRef?.current;
      if (scrollContainer) {
        scrollContainer.addEventListener("scroll", handleScroll, {
          passive: true,
        });
      } else {
        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("scroll", handleScroll, {
          passive: true,
          capture: true,
        });
      }
    };

    const detachScrollListener = () => {
      const scrollContainer = scrollContainerRef?.current;
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
        document.removeEventListener("scroll", handleScroll, true);
      }
    };

    attachScrollListener();

    const checkRefInterval = setInterval(() => {
      const scrollContainer = scrollContainerRef?.current;
      if (scrollContainer) {
        detachScrollListener();
        attachScrollListener();
        clearInterval(checkRefInterval);
      }
    }, 100);

    const initialTimeoutId = setTimeout(() => {
      handleScroll();
    }, 500);

    return () => {
      clearInterval(checkRefInterval);
      clearTimeout(initialTimeoutId);
      detachScrollListener();
    };
  }, [mode, steps, scrollContainerRef]);

  const handleFormChange = useCallback((formValues) => {
    const { completion, percentage } = calculateSectionCompletion(formValues);

    setSectionCompletion((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(completion)) {
        return prev;
      }
      return completion;
    });

    setProfileCompletion((prev) => {
      if (prev === percentage) return prev;
      return percentage;
    });
  }, []);

  const handleStepClick = (event) => {
    const stepId = event.currentTarget.dataset.stepId;
    const index = Number(event.currentTarget.dataset.index);

    if (!stepId) return;

    const sectionElement = document.getElementById(stepId);
    const scrollContainer = scrollContainerRef?.current;

    if (sectionElement && scrollContainer) {
      scrollContainer.scrollTo({
        top: sectionElement.offsetTop - scrollContainer.offsetTop - 16,
        behavior: "smooth",
      });
      setActiveStep(index);
      return;
    }

    if (sectionElement) {
      sectionElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      setActiveStep(index);
    }
  };

  return (
    <>
      <LoadingContainer />
      <CareerFormContainer>
        <CareerFormHeader>
          <CareerFormHeaderSection
            mode={mode}
            formData={formData}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
            breadcrumbs={breadcrumbs}
            canUpdate={canUpdate}
            editMode={editMode}
            setEditMode={setEditMode}
            fetchUserData={fetchUserData}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            sectionCompletion={sectionCompletion}
            profileCompletion={profileCompletion}
            scrollContainerRef={scrollContainerRef}
            handleDiscard={handleDiscard}
            isEditMode={isEditMode}
          />
        </CareerFormHeader>

        <CareerFormStepperSection
          mode={mode}
          steps={steps}
          activeStep={activeStep}
          handleStepClick={handleStepClick}
        />

        <CareerFormContent ref={scrollContainerRef}>
          <CareerUserForm
            formData={formData}
            onSubmit={handleSubmit}
            mode={mode}
            handleBack={handleBack}
            breadcrumbs={breadcrumbs}
            canUpdate={canUpdate}
            headerOnly={false}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            onFormValuesChange={handleFormChange}
            editMode={editMode}
            setEditMode={setEditMode}
            fetchUserData={fetchUserData}
          />
          <CommonSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleSnackbarClose}
          />
        </CareerFormContent>
      </CareerFormContainer>
    </>
  );
};

export default CareerForm;
