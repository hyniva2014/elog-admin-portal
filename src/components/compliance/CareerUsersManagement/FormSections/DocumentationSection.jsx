import { Grid } from "@mui/material";
import FormSection from "../HeaderComponents/FormSection";
import FormFieldsSection from "../FormFields/FormFieldsSection";

const DOCUMENTATION_FIELDS = [
  { name: "medical_document_files", type: "file", xs: 12, sm: 6, md: 12 },
];

const DocumentationSection = ({
  control,
  errors,
  editMode,
  existingMedicalFiles,
  setMedicalUploaded,
  handleImagePreview,
  handleRemoveExistingFile,
}) => {
  const additionalProps = {
    medical_document_files: {
      existingFiles: existingMedicalFiles,
      onFileChange: (files) => {
        if (files && files.length > 0) {
          setMedicalUploaded(true);
        } else if (existingMedicalFiles.length === 0) {
          setMedicalUploaded(false);
        }
      },
      onPreview: handleImagePreview,
      maxSize: 10 * 1024 * 1024,
      allowedFileTypes: [".pdf", ".jpg", ".jpeg", ".png"],
      onRemoveExistingFile: editMode ? handleRemoveExistingFile : undefined,
    },
  };

  return (
    <Grid item xs={12}>
      <FormSection
        id="upload-documentation"
        title="Upload proof of Documentation"
        subtitle="Upload supporting documents for verification and compliance"
      >
        <Grid container spacing={2}>
          <FormFieldsSection
            fields={DOCUMENTATION_FIELDS}
            control={control}
            errors={errors}
            disabled={!editMode}
            additionalProps={additionalProps}
          />
        </Grid>
      </FormSection>
    </Grid>
  );
};

export default DocumentationSection;
