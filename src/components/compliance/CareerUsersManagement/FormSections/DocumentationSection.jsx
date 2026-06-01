import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import FormSection from "../HeaderComponents/FormSection";
import CommonFileUpload from "../../../../common/CommonFileUpload";
const DocumentationSection = ({
  control,
  errors,
  editMode,
  existingMedicalFiles,
  setMedicalUploaded,
  handleImagePreview,
  handleRemoveExistingFile,
}) => {
  return (
    <Grid item xs={12}>
      <FormSection
        id="upload-documentation"
        title="Upload proof of Documentation"
        subtitle="Upload supporting documents for verification and compliance"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12} mb={3}>
            <Controller
              name="medical_document_files"
              control={control}
              render={({ field }) => (
                <CommonFileUpload
                  files={Array.isArray(field.value) ? field.value : []}
                  existingFiles={existingMedicalFiles}
                  onFileChange={(files) => {
                    field.onChange(files);
                    if (files && files.length > 0) {
                      setMedicalUploaded(true);
                    } else if (existingMedicalFiles.length === 0) {
                      setMedicalUploaded(false);
                    }
                  }}
                  onPreview={handleImagePreview}
                  maxSize={10 * 1024 * 1024}
                  allowedFileTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
                  error={!!errors.medical_document_files}
                  helperText={errors.medical_document_files?.message}
                  onRemoveExistingFile={
                    editMode ? handleRemoveExistingFile : undefined
                  }
                  disabled={!editMode}
                />
              )}
            />
          </Grid>
        </Grid>
      </FormSection>
    </Grid>
  );
};

export default DocumentationSection;
