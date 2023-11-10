import {useState} from "react";

export const useLocalStorage = (key, initialState) => {
    const [preventValue, setPreventValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialState;
        } catch (err) {
            return initialState;
        }
    });

    const setValue = (value) => {
        try {
            setPreventValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.log(err);
        }
    };

    return [preventValue, setValue];
};