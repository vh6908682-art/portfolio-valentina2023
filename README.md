# Valentina Design Portfolio 2026

A modern, interactive portfolio featuring 2026-era web design aesthetics with purposeful motion, scroll-driven storytelling, and interactive case studies.

## Features

### Visual Design
- **Sophisticated Color Palette**: Apple-inspired with subtle depth and intentional contrast
- **Clean Typography**: Space Grotesk for display, Inter for body text
- **Subtle Grain Texture**: Adds premium, tactile quality without being distracting
- **Dual Theme**: Seamless light/dark mode with persistent preference storage

### Interactive Elements

#### Custom Cursor with Magnetic Effect
- Smooth cursor following with dot and ring elements
- Magnetic pull effect on interactive elements (buttons, links, cards)
- Scales and transforms on hover states
- Automatically disabled on touch devices

#### Three.js Background
- Subtle animated gradient mesh using custom shaders
- Responds to scroll position for parallax depth
- Colors adapt to light/dark theme
- Purposeful, non-decorative — reinforces the engineered aesthetic

#### GSAP ScrollTrigger Animations
- Hero text reveals with staggered line animations
- Counter animations for statistics (8+ years, 50+ projects, etc.)
- Horizontal scroll gallery for work section with pin scrolling
- Skill bars that animate when scrolled into view
- Section-by-section reveals with elegant easing

#### Horizontal Scroll Project Showcase
- Pin-based horizontal scrolling through project cards
- Smooth scrub animation tied to scroll position
- Cards with hover effects (image zoom, overlay reveal)
- Click to open detailed case study modal

#### Interactive Process Journey
- Step-by-step design process visualization
- Clickable navigation between 5 process phases
- Animated progress indicators
- Content transitions with smooth fades

#### Skills Visualization
- Animated skill bars that fill on scroll
- Hover effects on skill categories
- Three categories: Design, Development, Strategy

#### Project Case Study Modal
- Full-screen immersive experience
- Image gallery with thumbnail navigation
- Challenge / Solution / Results framework
- Previous/Next project navigation
- Keyboard accessible (ESC to close, arrows to navigate)

### Micro-interactions
- Header background appears on scroll with blur
- Button magnetic effects and hover transformations
- Work card image zoom and overlay on hover
- Navigation link underline animations
- Theme toggle with rotating icon transition

### Accessibility
- Skip link for keyboard navigation
- Focus-visible styles for all interactive elements
- Proper ARIA labels on buttons
- Respects `prefers-reduced-motion` media query
- Semantic HTML structure

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete design system & animations
├── script.js           # All interactive functionality
└── assets/
    ├── photo.png       # Your profile photo
    └── projects/
        ├── clueplay/
        │   ├── clueplayai1.png
        │   └── clueplayai2.png
        ├── healthcare/
        │   └── healthcare.png
        ├── speakbetter/
        │   ├── speakbetter1.png
        │   └── speakbetter2.png
        ├── forex/
        │   ├── forex1.jpg
        │   └── forex[2-8].jpg
        ├── praxis/
        │   ├── praxis1.png
        │   └── praxis2.png
        └── ...
```

## Setup Instructions

### 1. Add Your Images

Place your project images in the `assets/projects/` folder following this structure:
- Each project should have at least 1 image
- Images should be high-quality (recommend 1200px+ width)
- Use PNG for UI designs, JPG for photos

### 2. Customize Project Data

Edit `PROJECTS` array in `script.js` to update:
- Project titles and descriptions
- Challenge / Solution / Results copy
- Image paths

### 3. Customize Colors (Optional)

The color system uses CSS custom properties. Edit in `styles.css`:
```css
:root {
  --color-accent: #0066cc;  /* Your brand color */
  --color-accent-dark: #4da3ff;  /* For dark mode */
}
```

### 4. Deploy

Upload all files to your web host or deploy to Vercel/Netlify:
```bash
# Using Vercel CLI
vercel --prod

# Or simply drag folder to Netlify drop
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Android

## Performance Notes

- Three.js background is optimized with intersection observer (pauses when not visible)
- GSAP ScrollTrigger uses `will-change` for smooth animations
- Images should be optimized (WebP recommended with fallbacks)
- CSS animations respect `prefers-reduced-motion`

## Credits

- **Fonts**: Space Grotesk, Inter (Google Fonts)
- **Animation**: GSAP + ScrollTrigger
- **3D**: Three.js
- **Icons**: Custom SVG

---

Built with intention. Every animation has purpose. Every pixel earns its place.
