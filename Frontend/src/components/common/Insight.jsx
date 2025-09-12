import React, { useState, useEffect, useRef } from "react";

const Insight = ({ insight, onClose }) => {
  // Use slides from the selected insight
  const slides =
    insight.slides && insight.slides.length > 0
      ? insight.slides
      : [{ title: insight.title, imageUrl: insight.imageUrl }];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto slide change
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
    }

    return () => clearInterval(intervalRef.current); // cleanup on unmount
  }, [isPaused, slides.length]);

  // Stop auto when user interacts
  const handleUserInteraction = (index) => {
    setIsPaused(true);
    setCurrentSlide(index);
  };

  return (
    <div className="h-[60vh] w-[30vw] mx-auto relative pt-10 rounded-xl overflow-hidden max-sm:w-[80vw] max-sm:h-[40vh]">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl font-bold hover:text-orange-400 transition"
        >
          &times;
        </button>
      )}

      {/* Slide */}
      <div
        className="rounded-xl overflow-hidden relative h-full"
        style={{
          backgroundImage: `url(${slides[currentSlide].imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
          <h2 className="text-xl sm:text-2xl font-bold">
            {slides[currentSlide].title}
          </h2>
          <p className="text-sm sm:text-base mt-1">{insight.description}</p>
        </div>

        {/* Dots for slides */}
        <div className="flex justify-center mt-2 space-x-2 absolute bottom-2 w-full">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => handleUserInteraction(index)}
              className={`w-4 h-1 cursor-pointer transition-all ${
                currentSlide === index ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insight;
