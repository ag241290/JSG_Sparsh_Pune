# JSG SPARSH Pune Website

A modern, responsive website for JSG SPARSH Pune - Jain Social Group built with Next.js and optimized for mobile-first experience.

## ?? Features

### **Core Pages**
- **?? Home Page**: Hero section with community overview, statistics, and call-to-action buttons
- **?? About Page**: Comprehensive information about JSG SPARSH Pune's mission, values, and vision
- **?? Committee Page**: Meet our dedicated team members with detailed contact information
- **?? Events Page**: Showcase of past memorable events with detailed descriptions and highlights
- **?? Social Page**: Dan Patra initiatives and community service programs with fixed description layouts
- **?? SPL 02 Page**: Comprehensive tournament information and sponsorship details

### **Special Features**
- **?? Registration System**: Complete SPL 02 tournament registration with:
  - Multi-category support (Male, Female, Kids)
  - Photo upload functionality
  - Jersey customization
  - Payment gateway integration (ready for Paytm UPI)
  - Form validation and type safety

### **Design & User Experience**
- **?? Mobile-First Design**: Fully optimized for mobile devices with responsive layouts
- **?? Modern UI**: Built with Tailwind CSS using blue/yellow/pink color themes
- **? Performance Optimized**: Fast loading times and smooth animations
- **? Accessibility**: Proper ARIA labels, semantic HTML, and keyboard navigation

### **Community Focus**
- **?? JSG Federation Integration**: Proud member of JSG International Federation
- **?? Real-time Statistics**: Community members, events organized, and impact metrics
- **?? Dan Patra Initiatives**: 6 different charitable programs with consistent layouts
- **?? Mobile Accessibility**: Optimized for community members who primarily use mobile devices

## ??? Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom responsive utilities
- **Icons**: Lucide React for consistent iconography
- **Language**: TypeScript for type safety
- **Deployment**: Vercel with automatic deployment
- **Form Handling**: React hooks with TypeScript interfaces

## ?? Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/jsg-sparsh-pune.git
   cd jsg-sparsh-pune
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Access registration page (development only):**
   Navigate to [http://localhost:3000/register-now](http://localhost:3000/register-now)

## ?? Project Structure

```
JSG-Portal/
??? app/
?   ??? components/              # Reusable UI components
?   ?   ??? Hero.tsx            # Main hero section with statistics
?   ?   ??? AboutSectionSimple.tsx # About preview with JSG Federation info
?   ?   ??? Navbar.tsx          # Responsive navigation bar
?   ?   ??? Footer.tsx          # Footer with quick links and contact info
?   ??? about/                  # About page with mission and values
?   ?   ??? page.tsx
?   ??? committee/              # Committee page with member details
?   ?   ??? page.tsx
?   ??? events/                 # Events showcase page
?   ?   ??? page.tsx
?   ??? social/                 # Dan Patra initiatives page
?   ?   ??? page.tsx
?   ??? spl02/                  # SPL 02 tournament information
?   ?   ??? page.tsx
?   ??? register-now/           # SPL 02 registration form (hidden route)
?   ?   ??? page.tsx
?   ??? globals.css             # Global styles and Tailwind imports
?   ??? layout.tsx              # Root layout with metadata
?   ??? page.tsx                # Home page combining Hero and About
??? public/
?   ??? images/                 # Static assets and logos
?       ??? JSG_SPARSH.jpeg     # Main JSG SPARSH logo
?       ??? JSG_Federation.jpeg # JSG Federation logo
??? next.config.js              # Next.js configuration
??? tailwind.config.js          # Tailwind CSS configuration
??? tsconfig.json              # TypeScript configuration
??? package.json               # Dependencies and scripts
```

## ?? Mobile Optimization

The website is built with a **mobile-first approach** and includes:

- **Responsive Typography**: Progressive text scaling from mobile to desktop
- **Touch-Friendly Interfaces**: Optimized button sizes and spacing
- **Mobile Navigation**: Collapsible menu with smooth animations
- **Adaptive Layouts**: Grid systems that stack appropriately on mobile
- **Performance**: Optimized images and minimal JavaScript for fast mobile loading

## ?? Design System

### **Color Themes**
- **Primary Blue**: `#2563eb` - Main brand color
- **Secondary Yellow**: `#eab308` - Accent and call-to-action color
- **Pink Accent**: `#ec4899` - Female category and highlights
- **Green Accent**: `#22c55e` - Kids category and success states

### **Component Standards**
- **Fixed Heights**: Consistent card layouts prevent content shifting
- **Responsive Spacing**: Mobile-first padding and margins
- **Typography Scale**: Consistent text sizing across all devices
- **Interactive States**: Hover and focus states for all interactive elements

## ?? SPL 02 Registration Features

### **Multi-Category Support**
- **Male Category**: Ages 14+, blue theme
- **Female Category**: Ages 14+, pink theme  
- **Kids Category**: Ages 7-14, green theme

### **Form Features**
- **Dynamic Fields**: Parent name for kids, cricket experience for adults
- **Photo Upload**: File handling with size validation
- **Jersey Customization**: Name, number, and size selection
- **Payment Integration**: Ready for Paytm UPI gateway
- **Type Safety**: Full TypeScript implementation

## ?? Dan Patra Initiatives

6 charitable programs with consistent layouts:
- **Education Dan**: Supporting underprivileged children's education
- **Go-Mata Dan**: Cow protection and welfare programs
- **Sadharmik Seva Dan**: Direct support to Jain families in need
- **Vaiyavacha**: Community service and temple maintenance
- **Social Activity Dan**: Funding community programs
- **Rakta Dan**: Blood donation drives and health services

## ?? Deployment

### **Production Deployment**
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Vercel automatically detects Next.js and deploys
4. Custom domain configuration available

### **Environment Setup**
- No environment variables required for basic functionality
- Payment gateway integration requires additional configuration

## ?? Performance Metrics

- **Lighthouse Score**: Optimized for 90+ scores across all metrics
- **Mobile Performance**: Fast loading on 3G networks
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessibility**: WCAG 2.1 compliant design patterns

## ?? Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## ?? Contributing

We welcome contributions from community members! 

### **How to Contribute**
1. Fork the repository
2. Create a feature branch
3. Make your changes with proper mobile testing
4. Submit a pull request with detailed description

### **Development Guidelines**
- Follow mobile-first responsive design principles
- Maintain consistent color themes (blue/yellow/pink)
- Ensure TypeScript type safety
- Test on multiple screen sizes
- Follow existing component patterns

## ?? Contact

- **Website**: [JSG SPARSH Pune](https://jsg-sparsh-pune.vercel.app)
- **Email**: info@jsgsparshpune.com
- **Phone**: +91 98765 43210
- **Address**: Pune, Maharashtra, India
- **JSG Federation**: [jsgif.org](https://jsgif.org)

## ?? License

© 2024 JSG SPARSH Pune. All rights reserved.

---

**Built with ?? for the Jain community in Pune** ?????