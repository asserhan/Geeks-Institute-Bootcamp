import React, { useState } from "react";
import FormComponent from "./FormComponent";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    destination: "",
    lactoseFree: false
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();

    for (let key in formData) {
      if (typeof formData[key] === "boolean" && formData[key]) {
        query.append(key, "on");
      } else if (typeof formData[key] !== "boolean") {
        query.append(key, formData[key]);
      }
    }

    window.location.href = "http://localhost:3000/?" + query.toString();
  };

  return (
    <FormComponent
      data={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default App;
