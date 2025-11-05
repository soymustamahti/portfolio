# Modern Animated Portfolio Website

This is a personal portfolio website showcasing development skills and projects. Built as a modern, minimalist, and visually stunning single-page application with smooth animations and interactive elements to create an engaging user experience.

## Tech Stack

### Frontend Framework

- **Next.js 14** with App Router architecture
- **TypeScript** for type safety and better development experience
- **React 18** with modern hooks and patterns

### Styling & Animation

- **Tailwind CSS** for utility-first styling and responsive design
- **GSAP** for high-performance animations and scroll interactions
- **Lenis** for smooth scrolling experience
- **GSAP ScrollTrigger** for scroll-based animations

### Package Manager

- **Yarn** for all package installations and dependency management

## Project Structure

- `/app` - Next.js App Router pages and layouts
  - `/components` - Reusable React components (Hero, About, Skills, Projects, Contact, Layout)
  - `/hooks` - Custom React hooks for animations and interactions
  - `page.tsx` - Main portfolio page
  - `layout.tsx` - Root layout with metadata and providers
- `/public` - Static assets including resume PDF and images
- `/styles` - Global styles and Tailwind configuration

## Coding Guidelines

### TypeScript Standards

- Use TypeScript for all components, hooks, and utilities
- Define proper interfaces for all props and data structures
- Use React.FC type for functional components
- Include proper return type annotations for functions

### Component Architecture

- All components must be functional components with TypeScript
- Use PascalCase for component names
- Components should be organized in separate files in `/components` folder
- Export components as default exports

### Animation Guidelines

- Use GSAP for all complex animations and scroll interactions
- Implement useEffect and useRef hooks for GSAP timeline management
- Create custom hooks for reusable animation logic
- Use ScrollTrigger for scroll-based animations
- Ensure animations are performant and don't block the main thread

### Styling Conventions

- Use Tailwind CSS utility classes for all styling
- Follow mobile-first responsive design approach
- Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)
- Create custom CSS classes only when necessary
- Maintain consistent spacing using Tailwind's spacing scale

### Performance Optimization

- Use Next.js Image component for all images
- Implement dynamic imports for animation components
- Use Suspense boundaries for component loading
- Implement error boundaries for graceful fallbacks
- Lazy load components that are not immediately visible

## Component Requirements

### Hero Section

- Eye-catching entrance animation with GSAP
- Professional introduction with animated text
- Call-to-action buttons with hover effects
- Responsive design for all screen sizes

### About Section

- Content slides in with personality using GSAP
- Professional summary and personal touch
- Smooth transitions between text blocks

### Skills Section

- Interactive skill bars or animated elements
- Technology stack visualization
- Hover effects for skill items

### Projects Section

- Project cards with hover effects and smooth transitions
- Image optimization using Next.js Image
- Links to live demos and GitHub repositories

### Contact Section

- Engaging call-to-action animations
- Contact form with validation
- Social media links with interactive effects

## Animation Patterns

### Scroll Interactions

- Use GSAP ScrollTrigger for all scroll-based animations
- Implement smooth reveal animations as sections come into view
- Create parallax effects where appropriate
- Ensure animations are smooth on all devices

### Hover Effects

- Subtle but engaging hover animations
- Use GSAP for smooth transitions
- Maintain accessibility considerations
- Provide visual feedback for interactive elements

### Loading Animations

- Progressive content reveal on page load
- Stagger animations for multiple elements
- Use GSAP timelines for coordinated animations

## Custom Hooks

### useScrollAnimations

- Manage scroll-based GSAP animations
- Handle ScrollTrigger setup and cleanup
- Provide reusable scroll animation logic

### useInteractiveAnimations

- Handle hover and click animations
- Manage animation state
- Provide consistent interaction patterns

## SEO and Performance

- Implement proper metadata in layout.tsx
- Use semantic HTML5 elements
- Optimize images with Next.js Image component
- Ensure fast loading times with code splitting
- Implement proper error handling

## Development Commands

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript compiler check

## Resources

- Resume PDF located at `/public/Mustapha_El_Hachmi_Mahti_-_Ingénieur_logicie.pdf`
- Use this resume as the source of truth for personal information, skills, and experience
- Extract relevant information for About, Skills, and Projects sections
- Maintain professional tone while adding personality to the content

## Important Notes

- Always use `yarn` for package installations, never npm
- Ensure all animations are smooth and performant
- Test responsiveness on all screen sizes
- Maintain clean, readable code with proper TypeScript types
- Follow Next.js best practices for App Router
- Prioritize user experience and accessibility
