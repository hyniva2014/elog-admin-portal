import { Box, Button, Typography, LinearProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useMemo, useCallback } from "react";
import {
  AddHeaderContainerSx,
  AddHeaderTopSx,
  AddHeaderLeftSx,
  AddHeaderTitleSx,
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
  CompletedIconSx,
  ProfileCompletionContainerSx,
  ProgressBarWrapperSx,
  ProgressBarRowSx,
} from "./UserAddHeader.styled";

const FORM_STEPS = [
  { label: "Basic Info", number: 1, id: "basic-information" },
  { label: "Contact Info", number: 2, id: "contact-information" },
  { label: "Employment", number: 3, id: "employment-details" },
  { label: "Prior History", number: 4, id: "prior-employment-history" },
  { label: "Documents", number: 5, id: "upload-documentation" },
];

const STATUS_SECTIONS = [
  { key: "basic", label: "Basic" },
  { key: "contact", label: "Contact Info" },
  { key: "employment", label: "Employment" },
  { key: "history", label: "History" },
  { key: "documents", label: "Documents" },
];

const StatusIndicator = ({ item }) => (
  <Box sx={StatusItemSx(item.completed)}>
    {item.completed ? <DoneIcon sx={CompletedIconSx} /> : null}
    <Typography variant="body2" sx={StatusItemTextSx(item.completed)}>
      {item.label}
    </Typography>
  </Box>
);

const StatusIndicatorsList = ({ statusItems }) => (
  <Box sx={StatusItemsSx}>
    {statusItems.map((item) => (
      <StatusIndicator key={item.label} item={item} />
    ))}
  </Box>
);

const UserAddHeaderStep = ({ step, active, onClick, index }) => {
  const handleClick = useCallback(() => {
    onClick(step.id, index);
  }, [onClick, step.id, index]);

  return (
    <Box
      data-step-id={step.id}
      data-index={index}
      onClick={handleClick}
      sx={StepItemSx(active)}
    >
      <Typography sx={StepTextSx(active)}>
        {step.number}. {step.label}
      </Typography>
    </Box>
  );
};

const StepperList = ({ steps, activeStep, handleStepClick }) => (
  <Box sx={StepListSx}>
    {steps.map((step, index) => (
      <UserAddHeaderStep
        key={step.label}
        step={step}
        active={index === activeStep}
        index={index}
        onClick={handleStepClick}
      />
    ))}
  </Box>
);

const UserAddHeader = ({
  handleBack,
  activeStep = 0,
  setActiveStep,
  sectionCompletion = {},
  profileCompletion = 0,
  scrollContainerRef,
}) => {
  const steps = useMemo(() => FORM_STEPS, []);

  const statusItems = STATUS_SECTIONS.map((section) => ({
    label: section.label,
    completed: sectionCompletion[section.key] || false,
  }));

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
          if (stepIndex !== activeStep) {
            setActiveStep(stepIndex);
          }
        }
      }
    };

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

        if (currentBestStep !== lastActiveStep && setActiveStep) {
          setActiveStep(currentBestStep);
          lastActiveStep = currentBestStep;
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
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      detachScrollListener();
    };
  }, [steps, setActiveStep, scrollContainerRef]);

  const handleStepClick = useCallback(
    (stepId, index) => {
      const sectionElement = document.getElementById(stepId);
      const scrollContainer = scrollContainerRef?.current;

      if (sectionElement && scrollContainer && setActiveStep) {
        scrollContainer.scrollTo({
          top: sectionElement.offsetTop - scrollContainer.offsetTop - 16,
          behavior: "smooth",
        });
        setActiveStep(index);
        return;
      }

      if (sectionElement && setActiveStep) {
        sectionElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
        setActiveStep(index);
      }
    },
    [scrollContainerRef, setActiveStep],
  );

  return (
    <Box sx={AddHeaderContainerSx}>
      <Box sx={AddHeaderTopSx}>
        <Box sx={AddHeaderLeftSx}>
          <Button
            variant="outlined"
            onClick={handleBack}
            startIcon={<ArrowBack sx={BackIconSx} />}
            sx={BackButtonSx}
          >
            Back
          </Button>

          <Typography sx={AddHeaderTitleSx}>Add User</Typography>

          <Box sx={ActiveStatusSx}>
            <Box sx={ActiveStatusDotSx} />
            Active
          </Box>
        </Box>
      </Box>

      <Box sx={CardContainerSx}>
        <Box sx={ProgressWrapperSx}>
          <Box sx={ProfileCompletionContainerSx}>
            <Typography variant="body1" sx={ProgressTextSx}>
              Profile Completion
            </Typography>
            <Box sx={ProgressBarRowSx}>
              <Box sx={ProgressBarWrapperSx}>
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
          <StatusIndicatorsList statusItems={statusItems} />
        </Box>
      </Box>

      {/* Horizontal Text Stepper */}
      <Box sx={StepperWrapperSx}>
        <StepperList
          steps={steps}
          activeStep={activeStep}
          handleStepClick={handleStepClick}
        />
      </Box>
    </Box>
  );
};

export default UserAddHeader;
