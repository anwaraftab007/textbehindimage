# Application Overview

This is a full-stack web application built with a React frontend and Express.js backend, implementing a SaaS platform with user authentication and Stripe payment integration. The application appears to be a text-behind-image design tool with a landing page, authentication flow, and paid access model.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: TailwindCSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state, React Context for auth
- **Build Tool**: Vite with custom configuration
- **Animation**: Framer Motion for UI animations

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Authentication System
- **Provider**: Supabase for OAuth authentication
- **Strategy**: Google OAuth with Supabase integration
- **Session Handling**: Custom session management with PostgreSQL storage
- **Authorization**: User ID header-based authorization

## Key Components

### Database Schema
- **Users Table**: Core user entity with email, username, Supabase ID, payment status, and Stripe integration fields
- **Payment Integration**: Stripe customer ID and payment intent tracking
- **Timestamps**: Created at tracking for user registration

### API Routes
- **User Management**: GET/POST `/api/user` for user retrieval and creation
- **Payment Processing**: Stripe integration for payment handling
- **Authentication**: Supabase user ID header validation

### Frontend Pages
- **Landing Page**: Marketing page with animated gallery and pricing
- **Authentication**: OAuth flow handling and redirect management
- **Checkout**: Stripe payment integration with Elements
- **Application**: Protected main application interface
- **404 Handler**: Custom not found page

### UI Components
- **Design System**: Complete shadcn/ui component library implementation
- **Responsive Design**: Mobile-first approach with Tailwind utilities
- **Animations**: Framer Motion for enhanced user experience
- **Accessibility**: ARIA-compliant components from Radix UI

## Data Flow

### Authentication Flow
1. User clicks sign-in on landing page
2. Redirected to Supabase Google OAuth
3. OAuth callback handled in `/auth` route
4. User data synchronized with application database
5. Session established with payment status check

### Payment Flow
1. Authenticated user accesses checkout page
2. Stripe payment intent created on backend
3. Payment processed through Stripe Elements
4. Payment confirmation updates user payment status
5. User redirected to main application

### Application Access Control
1. Route protection based on authentication status
2. Payment status verification for premium features
3. Automatic redirects based on user state
4. Session persistence across page reloads

## External Dependencies

### Payment Processing
- **Razorpay**: Payment processing for Indian market with UPI/Cards support
- **Security**: Server-side payment signature validation
- **Pricing**: ₹299 one-time payment for lifetime access

### Authentication Service
- **Supabase**: OAuth provider and user management
- **Google OAuth**: Primary authentication method
- **Session Storage**: PostgreSQL-backed session management

### Database Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection Pooling**: Optimized for serverless environments
- **Migrations**: Drizzle Kit for schema management

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless component primitives
- **Lucide Icons**: Icon library for consistent iconography
- **Custom Fonts**: Typography optimization

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with HMR
- **Type Checking**: TypeScript compilation and validation
- **Code Splitting**: Automatic bundle optimization
- **Development Tooling**: Replit integration for cloud development

### Production Build
- **Frontend**: Vite build with static asset optimization
- **Backend**: ESBuild bundling for Node.js deployment
- **Environment Variables**: Secure configuration management
- **Database**: Connection string-based configuration

### Database Management
- **Schema Deployment**: Drizzle push commands for schema updates
- **Migration Strategy**: Version-controlled database changes
- **Connection Security**: Environment-based credential management

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 03, 2025. Initial setup