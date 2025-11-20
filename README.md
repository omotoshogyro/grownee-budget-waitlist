# Grownee Landing Page - Animated Version

A modern, fully animated and responsive landing page built with Next.js 14, Tailwind CSS, and Albert Sans font.

## ✨ Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ **Albert Sans Google Font** throughout
- ✅ **Smooth animations** on all sections:
  - Fade in animations
  - Slide animations
  - Hover effects
  - Scale transitions
- ✅ Interactive FAQ accordion
- ✅ Modern UI with Tailwind CSS
- ✅ TypeScript support
- ✅ Optimized for performance
- ✅ SEO friendly

## 🎨 Animations

All elements have carefully crafted animations:
- **Navigation**: Fade down on page load
- **Hero section**: Staggered fade-in animations
- **Cards**: Lift on hover with shadow
- **Phone mockups**: Scale on hover
- **List items**: Slide right on hover
- **FAQ**: Smooth accordion expansion
- **Buttons**: Scale and shadow effects

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🛠 Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Font:** Albert Sans (Google Font)
- **Language:** TypeScript
- **Animations:** CSS Keyframes + Tailwind

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Color Scheme

- Primary: `#0d3a2e` (Dark green)
- Accent: `#10b981` (Emerald)
- Background: White and Gray-50

## 🎭 Animation Classes

Custom animation utilities available:
- `animate-fade-in`
- `animate-fade-in-up`
- `animate-fade-in-down`
- `animate-fade-in-left`
- `animate-fade-in-right`
- `animate-scale-in`
- `animate-slide-in-up`

Delay classes:
- `animation-delay-200`
- `animation-delay-400`
- `animation-delay-600`
- `animation-delay-800`

## 📂 Project Structure

```
grownee-landing/
├── app/
│   ├── layout.tsx      # Root layout with Albert Sans
│   ├── page.tsx        # Main animated landing page
│   └── globals.css     # Global styles & animations
├── public/             # Static assets
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## 🎯 Key Features Explained

### Interactive FAQ
Click any question to expand/collapse the answer with smooth animation.

### Hover Effects
- Cards lift and gain shadow
- Buttons scale up
- List items slide right
- Phone mockups scale
- Icons rotate

### Smooth Scrolling
All anchor links have smooth scroll behavior.

## 📝 License

MIT
