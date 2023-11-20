import {useState} from "react";
import { IValues } from "../utils/types";

export const useLocalStorage = (key:string, initialState:IValues) => {
    const [preventValue, setPreventValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialState;
        } catch (err) {
            return initialState;
        }
    });

    const setValue = (value:IValues) => {
        try {
            setPreventValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.log(err);
        }
    };

    return [preventValue, setValue];
};