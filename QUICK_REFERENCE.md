# Quick Reference Guide

## 📁 New File Structure

```
src/
├── types/index.ts           → All TypeScript interfaces
├── constants/
│   ├── donations.ts         → Donation sample data
│   ├── requests.ts          → Request sample data
│   └── index.ts             → Barrel export
├── hooks/
│   ├── useChat.ts           → Chat functionality hook
│   ├── useForm.ts           → Form state management hook
│   └── index.ts             → Barrel export
└── components/
    ├── DonationPage.tsx     → Orchestrator (refactored)
    ├── DonationList.tsx     → List display (new)
    ├── DonationForm.tsx     → Form component (new)
    ├── RequestPage.tsx      → Orchestrator (refactored)
    ├── RequestList.tsx      → List display (new)
    ├── RequestForm.tsx      → Form component (new)
    ├── ChatBox.tsx          → Chat UI (refactored)
    └── ProfilePage.tsx      → Profile settings (refactored)
```

## 🎣 Custom Hooks

### useForm Hook
```typescript
import { useForm } from '../hooks/useForm';

const MyComponent = () => {
  const { 
    values,        // Current form values
    handleChange,  // Handler for input changes
    hasChanges,    // Boolean - has form been modified?
    reset,         // Reset to original values
    save          // Mark current values as original
  } = useForm({
    field1: 'initial value',
    field2: ''
  });

  return (
    <div>
      <input 
        value={values.field1} 
        onChange={handleChange('field1')} 
      />
      {hasChanges && <button onClick={save}>Save</button>}
    </div>
  );
};
```

### useChat Hook
```typescript
import { useChat } from '../hooks/useChat';

const MyChat = () => {
  const {
    messages,      // Array of chat messages
    newMessage,    // Current input value
    setNewMessage, // Update input value
    handleSend    // Send message function
  } = useChat();

  return (
    <div>
      {messages.map(msg => <div key={msg.id}>{msg.text}</div>)}
      <input 
        value={newMessage} 
        onChange={e => setNewMessage(e.target.value)} 
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
```

## 📘 Type Definitions

### Import Types
```typescript
import { 
  Donation,      // Donation item interface
  Request,       // Request item interface
  Message,       // Chat message interface
  Notification,  // Notification interface
  UserProfile,   // User profile interface
  Tab,           // 'home' | 'donation' | 'request' | 'map'
  SettingsScreen // 'profile' | 'notif-prefs' | etc.
} from '../types';
```

### Use Types
```typescript
// Function parameters
const processDonation = (item: Donation) => {
  console.log(item.title, item.donor);
};

// Component props
interface MyProps {
  items: Donation[];
  onSelect: (item: Donation) => void;
}

// Union types
type Item = Donation | Request;
const handleItem = (item: Item) => {
  if ('donor' in item) {
    // It's a donation
  } else {
    // It's a request
  }
};
```

## 📦 Constants

### Import Constants
```typescript
import { DONATIONS, REQUESTS } from '../constants';

// Use in components
const MyComponent = () => {
  return (
    <div>
      {DONATIONS.map(d => <div key={d.id}>{d.title}</div>)}
    </div>
  );
};
```

### Replace with API Later
```typescript
// Before (using constants)
import { DONATIONS } from '../constants';

// After (using API)
const [donations, setDonations] = useState([]);
useEffect(() => {
  fetch('/api/donations')
    .then(res => res.json())
    .then(setDonations);
}, []);
```

## 🧩 Component Patterns

### Container/Orchestrator Pattern
```typescript
// DonationPage.tsx example
const DonationPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  if (selectedItem) return <ChatBox item={selectedItem} />;
  if (showForm) return <DonationForm onClose={() => setShowForm(false)} />;
  
  return <DonationList onSelect={setSelectedItem} />;
};
```

### List Component Pattern
```typescript
// DonationList.tsx example
interface Props {
  donations: Donation[];
  onAccept: (d: Donation) => void;
}

const DonationList = ({ donations, onAccept }: Props) => {
  return (
    <div>
      {donations.map(d => (
        <Card key={d.id}>
          <h3>{d.title}</h3>
          <button onClick={() => onAccept(d)}>Accept</button>
        </Card>
      ))}
    </div>
  );
};
```

### Form Component Pattern
```typescript
// DonationForm.tsx example
interface Props {
  onClose: () => void;
  onSubmit?: (data: FormData) => void;
}

const DonationForm = ({ onClose, onSubmit }: Props) => {
  const { values, handleChange } = useForm({
    title: '',
    description: ''
  });

  const handleSubmit = () => {
    onSubmit?.(values);
    onClose();
  };

  return (
    <form>
      <input value={values.title} onChange={handleChange('title')} />
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};
```

## 🔄 Common Tasks

### Adding a New Form
1. Create component file
2. Import `useForm` hook
3. Define initial values
4. Use `handleChange` for inputs
5. Check `hasChanges` before saving

```typescript
const MyForm = () => {
  const { values, handleChange, hasChanges } = useForm({
    name: '',
    email: ''
  });

  return (
    <>
      <input value={values.name} onChange={handleChange('name')} />
      <input value={values.email} onChange={handleChange('email')} />
      {hasChanges && <button>Save</button>}
    </>
  );
};
```

### Adding a New List View
1. Define interface for props
2. Accept array and callbacks
3. Map over items
4. Use proper TypeScript types

```typescript
interface Props {
  items: MyItem[];
  onSelect: (item: MyItem) => void;
}

const MyList = ({ items, onSelect }: Props) => (
  <div>
    {items.map(item => (
      <div key={item.id} onClick={() => onSelect(item)}>
        {item.title}
      </div>
    ))}
  </div>
);
```

### Adding a Chat Feature
1. Import `useChat` hook
2. Destructure needed values
3. Connect to UI elements

```typescript
const MyChatComponent = () => {
  const { messages, newMessage, setNewMessage, handleSend } = useChat();
  
  return (
    <div>
      <div>{messages.map(m => <p key={m.id}>{m.text}</p>)}</div>
      <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};
```

## 🎨 Best Practices

### ✅ Do
- Import types from `../types`
- Use hooks for state management
- Keep components focused (single responsibility)
- Use TypeScript for all new code
- Follow existing patterns
- Export interfaces with components

### ❌ Don't
- Hardcode data in components (use constants)
- Mix UI and business logic
- Use `any` type
- Create components > 200 lines
- Duplicate logic across components
- Forget to type props

## 🧪 Testing

### Test a Hook
```typescript
import { renderHook, act } from '@testing-library/react';
import { useForm } from '../hooks/useForm';

test('detects changes', () => {
  const { result } = renderHook(() => useForm({ name: '' }));
  
  act(() => {
    result.current.handleChange('name')({ 
      target: { value: 'test' } 
    });
  });
  
  expect(result.current.hasChanges).toBe(true);
});
```

### Test a Component
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import DonationList from './DonationList';

test('renders donations', () => {
  const mockDonations = [{ id: '1', title: 'Test' }];
  const mockOnAccept = jest.fn();
  
  render(
    <DonationList 
      donations={mockDonations} 
      onAccept={mockOnAccept} 
    />
  );
  
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

## 📚 Resources

- **REFACTORING.md** - Comprehensive documentation
- **REFACTORING_SUMMARY.md** - Quick overview
- **BEFORE_AFTER.md** - Visual comparison
- **This file** - Quick reference

## 🆘 Troubleshooting

### Type Errors
```typescript
// ❌ Wrong
const item: any = donation;

// ✅ Correct
import { Donation } from '../types';
const item: Donation = donation;
```

### Hook Errors
```typescript
// ❌ Wrong - hooks must be at top level
if (condition) {
  const form = useForm({ ... });
}

// ✅ Correct
const form = useForm({ ... });
if (condition) {
  // use form values
}
```

### Import Errors
```typescript
// ❌ Wrong
import { DONATIONS } from '../constants/donations';

// ✅ Correct - use barrel exports
import { DONATIONS } from '../constants';
```

## 💡 Tips

1. **Start small**: Use hooks in new components first
2. **Follow patterns**: Look at refactored components as examples
3. **Type everything**: Let TypeScript help you catch errors
4. **Keep focused**: One component = one responsibility
5. **Reuse**: Check if a hook exists before creating new logic

---

**Happy Coding! 🚀**
