import React, { useState } from "react";
import bgImage from "../assets/bg.png"; // Ensure this path is valid

const SubmitTipSection = () => {
  const [name, setName] = useState("");
  const [tip, setTip] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("tip", tip);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/tips", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit");

      await res.json();
      alert(`Thank you for your tip${name ? `, ${name}` : ""}!`);
      setName("");
      setTip("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to submit tip. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <section
      className="min-h-screen py-10 px-4 sm:px-6 md:px-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 shadow-lg p-6 sm:p-8 rounded-2xl max-w-lg mx-auto backdrop-blur-md animate-fadeIn">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-800 text-center">
          Share a Beauty Tip
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          {/* Name Field */}
          <div>
            <label className="block text-pink-700 font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              placeholder="e.g., Aloe Gel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-pink-50 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Tip Field */}
          <div>
            <label className="block text-pink-700 font-medium mb-1">
              Your Tip
            </label>
            <textarea
              placeholder="Short tip..."
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="w-full p-3 bg-pink-50 border border-pink-200 h-28 resize-none rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-pink-700 font-medium mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-pink-200 bg-pink-50 rounded-lg"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 w-full max-h-48 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Submit Tip
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SubmitTipSection;
