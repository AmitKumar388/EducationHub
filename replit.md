# EduHub - Academic Resource Platform

## Overview

EduHub is a full-stack web application designed as an academic resource hub where users can browse, filter, and download educational materials. The platform provides access to study notes, previous year questions (PYQs), reference books, company interview questions, and other study materials across various subjects and categories.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

EduHub follows a modern full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: TSX for TypeScript execution in development
- **Production**: ESBuild for server bundling

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Connection**: Neon Database serverless driver
- **Migrations**: Drizzle Kit for schema management

## Key Components

### Shared Schema (`shared/schema.ts`)
Centralized data models and validation using Drizzle ORM and Zod:
- **Resources table**: Core entity storing educational materials with metadata
- **Categories**: Predefined resource types (notes, pyqs, books, company-pyqs, interview, study-materials)
- **Subjects**: Academic subjects and engineering disciplines
- **Type safety**: Full TypeScript inference for database operations

### Frontend Components
- **Theme System**: Dark/light mode support with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Component Library**: Comprehensive UI components from Radix UI
- **State Management**: React Query for API state with optimistic updates

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **API Routes**: RESTful endpoints for resource management
- **Middleware**: Request logging, error handling, and development tooling

## Data Flow

1. **Client Requests**: Frontend makes API calls using React Query
2. **Server Processing**: Express routes handle requests and interact with storage layer
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: JSON responses with proper error handling
5. **Client Updates**: React Query manages cache invalidation and UI updates

### Key API Endpoints
- `GET /api/resources` - Retrieve resources with filtering support
- `GET /api/resources/featured` - Get featured/popular resources
- `GET /api/stats` - Resource statistics by category
- `POST /api/resources/:id/download` - Handle resource downloads

## External Dependencies

### Frontend Dependencies
- **UI Components**: Extensive Radix UI component library
- **Styling**: Tailwind CSS with PostCSS processing
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Utilities**: Class variance authority, clsx, date-fns

### Backend Dependencies
- **Database**: Neon Database serverless with Drizzle ORM
- **Validation**: Zod for runtime type checking
- **Development**: Replit-specific tooling and error handling

### Development Tools
- **Type Checking**: TypeScript with strict configuration
- **Build Process**: Vite for frontend, ESBuild for backend
- **Development Server**: Hot module replacement and error overlays

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: TSX for direct TypeScript execution
- **Database**: Environment-based configuration via DATABASE_URL
- **Replit Integration**: Custom plugins for development experience

### Production Build
- **Frontend**: Static assets built to `dist/public`
- **Backend**: Bundled to `dist/index.js` with external dependencies
- **Deployment**: Single Node.js process serving both frontend and API
- **Database**: Production PostgreSQL via environment variables

### Key Architectural Decisions

1. **Monorepo Structure**: Shared types and schemas between frontend/backend
2. **Type Safety**: End-to-end TypeScript with Drizzle ORM integration
3. **Component Architecture**: Radix UI for accessibility and customization
4. **State Management**: React Query for server state, React Context for client state
5. **Database Strategy**: PostgreSQL with ORM abstraction for flexibility
6. **Development Experience**: Hot reloading, error overlays, and Replit integration

The architecture prioritizes developer experience, type safety, and maintainability while providing a solid foundation for scaling the educational resource platform.