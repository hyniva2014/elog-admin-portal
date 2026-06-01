import { Box, Button, Typography, LinearProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useMemo } from "react";
import {
  AddHeaderContainerSx,
  AddHeaderTopSx,
  AddHeaderLeftSx,
  BackButtonSx,
  BackIconSx,
  ActiveStatusSx,
  ActiveStatusDotSx,
  CardContainerSx,
  ProgressWrapperSx,
  ProgressTextSx,
  ProgressBarSx,
  ProgressValueSx,
  StatusItemsSx,
  StatusItemSx,
  StatusItemTextSx,
  StepperWrapperSx,
  StepListSx,
  StepItemSx,
  StepTextSx,
} from "./UserAddHeader.styled";

const UserAddHeader = ({
  handleBack,
  activeStep = 0,
  setActiveStep,
  sectionCompletion = {},
  profileCompletion = 0,
  scrollContainerRef,
}) => {
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

  useEffect(() => {
    const handleFocus = (event) => {
      const focusedElement = event.target;

      const form = document.getElementById("userForm");
      if (!form || !form.contains(focusedElement)) return;

      let currentElement = focusedElement;
      let sectionElement = null;
      let depth = 0;

      while (currentElement && currentElement !== document.body && depth < 50) {
        if (
          currentElement.id &&
          steps.some((s) => s.id === currentElement.id)
        ) {
          sectionElement = currentElement;
          break;
        }
        currentElement = currentElement.parentElement;
        depth++;
      }

      if (sectionElement) {
        const sectionId = sectionElement.id;
        const stepIndex = steps.findIndex((s) => s.id === sectionId);

        if (stepIndex !== -1 && setActiveStep) {
          // setActiveStep(stepIndex);
          if (stepIndex !== activeStep) {
            setActiveStep(stepIndex);
          }
        }
      }
    };

    // Attach to document with capture phase
    document.addEventListener("focusin", handleFocus, true);

    return () => {
      document.removeEventListener("focusin", handleFocus, true);
    };
  }, [steps, setActiveStep]);

  useEffect(() => {
    let timeoutId = null;
    let lastActiveStep = -1;

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

          // Improved scoring: give more weight to sections that are visible
          // and penalize less for distance, especially for sections with minimal height
          let score = visibility * 1000 - distanceFromCenter;

          // Bonus for sections that are at or near the bottom of the scrollable area
          // This helps highlight the last section (Documents) even if it has minimal height
          if (rect.bottom >= windowHeight - 100) {
            score += 500;
          }

          // Additional bonus for the last step if it's visible at all
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

        if (currentBestStep !== lastActiveStep && setActiveStep) {
          setActiveStep(currentBestStep);
          lastActiveStep = currentBestStep;
        }
      }, 100);
    };

    // Function to attach scroll listener
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

    // Function to detach scroll listener
    const detachScrollListener = () => {
      const scrollContainer = scrollContainerRef?.current;
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
        document.removeEventListener("scroll", handleScroll, true);
      }
    };

    // Initial attachment
    attachScrollListener();

    // Re-attach when scroll container ref changes
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
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      detachScrollListener();
    };
  }, [steps, setActiveStep, scrollContainerRef]);

  // Handle click on stepper item to scroll to section
  const handleStepClick = (stepId, index) => {
    const sectionElement = document.getElementById(stepId);
    if (sectionElement && setActiveStep) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveStep(index);
    }
  };

  const statusItems = [
    { label: "Basic", completed: sectionCompletion.basic || false },
    { label: "Contact Info", completed: sectionCompletion.contact || false },
    { label: "Employment", completed: sectionCompletion.employment || false },
    { label: "History", completed: sectionCompletion.history || false },
    { label: "Documents", completed: sectionCompletion.documents || false },
  ];

  return (
    <Box sx={AddHeaderContainerSx}>
      {/* Header Section with Back Button and Title */}
      <Box sx={AddHeaderTopSx}>
        {/* Left Side - Back Button and Title */}
        <Box sx={AddHeaderLeftSx}>
          <Button
            variant="outlined"
            onClick={handleBack}
            startIcon={<ArrowBack sx={BackIconSx} />}
            sx={BackButtonSx}
          >
            Back
          </Button>

          <Typography fontWeight={600} fontSize="20px" color="text.primary">
            Add User
          </Typography>

          {/* Active Status Indicator */}
          <Box sx={ActiveStatusSx}>
            <Box sx={ActiveStatusDotSx} />
            Active
          </Box>
        </Box>
      </Box>

      {/* Card Section with Profile Completion and Status Indicators */}
      <Box sx={CardContainerSx}>
        {/* Profile Completion and Status Indicators in same row */}
        <Box sx={ProgressWrapperSx}>
          {/* Profile Completion Section */}
          <Box sx={{ minWidth: 300 }}>
            <Typography variant="body1" sx={ProgressTextSx}>
              Profile Completion
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={profileCompletion}
                  sx={ProgressBarSx}
                />
              </Box>
              <Typography variant="body1" sx={ProgressValueSx}>
                {profileCompletion || 0}%
              </Typography>
            </Box>
          </Box>

          {/* Status Indicators */}
          <Box sx={StatusItemsSx}>
            {statusItems.map((item) => (
              <Box key={item.label} sx={StatusItemSx(item.completed)}>
                {item.completed ? (
                  <DoneIcon sx={{ fontSize: 18, color: "success.main" }} />
                ) : null}
                <Typography variant="body2" sx={StatusItemTextSx(item.completed)}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Horizontal Text Stepper */}
      <Box sx={StepperWrapperSx}>
        <Box sx={StepListSx}>
          {steps.map((step, index) => (
            <Box
              key={step.label}
              onClick={() => handleStepClick(step.id, index)}
              sx={StepItemSx(index === activeStep)}
            >
              <Typography sx={StepTextSx(index === activeStep)}>
                {step.number}. {step.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserAddHeader;
