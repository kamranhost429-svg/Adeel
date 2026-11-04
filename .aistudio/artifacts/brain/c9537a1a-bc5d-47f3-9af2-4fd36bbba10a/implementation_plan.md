# Advanced CMS Upgrade for Al Adeel Advertising

Transform the existing Admin Panel into a comprehensive, production-ready Advanced Content Management System (CMS) that empowers administrators to edit every section, item, text, image, contact detail, and structural branding element across the entire website in real-time with instant persistence, visual previews, asset management, and JSON backup/restore capabilities.

> [!IMPORTANT]
> **Confirmed Scope & Architecture Decisions**
> - **Full Site Editability**: Includes Hero Section (headline, subtitle, CTAs), Branding & Identity (site name, logo, phone numbers, WhatsApp, email, address, operating hours, social links), Services Catalog, Portfolio Showcase, Company Statistics, FAQs, and Footer.
> - **Data Persistence & Local Storage**: Uses typed Local Storage state synchronization with zero delay, fallback to pristine production defaults, and a 1-click "Reset All Content to Factory Defaults" safety control.
> - **Advanced Tools**: Built-in Media Asset Library, Live Site Split-Screen Preview Mode, JSON Content Export/Import for instant backups, and bilingual (English/Arabic) content field management.

---

## 1. Overview & Core Concept

### What It Does
The upgraded Advanced CMS provides a centralized, secure control center for Al Adeel Advertising LLC. Admins can seamlessly update website content, modify service descriptions and specs, upload or select media assets, manage portfolio items, adjust business stats and contact info, and test changes in a live side-by-side preview mode before publishing.

### Target Audience
Al Adeel Advertising administrators, content managers, and operational staff managing daily customer inquiries, portfolio updates, and promotional content across Dubai and the UAE.

### Key Value Delivered
Eliminates hardcoded content updates. All marketing copy, portfolio items, image assets, and contact channels can be edited dynamically with zero coding, instant local persistence, and offline/backup reliability.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **CMS Navigation & Tabbed Workspace**:
   - Left sidebar with high-density navigation icons: **Overview/Analytics**, **Site Identity & Branding**, **Hero Banner**, **Services CMS**, **Portfolio CMS**, **Company Stats & FAQs**, **Media Library**, and **Backup & Export**.
2. **Dynamic Section Editors**:
   - **Site Identity & Contact**: Edit phone numbers (+971 50...), WhatsApp, email, physical office address, Google Maps link, working hours, and social media links.
   - **Hero Section**: Live text inputs for headline (English & Arabic), subtitle, badges, CTA button labels, and hero background media.
   - **Services CMS Manager**: Add, edit, reorder, or delete services with specs, features, materials, turnaround times, min order quantities, and images.
   - **Portfolio CMS Manager**: Full CRUD for portfolio items with category tags, material specs, finishing options, and image picker.
   - **Stats & FAQs Editor**: Real-time management of key metrics (e.g. "15+ Years Experience", "10K+ Orders Delivered") and collapsible FAQ Q&A pairs.
3. **Media Asset Library**:
   - Centralized grid of all uploaded and optimized site images with copy-URL affordances, search filter, image replacement, and image metadata view.
4. **Live Split-Screen Preview Mode**:
   - Toggleable side-by-side view showing the live website on the right pane responding instantly as fields are edited in the CMS on the left.
5. **Backup & Restore**:
   - 1-click "Export JSON Backup" to download the current site state and "Import JSON Backup" to restore or migrate configurations safely.

### Visual Identity & Theme
- **Theme**: Premium Dark Slate `#081C15` / Emerald `#0d2b1f` sidebar with clean white `#FFFFFF` / crisp off-white `#FAFAFA` editor canvas and warm gold `#b87e2a` accent highlights.
- **Typography**: Clean, professional `Plus Jakarta Sans` for headers and UI controls, paired with monospace `font-mono tabular-nums` for metrics, IDs, and JSON data.
- **Layout Rhythm**: High-density 2-column or 3-column form grids with subtle 1px hairline dividers (`border-slate-200 dark:border-slate-800`), unboxed quiet metadata, and clean segmented tab buttons.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Local Storage + Reactive Context vs. Database Provisioning
- **Chosen Approach**: Use a reactive React Context store (`CmsContext`) backed by `localStorage` with initial seed data from `content.ts`.
- **Why**: Delivers sub-millisecond edit responses, zero API rate limits or database setup hurdles, instant client-side persistence, and complete offline capability.
- **Safety Valve**: Includes a "Reset to Factory Defaults" action and JSON Import/Export backup so administrators never lose content.

### Decision 2: Centralized CMS Data Store vs. Fragmented Local Component State
- **Chosen Approach**: Unify all site content into a single typed data schema (`SiteContentSchema`) loaded at root level.
- **Why**: Guarantees that editing a phone number or service in the CMS instantly reflects across the Navbar, Footer, Services Section, Modal popups, and Contact page without page reloads.

---

## 4. Technical Architecture & Data Strategy

### Architecture & System Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Root Context Layer                          │
│                           (CmsContext.tsx)                             │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │  SiteContent State (Loaded from LocalStorage || Default Seed)  │   │
│   └───────────────┬────────────────────────────────┬───────────────┘   │
└───────────────────┼────────────────────────────────┼───────────────────┘
                    │                                │
         ┌──────────▼──────────┐          ┌──────────▼──────────┐
         │     Public Site     │          │  Admin CMS Panel    │
         │  (Navbar, Hero,     │          │  (Sidebar Tabs,     │
         │   Services, Port,   │          │   Section Editors,  │
         │   Stats, Contact)   │          │   Media Library,    │
         │                     │          │   Live Preview)     │
         └─────────────────────┘          └──────────┬──────────┘
                                                     │
                                          ┌──────────▼──────────┐
                                          │  LocalStorage &     │
                                          │  JSON Backup Engine │
                                          └─────────────────────┘
```

### Data Schema Overview (`SiteContentSchema`)
- **branding**: `{ siteName, tagline, logoUrl, phonePrimary, phoneSecondary, whatsappNumber, email, address, officeHours, googleMapsUrl, socialLinks }`
- **hero**: `{ headlineEn, headlineAr, subtitleEn, subtitleAr, primaryCtaText, secondaryCtaText, bgImageUrl, badgeText }`
- **services**: `Array<ServiceItem>` (id, title, badge, description, turnaround, features[], materials[], popularItems[], image)
- **portfolio**: `Array<PortfolioItem>` (id, title, category, image, description, specs, tags[])
- **stats**: `Array<{ label: string, value: string, icon: string }>`
- **faqs**: `Array<{ questionEn: string, answerEn: string, questionAr: string, answerAr: string }>`

---

## 5. Execution Steps

1. **CMS State & Context Layer (`src/context/CmsContext.tsx`)**:
   - Create unified site content schema, default seed export, and localStorage subscriber hook with export/import/reset methods.
2. **Admin Dashboard Layout Upgrade (`src/pages/AdminDashboard.tsx`)**:
   - Add tabbed navigation for:
     - 📊 Overview & Content Status
     - 🏢 Site Identity & Contact Info
     - 🚀 Hero Banner & Messaging
     - 🛠️ Services CMS Manager
     - 🖼️ Portfolio CMS Manager
     - 📈 Stats & FAQs CMS
     - 📁 Media Asset Library
     - 💾 Backup, Import & Export
3. **Public Component Wiring**:
   - Connect Navbar, Hero, ServicesSection, PortfolioSection, ContactSection, and Footer to read dynamically from `useCms()` context.
4. **Live Preview Mode**:
   - Implement split-screen preview toggle in Admin Dashboard so edits reflect live in an embedded preview frame.
5. **Verification & Build**:
   - Run compilation check, verify all form handlers, test local persistence, reset functions, and JSON import/export routines.
