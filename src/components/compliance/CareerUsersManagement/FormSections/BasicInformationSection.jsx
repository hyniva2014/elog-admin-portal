import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import FormSection from "../HeaderComponents/FormSection";
import ImagePreview from "../HeaderComponents/ImagePreview";
import dayjs from "dayjs";

import {
  LANGUAGE_OPTIONS,
  genderOptions,
  citizenship_options,
  filterNameInput,
  BASIC_INFO_FIELDS,
  PASSPORT_VISA_FIELDS,
  WORK_PERMIT_FIELDS,
} from "../Constants";
import FormFieldsSection from "../FormFields/FormFieldsSection";

const BasicInformationSection = ({
  control,
  errors,
  editMode,
  existingProfileFiles,
  setExistingProfileFiles,
  handleRemoveExistingFile,
  imageUploaded,
  setImageUploaded,
  handleImagePreview,
  selectedCitizenship,
}) => {
  const optionsMap = {
    LANGUAGE_OPTIONS,
    genderOptions,
    citizenship_options,
  };

  const additionalProps = {
    dob: {
      minDate: dayjs(new Date(1900, 0, 1)),
      maxDate: dayjs(),
    },
    last_drug_test: {
      maxDate: dayjs(new Date()),
    },
    passport_visa_expiry: {
      minDate: dayjs().startOf("day"),
    },
    work_permit: {
      minDate: dayjs().startOf("day"),
    },
  };

  const getConditionalFields = () => {
    const fields = [];

    if (selectedCitizenship && selectedCitizenship !== 1) {
      fields.push(...PASSPORT_VISA_FIELDS);
      fields.push(...WORK_PERMIT_FIELDS);
    }

    return fields;
  };

  const allFields = [...BASIC_INFO_FIELDS, ...getConditionalFields()];

  return (
    <FormSection
      id="basic-information"
      title="Basic Information"
      subtitle="Personal and identity details"
    >
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={12}>
          <ImagePreview
            control={control}
            errors={errors}
            existingFiles={existingProfileFiles}
            setExistingFiles={setExistingProfileFiles}
            onRemoveExistingFile={handleRemoveExistingFile}
            uploaded={imageUploaded}
            setUploaded={setImageUploaded}
            handleImagePreview={handleImagePreview}
            maxImages={1}
            labelText="Upload Profile Photo"
            changeText="Change Photo"
            removeText="Remove Photo"
            fieldName="profile_photo"
            disabled={!editMode}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <FormFieldsSection
              fields={allFields}
              control={control}
              errors={errors}
              disabled={!editMode}
              optionsMap={optionsMap}
              additionalProps={additionalProps}
              conditionContext={selectedCitizenship}
            />
          </Grid>
        </Grid>
      </Grid>
    </FormSection>
  );
};

export default BasicInformationSection;
