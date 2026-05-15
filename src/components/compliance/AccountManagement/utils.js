// Input formatters for form fields
export const formatTaxId = (value) => {
  if (!value) return value;
  const cleaned = value.replace(/\D/g, "").slice(0, 9);
  if (cleaned.length <= 2) return cleaned;
  return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
};

export const formatPhoneNumber = (value) => {
  if (!value) return value;
  const cleaned = value.replace(/\D/g, "").slice(0, 10);
  if (cleaned.length === 0) return cleaned;
  if (cleaned.length < 3) return `(${cleaned}`;
  if (cleaned.length === 3) return `(${cleaned})`;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};
