import { useState } from "react";

export default function useForm(initialState = {}) {
    const [formData, setFormData] = useState(initialState);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return { formData, handleInputChange };
}
