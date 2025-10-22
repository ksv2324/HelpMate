# Volunteer Feature - Quick Start Guide

## What Was Added

### New Tab in Navigation
A "Volunteer" tab (truck icon 🚚) has been added to the main app navigation between "Request" and "Map".

## Two Sub-Features

### 1. Available Deliveries
**Browse and accept delivery requests from donors**

**Sample Deliveries:**
- Winter Clothes (8.5 km)
- Food Packages (12 km)
- School Supplies (18 km)
- Medical Supplies (15 km)
- Baby Care Items (3 km)

**Actions:**
- View delivery details
- See pickup and delivery locations
- Check distance and estimated time
- Accept delivery

### 2. My Deliveries
**Manage your accepted deliveries**

**Features:**
- View all accepted deliveries
- Track status (Accepted → In Progress → Completed)
- See pickup and delivery timeline
- Start navigation
- Call donor or recipient
- View map directions

## Quick Usage

```
1. Open app → Tap "Volunteer" tab
2. Browse "Available" deliveries
3. Tap a delivery → Review details → "Accept Delivery"
4. Switch to "My Deliveries" sub-tab
5. Tap delivery → "Start Delivery" for navigation
6. Use "Call" buttons to contact donor/recipient
```

## Sample Data
- **5 available deliveries** (various types)
- **2 accepted deliveries** (in progress)

## Files to Know

### Main Components
- `src/components/volunteer/VolunteerPage.tsx` - Main container
- `src/components/volunteer/AvailableDeliveries.tsx` - Browse deliveries
- `src/components/volunteer/MyDeliveries.tsx` - Manage deliveries

### Data & Types
- `src/constants/deliveryRequests.ts` - Sample data
- `src/types/index.ts` - DeliveryRequest type

### Translations
- `src/components/shared/LanguageContext.tsx` - All volunteer strings in 8 languages

## Customization

### Add More Sample Deliveries
Edit `src/constants/deliveryRequests.ts`:
```typescript
export const availableDeliveries: DeliveryRequest[] = [
  {
    id: 'del-X',
    donationTitle: 'Your Item',
    donor: 'Donor Name',
    donorLocation: 'Pickup Address',
    donorCoordinates: [lat, lng],
    recipient: 'Recipient Name',
    recipientLocation: 'Delivery Address',
    recipientCoordinates: [lat, lng],
    distance: 'X km',
    status: 'pending',
    // ... other fields
  }
];
```

### Change Status Colors
In `MyDeliveries.tsx`, edit `getStatusColor()`:
```typescript
case 'accepted': return 'bg-blue-500/10 text-blue-600';
case 'in-progress': return 'bg-yellow-500/10 text-yellow-600';
case 'completed': return 'bg-green-500/10 text-green-600';
```

### Modify Translations
In `LanguageContext.tsx`, update any volunteer-related key:
```typescript
volunteer: 'Your Translation',
available: 'Your Translation',
// etc.
```

## Next Steps for Backend Integration

### API Endpoints Needed
```
GET  /api/deliveries/available    - Fetch available deliveries
GET  /api/deliveries/my           - Fetch my deliveries
POST /api/deliveries/:id/accept   - Accept a delivery
PUT  /api/deliveries/:id/status   - Update delivery status
```

### Replace Mock Data
In component files, replace:
```typescript
// Current (mock)
import { availableDeliveries } from '../../constants';

// With API call
const { data: availableDeliveries } = await fetchAvailableDeliveries();
```

## Troubleshooting

### Tab not showing?
- Check `MainApp.tsx` has volunteer tab added
- Verify `t.volunteer` translation exists
- Ensure `VolunteerPage` is imported

### No deliveries showing?
- Check `deliveryRequests.ts` exports correctly
- Verify import in component
- Check data structure matches `DeliveryRequest` type

### Map not working?
- Map uses placeholder currently (gray background)
- For real map, integrate Leaflet or Google Maps
- See `VOLUNTEER_DELIVERY_FEATURE.md` for details

## Build & Run

```bash
# Build for production
npm run build

# Start development server
npm run dev
```

## Support
See full documentation: `ai_summaries/VOLUNTEER_DELIVERY_FEATURE.md`
