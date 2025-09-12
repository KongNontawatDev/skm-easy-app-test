# Development Guidelines

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Shared Components
│   ├── mobile/         # Mobile-specific Components
│   └── shared/         # Reusable Components
├── contexts/           # React Contexts
├── features/           # Feature-based Modules
│   ├── auth/          # Authentication
│   ├── home/          # Home Page
│   ├── contract/      # Contract Management
│   ├── invoice/       # Invoice Management
│   ├── receipt/       # Receipt Management
│   ├── installment/   # Installment Management
│   ├── notification/  # Notification System
│   ├── blog/          # Blog System
│   ├── ticket/        # Ticket System
│   ├── contact/       # Contact System
│   ├── promotion/     # Promotion System
│   ├── guide/         # Guide System
│   ├── coupon/        # Coupon System
│   └── profile/       # Profile System
├── hooks/             # Custom Hooks
├── lib/               # Utilities & Constants
├── routes/            # Route Definitions
├── services/          # API Services
└── styles/            # Global Styles
```

### Feature Module Structure
```
features/feature-name/
├── components/        # Feature-specific Components
├── data/             # Mock Data
├── hooks/            # Feature-specific Hooks
├── types/            # TypeScript Types
├── feature-page.tsx  # Main Page Component
├── detail.tsx        # Detail Page Component
└── index.ts          # Exports
```

## 🎨 Design System

### Colors
```typescript
const colors = {
  primary: '#EC1B2E',      // Red
  secondary: '#C20010',    // Dark Red
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Yellow
  error: '#EF4444',        // Red
  info: '#3B82F6',         // Blue
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
}
```

### Typography
```typescript
const typography = {
  fontFamily: 'Kanit, sans-serif',
  weights: [300, 400, 500, 600, 700],
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  }
}
```

### Spacing
```typescript
const spacing = {
  0: '0px',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
}
```

## 📝 Code Style

### File Naming
- **Components**: PascalCase (e.g., `ContractCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useSearch.ts`)
- **Utils**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `Contract.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Component Structure
```typescript
// 1. Imports
import React from 'react'
import { ComponentProps } from '@/types'
import { cn } from '@/lib/utils'

// 2. Types
interface ComponentProps {
  // Props interface
}

// 3. Component
export function Component({ prop1, prop2 }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState()
  
  // 5. Handlers
  const handleClick = () => {
    // Handler logic
  }
  
  // 6. Render
  return (
    <div className={cn('base-classes', prop1 && 'conditional-classes')}>
      {/* JSX */}
    </div>
  )
}
```

### TypeScript Guidelines
```typescript
// 1. Use interfaces for object shapes
interface User {
  id: string
  name: string
  email: string
}

// 2. Use types for unions and primitives
type Status = 'active' | 'inactive' | 'pending'
type Theme = 'light' | 'dark' | 'system'

// 3. Use generics for reusable types
interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

// 4. Use utility types
type PartialUser = Partial<User>
type UserEmail = Pick<User, 'email'>
type UserWithoutId = Omit<User, 'id'>
```

## 🧪 Testing

### Test Structure
```
__tests__/
├── components/        # Component tests
├── hooks/            # Hook tests
├── utils/            # Utility tests
└── integration/      # Integration tests
```

### Test Naming
```typescript
// Component tests
describe('ContractCard', () => {
  it('should render contract information', () => {
    // Test implementation
  })
  
  it('should handle click events', () => {
    // Test implementation
  })
})

// Hook tests
describe('useSearch', () => {
  it('should filter data based on query', () => {
    // Test implementation
  })
})
```

## 🚀 Performance

### Optimization Techniques
1. **Code Splitting**: Route-based splitting
2. **Lazy Loading**: Component lazy loading
3. **Memoization**: React.memo, useMemo, useCallback
4. **Bundle Analysis**: Regular bundle size monitoring
5. **Image Optimization**: Optimized images and lazy loading

### Performance Monitoring
```typescript
// Performance monitoring
const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
}
```

## 🔧 Development Tools

### VS Code Extensions
- **ES7+ React/Redux/React-Native snippets**
- **TypeScript Importer**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **ESLint**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

### Recommended Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

## 📱 Mobile Development

### Responsive Design
```typescript
// Breakpoints
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// Mobile-first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Content */}
</div>
```

### Touch Interactions
```typescript
// Touch-friendly sizing
const touchTargets = {
  minHeight: '44px',  // iOS minimum
  minWidth: '44px',   // iOS minimum
  padding: '12px',    // Comfortable padding
}
```

## 🔐 Security

### Best Practices
1. **Input Validation**: Validate all user inputs
2. **XSS Prevention**: Sanitize user content
3. **CSRF Protection**: Use CSRF tokens
4. **Secure Headers**: Implement security headers
5. **Environment Variables**: Never commit secrets

### Security Checklist
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] CSRF tokens used
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] Dependencies updated
- [ ] Security audit completed

## 📊 Monitoring

### Error Tracking
```typescript
// Error boundary
class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo)
  }
}
```

### Performance Monitoring
```typescript
// Performance metrics
const trackPerformance = (metric: string, value: number) => {
  // Send to analytics service
  console.log(`${metric}: ${value}ms`)
}
```

## 🚀 Deployment

### Build Process
```bash
# 1. Install dependencies
npm install

# 2. Run type checking
npm run type-check

# 3. Run linting
npm run lint

# 4. Run tests
npm run test

# 5. Build for production
npm run build

# 6. Preview build
npm run preview
```

### Environment Configuration
```typescript
// Environment variables
const config = {
  apiUrl: import.meta.env.VITE_API_BASE_URL,
  environment: import.meta.env.VITE_NODE_ENV,
  debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
}
```

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)

### Tools
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Framer Motion](https://www.framer.com/motion/)

---

Happy coding! 🚀
