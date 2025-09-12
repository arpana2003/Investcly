import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="bg-orange-500 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold">Terms of Service</h1>
          <p className="mt-2 text-lg opacity-90">Legal terms governing the use of InvestCly</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col lg:flex-row gap-10">
        {/* Left Sidebar */}
        <nav className="hidden lg:block w-1/4 space-y-4 sticky top-20 self-start">
          {[
            "Acceptance of Terms",
            "User Responsibilities",
            "Intellectual Property",
            "Liability Limitations",
            "Changes to Terms",
            "Contact Info",
          ].map((item, idx) => (
            <a
              key={idx}
              href={`#sec-${idx}`}
              className="block hover:text-blue-600"
            >
              {`${idx + 1}. ${item}`}
            </a>
          ))}
        </nav>

        {/* Main Content */}
        <article className="w-full lg:w-3/4 space-y-8">
          {[
            {
              id: 0,
              title: "1. Acceptance of Terms",
              content:
                "By accessing or using InvestCly, you agree to be bound by these Terms of Service. If you do not agree with these terms, please refrain from using our platform.",
            },
            {
              id: 1,
              title: "2. User Responsibilities",
              content:
                "You are responsible for keeping your account secure and using the platform lawfully. Any misuse or fraudulent activity may result in termination of access.",
            },
            {
              id: 2,
              title: "3. Intellectual Property",
              content:
                "All content, trademarks, and data on InvestCly belong to us or our licensors. Unauthorized use, reproduction, or distribution is prohibited.",
            },
            {
              id: 3,
              title: "4. Limitation of Liability",
              content:
                "InvestCly is not liable for any indirect or consequential damages arising from your use of the platform. Use at your own risk.",
            },
            {
              id: 4,
              title: "5. Modifications to Terms",
              content:
                "We may update these terms at any time. Continued use of our services constitutes acceptance of the updated terms.",
            },
            {
              id: 5,
              title: "6. Contact Information",
              content:
                "For any questions regarding these Terms, contact us at ",
              contact: "support@investcly.com",
            },
          ].map(({ id, title, content, contact }) => (
            <section id={`sec-${id}`} key={id} className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {content}
                {contact && (
                  <a href={`mailto:${contact}`} className="text-blue-600 underline">
                    {contact}
                  </a>
                )}
              </p>
            </section>
          ))}
        </article>
      </div>

     
    </div>
  );
}
