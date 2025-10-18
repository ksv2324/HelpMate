import { useState, useEffect } from 'react';

interface FormState {
  [key: string]: string;
}

export const useForm = <T extends FormState>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);
  const [originalValues, setOriginalValues] = useState<T>(initialState);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const changed = Object.keys(values).some(
      key => values[key] !== originalValues[key]
    );
    setHasChanges(changed);
  }, [values, originalValues]);

  const handleChange = (field: keyof T) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const reset = () => {
    setValues(originalValues);
    setHasChanges(false);
  };

  const save = () => {
    setOriginalValues(values);
    setHasChanges(false);
  };

  return {
    values,
    setValues,
    handleChange,
    hasChanges,
    reset,
    save
  };
};
