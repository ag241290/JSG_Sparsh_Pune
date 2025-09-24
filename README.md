# JSG SPARSH Pune Website

A modern, responsive website for JSG SPARSH Pune - Jain Social Group built with Next.js and optimized for mobile-first experience with integrated Supabase backend and comprehensive social initiatives platform.

## ? Features

### **Core Pages**
- **?? Home Page**: Hero section with community overview, statistics, and call-to-action buttons
- **?? About Page**: Comprehensive information about JSG SPARSH Pune's mission, values, and vision
- **?? Committee Page**: Meet our dedicated team members with detailed contact information
- **?? Events Page**: Showcase of past memorable events with detailed descriptions and highlights
- **?? Social Page**: Dan Patra initiatives and community service programs with interactive modals
- **?? SPL 02 Page**: Comprehensive tournament information and sponsorship details

### **Special Features**
- **?? Registration System**: Complete SPL 02 tournament registration with:
  - Multi-category support (Male ?800, Female ?800, Kids ?600)
  - Photo upload functionality (JPG, JPEG, PNG, HEIC - 10MB max)
  - Jersey customization with dynamic pricing
  - **QR Code Payment Integration**: Scan QR code and upload transaction details
  - Transaction ID and screenshot collection
  - Form validation and type safety
  - Real-time data storage with Supabase PostgreSQL

### **?? Social Initiatives Platform**
- **?? Donation System**: Complete donation management with:
  - QR Code payment integration with bank details
  - Amount field with currency validation (?1 to ?9,99,999.99)
  - Transaction ID and screenshot collection
  - Real-time donation tracking and storage
  - Mobile-optimized QR code scanning

- **?? Volunteer Applications**: Comprehensive volunteer management with:
  - Application form with validation
  - Volunteer benefits and information display
  - Database storage with enquiry type tracking
  - Success confirmations and next steps

- **??? Membership Applications**: Join Us functionality with:
  - Navigation-level "Join Us" button
  - Community benefits display
  - Membership application processing
  - Automated follow-up information

### **Admin Dashboard**
- **?? Real-time Statistics**: Live registration counts by category
- **?? Refresh Functionality**: Manual data refresh with loading states
- **?? Customizable CSV Export**: Select columns to include in export
- **?? Search & Filter**: Advanced filtering by category and search terms
- **?? Visual Analytics**: Category-wise registration breakdown
- **?? Transaction Tracking**: View transaction IDs and payment screenshots
- **?? Social Data Management**: View donations, volunteer applications, and membership requests

### **Backend Integration**
- **??? Supabase Database**: PostgreSQL database with multiple tables:
  - `registrations`: Tournament registrations
  - `donations`: Donation records with amounts
  - `enquiries`: Volunteer applications and membership requests
- **?? File Storage**: Multi-bucket Supabase Storage:
  - `registration-photos`: Profile pictures
  - `registration-transaction-ss`: Registration payment screenshots
  - `donation-transaction-ss`: Donation payment screenshots
- **?? Row Level Security**: Secure data access policies
- **?? Transaction Management**: Complete payment tracking system
- **? Data Validation**: Comprehensive server-side validation

### **Design & User Experience**
- **?? Mobile-First Design**: Fully optimized for mobile devices with responsive layouts
- **?? Modern UI**: Built with Tailwind CSS using blue/yellow/pink/green color themes
- **? Performance Optimized**: Fast loading times and smooth animations
- **? Accessibility**: Proper ARIA labels, semantic HTML, and keyboard navigation
- **?? Interactive Modals**: Seamless popup experiences for social initiatives

### **Community Focus**
- **?? JSG Federation Integration**: Proud member of JSG International Federation
- **?? Real-time Statistics**: Community members, events organized, and impact metrics
- **?? Dan Patra Initiatives**: 6 different charitable programs with consistent layouts
- **?? Mobile Accessibility**: Optimized for community members who primarily use mobile devices
- **?? Social Impact Tracking**: Complete donation and volunteer management system

## ?? Project Structure

```
JSG-Portal/
??? app/
?   ??? components/              # Reusable UI components
?   ?   ??? Hero.tsx            # Main hero section with statistics
?   ?   ??? AboutSectionSimple.tsx # About preview with JSG Federation info
?   ?   ??? Navbar.tsx          # Responsive navigation bar with Join Us modal
?   ?   ??? Footer.tsx          # Footer with quick links and contact info
?   ?   ??? JoinUsModal.tsx     # NEW: Membership application modal
?   ??? api/                    # Next.js API routes
?   ?   ??? register/           # Registration API endpoint
?   ?   ?   ??? route.ts
?   ?   ??? donation/           # NEW: Donation processing API
?   ?   ?   ??? route.ts
?   ?   ??? volunteer/          # NEW: Volunteer application API
?   ?   ?   ??? route.ts
?   ?   ??? join-us/            # NEW: Membership application API
?   ?   ?   ??? route.ts
?   ?   ??? test-storage/       # Storage testing and diagnostics
?   ?       ??? route.ts
?   ??? admin/                  # Admin dashboard
?   ?   ??? page.tsx            # Registration and social data management
?   ??? about/                  # About page with mission and values
?   ?   ??? page.tsx
?   ??? committee/              # Committee page with member details
?   ?   ??? page.tsx
?   ??? events/                 # Events showcase page
?   ?   ??? page.tsx
?   ??? social/                 # Dan Patra initiatives page with modals
?   ?   ??? page.tsx            # Updated with donation and volunteer modals
?   ?   ??? components/         # Social-specific modal components
?   ?       ??? DonationModal.tsx    # NEW: Donation form with QR payment
?   ?       ??? VolunteerModal.tsx   # NEW: Volunteer application form
?   ??? spl02/                  # SPL 02 tournament information
?   ?   ??? page.tsx
?   ??? register-now/           # SPL 02 registration form with QR payment
?   ?   ??? page.tsx
?   ??? globals.css             # Global styles and Tailwind imports
?   ??? layout.tsx              # Root layout with metadata
?   ??? page.tsx                # Home page combining Hero and About
??? lib/
?   ??? supabase.ts             # Extended Supabase client with social functions
??? supabase/
?   ??? migrations/             # Database migration files
?   ?   ??? 001_create_registrations.sql
?   ?   ??? 002_add_transaction_fields.sql
?   ?   ??? 003_create_social_tables.sql    # NEW: Social initiatives tables
?   ??? fix-bucket-policies.sql            # Storage bucket policy fixes
?   ??? add_amount_column.sql              # Donation amount field migration
??? scripts/
?   ??? setup-social.js          # Updated setup script for social features
??? public/
?   ??? images/                 # Static assets and logos
?       ??? JSG_SPARSH.jpeg     # Main JSG SPARSH logo
?       ??? JSG_Federation.jpeg # JSG Federation logo
?       ??? SPARSH_QR_Code.jpeg # Payment QR code with bank details
??? .env.example                # Environment variables template
??? .env.local                  # Environment variables (not committed)
??? next.config.js              # Next.js configuration
??? tailwind.config.js          # Tailwind CSS configuration
??? tsconfig.json              # TypeScript configuration
??? package.json               # Dependencies and scripts
??? SOCIAL_IMPLEMENTATION.md   # NEW: Social features documentation
??? FEATURES_IMPLEMENTED.md    # Feature implementation details
??? VERCEL_SUPABASE_SETUP.md   # Deployment guide
??? UPLOAD_FIX_GUIDE.md        # NEW: File upload troubleshooting
??? REGISTRATION_FIX_SUMMARY.md # NEW: Registration fixes documentation
```

## Important URLs
- **Homepage**: [http://localhost:3000](http://localhost:3000)
- **Registration**: [http://localhost:3000/register-now](http://localhost:3000/register-now)
- **?? Social Initiatives**: [http://localhost:3000/social](http://localhost:3000/social)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **SPL 02 Info**: [http://localhost:3000/spl02](http://localhost:3000/spl02)

## ??? Database Schema

### **Registrations Table**
```sql
registrations (
  id: UUID (Primary Key)
  category: TEXT (male/female/kids)
  full_name: TEXT
  parent_name: TEXT (nullable, for kids only)
  mobile_number: TEXT
  age: INTEGER
  skillset: TEXT
  bowling_arm: TEXT (Left Arm/Right Arm)
  cricket_experience: TEXT (nullable)
  cric_heroes_link: TEXT (nullable)
  jersey_name: TEXT
  jersey_number: INTEGER
  jersey_size: TEXT
  photo_url: TEXT (nullable)
  transaction_id: TEXT (nullable)
  transaction_screenshot_url: TEXT (nullable)
  payment_status: TEXT (pending/completed/failed)
  registration_date: TIMESTAMP
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
)
```

### **?? Donations Table**
```sql
donations (
  id: UUID (Primary Key)
  name: TEXT (Required)
  mobile_number: TEXT (Required)
  amount: DECIMAL(10,2) (Required) -- NEW: Donation amount with currency precision
  transaction_id: TEXT (Required)
  transaction_screenshot_url: TEXT (Optional)
  created_at: TIMESTAMP (Auto)
)
```

### **?? Enquiries Table**
```sql
enquiries (
  id: UUID (Primary Key)
  name: TEXT (Required)
  address: TEXT (Required)
  mobile_number: TEXT (Required)
  type: TEXT (Default: 'volunteer')
  enquiry_type: TEXT (Values: 'Volunteer' | 'JoinUs', Required)
  created_at: TIMESTAMP (Auto)
)
```

### **Storage Buckets Organization**
- **registration-photos**: Profile pictures from registration form (`/register-now/`)
- **registration-transaction-ss**: Registration payment screenshots (`/register-now/`)
- **donation-transaction-ss**: Donation payment screenshots (`/social/`)

## ?? Recent Updates & Features

### **?? Latest Enhancements - Social Initiatives Platform**
- **?? Complete Donation System**: Amount tracking with currency precision
- **?? Volunteer Application Platform**: Comprehensive volunteer onboarding
- **??? Membership Application System**: "Join Us" functionality with community benefits
- **?? Multi-Modal Interface**: Three dedicated modals for different social initiatives
- **??? Extended Database Schema**: New tables for donations and enquiries
- **?? Organized File Storage**: Separate buckets for different transaction types
- **?? Amount Validation**: Smart currency handling with range validation
- **?? Enhanced Admin Dashboard**: Social data management and analytics

### **Previous Enhancements**
- **?? QR Code Payment Integration**: Added QR code display and transaction collection
- **?? Transaction Tracking**: Collect transaction ID and screenshot from users
- **?? Customizable CSV Export**: Admin can select which columns to export
- **?? Enhanced Registration Flow**: Complete registration only after payment details provided
- **?? Dynamic Registration Fees**: Male/Female ?800, Kids ?600
- **?? Simplified Bowling Arms**: Only Left Arm and Right Arm options
- **?? Enhanced Photo Upload**: 10MB limit with HEIC support

### **Technical Improvements**
- **??? Multi-Table Architecture**: Organized data structure for different features
- **?? Multi-Bucket Storage**: Separate storage for different file types
- **?? Enhanced Security**: Row Level Security policies for all data
- **?? Mobile QR Optimization**: Enhanced QR code presentation for mobile scanning
- **?? Transaction File Management**: Organized storage for transaction screenshots
- **? Comprehensive Validation**: Client and server-side validation for all forms
- **?? Database Indexing**: Optimized queries with proper indexes
- **?? TypeScript Safety**: Complete type definitions for all new features

## Setup Instructions

1. **Clone the repository**: `git clone <repository-url>`
2. **Navigate to the project directory**: `cd JSG-Portal`
3. **Install dependencies**: `npm install`
4. **Set up Supabase project**:
   - Create a new Supabase project
   - Configure database password and API keys
5. **Set up Supabase Database:**
   - Run the SQL migration in `supabase/migrations/001_create_registrations.sql`
   - Run the additional migration in `supabase/migrations/002_add_transaction_fields.sql`
   - **?? Run the social initiatives migration in `supabase/migrations/003_create_social_tables.sql`**
   - Create the `registrations`, `donations`, and `enquiries` tables
   - **?? Create storage buckets**: `registration-photos`, `registration-transaction-ss`, `donation-transaction-ss`
   - Set up Row Level Security policies for all tables
   - **?? Run bucket policy fixes from `supabase/fix-bucket-policies.sql` if needed**
6. **Configure environment variables**:
   - Copy `.env.example` to `.env.local`
   - Update Supabase URL and anonymous key in `.env.local`
7. **Run the development server**: `npm run dev`
8. **Access the website**: Open `http://localhost:3000` in your browser
9. **Admin Dashboard**: Access admin dashboard at `http://localhost:3000/admin`
10. **SPL 02 Registration**: Access registration form at `http://localhost:3000/register-now`