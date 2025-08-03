/**
 * String transformation utilities
 */

export type CaseTransformOptions = {
  preserveLeadingUnderscore?: boolean;
  preserveTrailingUnderscore?: boolean;
};

/**
 * Converts a string to camelCase
 */
export function toCamelCase(str: string, options: CaseTransformOptions = {}): string {
  if (!str) return str;
  
  const { preserveLeadingUnderscore = false, preserveTrailingUnderscore = false } = options;
  
  let leadingUnderscore = '';
  let trailingUnderscore = '';
  let workStr = str;
  
  if (preserveLeadingUnderscore && str.startsWith('_')) {
    const match = str.match(/^_+/);
    leadingUnderscore = match ? match[0] : '';
    workStr = str.slice(leadingUnderscore.length);
  }
  
  if (preserveTrailingUnderscore && str.endsWith('_')) {
    const match = str.match(/_+$/);
    trailingUnderscore = match ? match[0] : '';
    workStr = workStr.slice(0, -trailingUnderscore.length);
  }
  
  const result = workStr
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[^a-zA-Z_$]/, '');
  
  return leadingUnderscore + result + trailingUnderscore;
}

/**
 * Converts a string to kebab-case
 */
export function toKebabCase(str: string): string {
  if (!str) return str;
  
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '');
}

/**
 * Converts a string to snake_case
 */
export function toSnakeCase(str: string): string {
  if (!str) return str;
  
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toLowerCase()
    .replace(/^_+|_+$/g, '');
}

/**
 * Converts a string to PascalCase
 */
export function toPascalCase(str: string): string {
  if (!str) return str;
  
  // Handle already camelCase strings specially to preserve internal capitalization
  if (/^[a-z][a-zA-Z0-9]*$/.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  const camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * Converts a string to CONSTANT_CASE
 */
export function toConstantCase(str: string): string {
  return toSnakeCase(str).toUpperCase();
}