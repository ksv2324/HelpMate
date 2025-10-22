# Width Consistency Fix

**Date:** October 22, 2025  
**Issue:** Map screen and other screens had inconsistent widths, causing layout warping and visual inconsistencies.

## Problem

The width of screens was changing between different views (especially noticeable in the Map screen), causing:
- Content to warp and shift
- Inconsistent user experience
- Layout instability during navigation

## Solution

### 1. Created ScreenContainer Component

**File:** `src/components/shared/ScreenContainer.tsx`

A new wrapper component that ensures consistent width across all screens:

```typescript
interface ScreenContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ScreenContainer({ children, className }: ScreenContainerProps) {
  return (
    <div className={cn(
      "h-full w-full bg-white flex flex-col",
      "min-w-0 max-w-full", // Prevent width changes
      className
    )}>
      {children}
    </div>
  );
}
```

**Key Features:**
- `w-full`: Always 100% width of parent
- `min-w-0 max-w-full`: Prevents width from changing
- `h-full`: Full height
- `flex flex-col`: Column layout for consistent structure
- Accepts `className` prop for customization

### 2. Updated Screens

Applied `ScreenContainer` to the following screens:

#### Map Screens
- **MapPage.tsx**
  - Wrapped content in `ScreenContainer`
  - Added `min-w-0` to prevent overflow
  - Added `shrink-0` to fixed UI elements (legend, radius info)
  - Fixed gradient class: `bg-gradient-to-br` → `bg-linear-to-br`

- **MapScreen.tsx**
  - Wrapped content in `ScreenContainer`
  - Added `shrink-0` to header to prevent shrinking
  - Added `min-w-0` to flex-1 map container
  - Fixed gradient class: `bg-gradient-to-br` → `bg-linear-to-br`

#### Main Screens
- **DonationPage.tsx**
  - Wrapped in `ScreenContainer` with `bg-gray-50` className
  - Added `min-w-0` to overflow container
  - Fixed gradient class: `bg-gradient-to-r` → `bg-linear-to-r`

- **RequestPage.tsx**
  - Wrapped in `ScreenContainer` with `bg-gray-50` className
  - Added `min-w-0` to overflow container
  - Fixed gradient class: `bg-gradient-to-r` → `bg-linear-to-r`

- **HomePage.tsx**
  - Wrapped in `ScreenContainer` with `bg-gray-50` className
  - Added inner div with `min-w-0` for overflow handling
  - Fixed gradient class: `bg-gradient-to-r` → `bg-linear-to-r`
  - Fixed shrink classes: `flex-shrink-0` → `shrink-0`

### 3. Export Update

**File:** `src/components/shared/index.ts`

Added `ScreenContainer` to barrel export:
```typescript
export { default as ScreenContainer } from './ScreenContainer';
```

## Technical Details

### Width Constraint Strategy

1. **Container Level** (`ScreenContainer`)
   - `w-full`: Fill parent container
   - `max-w-full`: Never exceed parent width
   - `min-w-0`: Allow flex children to shrink properly

2. **Content Level**
   - `min-w-0`: Prevent content from forcing width expansion
   - `shrink-0`: Fixed elements (headers, legends) maintain size
   - `overflow-auto/hidden`: Scroll instead of expanding

3. **Flex Children**
   - Use `flex-1 min-w-0` for scrollable content areas
   - Use `shrink-0` for fixed UI elements

### Before/After Comparison

**Before:**
```typescript
<div className="h-full bg-white flex flex-col">
  <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
    {/* Content that could expand beyond bounds */}
  </div>
</div>
```

**After:**
```typescript
<ScreenContainer>
  <div className="flex-1 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 min-w-0">
    {/* Content constrained to container */}
  </div>
</ScreenContainer>
```

## Benefits

1. **Consistency**: All screens maintain the same width
2. **Predictability**: No unexpected layout shifts
3. **Maintainability**: Centralized width control
4. **Reusability**: Easy to apply to new screens
5. **Flexibility**: Accepts className for customization

## Usage Pattern

For new screens:
```typescript
import { ScreenContainer } from '../shared';

export default function MyScreen() {
  return (
    <ScreenContainer className="bg-gray-50">
      {/* Header with shrink-0 */}
      <div className="px-6 pt-12 pb-4 shrink-0">
        <h1>My Screen</h1>
      </div>

      {/* Scrollable content with min-w-0 */}
      <div className="flex-1 overflow-auto min-w-0">
        {/* Content */}
      </div>
    </ScreenContainer>
  );
}
```

## Additional Fixes

### Tailwind Class Updates
- `bg-gradient-to-*` → `bg-linear-to-*` (Tailwind v4 syntax)
- `flex-shrink-0` → `shrink-0` (shorthand)

## Files Modified

1. `src/components/shared/ScreenContainer.tsx` (NEW)
2. `src/components/shared/index.ts`
3. `src/components/map/MapPage.tsx`
4. `src/components/map/MapScreen.tsx`
5. `src/components/donations/DonationPage.tsx`
6. `src/components/requests/RequestPage.tsx`
7. `src/components/home/HomePage.tsx`

## Testing Recommendations

1. Navigate between all screens to verify consistent width
2. Test map screen with different marker selections
3. Verify scrolling behavior in content areas
4. Check responsive behavior (if applicable)
5. Test with different content lengths

## Future Considerations

- Apply `ScreenContainer` to remaining screens for complete consistency
- Consider adding screen transition animations
- Monitor for any overflow issues in edge cases
- Update documentation for new screen creation pattern
