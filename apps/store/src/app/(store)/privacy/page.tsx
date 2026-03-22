import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
      </div>
      <p className="text-xs text-muted-foreground">Last updated: January 1, 2025</p>

      <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl shadow-sm p-6 md:p-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">1. Introduction</h2>
          <p>ModernStores Ltd (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and share your information when you use our website, mobile app, and services.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account information:</strong> Name, email address, phone number, delivery addresses</li>
            <li><strong>Payment data:</strong> Card details (processed securely via our PCI-DSS compliant payment provider)</li>
            <li><strong>Order history:</strong> Products purchased, delivery preferences, reviews</li>
            <li><strong>Usage data:</strong> Pages visited, search queries, device information, IP address</li>
            <li><strong>Communications:</strong> Messages you send to our support team</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To process and deliver your orders</li>
            <li>To manage your account and preferences</li>
            <li>To send order updates and delivery notifications</li>
            <li>To personalise your shopping experience and product recommendations</li>
            <li>To process payments securely</li>
            <li>To send marketing communications (with your consent)</li>
            <li>To improve our services and website functionality</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">4. Data Sharing</h2>
          <p>We do not sell your personal data. We share information only with:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Delivery partners (to fulfil your orders)</li>
            <li>Payment processors (to handle transactions securely)</li>
            <li>Analytics providers (anonymised data to improve our service)</li>
            <li>Legal authorities (when required by law)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">5. Data Retention</h2>
          <p>We retain your personal data for as long as your account is active, plus 3 years for legal and accounting purposes. You can request deletion of your data at any time.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">6. Your Rights</h2>
          <p>Under GDPR, you have the right to access, correct, delete, or port your personal data. You can also object to processing or withdraw consent. Contact us at privacy@modernstores.com to exercise these rights.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">7. Cookies</h2>
          <p>We use essential cookies for site functionality and optional cookies for analytics and personalisation. You can manage cookie preferences in your browser settings.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">8. Contact</h2>
          <p>For privacy-related questions, contact our Data Protection Officer at privacy@modernstores.com or write to: ModernStores Ltd, 42 Green Lane, London, E1 6AN.</p>
        </section>
      </div>
    </div>
  );
}
