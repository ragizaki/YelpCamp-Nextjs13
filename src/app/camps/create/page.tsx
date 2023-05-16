"use client";

import { useState } from "react";

export default function CreateCampsite() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    city: "",
    country: "",
    price: 0,
  });

  const createCampsite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/camps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });
    const data = await res.json();
    setFormData({
      name: "",
      description: "",
      city: "",
      country: "",
      price: 0,
    });
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={createCampsite}>
      <input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <input
        placeholder="City"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />
      <input
        placeholder="Country"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price/night"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.valueAsNumber })
        }
      />
      <button type="submit">Create Campsite</button>
    </form>
  );
}
