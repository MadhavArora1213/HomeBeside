"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";

interface TestimonialFaqCard {
  id: number;
  question: string;
  quote: string;
  author: string;
  category: string;
  avatarBg: string;
  avatarImg: string;
}

export default function PaperNotesFaqSection() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start at 3/8 like the reference image (0-indexed: 2)

  const cards: TestimonialFaqCard[] = [
    {
      id: 1,
      question: "Is HomeBeside an emergency service?",
      quote:
        "After my mother's surgery, I expected weeks of stressful coordination. HomeBeside showed me exactly who was assigned, what was happening, and sent photo reports. For medical emergencies we dial 112, but for reliable daily care, they made a stressful situation feel manageable.",
      author: "Emily Carter",
      category: "Parent check-in",
      avatarBg: "bg-[#a7f3d0]",
      avatarImg:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 2,
      question: "How are helpers screened & verified?",
      quote:
        "We had water damage at home and an elderly father alone with no idea where to start. HomeBeside companions were fully police-verified with Aadhaar biometric KYC. They kept everything organized in one place and gave us clear updates without constantly chasing someone for answers.",
      author: "Daniel Brooks",
      category: "Home damage & assistance",
      avatarBg: "bg-[#bbf7d0]",
      avatarImg:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 3,
      question: "How does transparent upfront pricing work?",
      quote:
        "My flight disruption turned into a messy trip while my mother had a clinic visit scheduled. With HomeBeside, I could book verified accompaniment for ₹499 upfront, track progress, and get help when I needed it. The whole process felt much calmer.",
      author: "Sophie Bennett",
      category: "Travel & clinic escort",
      avatarBg: "bg-[#e9d5ff]",
      avatarImg:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 4,
      question: "Where is the pilot service currently active?",
      quote:
        "Living in Bengaluru while my parents are in Ludhiana was constant stress. HomeBeside's local zone coordinators in Model Town and Sarabha Nagar gave our family total peace of mind with scheduled daily companion visits.",
      author: "Jaspreet Kaur",
      category: "Ludhiana pilot hub",
      avatarBg: "bg-[#fed7aa]",
      avatarImg:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 5,
      question: "Can helpers accompany elders to hospital queues?",
      quote:
        "Getting doctor tokens and waiting 3 hours at Dayanand Medical College was exhausting for my retired father. The HomeBeside companion sat with him, held reports, and ensured he got home safely.",
      author: "Vikram Malhotra",
      category: "Hospital accompaniment",
      avatarBg: "bg-[#fbcfe8]",
      avatarImg:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 6,
      question: "How quickly can a companion arrive?",
      quote:
        "When my father ran out of critical prescription medicines in BRS Nagar, the coordinator dispatched a companion within 2 hours. Fast, respectful, and verified.",
      author: "Harpreet Singh",
      category: "Chemist & medicine run",
      avatarBg: "bg-[#bae6fd]",
      avatarImg:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 7,
      question: "Can we request the same familiar helper?",
      quote:
        "Elders don't like new faces every week. HomeBeside matches the same warm helper for our weekly visits, so my mother treats her like family.",
      author: "Amanat Grewal",
      category: "Care continuity",
      avatarBg: "bg-[#ddd6fe]",
      avatarImg:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: 8,
      question: "Is HomeBeside an open gig app?",
      quote:
        "No anonymous gig workers. Every helper is directly trained and accountable to HomeBeside coordinators. That makes all the difference when letting someone into your parents' home.",
      author: "Col. H.S. Bains (Retd.)",
      category: "Safety & trust standards",
      avatarBg: "bg-[#fed7aa]",
      avatarImg:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    },
  ];

  const totalCards = cards.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalCards - 1 ? 0 : prev + 1));
  };

  // Get 3 visible cards in circular fashion
  const visibleCards = [
    cards[currentIndex % totalCards],
    cards[(currentIndex + 1) % totalCards],
    cards[(currentIndex + 2) % totalCards],
  ];

  return (
    <section id="faqs" className="relative w-full overflow-hidden bg-brand-surface py-20 lg:py-28 text-brand-ink">
      <div className="mx-auto w-full max-w-7xl px-[clamp(1rem,4vw,2.5rem)]">
        {/* ══════════════════════════════════════════════════════
            1. TYPOGRAPHIC HEADER (Exact match to Reference Image)
        ══════════════════════════════════════════════════════ */}
        <div className="mx-auto max-w-3xl text-center mb-14 lg:mb-18">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-brand-primary">
            What people{" "}
            <span className="block text-brand-secondary italic font-serif">
              remember most.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[54ch] text-sm sm:text-base leading-relaxed text-brand-muted font-sans">
            Real stories from people who needed clarity, support, and a smoother way through their care.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════
            2. THREE VISIBLE CARDS (Exact match to Reference Image)
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {visibleCards.map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className="flex flex-col justify-between rounded-3xl bg-[#f6f5f0] p-7 sm:p-8 transition-all duration-300 hover:shadow-lg border border-brand-accent/40 min-h-[300px]"
            >
              {/* Quote / Narrative Text */}
              <div>
                <p className="text-xs sm:text-[13px] leading-relaxed text-brand-ink/80 font-sans">
                  {card.quote}
                </p>
              </div>

              {/* Bottom Author Section (Exact match to Reference Image) */}
              <div className="mt-8 pt-4 flex items-center gap-3">
                {/* Avatar with tinted background pill */}
                <div
                  className={`relative h-9 w-9 rounded-full ${card.avatarBg} overflow-hidden shrink-0 flex items-center justify-center p-0.5`}
                >
                  <img
                    src={card.avatarImg}
                    alt={card.author}
                    className="h-full w-full rounded-full object-cover grayscale contrast-125"
                    loading="lazy"
                  />
                </div>

                {/* Name & Subtitle Tag */}
                <div className="leading-tight">
                  <h4 className="font-heading text-sm font-bold text-brand-primary">
                    {card.author}
                  </h4>
                  <p className="text-[11px] text-brand-muted font-sans mt-0.5">
                    {card.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            3. CAROUSEL CONTROLS (← 3/8 →) (Exact match)
        ══════════════════════════════════════════════════════ */}
        <div className="mt-12 flex items-center justify-center gap-4 select-none">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Previous story"
            className="flex h-8 w-8 items-center justify-center text-brand-muted hover:text-brand-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          {/* Current / Total Indicator */}
          <div className="font-sans text-sm font-medium tracking-wide text-brand-muted">
            <span className="font-bold text-brand-secondary text-base">
              {((currentIndex % totalCards) + 1)}
            </span>
            <span>/{totalCards}</span>
          </div>

          {/* Right Arrow Button (Green/Teal Circle Button from Image) */}
          <button
            onClick={handleNext}
            type="button"
            aria-label="Next story"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2dd4bf] text-stone-950 shadow-md hover:bg-[#14b8a6] hover:scale-105 transition-all cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════
            4. BOTTOM CIRCULAR AVATAR CLUSTER + FOCAL CTA BUTTON
            (Exact signature layout from Reference Image)
        ══════════════════════════════════════════════════════ */}
        <div className="mt-16 sm:mt-20 relative w-full overflow-x-auto pb-4 pt-2 flex items-end justify-center no-scrollbar">
          <div className="flex items-end justify-center -space-x-3 sm:-space-x-4 md:-space-x-5 min-w-[720px] px-4">

            {/* Bubble 1: Large Peach Circle (Man with beanie) */}
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-full overflow-hidden bg-[#fed7aa] shrink-0 shadow-sm transition-transform hover:scale-105 hover:z-20">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
                alt="Community member"
                className="h-full w-full object-cover grayscale contrast-125 mix-blend-multiply"
                loading="lazy"
              />
            </div>

            {/* Bubble 2: Medium Cyan Circle (Woman looking sideways) */}
            <div className="relative h-20 w-20 sm:h-28 sm:w-28 rounded-full overflow-hidden bg-[#a5f3fc] shrink-0 shadow-sm -mb-2 transition-transform hover:scale-105 hover:z-20">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt="Companion"
                className="h-full w-full object-cover grayscale contrast-125 mix-blend-multiply"
                loading="lazy"
              />
            </div>

            {/* Bubble 3: Small Mint Circle (Smiling young man) */}
            <div className="relative h-14 w-14 sm:h-18 sm:w-18 rounded-full overflow-hidden bg-[#bbf7d0] shrink-0 shadow-xs -mb-1 transition-transform hover:scale-105 hover:z-20">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Care assistant"
                className="h-full w-full object-cover grayscale contrast-125 mix-blend-multiply"
                loading="lazy"
              />
            </div>

            {/* Bubble 4: Large Pink Circle (Man in cap) */}
            <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden bg-[#fbcfe8] shrink-0 shadow-sm z-10 transition-transform hover:scale-105 hover:z-20">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
                alt="Care coordinator"
                className="h-full w-full object-cover grayscale contrast-125 mix-blend-multiply"
                loading="lazy"
              />
            </div>

            {/* Bubble 5: Small Lilac Circle (Woman top right of cap) */}
            <div className="relative h-14 w-14 sm:h-18 sm:w-18 rounded-full overflow-hidden bg-[#bfdbfe] shrink-0 shadow-xs self-start mt-2 transition-transform hover:scale-105 hover:z-20">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
                alt="Support helper"
                className="h-full w-full object-cover grayscale contrast-125 mix-blend-multiply"
                loading="lazy"
              />
            </div>

            {/* Bubble 6: Medium Mint Circle (Smiling woman) */}
            <div className="relative h-20 w-20 sm:h-28 sm:w-28 rounded-full overflow-hidden bg-[#bbf7d0] shrink-0 shadow-sm -mb-2 transition-transform hover:scale-105 hover:z-20">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                alt="Family member"
                className="h-full w-full object-cover grayscale contrast-125 mix-blend-multiply"
                loading="lazy"
              />
            </div>

            {/* Bubble 7: FOCAL CIRCLE CTA BUTTON ("Start a Claim" in Image -> "Start a Visit" in Brand Theme) */}
            <Link
              href="/contact"
              className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white flex flex-col items-center justify-center p-3 text-center font-bold text-xs sm:text-sm shadow-xl z-20 transition-transform duration-300 hover:scale-105 cursor-pointer shrink-0 -mb-1"
            >
              <span className="font-sans tracking-tight">Start a Visit</span>
            </Link>

            {/* Bubble 8: Large Lavender Circle (Woman looking up thoughtfully) */}
            <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden bg-[#e9d5ff] shrink-0 shadow-sm z-10 transition-transform hover:scale-105 hover:z-20">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                alt="Family daughter"
                className="h-full w-full object-cover grayscale contrast-125 mix-blend-multiply"
                loading="lazy"
              />
            </div>

            {/* Bubble 9: Medium Peach Circle (Young woman on far right) */}
            <div className="relative h-24 w-24 sm:h-30 sm:w-30 rounded-full overflow-hidden bg-[#fed7aa] shrink-0 shadow-sm -mb-1 transition-transform hover:scale-105 hover:z-20">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80"
                alt="Elder companion"
                className="h-full w-full object-cover grayscale contrast-125 mix-blend-multiply"
                loading="lazy"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
