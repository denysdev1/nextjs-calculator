# Retro Calculator

A modern take on a retro-style calculator built with Next.js, TypeScript, and Tailwind CSS. This calculator features both numeric calculations and date operations with a nostalgic design.

## Features

### Numbers Calculator

- Basic arithmetic operations (+, -, \*, /)
- Decimal point support
- Clear function
- Error handling for invalid operations
- Retro-style display

### Date Calculator

- Interactive calendar view
- Add/subtract days from selected date
- Visual date selection
- Date formatting
- Retro-style display

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- date-fns
- Vitest for testing

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

The project includes unit tests for calculator operations. Run tests with:

```bash
npm test
```

## Project Structure

- `/src/components/` - React components
  - `RetroCalculator/` - Main calculator component
  - `NumbersCalculator/` - Numeric operations component
  - `DateCalculator/` - Date operations component
  - `ui/` - Reusable UI components
- `/src/lib/` - Utility functions and helpers
- `/src/utils/` - Constants and shared utilities
- `/src/app/` - Next.js app router files

## Features Highlights

### Numbers Calculator

- Real-time calculation
- Error handling for:
  - Division by zero
  - Invalid expressions
  - Multiple operators
  - Invalid decimal points
- Responsive button layout
- Clear function to reset display

### Date Calculator

- Interactive calendar grid
- Current month highlighting
- Selected date highlighting
- Add/subtract days functionality
- Formatted date display
- Date validation

## Design

The calculator features a retro-inspired design with:

- Gradient backgrounds
- Inset shadows for displays
- Orange accent colors
- Retro-style buttons with press animations
- Monospace fonts for displays
- Tab-based navigation between calculators

