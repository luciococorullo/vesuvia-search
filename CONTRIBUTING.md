# Contributing to VesuviaSearch

Thank you for your interest in contributing to VesuviaSearch! This guide will help you get started with contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

   ```bash
   git clone https://github.com/your-username/vesuvia-search.git
   cd vesuvia-search
   ```

3. **Add the upstream repository**:

   ```bash
   git remote add upstream https://github.com/original-owner/vesuvia-search.git
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Set up the database**:

   ```bash
   npm run db:setup
   ```

6. **Start the development server**:

   ```bash
   npm run dev
   ```

## Development Workflow

1. **Create a new branch** for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** and test them thoroughly
3. **Run linting and type checking**:

   ```bash
   npm run lint
   npm run type-check
   ```

4. **Commit your changes** (see [Commit Guidelines](#commit-guidelines))
5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub

## Code Style

### TypeScript and React

- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Use functional components with hooks
- Prefer named exports over default exports for components
- Use proper typing - avoid `any` type

### File Organization

- Components should be placed in appropriate directories:
  - `src/components/ui/` - Reusable UI components
  - `src/app/components/` - Page-specific components
  - `src/components/` - General shared components
- Use PascalCase for component names
- Use camelCase for functions and variables
- Use kebab-case for file names when appropriate

### CSS and Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Prefer composition over customization
- Use semantic class names when creating custom styles

### Database and API

- Use Prisma schema for database changes
- Follow RESTful API conventions
- Implement proper error handling
- Use Zod for request validation
- Add appropriate TypeScript types

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples

```bash
feat(search): add advanced filtering options
fix(api): resolve station lookup performance issue
docs(readme): update installation instructions
style(components): format train results component
refactor(hooks): simplify useTrains hook implementation
```

## Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add or update tests** for new functionality
3. **Ensure all tests pass**:

   ```bash
   npm test
   ```

4. **Run linting**:

   ```bash
   npm run lint
   ```

5. **Check TypeScript compilation**:

   ```bash
   npm run type-check
   ```

### PR Description Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have tested these changes locally
- [ ] I have added/updated tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Additional Notes
Any additional information that reviewers should know.
```

## Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check the FAQ** in the README
3. **Try the latest version** to see if the issue still exists

### Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Screenshots** if applicable
- **Environment details**:
  - OS and version
  - Browser and version
  - Node.js version
  - Package versions

### Enhancement Requests

For feature requests, please include:

- **Clear description** of the enhancement
- **Use case** - why would this be useful?
- **Possible implementation** ideas (optional)
- **Alternatives considered**

## Development Tips

### Database Changes

When making database schema changes:

1. Update the Prisma schema file
2. Generate a new migration:

   ```bash
   npx prisma migrate dev --name your-migration-name
   ```

3. Update TypeScript types if needed
4. Test the migration thoroughly

### Adding New Languages

To add support for a new language:

1. Add the language to `src/lib/i18n.ts`
2. Add all translations for the new language
3. Test the language switching functionality
4. Update documentation

### Performance Considerations

- Use React.memo for expensive components
- Implement proper loading states
- Optimize database queries
- Consider pagination for large datasets

### Testing

- Write unit tests for utility functions
- Test API endpoints thoroughly
- Test responsive design on different screen sizes
- Test internationalization features

## Getting Help

If you need help with contributing:

- **Check the documentation** in this repository
- **Open a discussion** on GitHub
- **Ask questions** in issues (label them as questions)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct (to be added). Please be respectful and constructive in all interactions.

---

Thank you for contributing to VesuviaSearch! Your efforts help make train travel easier for everyone using the Circumvesuviana. 🚂
