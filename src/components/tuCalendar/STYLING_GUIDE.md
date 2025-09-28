# TuCalendar Modern Styling Guide

## 🎨 **Styling Architecture**

The TuCalendar component now uses a modern, consistent styling approach that integrates seamlessly with the Tukal design system.

## 📁 **File Structure**

```
tuCalendar/css/
├── calendar-modern.scss     # Modern calendar layout & components
├── light-clean.scss         # Clean theme using design system variables
├── index.scss              # Legacy styles (deprecated)
└── light.scss              # Legacy theme (deprecated)
```

## 🎯 **Design System Integration**

### **CSS Custom Properties Used**

```scss
/* Colors */
--tu-primary              # Primary brand color
--tu-success              # Success state color  
--tu-warn                 # Warning state color
--tu-danger              # Error/danger state color
--tu-background          # Main background
--tu-component-background # Component surface
--tu-text                # Primary text color
--tu-gray-1 to --tu-gray-4 # Neutral grays

/* Layout */
--tu-radius              # Border radius (12px default)
--tu-elevated-1 to --tu-elevated-6 # Box shadow levels

/* RGB Values for Alpha Transparency */
--tu-primary-rgb         # RGB values for alpha backgrounds
--tu-success-rgb         # RGB values for alpha backgrounds
--tu-warn-rgb           # RGB values for alpha backgrounds
--tu-danger-rgb         # RGB values for alpha backgrounds
```

## 🏗️ **Modern Layout Features**

### **CSS Grid Implementation**
- **Header days**: `grid-template-columns: 2rem repeat(7, 1fr)`
- **Week rows**: Perfect alignment with header columns
- **Responsive breakpoints**: Automatic column adjustment

### **Flexbox for Components**
- **Day cells**: Flexible content layout
- **Event items**: Proper spacing and alignment
- **Controls**: Centered, accessible button groups

## 🎨 **Theme System**

### **Default Theme (`.theme-default`)**
```scss
.theme-default {
  .cv-wrapper {
    background: var(--tu-background);
    border-color: var(--tu-gray-4);
    box-shadow: var(--tu-elevated-2);
  }
}
```

### **Dark Theme (`.theme-dark`)**  
```scss
.theme-dark {
  .cv-wrapper {
    background: var(--tu-dark-3);
    color: var(--tu-text-100);
    border-color: var(--tu-dark-1);
  }
}
```

### **Minimal Theme (`.theme-minimal`)**
- Reduced shadows and borders
- Clean, flat appearance
- Suitable for embedded contexts

## 🎭 **Component States**

### **Day Cell States**
```scss
.cv-day {
  &:hover { /* Interactive hover */ }
  &.past { /* Past dates */ }
  &.today { /* Current date highlight */ }
  &.outsideMonth { /* Adjacent month dates */ }
  &[aria-selected="true"] { /* Selected date */ }
  &.draghover { /* Drag and drop state */ }
}
```

### **Event Item Categories**
```scss
.cv-item {
  &[data-category="work"] { /* Work events */ }
  &[data-category="personal"] { /* Personal events */ }
  &[data-category="important"] { /* High priority */ }
}
```

## 📱 **Responsive Design**

### **Breakpoints**
- **Desktop**: Full grid layout with week numbers
- **Tablet (≤768px)**: Reduced padding, smaller text
- **Mobile (≤480px)**: Hidden week numbers, single column forms

### **Accessibility Features**
- **Focus indicators**: Clear 2px outlines with offset
- **High contrast support**: Enhanced borders and colors
- **Reduced motion**: Respects user preferences
- **Screen readers**: Semantic HTML and ARIA labels

## 🎬 **Animations & Transitions**

### **Smooth Interactions**
```scss
transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1);
```

### **Hover Effects**
- **Day cells**: Subtle lift with color change
- **Event items**: Horizontal slide with background change
- **Buttons**: Color transition with focus states

### **Loading States**
```scss
.tu-calendar[data-loading="true"] {
  &::after {
    animation: spin 0.8s linear infinite;
  }
}
```

## 🎯 **Usage Examples**

### **Basic Calendar**
```vue
<TuCalendar 
  class="theme-default"
  :events="events"
  :categories="categories"
/>
```

### **Dark Theme Calendar**
```vue
<TuCalendar 
  class="theme-dark"
  :events="events"
  :categories="categories"
/>
```

### **Minimal Embedded Calendar**
```vue
<TuCalendar 
  class="theme-minimal"
  :events="events"
  style="--tu-radius: 4px;"
/>
```

## 🎨 **Customization Options**

### **CSS Custom Property Overrides**
```scss
.my-custom-calendar {
  --tu-primary: #6366f1;           /* Custom primary color */
  --tu-radius: 16px;               /* Larger border radius */
  --tu-elevated-2: 0 8px 32px rgba(0,0,0,0.12); /* Custom shadow */
}
```

### **Category Color Mapping**
```typescript
const categories = [
  { name: 'work', color: 'var(--tu-success)' },
  { name: 'personal', color: 'var(--tu-warn)' },
  { name: 'important', color: 'var(--tu-danger)' }
];
```

## 🔧 **Performance Optimizations**

### **CSS Features Used**
- **contain**: Layout containment for better performance
- **will-change**: Optimized animations
- **transform**: GPU-accelerated transitions
- **backdrop-filter**: Modern blur effects (where supported)

### **Bundle Optimization**
- **Tree-shakeable**: Import only needed theme files
- **Modern CSS**: No vendor prefixes needed for supported browsers
- **Minimal footprint**: ~8KB gzipped for complete styling

## 🌍 **Browser Support**

### **Modern Browsers** (Full Support)
- Chrome 88+
- Firefox 87+
- Safari 14+
- Edge 88+

### **Graceful Degradation**
- IE11: Basic layout with reduced animations
- Older browsers: Fallback to system fonts and basic colors

## 🎯 **Migration from Legacy Styles**

### **Breaking Changes**
1. **File imports**: Update to new SCSS files
2. **CSS classes**: Some legacy classes removed
3. **Color variables**: New naming convention

### **Upgrade Steps**
1. Replace `import "./css/index.scss"` with `import "./css/calendar-modern.scss"`
2. Replace `import "./css/light.scss"` with `import "./css/light-clean.scss"`
3. Update custom CSS to use new design system variables
4. Test responsive behavior on mobile devices

The new styling system provides a more maintainable, accessible, and visually consistent calendar component that integrates seamlessly with modern web applications.
