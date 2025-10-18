# Hand2Hand Mobile App - AI Coding Guidelines

## Project Overview
This is a React TypeScript mobile app prototype for a donation/request sharing platform called "Hand2Hand". The app facilitates peer-to-peer sharing of goods and services between community members, with multi-language support and a mobile-first design.

## Architecture & Key Components

### App Structure
- **Authentication Flow**: `SplashScreen` → `OnboardingScreen` → `LoginScreen` → `PledgeScreen` → `MainApp`
- **Main Navigation**: Tab-based with Home, Donation, Request, Map screens
- **Settings**: Nested screens (Profile, Notifications, Privacy, Help, About)

### Component Organization
```
src/components/
├── auth/           # Authentication screens
├── donations/      # Donation-related components
├── requests/       # Request-related components
├── home/          # Home/dashboard screens
├── map/           # Map functionality
├── notifications/ # Notification screens
├── profile/       # Profile/settings
├── settings/      # App settings screens
├── shared/        # Shared utilities (LanguageProvider, MainApp)
└── ui/            # Reusable UI components (Radix UI based)
```

### Data Flow Patterns
- **Container/Orchestrator Pattern**: Page components manage state and orchestrate child components
- **Custom Hooks**: `useForm` for form state, `useChat` for messaging
- **Context**: `LanguageProvider` for internationalization (8 languages)
- **Constants**: Sample data in `src/constants/` (replace with API calls later)

## Development Workflow

### Essential Commands
```bash
npm install          # Install dependencies
npm run dev         # Start dev server (port 3000, auto-opens browser)
npm run build       # Production build to build/ directory
```

### Build Configuration
- **Vite** with React SWC plugin for fast development
- **Mobile simulation**: Fixed 844px height iPhone frame in browser
- **Path aliases**: `@/` maps to `./src`
- **Extensive Radix UI aliases** in vite.config.ts for component library

## Coding Patterns & Conventions

### TypeScript Usage
```typescript
// Import all types from centralized location
import { Donation, Request, Message, Tab, AuthScreen } from '../types';

// Use proper typing for all props and state
interface DonationListProps {
  donations: Donation[];
  onSelect: (donation: Donation) => void;
}
```

### Component Patterns
```typescript
// Container/Orchestrator Pattern (DonationPage.tsx)
const DonationPage = () => {
  const [selectedItem, setSelectedItem] = useState<Donation | null>(null);
  const [showForm, setShowForm] = useState(false);

  if (selectedItem) return <ChatBox item={selectedItem} />;
  if (showForm) return <DonationForm onClose={() => setShowForm(false)} />;
  return <DonationList onSelect={setSelectedItem} />;
};

// Custom Hook Usage (useForm)
const { values, handleChange, hasChanges, save } = useForm({
  title: '',
  description: ''
});
```

### Styling & UI
- **Tailwind CSS** with custom design tokens in `globals.css`
- **Radix UI** primitives extensively used (Dialog, Sheet, Dropdown, etc.)
- **Motion animations** with Framer Motion for page transitions
- **Mobile-first** with fixed viewport simulation
- **Dark mode support** with CSS custom properties

### Internationalization
```typescript
// Use translation hook throughout app
const { t } = useLanguage();

// Access translations
<span>{t.donate}</span>
<button>{t.addDonation}</button>
```

### File Organization
- **Barrel exports**: `index.ts` files for clean imports
- **Constants**: Sample data in `src/constants/` (API-ready structure)
- **Hooks**: Custom logic in `src/hooks/`
- **Types**: All interfaces in `src/types/index.ts`

## Key Files to Reference

### Architecture Understanding
- `src/App.tsx` - Main app flow and screen routing
- `src/components/shared/MainApp.tsx` - Tab navigation and layout
- `src/components/shared/LanguageContext.tsx` - i18n implementation

### Component Patterns
- `src/components/donations/DonationPage.tsx` - Container pattern example
- `src/components/donations/DonationList.tsx` - List component pattern
- `src/components/donations/DonationForm.tsx` - Form component pattern

### Custom Hooks
- `src/hooks/useForm.ts` - Form state management
- `src/hooks/useChat.ts` - Chat functionality

### Data & Types
- `src/types/index.ts` - All TypeScript definitions
- `src/constants/donations.ts` - Sample donation data structure

## Common Tasks & Patterns

### Adding a New Screen
1. Create component in appropriate folder (`src/components/feature/`)
2. Add to barrel export (`src/components/feature/index.ts`)
3. Update navigation in `MainApp.tsx` or relevant container
4. Add translations to `LanguageContext.tsx`

### Adding Form Functionality
```typescript
import { useForm } from '../hooks';

const MyForm = () => {
  const { values, handleChange, hasChanges, save } = useForm({
    field1: 'initial',
    field2: ''
  });

  return (
    <form>
      <input value={values.field1} onChange={handleChange('field1')} />
      {hasChanges && <button onClick={save}>Save</button>}
    </form>
  );
};
```

### Adding Chat Feature
```typescript
import { useChat } from '../hooks';

const MyChat = () => {
  const { messages, newMessage, setNewMessage, handleSend } = useChat();

  return (
    <div>
      {messages.map(msg => <div key={msg.id}>{msg.text}</div>)}
      <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
```

## Quality Standards

### Do's ✅
- Use TypeScript for all new code (no `any` types)
- Follow container/component separation
- Use custom hooks for reusable logic
- Import from barrel exports (`../hooks`, `../types`)
- Use translation keys for all user-facing text
- Follow existing naming conventions
- Add proper TypeScript interfaces

### Don'ts ❌
- Hardcode strings (use translation keys)
- Mix UI and business logic in components
- Create components > 200 lines
- Use `any` or implicit typing
- Duplicate logic across components
- Forget to update barrel exports

## Testing & Validation
- Build with `npm run build` to catch TypeScript errors
- Test in browser at `http://localhost:3000`
- Verify mobile layout in simulated iPhone frame
- Check all language variants for text overflow

## Future Considerations
- Replace constants with API calls
- Add proper error handling and loading states
- Implement authentication backend
- Add offline support and caching
- Consider state management library for complex features

## AI Documentation Standards

### Summary Storage Location
All AI-generated documentation and summaries must be stored in the `ai_summaries/` folder at the project root. This includes:
- Refactoring summaries and analysis
- Component structure documentation  
- Before/after comparisons
- Quick reference guides
- Any other AI-generated .md files

**Example structure:**
```
ai_summaries/
├── REFACTORING.md
├── REFACTORING_SUMMARY.md
├── QUICK_REFERENCE.md
├── COMPONENT_STRUCTURE.md
├── BEFORE_AFTER.md
└── [new-ai-summary].md
```

### Documentation Guidelines
When creating AI summaries:
- Use descriptive filenames (e.g., `COMPONENT_REFACTORING.md`, `ARCHITECTURE_ANALYSIS.md`)
- Include timestamps or version numbers when relevant
- Reference existing summaries to maintain consistency
- Focus on actionable insights for future development</content>
<parameter name="filePath">/home/ajayanto/projects/Hand2Hand Mobile App Prototype/.github/copilot-instructions.md