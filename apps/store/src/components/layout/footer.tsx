"use client";

import Link from "next/link";
import { motion } from "motion/react";

const FOOTER_LINKS = [
  {
    title: "Shop",
    links: [
      { label: "Products", href: "/products" },
      { label: "Deals", href: "/deals" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Bundles", href: "/bundles" },
      { label: "Categories", href: "/categories/fruits" },
      { label: "Shops", href: "/shops" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Profile", href: "/profile" },
      { label: "Orders", href: "/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Addresses", href: "/addresses" },
      { label: "Rewards", href: "/rewards" },
      { label: "Subscriptions", href: "/subscriptions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Delivery Info", href: "/delivery" },
      { label: "Referral Program", href: "/referral" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Returns Policy", href: "/returns" },
    ],
  },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-t bg-muted/50 py-10"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ModernStores. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
