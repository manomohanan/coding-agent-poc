/**
 * String formatting utilities
 */

export type PadOptions = {
  char?: string;
  direction?: 'left' | 'right' | 'both';
};

/**
 * Pads a string to a specified length
 */
export function pad(str: string, length: number, options: PadOptions = {}): string {
  if (str.length >= length) return str;
  
  const { char = ' ', direction = 'left' } = options;
  const padLength = length - str.length;
  
  switch (direction) {
    case 'right':
      return str + char.repeat(padLength);
    case 'both': {
      const leftPad = Math.floor(padLength / 2);
      const rightPad = padLength - leftPad;
      return char.repeat(leftPad) + str + char.repeat(rightPad);
    }
    case 'left':
    default:
      return char.repeat(padLength) + str;
  }
}

/**
 * Formats a string template with provided values
 */
export function template(str: string, values: Record<string, unknown>): string {
  if (!str) return str;
  
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = values[key];
    return value !== undefined ? String(value) : match;
  });
}

/**
 * Formats a number as a string with thousands separators
 */
export function formatNumber(num: number, separator = ','): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * Formats bytes into human-readable string
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Slugifies a string for URL usage
 */
export function slugify(str: string): string {
  if (!str) return str;
  
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generates a random string of specified length
 */
export function randomString(length: number, charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'): string {
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  return result;
}