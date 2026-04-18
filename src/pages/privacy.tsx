import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy — The Blue Duck Foundation</title>
        <meta name="description" content="Privacy policy for The Blue Duck Foundation, a 501(c)(3) public charity. EIN 41-4361489." />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-white font-['Jost',sans-serif]">
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="py-20 lg:py-28 max-w-3xl">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-6 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Legal</span>
                </div>
                <h1 className="font-['Cormorant_Garamond'] text-6xl font-light leading-[1.04] text-slate-900 mb-6">
                  Privacy <em className="italic">Policy</em>
                </h1>
                <p className="text-sm text-slate-400 font-light mb-16">Last updated: April 17, 2026</p>

                <div className="space-y-12 text-[15px] leading-[1.9] text-slate-500 font-light">

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">1. Who we are</h2>
                    <p>The Blue Duck Foundation is a federally recognized 501(c)(3) public charity incorporated in Texas. EIN: 41-4361489. Effective date of exemption: February 18, 2026. Our registered address is 1203 S College Street, McKinney, TX 75069. We operate globally with a focus on conservation, environmental science, cultural preservation, and humanitarian work.</p>
                    <p className="mt-4">You can reach us at <a href="mailto:info@theblueduck.org" className="text-slate-900 underline underline-offset-2">info@theblueduck.org</a>.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">2. Information we collect</h2>
                    <p>We collect information you voluntarily provide when you:</p>
                    <ul className="mt-4 space-y-2 pl-4">
                      {["Make a donation through our Stripe-powered checkout", "Sign up for membership", "Submit a contact or inquiry form", "Apply for the Forever 44 Scholarship", "Subscribe to Foundation updates"].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4">This may include your name, email address, mailing address, phone number, and payment information. We do not store payment card information — all payment processing is handled by Stripe, Inc. under their own privacy policy and PCI-DSS compliance standards.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">3. How we use your information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="mt-4 space-y-2 pl-4">
                      {[
                        "Process donations and issue official tax receipts required by IRS regulations",
                        "Fulfill membership benefits and communicate with members",
                        "Respond to inquiries, applications, and partnership requests",
                        "Send Foundation updates and program news (with your consent)",
                        "Comply with legal obligations as a federally recognized nonprofit",
                        "Maintain accurate donor records for annual 990 filings",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">4. How we share your information</h2>
                    <p>We do not sell, rent, or trade your personal information. We may share information with:</p>
                    <ul className="mt-4 space-y-2 pl-4">
                      {[
                        "Stripe, Inc. — to process payments securely",
                        "Resend — to deliver transactional emails including tax receipts",
                        "Vercel — our hosting provider, which processes data to serve this website",
                        "Legal authorities — if required by law or to protect the rights of the Foundation",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4">All third-party service providers are contractually required to protect your information and may only use it to perform services on our behalf.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">5. Donor privacy</h2>
                    <p>The Blue Duck Foundation respects the privacy of our donors. We do not publicly disclose individual donor identities or giving amounts without explicit written consent. Donor information is used solely to process contributions, issue tax receipts, and maintain required nonprofit records.</p>
                    <p className="mt-4">As a 501(c)(3) public charity, we are required to file an annual Form 990 with the IRS. Certain information in the 990 — including aggregate financial data — is publicly available. Individual donor information is not disclosed in the 990.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">6. Cookies and tracking</h2>
                    <p>Our website may use cookies and similar technologies to improve your browsing experience and analyze site traffic. We use analytics tools to understand how visitors interact with our site. You can control cookie settings through your browser preferences. Disabling cookies may affect some site functionality.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">7. Data security</h2>
                    <p>We implement industry-standard security measures to protect your information. Our site operates over HTTPS. Payment processing is handled entirely by Stripe — your card information never passes through or is stored on our servers. We regularly review our security practices to maintain appropriate safeguards.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">8. Your rights</h2>
                    <p>You have the right to:</p>
                    <ul className="mt-4 space-y-2 pl-4">
                      {[
                        "Request access to the personal information we hold about you",
                        "Request correction of inaccurate information",
                        "Request deletion of your information, subject to our legal obligations",
                        "Opt out of non-essential communications at any time",
                        "Request that we stop using your information for marketing purposes",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4">To exercise any of these rights, contact us at <a href="mailto:info@theblueduck.org" className="text-slate-900 underline underline-offset-2">info@theblueduck.org</a>.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">9. Children's privacy</h2>
                    <p>Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">10. Changes to this policy</h2>
                    <p>We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Continued use of our website or services after changes constitutes acceptance of the updated policy.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">11. Contact</h2>
                    <p>Questions about this Privacy Policy or our data practices? Contact us:</p>
                    <div className="mt-6 border border-slate-100 p-8">
                      <div className="space-y-2 text-sm">
                        {[
                          ["Organization", "The Blue Duck Foundation"],
                          ["EIN", "41-4361489"],
                          ["Address", "1203 S College Street, McKinney, TX 75069"],
                          ["Email", "info@theblueduck.org"],
                        ].map(([label, value], i) => (
                          <div key={i} className="flex gap-8 border-b border-slate-50 pb-2 last:border-0">
                            <span className="text-slate-400 w-28 flex-shrink-0">{label}</span>
                            <span className="text-slate-700">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
