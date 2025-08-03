# String Utilities - Coding Agent POC

A comprehensive TypeScript library providing powerful string manipulation, validation, transformation, and formatting utilities for Node.js applications.

## Features

### 🔄 Case Transformations
- `toCamelCase()` - Convert to camelCase
- `toKebabCase()` - Convert to kebab-case 
- `toSnakeCase()` - Convert to snake_case
- `toPascalCase()` - Convert to PascalCase
- `toConstantCase()` - Convert to CONSTANT_CASE

### ✅ Validation
- `isEmail()` - Validate email addresses
- `isAlpha()` - Check for alphabetic characters only
- `isAlphanumeric()` - Check for alphanumeric characters only
- `isUrl()` - Validate URL format
- `isNumeric()` - Check for numeric strings
- `validateString()` - Custom validation with rules

### 🛠️ Manipulation
- `truncate()` - Truncate strings with custom ellipsis
- `capitalize()` - Capitalize first letter
- `titleCase()` - Convert to Title Case
- `reverse()` - Reverse string
- `removeWhitespace()` - Remove all whitespace
- `countOccurrences()` - Count substring occurrences
- `isPalindrome()` - Check if string is a palindrome
- `escapeHtml()` / `unescapeHtml()` - HTML encoding/decoding

### 📋 Formatting
- `pad()` - Pad strings with custom characters
- `template()` - String template interpolation
- `formatNumber()` - Format numbers with separators
- `formatBytes()` - Human-readable byte formatting
- `slugify()` - Create URL-friendly slugs
- `randomString()` - Generate random strings

## Installation

```bash
npm install
npm run build
```

## Usage

### Individual Functions

```typescript
import { toCamelCase, isEmail, truncate, formatBytes } from './dist/index.js';

// Case transformation
console.log(toCamelCase('hello_world')); // 'helloWorld'

// Validation
console.log(isEmail('test@example.com')); // true

// Manipulation
console.log(truncate('Long text here', 10)); // 'Long te...'

// Formatting
console.log(formatBytes(1048576)); // '1 MB'
```

### Fluent API with StringUtils Class

```typescript
import { StringUtils } from './dist/index.js';

const result = StringUtils.of('hello_world_example')
  .toCamelCase()
  .toPascalCase()
  .truncate(10)
  .toString();

console.log(result); // 'HelloWorl...'
```

### Complex Transformations

```typescript
// Chain multiple operations
const slug = StringUtils.of('  The Quick Brown Fox! ')
  .titleCase()
  .removeWhitespace()
  .toKebabCase()
  .slugify()
  .toString();

console.log(slug); // 'the-quick-brown-fox'
```

### Validation with Custom Rules

```typescript
import { validateString } from './dist/index.js';

const result = validateString('test123', {
  minLength: 5,
  maxLength: 20,
  pattern: /^[a-zA-Z0-9]+$/
});

console.log(result); // { valid: true, errors: [] }
```

## Development

### Scripts

```bash
npm run build     # Compile TypeScript
npm run test      # Run tests
npm run test:coverage  # Run tests with coverage
npm run dev       # Watch mode compilation
npm run lint      # Run linter
```

### Testing

The library includes comprehensive tests with 98%+ coverage:

```bash
npm test
```

### Demo

Run the demo to see all features in action:

```bash
node demo.js
```

## Architecture

The library is organized into focused modules:

- `case-transform.ts` - Case transformation utilities
- `validation.ts` - String validation functions
- `manipulation.ts` - String manipulation operations
- `formatting.ts` - String formatting utilities
- `index.ts` - Main exports and StringUtils class

## TypeScript Support

Full TypeScript support with:
- Strict type checking enabled
- Comprehensive type definitions
- ESM module format
- Modern ES2022 features

## License

MIT
