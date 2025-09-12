import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // nice icons

const API = `${import.meta.env.VITE_BACKEND_URL}/api/stories`;

const StorySlider = ({ isDarkMode }) => {
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 2.5;

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch(() => setStories([]));
  }, []);

  const totalCards = stories.length;

  const goToIndex = (index) => {
    if (index < 0) index = 0;
    if (index > totalCards - Math.floor(visibleCards))
      index = totalCards - Math.floor(visibleCards);
    setCurrentIndex(index);
  };

  const goPrev = () => goToIndex(currentIndex - 1);
  const goNext = () => goToIndex(currentIndex + 1);

  return (
    <div className="w-full px-4 py-6 select-none relative">
      <h2 className="text-2xl font-bold text-[#f77331] text-center mb-8 md:max-xl:mb-3">
        Short Stories
      </h2>

      <div className="overflow-hidden relative group">
        {/* Arrows */}
        {currentIndex > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
        )}
        {currentIndex < totalCards - Math.floor(visibleCards) && (
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        )}

        {/* Slider */}
        <div
    className="flex transition-transform duration-500"
    style={{
      transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
    }}
  >

          {stories.map((story) => (
            <div
              key={story._id}
              className="w-[18rem] min-w-[18rem] h-[40vh] px-2 "
            >
              <div
                className="relative w-full h-full cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front */}
                  <div
                    className="absolute w-full h-full rounded-lg shadow-lg overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                    }}
                  >
                    <div
                      className="w-full h-full relative"
                      style={{
                        backgroundImage: `url(${
                          story.slides?.[0]?.imageUrl ||
                          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Title */}
                      <div className="absolute top-2 left-2 right-2 p-3 bg-black/40 rounded">
                        <h3 className="text-lg font-bold line-clamp-2 text-white">
                          {story.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute w-full h-full rounded-lg shadow-lg overflow-auto p-4 bg-black"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backdropFilter: "blur(4px)",
                      color: "white",
                    }}
                  >
                    <h3 className="font-bold text-lg mb-2">{story.title}</h3>
                    <p className="text-sm mb-2 font-semibold">
                      Author: {story.authorName}
                    </p>
                    {story.slides?.map(
                      (slide, i) =>
                        slide.text && (
                          <p key={i} className="text-sm mb-2">
                            {slide.text}
                          </p>
                        )
                    )}
                  </div>
                </div>

                {/* Hover flip */}
                <style>
                  {`
                    div.relative.w-full.h-full.cursor-pointer:hover > div {
                      transform: rotateY(180deg);
                    }
                  `}
                </style>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalCards - Math.floor(visibleCards) + 1 }).map(
          (_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentIndex ? "bg-orange-400" : "bg-gray-300"
              }`}
              onClick={() => goToIndex(i)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default StorySlider;

// import React, { useEffect, useState } from "react";

// const API = `${import.meta.env.VITE_BACKEND_URL}/api/stories`;

// const StorySlider = ({ isDarkMode }) => {
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const visibleCards = 2.5;

//   useEffect(() => {
//     fetch(API)
//       .then((res) => res.json())
//       .then((data) => setStories(data))
//       .catch(() => setStories([]));
//   }, []);

//   const totalCards = stories.length;

//   const goToIndex = (index) => {
//     if (index < 0) index = 0;
//     if (index > totalCards - Math.floor(visibleCards))
//       index = totalCards - Math.floor(visibleCards);
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="w-full px-4 py-6 select-none">
//       <h2 className="text-2xl font-bold text-[#f77331] text-center mb-8 md:max-xl:mb-3">
//         Short Stories
//       </h2>

//       <div className="overflow-hidden">
//         <div
//           className="flex transition-transform duration-500"
//           style={{
//             transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
//           }}
//         >
//           {stories.map((story) => (
//             <div
//               key={story._id}
//               className="w-[18rem] min-w-[18rem] h-[40vh] px-2 "
//             >
//               <div
//                 className="relative w-full h-full cursor-pointer"
//                 style={{ perspective: "1000px" }}
//               >
//                 <div
//                   className="relative w-full h-full transition-transform duration-700"
//                   style={{ transformStyle: "preserve-3d" }}
//                 >
//                   {/* Front */}
//                   <div
//                     className="absolute w-full h-full rounded-lg shadow-lg overflow-hidden"
//                     style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
//                   >
//                     <div
//                       className="w-full h-full relative"
//                       style={{
//                         backgroundImage: `url(${
//                           story.slides?.[0]?.imageUrl ||
//                           "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
//                         })`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                       }}
//                     >
//                       {/* Title & Tags */}
//                       <div className="absolute top-2 left-2 right-2 p-3 bg-black/40 bg-opacity-10 rounded">
//                         <h3 className="text-lg font-bold line-clamp-2 text-white">
//                           {story.title}
//                         </h3>
//                         <div className="flex flex-wrap gap-1 mt-2">
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Back */}
//                   <div
//                     className="absolute w-full h-full rounded-lg shadow-lg overflow-auto p-4 bg-black"
//                     style={{
//                       backfaceVisibility: "hidden",
//                       transform: "rotateY(180deg)",

//                       backdropFilter: "blur(4px)",
//                       color: "white",
//                     }}
//                   >
//                     <h3 className="font-bold text-lg mb-2">{story.title}</h3>

//                     <p className="text-sm mb-2 font-semibold">
//                       Author: {story.authorName}
//                     </p>

//                     {story.slides?.map(
//                       (slide, i) =>
//                         slide.text && (
//                           <p key={i} className="text-sm mb-2">
//                             {slide.text}
//                           </p>
//                         )
//                     )}
//                   </div>
//                 </div>

//                 {/* Hover flip */}
//                 <style>
//                   {`
//                     div.relative.w-full.h-full.cursor-pointer:hover > div {
//                       transform: rotateY(180deg);
//                     }
//                   `}
//                 </style>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Dots */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {Array.from({ length: totalCards - Math.floor(visibleCards) + 1 }).map(
//           (_, i) => (
//             <button
//               key={i}
//               className={`w-3 h-3 rounded-full ${
//                 i === currentIndex ? "bg-orange-400" : "bg-gray-300"
//               }`}
//               onClick={() => goToIndex(i)}
//             />
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default StorySlider;
