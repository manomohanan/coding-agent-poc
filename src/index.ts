/**
 * String utilities for coding agent POC
 * 
 * A comprehensive collection of string manipulation, validation, 
 * transformation, and formatting utilities.
 */

// Case transformation utilities
export {
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toPascalCase,
  toConstantCase,
  type CaseTransformOptions,
} from './case-transform.js';

// String validation utilities
export {
  isEmail,
  isAlpha,
  isAlphanumeric,
  isUrl,
  isNumeric,
  validateString,
  type ValidationRule,
} from './validation.js';

// String manipulation utilities
export {
  truncate,
  capitalize,
  titleCase,
  reverse,
  removeWhitespace,
  countOccurrences,
  isPalindrome,
  escapeHtml,
  unescapeHtml,
} from './manipulation.js';

// String formatting utilities
export {
  pad,
  template,
  formatNumber,
  formatBytes,
  slugify,
  randomString,
  type PadOptions,
} from './formatting.js';

// Import all utilities for the class
import {
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toPascalCase,
  toConstantCase,
  type CaseTransformOptions,
} from './case-transform.js';

import {
  isEmail,
  isAlpha,
  isAlphanumeric,
  isUrl,
  isNumeric,
  validateString,
  type ValidationRule,
} from './validation.js';

import {
  truncate,
  capitalize,
  titleCase,
  reverse,
  removeWhitespace,
  countOccurrences,
  isPalindrome,
  escapeHtml,
  unescapeHtml,
} from './manipulation.js';

import {
  pad,
  template,
  formatNumber,
  formatBytes,
  slugify,
  randomString,
  type PadOptions,
} from './formatting.js';

/**
 * All-in-one string utility class with fluent interface
 */
export class StringUtils {
  constructor(private readonly value: string) {}

  static of(value: string): StringUtils {
    return new StringUtils(value);
  }

  // Case transformations
  toCamelCase(options?: CaseTransformOptions): StringUtils {
    return new StringUtils(toCamelCase(this.value, options));
  }

  toKebabCase(): StringUtils {
    return new StringUtils(toKebabCase(this.value));
  }

  toSnakeCase(): StringUtils {
    return new StringUtils(toSnakeCase(this.value));
  }

  toPascalCase(): StringUtils {
    return new StringUtils(toPascalCase(this.value));
  }

  toConstantCase(): StringUtils {
    return new StringUtils(toConstantCase(this.value));
  }

  // Manipulations
  truncate(length: number, ellipsis?: string): StringUtils {
    return new StringUtils(truncate(this.value, length, ellipsis));
  }

  capitalize(): StringUtils {
    return new StringUtils(capitalize(this.value));
  }

  titleCase(): StringUtils {
    return new StringUtils(titleCase(this.value));
  }

  reverse(): StringUtils {
    return new StringUtils(reverse(this.value));
  }

  removeWhitespace(): StringUtils {
    return new StringUtils(removeWhitespace(this.value));
  }

  escapeHtml(): StringUtils {
    return new StringUtils(escapeHtml(this.value));
  }

  unescapeHtml(): StringUtils {
    return new StringUtils(unescapeHtml(this.value));
  }

  // Formatting
  pad(length: number, options?: PadOptions): StringUtils {
    return new StringUtils(pad(this.value, length, options));
  }

  slugify(): StringUtils {
    return new StringUtils(slugify(this.value));
  }

  // Validations (return boolean, don't chain)
  isEmail(): boolean {
    return isEmail(this.value);
  }

  isAlpha(): boolean {
    return isAlpha(this.value);
  }

  isAlphanumeric(): boolean {
    return isAlphanumeric(this.value);
  }

  isUrl(): boolean {
    return isUrl(this.value);
  }

  isNumeric(): boolean {
    return isNumeric(this.value);
  }

  isPalindrome(): boolean {
    return isPalindrome(this.value);
  }

  // Utilities
  countOccurrences(substring: string): number {
    return countOccurrences(this.value, substring);
  }

  validate(rules: ValidationRule): { valid: boolean; errors: string[] } {
    return validateString(this.value, rules);
  }

  // Get the final value
  toString(): string {
    return this.value;
  }

  valueOf(): string {
    return this.value;
  }
}