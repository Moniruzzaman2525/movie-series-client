"use client";

import { useState, ChangeEvent, FormEvent } from "react";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Try again later.");
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="pt-20 container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Support Center</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Help Topics</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <strong>Account:</strong> Reset password, update email,
              subscriptions
            </li>
            <li>
              <strong>Streaming:</strong> Buffering, playback issues, quality
            </li>
            <li>
              <strong>Payments:</strong> Billing issues, refunds
            </li>
            <li>
              <strong>Content:</strong> Missing episodes, suggestions
            </li>
          </ul>
        </section>

        <section className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none"
              />
            </div>
            <div className="flex justify-end items-end">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded "
              >
                Send Message
              </button>
            </div>
            {status && <p className="mt-2 text-sm text-gray-400">{status}</p>}
          </form>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
