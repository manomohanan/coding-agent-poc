import { describe, it, expect } from 'vitest';
import {
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toPascalCase,
  toConstantCase,
} from '../src/case-transform.js';

describe('Case Transform Utilities', () => {
  describe('toCamelCase', () => {
    it('should convert snake_case to camelCase', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld');
      expect(toCamelCase('test_case_string')).toBe('testCaseString');
    });

    it('should convert kebab-case to camelCase', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld');
      expect(toCamelCase('test-case-string')).toBe('testCaseString');
    });

    it('should convert space-separated to camelCase', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
      expect(toCamelCase('test case string')).toBe('testCaseString');
    });

    it('should handle already camelCase strings', () => {
      expect(toCamelCase('helloWorld')).toBe('helloworld');
      expect(toCamelCase('testCaseString')).toBe('testcasestring');
    });

    it('should handle empty and special cases', () => {
      expect(toCamelCase('')).toBe('');
      expect(toCamelCase('a')).toBe('a');
      expect(toCamelCase('A')).toBe('a');
    });

    it('should preserve underscores when specified', () => {
      expect(toCamelCase('_hello_world', { preserveLeadingUnderscore: true })).toBe('_helloWorld');
      expect(toCamelCase('hello_world_', { preserveTrailingUnderscore: true })).toBe('helloWorld_');
    });
  });

  describe('toKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world');
      expect(toKebabCase('testCaseString')).toBe('test-case-string');
    });

    it('should convert PascalCase to kebab-case', () => {
      expect(toKebabCase('HelloWorld')).toBe('hello-world');
      expect(toKebabCase('TestCaseString')).toBe('test-case-string');
    });

    it('should convert snake_case to kebab-case', () => {
      expect(toKebabCase('hello_world')).toBe('hello-world');
      expect(toKebabCase('test_case_string')).toBe('test-case-string');
    });

    it('should handle special characters', () => {
      expect(toKebabCase('hello world')).toBe('hello-world');
      expect(toKebabCase('hello@world#test')).toBe('hello-world-test');
    });

    it('should handle empty and edge cases', () => {
      expect(toKebabCase('')).toBe('');
      expect(toKebabCase('a')).toBe('a');
      expect(toKebabCase('A')).toBe('a');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world');
      expect(toSnakeCase('testCaseString')).toBe('test_case_string');
    });

    it('should convert PascalCase to snake_case', () => {
      expect(toSnakeCase('HelloWorld')).toBe('hello_world');
      expect(toSnakeCase('TestCaseString')).toBe('test_case_string');
    });

    it('should convert kebab-case to snake_case', () => {
      expect(toSnakeCase('hello-world')).toBe('hello_world');
      expect(toSnakeCase('test-case-string')).toBe('test_case_string');
    });

    it('should handle special characters', () => {
      expect(toSnakeCase('hello world')).toBe('hello_world');
      expect(toSnakeCase('hello@world#test')).toBe('hello_world_test');
    });

    it('should handle empty and edge cases', () => {
      expect(toSnakeCase('')).toBe('');
      expect(toSnakeCase('a')).toBe('a');
      expect(toSnakeCase('A')).toBe('a');
    });
  });

  describe('toPascalCase', () => {
    it('should convert camelCase to PascalCase', () => {
      expect(toPascalCase('helloWorld')).toBe('HelloWorld');
      expect(toPascalCase('testCaseString')).toBe('TestCaseString');
    });

    it('should convert snake_case to PascalCase', () => {
      expect(toPascalCase('hello_world')).toBe('HelloWorld');
      expect(toPascalCase('test_case_string')).toBe('TestCaseString');
    });

    it('should convert kebab-case to PascalCase', () => {
      expect(toPascalCase('hello-world')).toBe('HelloWorld');
      expect(toPascalCase('test-case-string')).toBe('TestCaseString');
    });

    it('should handle empty and edge cases', () => {
      expect(toPascalCase('')).toBe('');
      expect(toPascalCase('a')).toBe('A');
      expect(toPascalCase('hello')).toBe('Hello');
    });
  });

  describe('toConstantCase', () => {
    it('should convert camelCase to CONSTANT_CASE', () => {
      expect(toConstantCase('helloWorld')).toBe('HELLO_WORLD');
      expect(toConstantCase('testCaseString')).toBe('TEST_CASE_STRING');
    });

    it('should convert kebab-case to CONSTANT_CASE', () => {
      expect(toConstantCase('hello-world')).toBe('HELLO_WORLD');
      expect(toConstantCase('test-case-string')).toBe('TEST_CASE_STRING');
    });

    it('should convert space-separated to CONSTANT_CASE', () => {
      expect(toConstantCase('hello world')).toBe('HELLO_WORLD');
      expect(toConstantCase('test case string')).toBe('TEST_CASE_STRING');
    });

    it('should handle empty and edge cases', () => {
      expect(toConstantCase('')).toBe('');
      expect(toConstantCase('a')).toBe('A');
      expect(toConstantCase('hello')).toBe('HELLO');
    });
  });
});