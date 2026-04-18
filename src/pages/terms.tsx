import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Use — The Blue Duck Foundation</title>
        <meta name="description" content="Terms of use for The Blue Duck Foundation website and services." />
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
                  Terms of <em className="italic">Use</em>
                </h1>
                <p className="text-sm text-slate-400 font-light mb-16">Last updated: April 17, 2026</p>

                <div className="space-y-12 text-[15px] leading-[1.9] text-slate-500 font-light">

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">1. Agreement to terms</h2>
                    <p>By accessing or using the website at theblueduck.org, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use this website. These terms apply to all visitors, donors, members, and others who access or use our services.</p>
                    <p className="mt-4">The Blue Duck Foundation ("Foundation," "we," "us," or "our") is a federally recognized 501(c)(3) public charity incorporated in Texas. EIN: 41-4361489.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">2. Use of this website</h2>
                    <p>You may use this website for lawful purposes only. You agree not to:</p>
                    <ul className="mt-4 space-y-2 pl-4">
                      {[
                        "Use the site in any way that violates applicable local, national, or international law",
                        "Transmit any unsolicited or unauthorized advertising or promotional material",
                        "Attempt to gain unauthorized access to any part of the website or its infrastructure",
                        "Interfere with or disrupt the integrity or performance of the website",
                        "Impersonate the Foundation or misrepresent your affiliation with us",
                        "Use the site to collect personal information about other users without their consent",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">3. Donations and payments</h2>
                    <p>All donations made through this website are processed securely by Stripe, Inc. By making a donation, you confirm that:</p>
                    <ul className="mt-4 space-y-2 pl-4">
                      {[
                        "You are authorized to use the payment method provided",
                        "The information you provide is accurate and complete",
                        "You understand that donations are generally non-refundable except at the Foundation's sole discretion",
                        "Your contribution is a voluntary gift to a 501(c)(3) organization and is tax-deductible to the extent permitted by law",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4">Tax receipts will be issued for all donations. The Blue Duck Foundation is recognized as a public charity under IRC Section 170(b)(1)(A)(vi). Contributions are deductible under IRC Sections 170, 2055, 2106, and 2522.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">4. Membership</h2>
                    <p>Membership subscriptions are processed through Stripe and renew automatically on a monthly or annual basis. By enrolling in a membership, you authorize The Blue Duck Foundation to charge your payment method on a recurring basis at the selected interval. You may cancel your membership at any time by contacting us at <a href="mailto:info@theblueduck.org" className="text-slate-900 underline underline-offset-2">info@theblueduck.org</a>. Cancellations take effect at the end of the current billing period. Annual memberships are non-refundable but may be upgraded at any time.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">5. Intellectual property</h2>
                    <p>All content on this website — including text, graphics, logos, images, and the Foundation's name and marks — is the property of The Blue Duck Foundation or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without express written permission.</p>
                    <p className="mt-4">The Conservation Watch news section links to third-party content. We do not claim ownership of external articles and link to original sources. All third-party content remains the property of its respective owners.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">6. Third-party links</h2>
                    <p>This website may contain links to third-party websites. These links are provided for your convenience and information only. The Blue Duck Foundation does not endorse and is not responsible for the content, privacy practices, or terms of any third-party sites. Accessing third-party sites is at your own risk.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">7. Disclaimer of warranties</h2>
                    <p>This website is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. The Blue Duck Foundation does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. We reserve the right to modify or discontinue the website at any time without notice.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">8. Limitation of liability</h2>
                    <p>To the fullest extent permitted by law, The Blue Duck Foundation shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of — or inability to use — this website or its services. Our total liability for any claim arising from these terms shall not exceed the amount you paid to us in the twelve months preceding the claim.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">9. Governing law</h2>
                    <p>These Terms of Use are governed by the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Collin County, Texas.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">10. Changes to these terms</h2>
                    <p>We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to this page with an updated date. Your continued use of the website after any changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically.</p>
                  </div>

                  <div>
                    <h2 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-4">11. Contact</h2>
                    <p>Questions about these Terms of Use? Contact us:</p>
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
