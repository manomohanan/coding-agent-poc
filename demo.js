import { StringUtils, toCamelCase, isEmail, truncate, formatBytes } from './dist/index.js';

console.log('🔧 String Utilities Demo\n');

// Case transformation examples
console.log('📝 Case Transformations:');
console.log('  snake_case → camelCase:', toCamelCase('hello_world_example'));
console.log('  Fluent API example:', StringUtils.of('the quick brown fox')
  .toKebabCase()
  .toPascalCase()
  .toString());

// Validation examples
console.log('\n✅ Validation:');
console.log('  Email validation:', isEmail('test@example.com'));
console.log('  Chain validation:', StringUtils.of('hello123').isAlphanumeric());

// Manipulation examples
console.log('\n🔄 Manipulation:');
console.log('  Truncate text:', truncate('This is a very long text that needs truncation', 20));
console.log('  Fluent manipulation:', StringUtils.of('  Hello World  ')
  .capitalize()
  .removeWhitespace()
  .reverse()
  .toString());

// Formatting examples
console.log('\n📋 Formatting:');
console.log('  Format bytes:', formatBytes(1048576));
console.log('  Slugify URL:', StringUtils.of('Hello World! & Special Characters')
  .slugify()
  .toString());

// Complex chaining example
console.log('\n🔗 Complex Chaining:');
const result = StringUtils.of('  The Quick Brown Fox Jumps Over The Lazy Dog  ')
  .titleCase()
  .removeWhitespace()
  .toSnakeCase()
  .toConstantCase()
  .toString();
console.log('  Complex transformation:', result);

console.log('\n✨ Demo completed successfully!');