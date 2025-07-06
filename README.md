# React Frontend SaaS

A comprehensive React frontend for SaaS applications built with React 19, TypeScript, and Vite. This project provides a frontend solution that integrates seamlessly with the **Laravel Headless SaaS** backend to create a full-stack SaaS platform.

> **Note**: This React frontend is designed to work with the [Laravel Headless SaaS](https://github.com/olszewskimaciej/laravel-headless-saas) API backend. Together, they form a complete **basic SaaS solution** that serves as a solid foundation for your own custom modifications and extensions. This is a minimal viable product (MVP) that you can easily customize and expand according to your specific business needs.

## ✨ Features

### 🎨 Modern UI/UX

- **Material-UI (MUI)**: Beautiful, accessible components with customizable theming
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Smooth Animations**: Professional fade-in effects and micro-interactions

### 🔐 Authentication & Security

- **Complete Auth Flow**: Login, registration, password reset, and forgot password
- **Token-Based Authentication**: Secure API key authentication with Laravel Sanctum
- **Protected Routes**: Route-level authentication and authorization
- **Session Management**: Automatic token validation and refresh handling
- **Error Handling**: Comprehensive error states and user feedback

### 💳 Subscription Management

- **Stripe Integration**: Full subscription lifecycle with secure checkout via Stripe
- **Multiple Plans**: Various tiers
- **Trial Periods**: Free trial system
- **Billing Portal**: Secure Stripe-powered billing management
- **Subscription Status**: Real-time subscription state tracking
- **Payment Methods**: Secure payment method management

### 🌍 Internationalization

- **Multi-language Support**: English and Polish with easy extensibility
- **Language Detection**: Automatic browser language detection
- **Dynamic Content**: All UI elements and content are translatable
- **Language Switching**: Seamless runtime language switching

### 🏗️ Architecture & Development

- **TypeScript**: Full type safety and IntelliSense support
- **Modular Structure**: Clean, organized component architecture
- **Context API**: Centralized state management for auth, theme, and language
- **Service Layer**: Abstracted API communication with error handling
- **Custom Hooks**: Reusable logic with React hooks pattern

## 🛠️ Technology Stack

### Frontend Framework

- **React 19**: Latest version with concurrent features
- **TypeScript**: Enhanced developer experience and type safety
- **Vite**: Lightning-fast development and optimized builds

### Key Dependencies

- **Material-UI (MUI)**: Complete React component library
- **React Router**: Declarative routing with nested routes
- **React i18next**: Internationalization framework
- **Sonner**: Modern toast notifications
- **ESLint & Prettier**: Code quality and formatting

### Development Tools

- **Vite**: Fast development server and build tool
- **TypeScript ESLint**: Advanced linting for TypeScript
- **Hot Module Replacement**: Instant development feedback

## 📱 Application Structure

### Pages & Routes

- **Home Page**: Landing page with features showcase and testimonials
- **Pricing Page**: Subscription plans with animated pricing cards
- **Authentication Pages**: Login, register, forgot/reset password
- **Profile Management**: User profile, password change, subscription management
- **Subscription Pages**: Success/cancel pages for payment flows

### Key Components

#### Authentication Components

- **LoginForm**: Secure login with form validation
- **RegisterForm**: User registration with password confirmation
- **ForgotPasswordForm**: Password reset request handling
- **ResetPasswordForm**: New password setting with token validation
- **PrivateRoute**: Route protection for authenticated users

#### Subscription Components

- **PricingCards**: Animated pricing plans with feature comparison
- **SubscriptionTab**: Subscription management interface
- **SubscriptionStatusCard**: Real-time subscription status display
- **BillingPortal**: Secure Stripe billing integration

#### Profile Components

- **UpdateProfileForm**: User profile information management
- **ChangePasswordForm**: Secure password change functionality
- **PremiumTab**: Premium features showcase and access control

## 🔄 API Integration

The frontend communicates with the Laravel backend through a comprehensive service layer:

### Authentication Service

- User login and registration
- Password reset functionality
- Token management and validation
- Automatic session handling

### Subscription Service

- Stripe checkout session creation
- Billing portal access
- Subscription status monitoring
- Trial period management

### User Service

- Profile management
- Account settings
- User preferences

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- Running instance of Laravel Headless SaaS backend

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-frontend-saas.git
   cd react-frontend-saas
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:

   ```env
   VITE_API_URL=http://localhost:8000
   VITE_API_KEY=your_api_key_from_backend
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Configuration

The application requires the following environment variables:

- **VITE_API_URL**: URL of your Laravel backend API
- **VITE_API_KEY**: API key for backend authentication (obtained from Laravel backend)

### Backend Integration

This frontend is designed to work with the Laravel Headless SaaS backend. Ensure that:

1. The Laravel backend is running and accessible
2. CORS is properly configured in the Laravel application
3. API keys are properly set up in both applications
4. Stripe configuration matches between frontend and backend

## 🔐 Security Features

### Authentication Security

- Secure token storage and management
- Automatic session validation
- Protected route implementation
- CSRF protection through API design

### Data Protection

- Input validation and sanitization
- Secure API communication
- No sensitive data in localStorage
- Proper error message handling

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-first approach**: Optimized for mobile devices
- **Tablet support**: Adapted layouts for tablet screens
- **Desktop optimization**: Full-featured desktop experience
- **Flexible grids**: CSS Grid and Flexbox layouts
- **Adaptive typography**: Scalable text across devices

## 🚀 Build and Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔧 Customization & Extensions

This SaaS solution is designed as a **foundational template** that you can easily modify and extend:

### 🎯 What's Included (MVP)

- Complete authentication system
- Basic subscription management with Stripe
- User profile management
- Multi-language support (EN/PL)
- Responsive Material-UI design
- TypeScript foundation

### 🛠️ Developer-Friendly Architecture

The modular structure makes it easy to:

- Add new React components and pages
- Extend the API service layer
- Implement custom business logic
- Integrate with external APIs
- Modify the authentication flow
- Customize the subscription workflow

---

**Note**: This React frontend, combined with the [Laravel Headless SaaS](https://github.com/olszewskimaciej/laravel-headless-saas) API backend, provides a complete **basic SaaS foundation** ready for your custom business logic and features.
