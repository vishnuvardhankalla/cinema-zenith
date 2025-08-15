import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Hook to sync state with URL query parameters
 * Automatically updates URL when state changes and vice versa
 */
export function useQueryState<T>(
  key: string,
  defaultValue: T,
  serialize: (value: T) => string = String,
  deserialize: (value: string) => T = (value) => value as unknown as T
): [T, (value: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL or default
  const [state, setState] = useState<T>(() => {
    const paramValue = searchParams.get(key);
    if (paramValue !== null) {
      try {
        return deserialize(paramValue);
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  });

  // Update URL when state changes
  const updateState = useCallback((value: T) => {
    setState(value);
    
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (value === defaultValue || value === '' || (Array.isArray(value) && value.length === 0)) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, serialize(value));
    }
    
    setSearchParams(newSearchParams, { replace: true });
  }, [key, defaultValue, serialize, searchParams, setSearchParams]);

  // Update state when URL changes (browser back/forward)
  useEffect(() => {
    const paramValue = searchParams.get(key);
    if (paramValue !== null) {
      try {
        const newValue = deserialize(paramValue);
        setState(newValue);
      } catch {
        setState(defaultValue);
      }
    } else {
      setState(defaultValue);
    }
  }, [searchParams, key, defaultValue, deserialize]);

  return [state, updateState];
}

// Helper for array values (e.g., selected filters)
export function useQueryArrayState(
  key: string,
  defaultValue: string[] = []
): [string[], (value: string[]) => void] {
  return useQueryState(
    key,
    defaultValue,
    (value) => value.join(','),
    (value) => value ? value.split(',').filter(Boolean) : []
  );
}

// Helper for date values
export function useQueryDateState(
  key: string,
  defaultValue?: string
): [string | undefined, (value: string | undefined) => void] {
  return useQueryState(
    key,
    defaultValue,
    (value) => value || '',
    (value) => value || undefined
  );
}