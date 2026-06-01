import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import FormSection from "../HeaderComponents/FormSection";
import ImagePreview from "../HeaderComponents/ImagePreview";
import dayjs from "dayjs";
import CommonTextField from "../../../../common/CommonTextField";
import CommonSingleDateSelector from "../../../../common/CommonSingleDateSelector";
import CommonAutocompleteDropdown from "../../../../common/CommonAutocompleteDropdown";
import CommonMultiSelectDropdown from "../../../../common/CommonMultiSelectDropdown";
import { formatSSN } from "../../../../common/CommonUtils";
import {
  LANGUAGE_OPTIONS,
  genderOptions,
  citizenship_options,
  filterNameInput,
} from "../Constants";

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
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    label="First Name"
                    required
                    disabled={!editMode}
                    {...field}
                    onChange={(e) => {
                      const filteredValue = filterNameInput(e.target.value);
                      field.onChange(filteredValue);
                    }}
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="middle_name"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    label="Middle Name"
                    disabled={!editMode}
                    {...field}
                    onChange={(e) => {
                      const filteredValue = filterNameInput(e.target.value);
                      field.onChange(filteredValue);
                    }}
                    error={!!errors.middle_name}
                    helperText={errors.middle_name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    label="Last Name"
                    required
                    disabled={!editMode}
                    {...field}
                    onChange={(e) => {
                      const filteredValue = filterNameInput(e.target.value);
                      field.onChange(filteredValue);
                    }}
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <CommonSingleDateSelector
                    label="Date of Birth *"
                    value={field.value || null}
                    onChange={field.onChange}
                    hideBorder={false}
                    disabled={!editMode}
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                    minDate={dayjs(new Date(1900, 0, 1))}
                    maxDate={dayjs()}
                    customSx={{
                      width: "100%",
                      minWidth: "unset",
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <CommonMultiSelectDropdown
                    label="Language"
                    required
                    value={field.value}
                    options={LANGUAGE_OPTIONS}
                    dataKey="language"
                    onChange={field.onChange}
                    disabled={!editMode}
                    error={!!errors.language}
                    helperText={errors.language?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <CommonAutocompleteDropdown
                    label="Gender"
                    required
                    value={field.value}
                    options={genderOptions}
                    dataKey="gender"
                    setData={(cb) => {
                      const r = cb({ gender: field.value });
                      field.onChange(r.gender);
                    }}
                    disabled={!editMode}
                    error={!!errors.gender}
                    helperText={errors.gender?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="ssn"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    label="SSN"
                    required
                    disabled={!editMode}
                    {...field}
                    onChange={(e) => field.onChange(formatSSN(e.target.value))}
                    error={!!errors.ssn}
                    helperText={errors.ssn?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="last_drug_test"
                control={control}
                render={({ field }) => (
                  <CommonSingleDateSelector
                    label="Last Drug Test *"
                    value={field.value || null}
                    onChange={field.onChange}
                    hideBorder={false}
                    disabled={!editMode}
                    error={!!errors.last_drug_test}
                    helperText={errors.last_drug_test?.message}
                    maxDate={dayjs(new Date())}
                    customSx={{ width: "100%", minWidth: "unset" }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="citizenship"
                control={control}
                render={({ field }) => (
                  <CommonAutocompleteDropdown
                    label="Citizenship"
                    required
                    value={field.value}
                    options={citizenship_options}
                    dataKey="citizenship"
                    setData={(cb) => {
                      const r = cb({ citizenship: field.value });
                      field.onChange(r.citizenship);
                    }}
                    disabled={!editMode}
                    error={!!errors.citizenship}
                    helperText={errors.citizenship?.message}
                  />
                )}
              />
            </Grid>

            {selectedCitizenship && selectedCitizenship !== 1 && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name="passport_visa_number"
                    control={control}
                    render={({ field }) => (
                      <CommonTextField
                        label="Passport / Visa Number"
                        disabled={!editMode}
                        {...field}
                        inputProps={{ maxLength: 15 }}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/[^A-Za-z0-9]/g, "")
                            .slice(0, 20);
                          field.onChange(value);
                        }}
                        error={!!errors.passport_visa_number}
                        helperText={errors.passport_visa_number?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name="passport_visa_expiry"
                    control={control}
                    render={({ field }) => (
                      <CommonSingleDateSelector
                        label="Passport / Visa Expiry Date"
                        value={field.value || null}
                        onChange={field.onChange}
                        hideBorder={false}
                        disabled={!editMode}
                        minDate={dayjs().startOf("day")}
                        error={!!errors.passport_visa_expiry}
                        helperText={errors.passport_visa_expiry?.message}
                        disablePast
                        customSx={{ width: "100%", minWidth: "unset" }}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            {selectedCitizenship && selectedCitizenship !== 1 && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <Controller
                    name="work_permit"
                    control={control}
                    render={({ field }) => (
                      <CommonSingleDateSelector
                        label="Work Permit Expiry Date"
                        value={field.value || null}
                        onChange={field.onChange}
                        hideBorder={false}
                        disabled={!editMode}
                        minDate={dayjs().startOf("day")}
                        error={!!errors.work_permit}
                        helperText={errors.work_permit?.message}
                        disablePast={true}
                        customSx={{ width: "100%", minWidth: "unset" }}
                      />
                    )}
                  />
                </Grid>

                {selectedCitizenship === 4 && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Controller
                      name="citizenship_country"
                      control={control}
                      render={({ field }) => (
                        <CommonTextField
                          label="Country"
                          disabled={!editMode}
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/[^A-Za-z\s'-]/g, "")
                              .slice(0, 50);
                            field.onChange(value);
                          }}
                          error={!!errors.citizenship_country}
                          helperText={errors.citizenship_country?.message}
                        />
                      )}
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </FormSection>
  );
};

export default BasicInformationSection;
