import React, { useEffect, useState } from "react";

const TipSection = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tips")
      .then((res) => res.json())
      .then((data) => setTips(data))
      .catch((err) => console.error("Error fetching tips:", err));
  }, []);

  return (
    <section className="py-10 px-4 sm:px-6 md:px-20 bg-pink-50 min-h-screen max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-pink-800 text-center md:text-left">
        Community Tips
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col bg-white"
          >
            {tip.image && (
              <img
                src={`http://localhost:5000${tip.image}`}
                alt={tip.name || "Tip Image"}
                className="w-full h-60 object-cover"
              />
            )}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-pink-700 mb-3">
                {tip.name || "Anonymous"}
              </h3>
              <p className="text-sm text-gray-600 flex-grow">{tip.tip}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TipSection;
