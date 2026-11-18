import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  // One state object holds all three controlled inputs
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  // Update the matching key using each input's `name` attribute
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // POST the new plant to the backend, then update state in the parent
  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        image: formData.image,
        price: formData.price,
      }),
    })
      .then((r) => r.json())
      .then((newPlant) => {
        onAddPlant(newPlant); // add the saved plant to the list
        setFormData({ name: "", image: "", price: "" }); // clear the form
      });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;