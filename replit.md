# EcoMart - Sustainable E-Commerce Platform

## Overview

EcoMart is a modern e-commerce platform focused on sustainable shopping, featuring real-time carbon tracking, smart budget management, and an innovative virtual garden system that rewards eco-friendly purchases. The application combines a React-based frontend with an Express.js backend, utilizing PostgreSQL for data persistence and Drizzle ORM for database management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API architecture

## Key Components

### Database Schema
The application uses a comprehensive schema supporting:
- **Users**: Authentication, budget tracking, eco points, and garden progression
- **Products**: Sustainable product catalog with eco-ratings, carbon footprint data, and transparency information
- **Categories**: Product categorization system
- **Cart**: Shopping cart functionality with user-specific items
- **Recipes**: Recipe-based shopping integration with preparation time information
- **Eco Swaps**: Alternative product suggestions for sustainability
- **Notifications**: User notification system
- **Garden Progress**: Virtual garden progression tracking
- **Orders**: Complete order history and transaction tracking

### Frontend Components
- **Smart Cart**: Real-time cart management with budget tracking and eco suggestions
- **Product Cards**: Rich product displays with sustainability metrics and QR transparency codes
- **E-Garden Widget**: Gamified sustainability tracking interface
- **Notification System**: Toast-based user notifications for eco tips and budget alerts
- **Recipe Integration**: Recipe-to-shopping-list conversion functionality

### API Endpoints
- `/api/products` - Product catalog management with search and category filtering
- `/api/categories` - Product category management
- `/api/cart` - Shopping cart operations
- `/api/recipes` - Recipe management and ingredient mapping
- `/api/notifications` - User notification system
- `/api/user` - User profile and preferences management
- `/api/user/budget` - User budget management and updates
- `/api/orders` - Order creation and history tracking

## Data Flow

1. **User Authentication**: Users interact with the platform through a session-based authentication system
2. **Product Discovery**: Products are fetched with real-time filtering by category, search terms, and sustainability criteria
3. **Cart Management**: Items are added to user-specific carts with immediate budget and carbon footprint calculations
4. **Eco Tracking**: User actions are tracked to update eco points, garden level, and CO₂ savings
5. **Recipe Integration**: Users can add entire recipe ingredient lists to their cart with one click
6. **Notification System**: Real-time notifications provide eco tips, budget alerts, and sustainability suggestions

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL via Neon Database serverless connection
- **UI Components**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS with custom eco-themed color variables
- **Form Management**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date manipulation
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Drizzle Kit**: Database schema management and migrations
- **ESBuild**: Server-side code bundling for production
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR for frontend
- **Backend**: tsx for TypeScript execution with file watching
- **Database**: Drizzle Kit for schema synchronization

### Production Build
- **Frontend**: Vite production build with optimized assets
- **Backend**: ESBuild compilation to single JavaScript bundle
- **Database**: Environment variable-based PostgreSQL connection
- **Static Assets**: Served via Express static middleware

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)
- Build outputs to `dist/` directory for both client and server

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
- July 07, 2025. Enhanced user budget management with manual budget setting functionality
- July 07, 2025. Added complete order history system with order creation and tracking
- July 07, 2025. Integrated recipe preparation time display throughout the application
- July 07, 2025. Created comprehensive user profile section with settings and order history
```

## Recent Changes

✓ Smart cart feature prioritized at top of interface
✓ Manual budget management system with real-time editing
✓ Complete order history tracking and display
✓ Recipe preparation time information added to all recipe displays
✓ Enhanced user profile with separate sections for account settings, budget management, and order history
✓ Functional checkout process that creates orders and clears cart
✓ Navigation bar provides access to all major features

## User Preferences

```
Preferred communication style: Simple, everyday language.
Interface priorities: Smart cart at top, garden features at end
Navigation: Accessible navigation bar for all features
Recipe information: Include preparation time with each recipe
Budget management: Manual budget setting capability
Order tracking: Complete order history in user profile
```