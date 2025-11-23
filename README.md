# Mea Suna Madeira - Next.js Template

A modern Next.js conversion of the Mea Suna Madeira Bootstrap 5 template, featuring a beautiful loading animation, smooth scroll effects, and interactive components.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Modern React Components** with TypeScript support
- 🎬 **GSAP Animations** for smooth scroll effects
- 📱 **Fully Responsive** design
- 🎭 **Page Loader** with animated progress
- 🎥 **Video Controls** with custom UI
- 🖼️ **Interactive Gallery** with image sliders
- 🎯 **Horizontal Scroll Section** with GSAP ScrollTrigger

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx             # Main page component
│   └── globals.css          # Global styles
├── components/
│   ├── PageLoader.tsx       # Loading animation component
│   ├── Navbar.tsx           # Navigation bar
│   ├── SideMenu.tsx         # Side navigation menu
│   ├── Hero.tsx             # Hero section with video
│   ├── IntroSection.tsx     # Introduction section
│   ├── FeaturesSection.tsx  # Features showcase
│   ├── HorizontalSection.tsx # Horizontal scroll section
│   └── GallerySection.tsx    # Gallery with image sliders
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript configuration
```

## Components

### PageLoader
Animated page loader with:
- Progress bar animation
- Corner images that animate to center
- Percentage counter
- Smooth fade-out transition

### Navbar
Fixed navigation bar with:
- Hamburger menu toggle
- Logo display
- Inquiry button

### SideMenu
Slide-out side menu with:
- Smooth animations
- Menu sections
- Smooth scroll navigation

### Hero
Hero section featuring:
- Full-screen video background
- Overlay gradient
- Scroll indicator
- Animated divider

### IntroSection
Introduction section with:
- Custom video player
- Video controls (mute, fullscreen, progress)
- Scroll-based zoom effect

### FeaturesSection
Interactive features showcase with:
- Hover-based background changes
- Feature cards with descriptions
- Smooth transitions

### HorizontalSection
Horizontal scrolling section using GSAP:
- Pin scrolling
- Multiple slides
- Animated CTA rings
- Smooth snap points

### GallerySection
Image gallery with:
- Multiple image cards
- Image slider functionality
- Hover effects
- Responsive grid layout

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **GSAP** - Animation library
- **CSS Modules** - Styling
- **React Hooks** - State management

## Customization

### Changing Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### Modifying Loader Duration

Edit `components/PageLoader.tsx`:

```typescript
const loadingDuration = 6000; // Change to desired duration in ms
```

### Adding New Sections

1. Create a new component in `components/`
2. Import and add it to `app/page.tsx`
3. Add corresponding styles to `app/globals.css`

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project can be deployed on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images with Next.js Image component
- Code splitting with Next.js
- Lazy loading for components
- Optimized animations with GSAP

## License

This project is a conversion of the Mea Suna Madeira template for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

