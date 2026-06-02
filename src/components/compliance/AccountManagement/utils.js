export const formatUsdot = (value) => {
  if (!value) return value;
  return value.replace(/\D/g, "").slice(0, 8);
};

export const formatMcNumber = (value) => {
  if (!value) return value;
  const upper = value.toUpperCase();
  const hasPrefix = upper.startsWith("MC");
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return hasPrefix ? `MC${digits}` : digits;
};

export const formatTaxId = (value) => {
  if (!value) return value;
  const cleaned = value.replace(/\D/g, "").slice(0, 9);
  if (cleaned.length <= 2) return cleaned;
  return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
};

export const formatPhoneNumber = (value, previousValue) => {
  if (!value) return value;
  const cleaned = value.replace(/\D/g, "").slice(0, 10);
  if (cleaned.length === 0) return "";

  const isDeleting = previousValue !== undefined && value.length < previousValue.length;

  if (cleaned.length < 3) return `(${cleaned}`;

  if (cleaned.length === 3) {
    if (isDeleting) return `(${cleaned}`;
    return `(${cleaned}) `;
  }

  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};
