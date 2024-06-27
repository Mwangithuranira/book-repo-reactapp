import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function useLocalStorage<T>(key: string, initialValue: T, apiEndpoint: string): [T, Dispatch<SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Fetch initial data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setStoredValue(data);
                window.localStorage.setItem(key, JSON.stringify(data));
            } catch (error) {
                console.log(error);
                // Fallback to localStorage if the backend fetch fails
                const item = window.localStorage.getItem(key);
                if (item) {
                    setStoredValue(JSON.parse(item));
                }
            }
        };

        fetchData();
    }, [apiEndpoint, key]);

    // Sync with localStorage
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.log(error);
        }
    }, [key, storedValue]);

    // Sync with backend
    useEffect(() => {
        const syncWithBackend = async () => {
            try {
                await fetch(apiEndpoint, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(storedValue),
                });
            } catch (error) {
                console.log(error);
            }
        };

        syncWithBackend();
    }, [apiEndpoint, storedValue]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key) {
                setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, initialValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
