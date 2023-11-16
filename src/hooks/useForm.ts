import { useState } from "react";
import { IValues } from "../utils/types";

export function useForm(inputValues:IValues) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
      console.log(values)
    };
   
    return {values, handleChange, setValues};
  }