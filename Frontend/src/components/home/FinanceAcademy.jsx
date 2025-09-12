

import React from "react";
import IntroImage from "../../assets/Money1.jpg";
import toast, { Toaster } from "react-hot-toast";

const FinanceAcademy = () => {
  const handleModuleClick = (name) => {
    toast(`${name} — Coming Soon!`, {
      icon: "📢",
    });
  };

  return (
    <div className="pb-24 px-4 font-sans text-gray-800 py-4">

      {/* Toaster for Notifications */}
      <Toaster position="bottom-center" />

      {/* Greeting and Intro */}
      <section className="mt-4">
        <h2 className="text-xl font-semibold my-4">Hello User!</h2>
        <div className="bg-orange-100 p-4 rounded-xl mt-2">
          <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
            Introducing
          </span>
          <div className="flex mt-3 space-x-3">
            <div className="flex-shrink-0">
              <img
                src={IntroImage}
                alt="intro"
                className="h-[12vh] w-[8vw] object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">InvestCly video series</h3>
              <p className="text-sm mt-1">
                Introducing InvestCly video series for an absolute beginner. We
                picked essential topics to help you get started.
              </p>
              <a
                href="#"
                className="text-orange-600 underline text-sm mt-2 inline-block"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Start Reading */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold">Start reading</h3>
        <div className="bg-green-100 p-4 rounded-xl mt-2 space-y-1">
          <p className="text-xs text-[#666666] font-semibold">Module:</p>
          <p className="text-lg font-bold">
            01:{" "}
            <span className="text-sm font-normal">Stock Market Basics</span>
          </p>
          <div className="flex justify-between">
            <p className="text-sm text-[#666666]">
              Level:{" "}
              <strong className="text-black ml-1 font-medium">Beginner</strong>
            </p>
            <p className="text-sm text-[#666666]">
              Chapter:{" "}
              <strong className="text-black ml-1 text-lg font-medium">
                01
              </strong>
            </p>
          </div>
          <div className="w-full h-2 bg-gray-300 rounded-full mt-2">
            <div className="h-full w-1/5 bg-green-600 rounded-full"></div>
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-sm">
            Let's begin this journey by setting your daily goal
          </p>
          <button className="mt-2 bg-orange-600 text-white text-sm px-4 py-1 rounded-full">
            Set a goal
          </button>
        </div>
      </section>

      {/* Quick Quiz */}
      <section className="bg-red-100 p-4 rounded-xl mt-6">
        <h3 className="text-lg font-semibold">Quick Quiz</h3>
        <p className="text-sm mt-1">
          Want to quickly know how much you understand Capital Markets? Take
          this quick quiz.
        </p>
        <button className="mt-2 bg-indigo-600 text-white text-sm px-4 py-1 rounded-full">
          Start now
        </button>
      </section>

      {/* Innerworth Section */}
      <section className="flex items-center space-x-2 mt-6 p-3 border rounded-xl">
        <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
          New
        </span>
        <p className="font-semibold">Innerworth</p>
        <p className="text-sm text-gray-500">Mind over markets series</p>
      </section>

      {/* Modules */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Modules</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Stock Market Basics",
            "Technical Analysis",
            "Futures Trading",
            "Options Trading",
            "Loan Knowledge",
            "Investment",
          ].map((name, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg text-center font-semibold cursor-pointer transition hover:scale-105 ${
                [
                  "bg-green-200",
                  "bg-pink-200",
                  "bg-yellow-200",
                  "bg-purple-200",
                  "bg-sky-200",
                  "bg-rose-100",
                ][idx]
              }`}
              onClick={() => handleModuleClick(name)}
            >
              {String(idx + 1).padStart(2, "0")}
              <br />
              {name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FinanceAcademy;
