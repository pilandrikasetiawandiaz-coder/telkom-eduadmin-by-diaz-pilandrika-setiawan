# Telkom EduAdmin Modern - Design System & Specification

```yaml
name: Telkom EduAdmin Modern
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5f3f3b'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#946e69'
  outline-variant: '#e9bcb6'
  surface-tint: '#c0000d'
  primary: '#b7000c'
  on-primary: '#ffffff'
  primary-container: '#e60012'
  on-primary-container: '#fff7f6'
  inverse-primary: '#ffb4aa'
  secondary: '#ba0912'
  on-secondary: '#ffffff'
  secondary-container: '#de2d28'
  on-secondary-container: '#fffbff'
  tertiary: '#675555'
  on-tertiary: '#ffffff'
  tertiary-container: '#816d6d'
  on-tertiary-container: '#fff6f5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930007'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#930009'
  tertiary-fixed: '#f6dddd'
  tertiary-fixed-dim: '#d9c1c1'
  on-tertiary-fixed: '#261819'
  on-tertiary-fixed-variant: '#544343'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
```

## Brand & Style

This design system drives a modern, progressive educational management dashboard tailored for administrators, faculty, and academic leadership. It bridges institutional rigor with contemporary, mobile-first utility. The experience projects operational precision, transparency, accessibility, and high technological competence.

The aesthetic fuses **Modern Corporate** reliability with refined **Glassmorphism** accents:
- **Base Style:** Structured, clean surfaces built with ample whitespace, systematic micro-spacing, and clear hierarchy.
- **Glassmorphic Touches:** Translucent panels, frosted navigation rails, and floating action headers using subtle backdrop blurs (`backdrop-filter: blur(16px)`) paired with delicate borders tinted in the primary brand hue.
- **Emotional Impact:** Trustworthy, swift, organized, and distinctly connected to the Telkom institutional legacy without feeling rigid or bureaucratic.

## Colors

The palette centers on the iconic Telkom corporate red, translated into an ergonomic, high-legibility interface system.

### Color Tokens & Roles
- **Primary (`#E60012`):** Key call-to-action buttons, active navigation indicators, key metrics, and brand anchor points.
- **Primary Dark / Secondary (`#B3000E`):** Hover and pressed states for primary elements, high-emphasis icons, and structural focus rings.
- **Primary Light / Tertiary (`#FFE5E5`):** Selected table rows, badge backdrops, subtle icon containers, and focused state fills.
- **Neutral Dark (`#1A1A1A`):** Headlines, critical statistics, table headers, and primary interface labels.
- **Neutral Body (`#4A4A4A`):** Explanatory text, secondary table cells, helper copy, and default icons.
- **Canvas / Background Neutral (`#F5F5F7`):** Main application underlay, providing low-glare visual comfort during prolonged administrative tasks.
- **Surface / Pure White (`#FFFFFF`):** Base card surfaces, elevated modals, and input controls.

### Functional Alerts
- **Success (`#22C55E`):** Attendance confirmations, completed grading periods, active status indicators.
- **Warning (`#F59E0B`):** Pending approvals, tuition payment reminders, approaching deadlines.
- **Danger (`#EF4444`):** Disciplinary flags, failed records, system error banners, destructive actions.

### Glassmorphism & Tint Overlays
- **Glass Tint Surface:** `rgba(255, 255, 255, 0.82)` on light layouts, combined with a perimeter boundary of `rgba(230, 0, 18, 0.08)`.
- **Subtle Red Border:** `rgba(230, 0, 18, 0.10)` applied to cards, segment dividers, and stat containers to integrate the brand identity across the system.

## Typography

The typographic hierarchy couples **Plus Jakarta Sans** for headlines and high-level figures with **Inter** for data-dense tables, lists, labels, and forms.

- **Headlines (Plus Jakarta Sans):** Geometric, warm, modern numerals and bold cuts deliver high-energy summary blocks and mobile dashboard headers.
- **Interface & Body (Inter):** Maximizes optical legibility at micro sizes (11px–14px), vital for student rosters, grade entries, attendance matrices, and audit logs.
- **Tabular Data:** Form elements, grade averages, and time codes must render with tabular figures (`font-variant-numeric: tabular-nums`) to prevent alignment shifts during real-time data syncs.

## Layout & Spacing

The layout utilizes a mobile-first, responsive 12-column grid configured for touch workflows and high-density desktop dashboards:
- **Mobile (< 768px):** 4-column layout with `1rem` margins and `0.75rem` gutters. Metric cards stack vertically or slide horizontally in touch carousels.
- **Tablet (768px - 1024px):** 8-column layout with `1.5rem` margins and `1rem` gutters. Navigation shifts to a compact rail.
- **Desktop (> 1024px):** 12-column layout with `2rem` margins and `1.5rem` gutters, locked to a max width of 1440px for comfortable reading spans.
