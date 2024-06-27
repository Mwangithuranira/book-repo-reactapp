import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function useLocalStorage<T>(key: string, initialValue: T, apiEndpoint: string): [T, Dispatch<SetStateAction<T>>, boolean, string | null] {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isSyncing, setIsSyncing] = useState<boolean>(false);


    // Fetch initial data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`);
                }
                const data = await response.json();
                setStoredValue(data);
                window.localStorage.setItem(key, JSON.stringify(data));
            } catch (error) {
                console.error('Fetch error:', error);
               
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
            console.error('LocalStorage error:', error);
        }
    }, [key, storedValue]);

    // Debounced sync with backend
    useEffect(() => {
        const handler = setTimeout(async () => {
            setIsSyncing(true);
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(storedValue),
                });
                if (!response.ok) {
                    throw new Error(`Failed to sync with backend: ${response.status}`);
                }
                setIsSyncing(false);
            } catch (error) {
                console.error('Sync error:', error);
                
                setIsSyncing(false);
            }
        }, 1000); // Adjust the debounce delay as needed

        return () => clearTimeout(handler);
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

    return [storedValue, setStoredValue, isSyncing, window.localStorage.getItem(key)];
}

export default useLocalStorage;
