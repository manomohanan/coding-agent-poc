# Code Generation Guidelines
When helping me write code, assume I’m building Node.js backend services using TypeScript. Prefer modern JavaScript features (ES2020+), and use async/await over callbacks or .then().
For APIs, assume I’m using Express.js with TypeScript types for request and response objects. Use express.Request and express.Response where applicable.

## Coding standards
- Use Node.js built-in modules and avoid external dependencies where possible
- Ask the user if you require any additional dependencies before adding them
- Always use async/await for asynchronous code, and use 'node:util' promisify function to avoid callbacks
- Keep the code simple and maintainable
- Use descriptive variable and function names
- Do not add comments unless absolutely necessary, the code should be self-explanatory
- Never use `null`, always use `undefined` for optional values
- Prefer functions over classes
- Always ensure type safety. Avoid use of 'any' wherever possible 
- Follow clean code principles
- Use meaningful variable and function names
- Write modular, reusable code
- Use Dependency Injection where appropriate
- Handle errors using centralized error handling (e.g., Express error middleware)
- For data types, use TypeScript interfaces or types. Prefer type aliases for simple unions and interface for objects.
- Use ESM syntax if possible (import/export), unless otherwise specified.
- When writing project scaffolding, include tsconfig.json, package.json, and use recommended TypeScript compiler options like strict: true.
- For unit tests, suggest Jest with TypeScript support.
- Do not include JavaScript-only examples unless explicitly asked.
- When in doubt, prioritize type safety, readability, and maintainability."**

## Testing
- Use Vitest for testing
- Write tests for all new features and bug fixes
- Ensure tests cover edge cases and error handling
- NEVER change the original code to make it easier to test, instead, write tests that cover the original code as it is

## Documentation
- When adding new features or making significant changes, update the README.md file where necessary

Describe the logic using mermaid syntax for all the code changes and add that to the pull request description.
