# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server
- `yarn build` - Build production version
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Architecture Overview

This is a Next.js portfolio website using Chakra UI for styling and theming. The architecture follows these patterns:

### Theme & Styling
- Custom Chakra UI theme in `src/Theme.js` with dark mode default
- Custom MonoLisa fonts (MonolisaBold, MonolisaRegular) loaded via `styles/Theme/fonts.js`
- Color mode management with SSR support through `src/chakra.js`
- Global layout wrapper in `pages/_app.js` with consistent container and header

### Content & Data
- Project/portfolio data centralized in `src/Data.js` as structured export
- Image assets in `public/images/` directory
- Custom icons and components in `src/components/`

### Component Structure
- Reusable UI components in `src/components/CustomComponents.js`
- Header component with responsive design (desktop sticky header, mobile bottom navigation)
- Work/project display components that consume data from `src/Data.js`

### Pages Structure
- Standard Next.js pages structure with API routes
- Blog functionality (currently minimal implementation)
- About and index pages using component composition

The site uses a consistent design system with custom brand colors (FC466B pink, 3F5EFB blue) and maintains responsive behavior across desktop and mobile viewports.

### SEO & Performance
- Comprehensive metadata with Open Graph and Twitter Card support
- JSON-LD structured data for rich snippets
- Sitemap.xml and robots.txt for search engine crawling
- Security headers and performance optimizations in next.config.js
- Semantic HTML structure with proper heading hierarchy