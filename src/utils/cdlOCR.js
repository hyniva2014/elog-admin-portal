// import Tesseract from 'tesseract.js';
import dayjs from 'dayjs';

/**
 * Extract CDL information from uploaded license image using OCR
 * @param {File} imageFile - The uploaded CDL license image
 * @returns {Promise<Object>} - Extracted CDL information
 */
export const extractCDLFromImage = async (imageFile, onProgress) => {
  try {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    
    return new Promise((resolve, reject) => {
      img.onload = async () => {
        try {
          canvas.width = img.width;
          canvas.height = img.height;
          
          ctx.drawImage(img, 0, 0);
          
          const result = await Tesseract.recognize(
            canvas,
            'eng',
            {
              logger: m => {
                if (m.status === 'recognizing text') {
                  if (onProgress) {
                    onProgress(Math.round(m.progress * 100));
                  }
                }
              },
            }
          );
          
          
          const extractedData = parseCDLText(result.data.text);
          
          resolve(extractedData);
        } catch (error) {
          console.error('OCR Error:', error);
          resolve({
            cdl_number: '',
            cdl_state: '',
            cdl_class: '',
            cdl_expiry_date: null,
            confidence: 0
          });
        }
      };
      
      img.onerror = () => {
        console.error('Failed to load image');
        resolve({
          cdl_number: '',
          cdl_state: '',
          cdl_class: '',
          cdl_expiry_date: null,
          confidence: 0
        });
      };
      
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.onerror = () => {
        console.error('Failed to read file');
        resolve({
          cdl_number: '',
          cdl_state: '',
          cdl_class: '',
          cdl_expiry_date: null,
          confidence: 0
        });
      };
      reader.readAsDataURL(imageFile);
    });
  } catch (error) {
    console.error('CDL OCR Error:', error);
    return {
      cdl_number: '',
      cdl_state: '',
      cdl_class: '',
      cdl_expiry_date: null,
      confidence: 0
    };
  }
};

/**
 * Parse OCR text to extract CDL information
 * @param {string} ocrText - Text extracted from OCR
 * @returns {Object} - Parsed CDL information
 */
const parseCDLText = (ocrText) => {
  const text = ocrText.toUpperCase();
  
  const result = {
    cdl_number: '',
    cdl_state: '',
    cdl_class: '',
    cdl_expiry_date: null,
    confidence: 0
  };
  
  const licenseNumberPatterns = [
    /([A-Z]\s*\d{6,})/,
    /([A-Z]\d{6,})/,
    /(\d{6,})/,
    /([A-Z]+\s*\d{4,})/,
    /([A-Z]+\d{4,})/,
    /([A-Z]{3,}\s*\d+)/,
    /([A-Z]{3,}\d+)/,
    
    /([A-Z]\s*\d{4,})/, 
    /(\b[A-Z]\b\s*\d+)/, 
    /(\d{4,})/, 
    
    /LICENSE\s*NO\.?\s*([A-Z0-9]+)/i,
    /LICENSE\s*:?([A-Z0-9]+)/i, 
    /DRIVER\s*LICENSE\s*NO\.?\s*([A-Z0-9]+)/i,
    /DRIVER'S\s*LICENSE\s*NO\.?\s*([A-Z0-9]+)/i,
    /DL\s*NO\.?\s*([A-Z0-9]+)/i,
    /DL\s*:?([A-Z0-9]+)/i,
    /DL\s*#\s*([A-Z0-9]+)/i,
    
    /ID\s*NO\.?\s*([A-Z0-9]+)/i,
    /ID\s*:?([A-Z0-9]+)/i,
    /IDENTIFICATION\s*NO\.?\s*([A-Z0-9]+)/i,
    
    /NO\.?\s*([A-Z]{2,}\d{4,})/i,
    /NUMBER[:\s]*([A-Z]{2,}\d{4,})/i,
    /#\s*([A-Z]{2,}\d{4,})/i,
    
    /([A-Z]{2}\s*CDL\s*\d+)/i, 
    /([A-Z]{2}\s*DL\s*\d+)/i, 
    /([A-Z]{2}\s*\d{6,})/, 
    /([A-Z]{2}\d{6,})/, 
    /([A-Z]{2}\s*\d{4,})/, 
    /([A-Z]{2}\d{4,})/, 
    
    /CDL\s*NO\.?\s*([A-Z0-9]+)/i,
    /CDL\s*:?([A-Z0-9]+)/i,
    /COMMERCIAL\s*DRIVER\s*LICENSE\s*NO\.?\s*([A-Z0-9]+)/i,
    /CDL\s*NUMBER[:\s]*([A-Z0-9]+)/i,
    /CDL\s*#\s*([A-Z0-9]+)/i,
  ];
  
  for (const pattern of licenseNumberPatterns) {
    const match = text.match(pattern);
    if (match) {
      result.cdl_number = match[1] || match[0];
      result.confidence += 30;
      break;
    }
  }
  
  
  let licenseNumber = result.cdl_number;
  
  if (licenseNumber) {
    const stateFromLicense = licenseNumber.substring(0, 2).toUpperCase();
    
    const validStates = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];
    
    
    if (validStates.includes(stateFromLicense)) {
      result.cdl_state = stateFromLicense;
      result.confidence += 30;
    }
  }
  
  if (!result.cdl_state) {
    
    const stateNameMap = {
      'ALABAMA': 'AL', 'ALASKA': 'AK', 'ARIZONA': 'AZ', 'ARKANSAS': 'AR', 'CALIFORNIA': 'CA',
      'COLORADO': 'CO', 'CONNECTICUT': 'CT', 'DELAWARE': 'DE', 'FLORIDA': 'FL', 'GEORGIA': 'GA',
      'HAWAII': 'HI', 'IDAHO': 'ID', 'ILLINOIS': 'IL', 'INDIANA': 'IN', 'IOWA': 'IA',
      'KANSAS': 'KS', 'KENTUCKY': 'KY', 'LOUISIANA': 'LA', 'MAINE': 'ME', 'MARYLAND': 'MD',
      'MASSACHUSETTS': 'MA', 'MICHIGAN': 'MI', 'MINNESOTA': 'MN', 'MISSISSIPPI': 'MS', 'MISSOURI': 'MO',
      'MONTANA': 'MT', 'NEBRASKA': 'NE', 'NEVADA': 'NV', 'NEW HAMPSHIRE': 'NH', 'NEW JERSEY': 'NJ',
      'NEW MEXICO': 'NM', 'NEW YORK': 'NY', 'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND', 'OHIO': 'OH',
      'OKLAHOMA': 'OK', 'OREGON': 'OR', 'PENNSYLVANIA': 'PA', 'RHODE ISLAND': 'RI', 'SOUTH CAROLINA': 'SC',
      'SOUTH DAKOTA': 'SD', 'TENNESSEE': 'TN', 'TEXAS': 'TX', 'UTAH': 'UT', 'VERMONT': 'VT',
      'VIRGINIA': 'VA', 'WASHINGTON': 'WA', 'WEST VIRGINIA': 'WV', 'WISCONSIN': 'WI', 'WYOMING': 'WY'
    };
    
    const statePatterns = [
      /\b(CALIFORNIA|ALABAMA|ALASKA|ARIZONA|ARKANSAS|COLORADO|CONNECTICUT|DELAWARE|FLORIDA|GEORGIA|HAWAII|IDAHO|ILLINOIS|INDIANA|IOWA|KANSAS|KENTUCKY|LOUISIANA|MAINE|MARYLAND|MASSACHUSETTS|MICHIGAN|MINNESOTA|MISSISSIPPI|MISSOURI|MONTANA|NEBRASKA|NEVADA|NEW\s+HAMPSHIRE|NEW\s+JERSEY|NEW\s+MEXICO|NEW\s+YORK|NORTH\s+CAROLINA|NORTH\s+DAKOTA|OHIO|OKLAHOMA|OREGON|PENNSYLVANIA|RHODE\s+ISLAND|SOUTH\s+CAROLINA|SOUTH\s+DAKOTA|TENNESSEE|TEXAS|UTAH|VERMONT|VIRGINIA|WASHINGTON|WEST\s+VIRGINIA|WISCONSIN|WYOMING)\b/i,
      
      /\b([A-Z]{2})\s+\d{5}\b/, 
      /([A-Z]{2})\s+\d{5}/, 
      /\b([A-Z]{2})\s+\d{5}-\d{4}\b/, 
      
      /STATE[:\s]*([A-Z]{2})\b/i, 
      /ST[:\s]*([A-Z]{2})\b/i, 
      /STATE\s*([A-Z]{2})\b/i, 
      /ST\s*([A-Z]{2})\b/i,

      /([A-Z]{2}),\s*[A-Z]/i, 
      /\b([A-Z]{2})\b(?=\s+[A-Z])/i, 
      /([A-Z]{2})\s+[A-Z]+\s*,/i, 
      
      /\b([A-Z]{2})\b/, 
      /([A-Z]{2})\d{6,}/, 
      /\b([A-Z]{2})\b(?=\s*\d)/, 
      
      /CDL\s*([A-Z]{2})/i, 
      /([A-Z]{2})\s*CDL/i,
      /LICENSE\s*([A-Z]{2})/i,
      /([A-Z]{2})\s*LICENSE/i,
      
      /ISSUED\s*IN\s*([A-Z]{2})\b/i, 
      /ISSUING\s*STATE[:\s]*([A-Z]{2})\b/i, 
      /PLACE\s*OF\s*ISSUE[:\s]*([A-Z]{2})\b/i,
    ];
    
    console.log("=== Testing State Patterns ===");
    for (const pattern of statePatterns) {
      const stateMatch = text.match(pattern);
      if (stateMatch) {
        let potentialState = stateMatch[1];
        
        if (potentialState.length > 2) {
          const normalizedName = potentialState.replace(/\s+/g, ' ').toUpperCase();
          potentialState = stateNameMap[normalizedName] || null;
        }
        
        const validStates = [
          'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ];
        
        
        if (potentialState && validStates.includes(potentialState)) {
          result.cdl_state = potentialState;
          result.confidence += 25;
          break;
        }
      }
    }
  }
  
  if (!result.cdl_state) {
    const allTwoLetterCodes = text.match(/\b[A-Z]{2}\b/g) || [];
    
    const validStates = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];
    
    for (const code of allTwoLetterCodes) {
      if (validStates.includes(code)) {
        result.cdl_state = code;
        result.confidence += 10;
        break;
      }
    }
  }
  
  
  const classPatterns = [
    /\bCLASS\s*[:\.\-]*\s*([A-M])\b/i,
    /\bCLASS\s*([A-M])\b/i,
    /CLASS[:\.\-]*([A-M])/i,
    /CDL\s*CLASS\s*[:\.\-]*\s*([A-M])/i,
    /LICENSE\s*CLASS\s*[:\.\-]*\s*([A-M])/i,
    /TYPE\s*[:\.\-]*\s*([A-M])\b/i,
    /TYPE\s*([A-M])\b/i,
    
    /\b([A-M])\b(?!\s*[A-Z])/, 
    /\b([A-M])\b(?=\s*$)/,
    /\b([A-M])\b(?=\s*CLASS)/i,
    /\b([A-M])\b(?=\s*TYPE)/i, 
    /\b([A-M])\b(?=\s*[0-9])/, 
    
    /ENDORSEMENTS?\s*[:\.\-]*\s*([A-M])/i,
    /RESTRICTIONS?\s*[:\.\-]*\s*([A-M])/i,
    
    /^([A-M])\s*$/m, 
    /^[A-M]\s*$/m, 
    
    /CL\s*([A-M])/i, 
    /CLS\s*([A-M])/i, 
    /CLAS\s*([A-M])/i, 
  ];
  
  console.log("=== Testing Class Patterns ===");
  for (const pattern of classPatterns) {
    const classMatch = text.match(pattern);
    console.log("Testing class pattern:", pattern.toString(), "Match:", classMatch);
    if (classMatch) {
      result.cdl_class = classMatch[1];
      result.confidence += 25;
      break;
    }
  }
  
  if (!result.cdl_class) {
    const allSingleLetters = text.match(/\b[A-M]\b/g) || [];
    
    if (allSingleLetters.length > 0) {
      result.cdl_class = allSingleLetters[0];
      result.confidence += 10;
    }
  }
  
  const datePatterns = [
    /EXP\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i,
    /EXP\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    /EXPIRES?\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    
    /EXPIRATION\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    /VALID\s*UNTIL\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    /EXP\s*DATE\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    /EXPIRY\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    
    /END\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    /ENDS\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    /THRU\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    /THROUGH\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i,
    
    /DOB\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    /DATE\s*OF\s*BIRTH\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
   
    /(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/, 
    /(\d{1,2}\/\d{1,2}\/\d{2,4})/, 
    /(\d{1,2}-\d{1,2}-\d{2,4})/, 
    /(\d{1,2}\s*\.\s*\d{1,2}\s*\.\s*\d{2,4})/, 
    
    /ISSUED\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    /RENEW\s*[:\.\-]*\s*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i, 
    
    /EXP\s*[:\.\-]*\s*(\d{1,2}\s+\d{1,2}\s+\d{2,4})/i, 
    /EXPIRES?\s*[:\.\-]*\s*(\d{1,2}\s+\d{1,2}\s+\d{2,4})/i, 
    /(\d{1,2}\s+\d{1,2}\s+\d{2,4})/, 
    
    /EXP[:\.\-]*(\d{6,8})/i, 
    /EXPIRES?[:\.\-]*(\d{6,8})/i, 
  ];
  for (const pattern of datePatterns) {
    const dateMatch = text.match(pattern);
    if (dateMatch) {
      const dateStr = dateMatch[1];
      const parsedDate = parseDate(dateStr);
      if (parsedDate) {
        const dayjsDate = convertToDayjs(parsedDate);
        result.cdl_expiry_date = dayjsDate;
        result.confidence += 20;
        break;
      }
    }
  }
  
  if (!result.cdl_expiry_date) {
    const allDates = text.match(/\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/g) || [];
    
    for (const dateStr of allDates) {
      const parsedDate = parseDate(dateStr);
      if (parsedDate) {
        const dayjsDate = convertToDayjs(parsedDate);
        result.cdl_expiry_date = dayjsDate;
        result.confidence += 10;
        break;
      }
    }
  }
  
  
  return result;
};

/**
 * Parse date string in various formats
 * @param {string} dateStr - Date string
 * @returns {Date|null} - Parsed date or null
 */
const parseDate = (dateStr) => {
  try {
    console.log("Attempting to parse date:", dateStr);
    
    const formats = [
      'MM/DD/YYYY',
      'MM-DD-YYYY', 
      'MM.DD.YYYY',
      'MM/DD/YY',
      'MM-DD-YY',
      'MM.DD.YY'
    ];
    
    for (const format of formats) {
      const parsed = new Date(dateStr.replace(/[\/\-]/g, '/'));
      if (!isNaN(parsed.getTime())) {
        const year = parsed.getFullYear();
        const month = parsed.getMonth() + 1;
        const day = parsed.getDate();
        
        if (year < 1900 || year > 2100) {
          continue;
        }
        
        if (month < 1 || month > 12) {
          continue;
        }
        
        if (day < 1 || day > 31) {
          console.log("Day out of range:", day);
          continue;
        }
        
        if (dateStr.match(/\d{2}[\/\-]\d{2}[\/\-]\d{2}$/)) {
          if (year < 100) {
            parsed.setFullYear(year + 2000);
          } else if (year < 1000) {
            parsed.setFullYear(year + 1900);
          }
        }
        
        return parsed;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Date parsing error:', error);
    return null;
  }
};

/**
 * Convert native Date to dayjs object for MUI date picker compatibility
 * @param {Date|null} date - Native Date object
 * @returns {Object|null} - dayjs object or null
 */
const convertToDayjs = (date) => {
  try {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return null;
    }
    
    if (dayjs && typeof dayjs === 'function') {
      const dayjsDate = dayjs(date);
      return dayjsDate;
    }
    
    return date;
  } catch (error) {
    console.error('Error converting to dayjs:', error);
    return date;
  }
};

/**
 * Get US state options for dropdown matching
 * @returns {Array} - Array of state options
 */
export const getUSStateOptions = () => {
  return [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];
};
