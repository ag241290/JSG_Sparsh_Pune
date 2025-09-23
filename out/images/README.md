# Image Assets

This directory contains all the images used in the JSG SPARSH Pune website.

## Current Assets

### Logos
- `JSG_SPARSH.jpeg` - Main JSG SPARSH Pune logo (used in navbar, footer, hero section)
- `JSG_Federation.jpeg` - JSG Federation logo (used to show federation membership)

## Directory Structure

- `events/` - Event photos and banners
- `gallery/` - Gallery images from past events
- `committee/` - Photos of committee members
- `logos/` - JSG SPARSH logos and branding (can move existing logos here)
- `banners/` - Hero banners and promotional images

## Logo Usage

### JSG SPARSH Logo (JSG_SPARSH.jpeg)
- **Navbar**: 40x40px (w-10 h-10)
- **Hero Section**: 80x80px on mobile, 96x96px on desktop (w-20 h-20 md:w-24 md:h-24)
- **Footer**: 48x48px (w-12 h-12)
- **About Section**: 64x64px (w-16 h-16)

### JSG Federation Logo (JSG_Federation.jpeg)
- **Hero Section**: 24x24px in badge (w-6 h-6)
- **Footer**: 32x32px (w-8 h-8)
- **About Section**: 128x128px (w-32 h-32)

## Image Guidelines

- Use optimized formats (WebP, AVIF when possible)
- Maintain aspect ratios for consistency
- Include alt text for accessibility
- Maximum file size: 2MB per image
- Recommended dimensions:
  - Hero images: 1920x1080
  - Gallery images: 800x600
  - Committee photos: 400x400
  - Event banners: 1200x600
  - Logo files: 512x512 (square format preferred)

## Adding New Images

1. Optimize images before uploading
2. Use descriptive filenames
3. Update corresponding components with proper paths
4. Test image loading on all devices
5. Consider creating WebP versions for better performance

## Logo Organization (Recommended)

Consider organizing logos in a subfolder:
```
public/images/
??? logos/
?   ??? JSG_SPARSH.jpeg (main logo)
?   ??? JSG_Federation.jpeg (federation logo)
?   ??? JSG_SPARSH_white.png (white version for dark backgrounds)
??? events/
??? gallery/
??? committee/
```

## Performance Tips

- Use Next.js Image component for automatic optimization
- Set priority=true for above-the-fold images (like hero logo)
- Use appropriate sizing to avoid layout shifts
- Consider lazy loading for gallery images