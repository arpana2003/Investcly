import React from "react";

export default function Privacy() {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <div className="bg-orange-500 text-white py-16 px-8 text-center">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          At <span className="font-semibold">InvestCly</span>, your privacy is our top priority. 
          This policy explains how we collect, use, and protect your personal information.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We collect personal details such as your name, email address, and financial 
            preferences when you interact with our platform. Additionally, we gather 
            anonymous data like device information and usage patterns to improve our services.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Your information is used to provide personalized investment recommendations, 
            improve platform functionality, ensure security, and comply with legal requirements. 
            We do not sell your data to third parties.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            3. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement strong encryption, multi-factor authentication, and regular 
            security audits to ensure your information remains safe. However, no system 
            is completely immune from risks, so we encourage responsible online practices.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            4. Cookies & Tracking
          </h2>
          <p className="text-gray-700 leading-relaxed">
            InvestCly uses cookies and similar technologies to enhance your browsing 
            experience, remember preferences, and provide relevant recommendations. 
            You can manage cookie preferences in your browser settings.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            5. Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, update, or request deletion of your personal 
            information. For any privacy-related concerns, please contact us at 
            <span className="font-semibold text-orange-500"> support@investcly.com</span>.
          </p>
        </section>
      </div>

    </div>
  );
}
