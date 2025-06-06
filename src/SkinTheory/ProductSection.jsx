import React, { useState, useEffect } from "react";
import product1 from "../assets/Blush.png";
import product2 from "../assets/lipgloss.png";
import product3 from "../assets/Lipmask.png";

const ProductSection = () => {
  const defaultProducts = [
    {
      id: "default-1",
      image: product1,
      title: "Rosy Blush",
      description:
        "Add a natural, radiant flush to your cheeks with our velvety blush. Contour makeup is a powerful tool to sculpt and define your facial features, enhancing your natural bone structure. Whether you're a beginner or a seasoned makeup enthusiast, there's a range of products to suit your needs.",
    },
    {
      id: "default-2",
      image: product2,
      title: "Shine Lip Gloss",
      description:
        "Get glossy, plump lips with our hydrating and non-sticky lip gloss. Delivers a radiant finish and fuller-looking lips with a smooth, non-sticky texture. Formulated with high-quality, hydrating ingredients to keep lips moisturized all day. Combines the shine of a gloss with the comfort of a balm.",
    },
    {
      id: "default-3",
      image: product3,
      title: "Overnight Lip Mask",
      description:
        "Repair and moisturize your lips while you sleep with our nourishing lip mask. Use nightly for very dry or chapped lips. Combine with daytime lip balm for round-the-clock hydration. Keep it by your bed so you never forget to apply it before sleeping.",
    },
  ];

  const [products, setProducts] = useState(defaultProducts);
  const [expanded, setExpanded] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item) => ({
            id: item.id || item._id,
            image: item.image,
            title: item.title || item.name,
            description: item.description || item.tip,
          }));

          const combined = [...defaultProducts];
          formatted.forEach((fetchedProd) => {
            const exists = combined.some(
              (prod) =>
                prod.id === fetchedProd.id ||
                prod.title.toLowerCase() === fetchedProd.title.toLowerCase()
            );
            if (!exists) {
              combined.push(fetchedProd);
            }
          });

          setProducts(combined);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, image } = newProduct;

    if (!title || !description || !image) return;

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image }),
      });

      if (!res.ok) throw new Error("Failed to add product");

      const saved = await res.json();
      const formatted = {
        id: saved.id || saved._id,
        image: saved.image,
        title: saved.title || saved.name,
        description: saved.description || saved.tip,
      };

      setProducts((prev) => {
        const exists = prev.some(
          (prod) =>
            prod.id === formatted.id ||
            prod.title.toLowerCase() === formatted.title.toLowerCase()
        );
        if (exists) return prev;
        return [...prev, formatted];
      });

      setNewProduct({ title: "", description: "", image: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Error adding product. Please try again.");
    }
  };

  const visibleProducts = showAll ? products : products.slice(0, 6);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-20 bg-pink-100 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-semibold text-pink-800">Top Beauty Picks</h2>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="text-pink-700 font-medium underline hover:text-pink-900"
        >
          Your Favorite Beauty Product
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-4 text-pink-700">
            Share Your Product
          </h3>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={newProduct.title}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={newProduct.description}
            onChange={handleChange}
            className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <label className="block mb-3">
            <span className="text-gray-700">Product Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full mt-1"
            />
          </label>
          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded mb-3"
            />
          )}
          <button
            type="submit"
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Submit
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {visibleProducts
          .filter((product) => product.title && product.description && product.image)
          .map((product) => {
            const isExpanded = expanded[product.id];
            const description = product.description || "";
            const shortText =
              description.length > 120
                ? description.slice(0, 120) + "..."
                : description;

            return (
              <div
                key={product.id}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col bg-white"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 sm:h-56 md:h-60 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-pink-700 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isExpanded ? description : shortText}{" "}
                    {description.length > 120 && (
                      <button
                        onClick={() => toggleExpand(product.id)}
                        className="text-pink-600 font-semibold inline-block"
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      {products.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-pink-700 font-semibold underline hover:text-pink-900"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
