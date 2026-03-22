import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Terms & Conditions</h1>
      </div>
      <p className="text-xs text-muted-foreground">Last updated: January 1, 2025</p>

      <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-6 md:p-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">1. Agreement to Terms</h2>
          <p>By accessing or using the ModernStores website and services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">2. Account Registration</h2>
          <p>You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">3. Orders & Pricing</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>All prices are displayed in GBP and include VAT where applicable</li>
            <li>We reserve the right to amend prices at any time before an order is confirmed</li>
            <li>An order is confirmed when we send you an order confirmation email</li>
            <li>We reserve the right to cancel orders due to pricing errors, stock issues, or suspected fraud</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">4. Delivery</h2>
          <p>We aim to deliver within the selected time slot. Delivery times are estimates and not guaranteed. We are not liable for delays caused by circumstances beyond our control. Someone must be available to accept the delivery at the specified address.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">5. Substitutions</h2>
          <p>If an ordered item is unavailable, we may substitute it with a comparable product of equal or greater value. You may opt out of substitutions in your account settings. Substituted items can be returned for a full refund.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">6. Returns & Refunds</h2>
          <p>You may return eligible items within 7 days of delivery. Perishable goods must be reported within 24 hours. Refunds are processed to your original payment method within 3–5 business days.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">7. Intellectual Property</h2>
          <p>All content on our platform — including text, images, logos, and software — is owned by ModernStores Ltd and protected by copyright law. You may not reproduce, distribute, or create derivative works without our written permission.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">8. Limitation of Liability</h2>
          <p>ModernStores Ltd shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the relevant order.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">9. Governing Law</h2>
          <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the English courts.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">10. Contact</h2>
          <p>For questions about these terms, contact us at legal@modernstores.com or write to: ModernStores Ltd, 42 Green Lane, London, E1 6AN.</p>
        </section>
      </div>
    </div>
  );
}
