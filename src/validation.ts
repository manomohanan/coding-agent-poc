/**
 * String validation utilities
 */

export type ValidationRule = {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  allowEmpty?: boolean;
};

/**
 * Validates if a string is a valid email address
 */
export function isEmail(str: string): boolean {
  if (!str) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

/**
 * Validates if a string contains only alphabetic characters
 */
export function isAlpha(str: string): boolean {
  if (!str) return false;
  
  return /^[a-zA-Z]+$/.test(str);
}

/**
 * Validates if a string contains only alphanumeric characters
 */
export function isAlphanumeric(str: string): boolean {
  if (!str) return false;
  
  return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Validates if a string is a valid URL
 */
export function isUrl(str: string): boolean {
  if (!str) return false;
  
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates if a string is numeric
 */
export function isNumeric(str: string): boolean {
  if (!str) return false;
  
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}

/**
 * Validates a string against custom rules
 */
export function validateString(str: string, rules: ValidationRule): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!rules.allowEmpty && !str) {
    errors.push('String cannot be empty');
  }
  
  if (rules.minLength !== undefined && str.length < rules.minLength) {
    errors.push(`String must be at least ${rules.minLength} characters long`);
  }
  
  if (rules.maxLength !== undefined && str.length > rules.maxLength) {
    errors.push(`String must be no more than ${rules.maxLength} characters long`);
  }
  
  if (rules.pattern && !rules.pattern.test(str)) {
    errors.push('String does not match required pattern');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}