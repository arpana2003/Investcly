import InvestmentImg from "../assets/InvestmentImg.jpg";
import Money1 from "../assets/Money1.jpg";

function About() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gray-50 flex h-[75vh] w-[84.5vw] mt-6 pr-10 shadow-md rounded-lg max-sm:mb-10">
        <div className="h-[65vh] w-[50vw] px-10 mt-6 space-y-8 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-orange-500 leading-snug max-sm:text-2xl">
            InvestCly guides over 1,70,000 learners and investors worldwide
          </h1>
          <p className="text-lg font-medium text-gray-600 leading-8">
            The all-in-one investment platform to <span className="text-orange-500 font-semibold">learn</span>, 
            <span className="text-orange-500 font-semibold"> explore</span>, and 
            <span className="text-orange-500 font-semibold"> stay updated</span> with the world of finance.
          </p>
        </div>

        <div
          className="h-[60vh] w-[35vw] rounded-lg bg-cover bg-center relative mt-8 shadow-lg"
          style={{ backgroundImage: `url(${Money1})` }}
        ></div>
      </div>

      {/* Quote Section */}
      <div className="py-10 flex justify-center bg-white ">
        <p className="text-xl font-bold font-serif text-gray-800">
          <span className="text-6xl text-black">“</span>
          <span className="text-3xl text-orange-600 font-semibold italic">
            Knowledge is the best investment,
            <br />
            and its returns last a lifetime.
          </span>
          <span className="text-6xl text-black">”</span>
        </p>
      </div>

      {/* Story Section */}
      <div className="flex py-10 px-6 rounded-lg shadow-md mx-6 max-sm:flex-col">
        <div
          className="h-[60vh] w-[30vw] rounded-lg bg-cover bg-center shadow-lg max-sm:w-full"
          style={{ backgroundImage: `url(${InvestmentImg})` }}
        ></div>

        <div className="p-6 h-[60vh] w-[60vw] rounded-lg text-gray-700 px-10 py-6 shadow-inner space-y-6 border border-gray-100 ml-6 bg-white max-sm:w-full">
          <h1 className="text-center text-3xl font-bold text-orange-500 font-serif">
            Our Story
          </h1>
          <p className="font-medium leading-relaxed">
            Founded with a vision to simplify investing,{" "}
            <span className="font-semibold text-orange-600">InvestCly</span> began as a small
            initiative to help people understand finance better. 
            Today, it has grown into a trusted platform where individuals 
            <span className="font-semibold"> learn about investments</span>, 
            <span className="font-semibold"> read insightful blogs</span>, 
            and <span className="font-semibold"> stay updated with trending financial news</span>. 
            At InvestCly, we believe that informed decisions 
            create stronger investors and brighter futures.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
