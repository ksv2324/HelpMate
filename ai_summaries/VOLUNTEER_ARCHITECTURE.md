# Volunteer Delivery Feature - Architecture

## Component Hierarchy

```
MainApp
└── Volunteer Tab (Truck Icon 🚚)
    └── VolunteerPage (Container)
        ├── Sub-Tab: Available
        │   └── AvailableDeliveries
        │       ├── List View (default)
        │       └── Details View (on selection)
        │           └── Accept Button → moves to My Deliveries
        │
        └── Sub-Tab: My Deliveries
            └── MyDeliveries
                ├── List View (default)
                ├── Details View (on selection)
                │   ├── Timeline (Pickup → Delivery)
                │   ├── Status Badge
                │   ├── Call Buttons
                │   └── Start Delivery Button
                │
                └── Map View (navigation)
                    ├── Map Placeholder
                    ├── Floating Info Card
                    └── Action Buttons (Call, Message)
```

## Data Flow

```
Constants (Mock Data)
  ↓
deliveryRequests.ts
  ├── availableDeliveries[]  →  AvailableDeliveries Component
  └── myDeliveries[]         →  MyDeliveries Component
```

### State Management

```typescript
// VolunteerPage.tsx
const [activeSubTab, setActiveSubTab] = useState<'available' | 'myDeliveries'>('available');

// AvailableDeliveries.tsx
const [deliveries, setDeliveries] = useState(availableDeliveries);
const [selectedDelivery, setSelectedDelivery] = useState<DeliveryRequest | null>(null);

// MyDeliveries.tsx
const [deliveries] = useState(myDeliveries);
const [selectedDelivery, setSelectedDelivery] = useState<DeliveryRequest | null>(null);
const [showMap, setShowMap] = useState(false);
```

## Screen States

### Available Deliveries States
1. **List State** (default)
   - Shows all pending deliveries
   - Card-based list with images
   - Distance and time badges
   
2. **Detail State** (on card tap)
   - Full delivery information
   - Pickup location details
   - Delivery location details
   - Distance and time stats
   - Accept button

3. **Empty State**
   - Package icon
   - "No Deliveries Available" message
   - Helpful text

### My Deliveries States
1. **List State** (default)
   - Shows accepted deliveries
   - Status badges (color-coded)
   - Time accepted info
   
2. **Detail State** (on card tap)
   - Timeline visualization
   - Status information
   - Call action buttons
   - Start Delivery button

3. **Map/Navigation State**
   - Map placeholder
   - Route information
   - Floating info card
   - Quick actions

4. **Empty State**
   - Package icon
   - "No Active Deliveries" message
   - Helpful text

## File Structure

```
src/
├── components/
│   ├── volunteer/                    # NEW
│   │   ├── VolunteerPage.tsx        # Container with sub-tabs
│   │   ├── AvailableDeliveries.tsx  # Browse deliveries
│   │   ├── MyDeliveries.tsx         # Manage deliveries
│   │   └── index.ts                 # Barrel export
│   │
│   └── shared/
│       ├── MainApp.tsx               # MODIFIED: Added volunteer tab
│       └── LanguageContext.tsx       # MODIFIED: Added translations
│
├── constants/
│   ├── deliveryRequests.ts          # NEW: Sample data
│   └── index.ts                     # MODIFIED: Export deliveries
│
└── types/
    └── index.ts                     # MODIFIED: Added DeliveryRequest types
```

## Type System

```typescript
// Core Types
type DeliveryStatus = 'pending' | 'accepted' | 'in-progress' | 'completed';
type VolunteerSubTab = 'available' | 'myDeliveries';
type Tab = 'home' | 'donation' | 'request' | 'volunteer' | 'map';

// Main Interface
interface DeliveryRequest {
  // Identity
  id: string;
  donationId: string;
  
  // Donation Info
  donationTitle: string;
  donationImage: string;
  description: string;
  
  // Donor Info
  donor: string;
  donorLocation: string;
  donorCoordinates: [number, number];
  
  // Recipient Info
  recipient: string;
  recipientLocation: string;
  recipientCoordinates: [number, number];
  
  // Delivery Info
  distance: string;
  status: DeliveryStatus;
  acceptedBy?: string;
  acceptedAt?: string;
  estimatedDeliveryTime?: string;
}
```

## Translation Keys

```typescript
interface Translations {
  // Tab & Navigation
  volunteer: string;
  available: string;
  myDeliveries: string;
  back: string;
  
  // Lists
  availableDeliveries: string;
  deliveriesNeedHelp: string;
  activeDeliveries: string;
  
  // Actions
  acceptDelivery: string;
  startDelivery: string;
  viewMap: string;
  call: string;
  message: string;
  callDonor: string;
  callRecipient: string;
  
  // Details
  deliveryDetails: string;
  pickupFrom: string;
  deliverTo: string;
  distance: string;
  estimatedTime: string;
  acceptedAt: string;
  navigation: string;
  
  // Status
  accepted: string;
  inProgress: string;
  completed: string;
  
  // Empty States
  noDeliveries: string;
  checkBackLater: string;
  noActiveDeliveries: string;
  acceptDeliveriesToSee: string;
}
```

## UI Component Patterns

### Card Component Pattern
```typescript
<div className="bg-card rounded-lg border border-border">
  <div className="flex gap-3 p-3">
    <img src={image} className="w-20 h-20 rounded-lg" />
    <div className="flex-1 min-w-0">
      <h3>{title}</h3>
      <div>{metadata}</div>
      <div>{badges}</div>
    </div>
  </div>
</div>
```

### Status Badge Pattern
```typescript
const getStatusColor = (status: string) => {
  switch (status) {
    case 'accepted': return 'bg-blue-500/10 text-blue-600';
    case 'in-progress': return 'bg-yellow-500/10 text-yellow-600';
    case 'completed': return 'bg-green-500/10 text-green-600';
  }
};

<span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(status)}`}>
  {getStatusLabel(status)}
</span>
```

### Timeline Pattern
```typescript
<div className="space-y-4">
  {/* Start Point */}
  <div className="flex items-start gap-3">
    <Icon />
    <div>
      <p className="font-semibold">Label</p>
      <p className="text-muted-foreground">Location</p>
    </div>
    {completed && <CheckCircle />}
  </div>
  
  {/* Connector */}
  <div className="ml-6 border-l-2 border-dashed h-6"></div>
  
  {/* End Point */}
  <div className="flex items-start gap-3">
    <Icon />
    <div>
      <p className="font-semibold">Label</p>
      <p className="text-muted-foreground">Location</p>
    </div>
  </div>
</div>
```

## Navigation Flow

```
User Journey: Accepting a Delivery
───────────────────────────────────

1. MainApp → Tap "Volunteer" tab
2. VolunteerPage renders with activeSubTab='available'
3. AvailableDeliveries shows list of deliveries
4. User taps a delivery card
5. selectedDelivery is set → Detail view renders
6. User taps "Accept Delivery"
7. handleAcceptDelivery() removes from available list
8. (In production: API call to accept delivery)
9. User switches to "My Deliveries" sub-tab
10. Delivery appears in MyDeliveries component

User Journey: Starting Navigation
────────────────────────────────

1. MyDeliveries → Tap a delivery card
2. Detail view shows with "Start Delivery" button
3. User taps "Start Delivery"
4. showMap is set to true
5. Map view renders with:
   - Route information
   - Floating info card
   - Action buttons
6. User can call donor/recipient or navigate back
```

## Styling System

### Color Scheme
```css
Primary: #4c6ef5 (Blue)
Secondary: Gray scale
Success: Green (#10b981)
Warning: Yellow (#eab308)
Error: Red (#ef4444)

Status Colors:
- Accepted: Blue (#3b82f6)
- In Progress: Yellow (#eab308)  
- Completed: Green (#10b981)
```

### Responsive Breakpoints
```css
text-xs sm:text-sm    /* Font size adjusts on larger screens */
flex-col sm:flex-row  /* Layout changes on larger screens */
gap-2 sm:gap-4       /* Spacing increases on larger screens */
```

## Integration Points

### Backend API Endpoints (Future)
```
GET    /api/deliveries/available
GET    /api/deliveries/my
POST   /api/deliveries/:id/accept
PUT    /api/deliveries/:id/status
PATCH  /api/deliveries/:id/location
GET    /api/deliveries/:id/route
```

### External Services (Future)
- Google Maps / Leaflet for navigation
- Twilio for SMS/call functionality
- Firebase Cloud Messaging for push notifications
- WebSocket for real-time location tracking

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: Load map component only when needed
2. **Memoization**: Memo heavy components (delivery cards)
3. **Virtual Scrolling**: For large delivery lists
4. **Image Optimization**: Lazy load images, use thumbnails
5. **State Management**: Consider Redux/Zustand for complex state
6. **Code Splitting**: Dynamic imports for volunteer module

### Bundle Impact
- Added ~50KB to bundle (components + translations)
- Map placeholder is lightweight (no map library loaded)
- Sample data is small (~5KB)

---

**Last Updated**: October 22, 2025
