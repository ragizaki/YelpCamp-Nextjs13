"use client";

import { useState } from "react";
import { type Metadata } from "next";
import ImageUpload from "./ImageUpload";
import Input from "./Input";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "YelpCamp - Create Campsite",
  description: "Create a new campsite with YelpCamp!",
};

export default function CreateCampsite() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    city: "",
    country: "",
    price: 0,
    photo: "",
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
      photo: "",
    });
    router.push(`/camps/${data.id}`);
  };

  return (
    <form
      className="flex flex-col space-y-5 max-w-3xl m-auto md:border-2 md:rounded-lg p-6"
      onSubmit={createCampsite}
    >
      <Input
        id="name"
        label="Name"
        placeholder="Windsor Place"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        id="description"
        label="Description"
        placeholder="A campsite in the woods with a 10km hike"
        value={formData.description}
        onChange={(e) => {
          setFormData({ ...formData, description: e.target.value });
        }}
      />
      <Input
        id="city"
        label="city"
        placeholder="Windsor"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />
      <Input
        id="country"
        label="Country"
        placeholder="Canada"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
      />
      <Input
        id="price"
        label="Price"
        type="number"
        pattern="[0-9]*"
        placeholder="Price/night"
        value={formData.price}
        onChange={(e) => {
          setFormData({
            ...formData,
            price: e.target.validity.valid ? parseInt(e.target.value) : 0,
          });
        }}
      />
      <ImageUpload setPhoto={setFormData} />
      <button
        type="submit"
        className="px-4 py-2 text-white font-medium leading-6 bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50 w-full"
        disabled={Object.values(formData).some((item) => !!!item)}
      >
        Create Campsite
      </button>
    </form>
  );
}
