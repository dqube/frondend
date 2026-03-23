"use client";

import { useState } from "react";
import { Plus, Edit2, Check } from "lucide-react";
import {
  Stepper,
  StepperNav,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperPanel,
  StepperContent,
} from "@modernstores/ui";

// ─── Mock order items ────────────────────────────────────────────────────────
const ORDER_ITEMS = [
  { id: "1", name: "Leafy Romaine Mixed Lettuce", price: 5.0, emoji: "🥬" },
  { id: "2", name: "Gourmet Garden™ Lightly Dried Cilantro", price: 7.92, emoji: "🌿" },
  { id: "3", name: "Freshness Guaranteed Mango Spears", price: 7.98, emoji: "🥭" },
];

const ADDRESSES = [
  { id: "home", label: "Home", detail: "No. 12, Jalan Ampang, KLCC, Kuala Lumpur 50450" },
  { id: "office", label: "Office", detail: "80 Windsor Park Rd, Singapore 574175" },
];

const STEPS = [
  { id: 1, label: "Delivery Address" },
  { id: 2, label: "Delivery Schedule" },
  { id: 3, label: "Contact Number" },
  { id: 4, label: "Payment Option" },
  { id: 5, label: "Delivery Instructions (optional)" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function NextStepButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end pt-2">
      <button
        onClick={onClick}
        className="bg-primary text-primary-foreground px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
      >
        Next Steps
      </button>
    </div>
  );
}

function DeliveryAddressStep({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState("home");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ADDRESSES.map((addr) => (
          <button
            key={addr.id}
            onClick={() => setSelected(addr.id)}
            className={`relative text-left p-5 rounded-xl border-2 transition-colors ${
              selected === addr.id
                ? "border-primary bg-background"
                : "border-border bg-card/60 hover:border-primary/40"
            }`}
          >
            <p className="font-semibold text-sm mb-2">{addr.label}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{addr.detail}</p>
            {selected !== addr.id && (
              <span className="absolute top-4 right-4 text-primary">
                <Edit2 className="h-4 w-4" />
              </span>
            )}
          </button>
        ))}

        <button className="flex items-center gap-2 p-5 rounded-xl border-2 border-dashed border-primary/50 bg-card/40 hover:border-primary hover:bg-card/60 transition-colors text-sm text-primary">
          <Plus className="h-4 w-4" />
          Add Address
        </button>
      </div>

      <NextStepButton onClick={onNext} />
    </div>
  );
}

function DeliveryScheduleStep({ onNext }: { onNext: () => void }) {
  const [slot, setSlot] = useState("morning");
  const slots = [
    { id: "morning", label: "Morning", time: "8:00 AM – 12:00 PM" },
    { id: "afternoon", label: "Afternoon", time: "12:00 PM – 5:00 PM" },
    { id: "evening", label: "Evening", time: "5:00 PM – 9:00 PM" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {slots.map((s) => (
          <button
            key={s.id}
            onClick={() => setSlot(s.id)}
            className={`text-left p-4 rounded-xl border-2 transition-colors ${
              slot === s.id ? "border-primary bg-background" : "border-border bg-card/60 hover:border-primary/40"
            }`}
          >
            <p className="font-semibold text-sm">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.time}</p>
          </button>
        ))}
      </div>
      <NextStepButton onClick={onNext} />
    </div>
  );
}

function ContactNumberStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <select className="border border-border rounded-xl px-3 py-2.5 text-sm bg-card/60 backdrop-blur-sm outline-none focus:border-primary">
          <option>+1</option>
          <option>+44</option>
          <option>+61</option>
          <option>+65</option>
        </select>
        <input
          type="tel"
          placeholder="Phone number"
          className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm bg-card/60 backdrop-blur-sm outline-none focus:border-primary placeholder:text-muted-foreground"
        />
      </div>
      <NextStepButton onClick={onNext} />
    </div>
  );
}

function PaymentOptionStep({ onNext }: { onNext: () => void }) {
  const [method, setMethod] = useState("card");
  const methods = [
    { id: "card", label: "Credit / Debit Card", emoji: "💳" },
    { id: "cash", label: "Cash on Delivery", emoji: "💵" },
    { id: "wallet", label: "Digital Wallet", emoji: "📱" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors text-left ${
              method === m.id ? "border-primary bg-background" : "border-border bg-card/60 hover:border-primary/40"
            }`}
          >
            <span className="text-xl">{m.emoji}</span>
            <span className="text-sm font-medium">{m.label}</span>
          </button>
        ))}
      </div>
      <NextStepButton onClick={onNext} />
    </div>
  );
}

function DeliveryInstructionsStep() {
  return (
    <div className="space-y-4">
      <textarea
        rows={3}
        placeholder="Any special delivery instructions? (e.g. leave at door, ring bell)"
        className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-card/60 backdrop-blur-sm outline-none focus:border-primary placeholder:text-muted-foreground resize-none"
      />
      <div className="flex justify-end">
        <button className="bg-primary text-primary-foreground px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
          Place Order
        </button>
      </div>
    </div>
  );
}

// ─── Order Summary ────────────────────────────────────────────────────────────

function OrderSummary() {
  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm sticky top-24">
      <div className="flex justify-between border-b border-border/50 pb-3 mb-4">
        <span className="text-sm font-semibold text-muted-foreground">Product</span>
        <span className="text-sm font-semibold text-muted-foreground">Subtotal</span>
      </div>

      <div className="space-y-4 mb-5">
        {ORDER_ITEMS.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <span className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
              {item.emoji}
            </span>
            <p className="flex-1 text-sm text-foreground leading-snug">{item.name}</p>
            <span className="text-sm font-semibold shrink-0">RM {item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-border/50 pt-4 space-y-3 mb-5">
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Subtotal</span>
          <span className="font-medium">RM {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Shipping</span>
          <span className="font-medium">{shipping === 0 ? "RM 0.00" : `RM ${(shipping as number).toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm font-bold border-t border-border/50 pt-3">
          <span>Total</span>
          <span>RM {total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
        Order Now
      </button>

      <p className="text-xs text-muted-foreground mt-5 leading-relaxed">
        By placing your order, you agree to be bound by the ModernStores{" "}
        <a href="/terms" className="text-primary underline">Terms of Service</a>{" "}and{" "}
        <a href="/privacy" className="text-primary underline">Privacy</a>. Your
        credit/debit card data will not be saved.
      </p>
      <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
        A bag fee may be added to your final total if required by law or the retailer.
        The fee will be visible on your receipt after delivery.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(1);

  function completeStep(step: number) {
    setActiveStep(step + 1);
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Steps — left column */}
        <div className="flex-1">
          <Stepper
            orientation="vertical"
            className="flex flex-row gap-6"
            value={activeStep}
            onValueChange={setActiveStep}
            indicators={{
              completed: <Check className="size-3.5" />,
            }}
          >
            {/* Vertical nav — step indicators + titles */}
            <StepperNav className="shrink-0">
              {STEPS.map((step, index) => (
                <StepperItem
                  key={step.id}
                  step={step.id}
                  className="items-start"
                >
                  <StepperTrigger className="gap-3 w-full">
                    <StepperIndicator className="size-8 text-sm shrink-0">
                      {step.id}
                    </StepperIndicator>
                    <div className="text-left">
                      <StepperTitle className="text-sm font-semibold">
                        {step.label}
                      </StepperTitle>
                    </div>
                  </StepperTrigger>
                  {index < STEPS.length - 1 && (
                    <div className="pl-[15px]">
                      <StepperSeparator />
                    </div>
                  )}
                </StepperItem>
              ))}
            </StepperNav>

            {/* Step content panel — right of the nav */}
            <StepperPanel className="flex-1 min-w-0">
              {STEPS.map((step) => (
                <StepperContent key={step.id} value={step.id}>
                  <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm shadow-sm p-6">
                    {step.id === 1 && <DeliveryAddressStep onNext={() => completeStep(1)} />}
                    {step.id === 2 && <DeliveryScheduleStep onNext={() => completeStep(2)} />}
                    {step.id === 3 && <ContactNumberStep onNext={() => completeStep(3)} />}
                    {step.id === 4 && <PaymentOptionStep onNext={() => completeStep(4)} />}
                    {step.id === 5 && <DeliveryInstructionsStep />}
                  </div>
                </StepperContent>
              ))}
            </StepperPanel>
          </Stepper>
        </div>

        {/* Order summary — right column */}
        <div className="w-full lg:w-96 shrink-0">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
