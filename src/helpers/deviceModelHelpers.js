/**
 * Generates a device code from a model name
 * @param {string} name - The model name (e.g., "Samsara G2")
 * @returns {string} - The generated device code (e.g., "SG2")
 */
export const generateDeviceCode = (name) => {
  if (!name || typeof name !== "string") {
    return `DM${Date.now().toString().slice(-3)}`;
  }

  const words = name.split(/\s+/);
  const initials = words.map((word) => word[0]?.toUpperCase()).join("");

  // Extract number from last word if present
  const lastWord = words[words.length - 1];
  const number = lastWord?.match(/\d+/)?.[0] || "";

  return initials + number || `DM${Date.now().toString().slice(-3)}`;
};

export default generateDeviceCode;
