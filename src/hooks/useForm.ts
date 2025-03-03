import { useState } from "react";

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return { values, handleChange };
}
