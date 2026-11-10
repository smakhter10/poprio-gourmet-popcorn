import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import {
  WHATSAPP_NUMBER,
  SOCIAL_LINKS,
  getWhatsAppOrderUrl,
} from '../../config/site';
import { POPRIO_PRODUCTS } from '../../data/products';
import { ORIGIN_STORY_ASSETS } from '../../data/originStoryData';
import { usePoprioContent } from '../../context/PoprioContentContext';

gsap.registerPlugin(ScrollTrigger);

type InquiryTopicId = 'party-order' | 'wholesale' | 'corporate' | 'general';

interface InquiryTopic {
  id: InquiryTopicId;
  label: string;
  badgeColor: string;
}

const INQUIRY_TOPICS: readonly InquiryTopic[] = [
  {
    id: 'party-order',
    label: 'Party / Bulk Order',
    badgeColor: 'var(--color-butter-yellow)',
  },
  {
    id: 'wholesale',
    label: 'Retail / Stockist',
    badgeColor: 'var(--color-accent-pink)',
  },
  {
    id: 'corporate',
    label: 'Corporate Gifting',
    badgeColor: 'var(--color-caramel)',
  },
  {
    id: 'general',
    label: 'General Say Hello',
    badgeColor: 'var(--color-light-cocoa)',
  },
] as const;

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  accentColor: string;
}

const CONTACT_FAQS: readonly FaqItem[] = [
  {
    id: 'faq-delivery',
    question: 'HOW FAST DO YOU DELIVER ACROSS DHAKA?',
    answer:
      'We pop fresh daily in Dhaka! Standard orders placed via WhatsApp are dispatched within 24 hours so every pouch arrives at peak crunch.',
    accentColor: 'var(--color-butter-yellow)',
  },
  {
    id: 'faq-bulk',
    question: 'DO YOU TAKE CUSTOM PARTY, WEDDING OR CORPORATE ORDERS?',
    answer:
      'Absolutely! From movie nights and birthday parties to branded corporate gift boxes, we offer custom batch bundles across all 5 gourmet flavours.',
    accentColor: 'var(--color-accent-pink)',
  },
  {
    id: 'faq-freshness',
    question: 'HOW LONG DOES POPRIO STAY CRUNCHY AFTER OPENING?',
    answer:
      'Our heavy-duty barrier pouches lock in freshness. Once opened, seal it tight and enjoy within 5–7 days (though most pouches disappear in 10 minutes!).',
    accentColor: 'var(--color-light-cocoa)',
  },
  {
    id: 'faq-flavours',
    question: 'CAN I MIX AND MATCH ALL 5 FLAVOURS IN ONE ORDER?',
    answer:
      'Yes! You can mix Caramel, Cookies & Cream, Strawberry, Choco Hazelnut, and Chocolate Peanut Caramel in any combination or size when you message us.',
    accentColor: 'var(--color-caramel)',
  },
] as const;

function WhatsAppSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 shrink-0 fill-current"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8.01 12.27C8.14 12.44 9.76 14.94 12.25 16.01C14.34 16.92 14.76 16.74 15.21 16.7C15.66 16.66 16.68 16.09 16.89 15.51C17.1 14.92 17.1 14.42 17.04 14.31C16.97 14.2 16.81 14.14 16.56 14.01C16.31 13.89 15.09 13.28 14.87 13.2C14.64 13.11 14.48 13.07 14.31 13.32C14.15 13.57 13.67 14.14 13.53 14.31C13.38 14.48 13.24 14.5 12.99 14.37C12.74 14.25 11.94 13.98 11 13.14C10.26 12.48 9.77 11.67 9.62 11.42C9.48 11.17 9.6 11.04 9.73 10.92C9.84 10.81 9.98 10.62 10.1 10.48C10.23 10.33 10.27 10.23 10.35 10.06C10.43 9.89 10.39 9.75 10.33 9.62C10.27 9.5 9.77 8.28 9.56 7.78C9.36 7.29 9.16 7.35 9.01 7.34C8.86 7.33 8.7 7.33 8.53 7.33Z" />
    </svg>
  );
}

export const ContactPageSection: React.FC = () => {
  const { contact, meta, products } = usePoprioContent();
  const effectiveTopics = contact?.topics?.length ? contact.topics : INQUIRY_TOPICS;
  const effectiveFaqs = contact?.faqs?.length ? contact.faqs : CONTACT_FAQS;
  const effectiveProducts = products?.length ? products : POPRIO_PRODUCTS;
  const effectivePhone = contact?.phone || '+880 1705-117793';
  const effectiveEmail = contact?.email || 'HELLO@EATPOPRIO.COM';
  const effectiveLocation = contact?.location || 'DHAKA, BANGLADESH';
  const effectiveHours = contact?.hours || 'DAILY · 10 AM – 10 PM';
  const whatsappNumber = meta?.whatsappNumber || WHATSAPP_NUMBER;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const [selectedTopic, setSelectedTopic] = useState<string>(
    effectiveTopics[0]?.id || 'party-order'
  );
  const [selectedFlavourId, setSelectedFlavourId] = useState<string>(
    effectiveProducts[0]?.id || 'pkg-caramel'
  );
  const [senderName, setSenderName] = useState<string>('');
  const [senderPhone, setSenderPhone] = useState<string>('');
  const [senderEmail, setSenderEmail] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(effectiveFaqs[0]?.id || 'faq-delivery');

  const directWhatsAppUrl = getWhatsAppOrderUrl(
    whatsappNumber,
    "Hi POPRIO! I'm reaching out from your Contact page."
  );

  // Build dynamic WhatsApp message from form fields
  const buildFormWhatsAppUrl = () => {
    const topicLabel =
      effectiveTopics.find((t) => t.id === selectedTopic)?.label ?? 'Inquiry';
    const flavourTitle =
      effectiveProducts.find((p) => p.id === selectedFlavourId)?.title ??
      'All Flavours';

    const lines = [
      `Hi POPRIO! Here is my Crunch Gram:`,
      `• Topic: ${topicLabel}`,
      `• Favourite Flavour: ${flavourTitle}`,
      senderName.trim() ? `• Name: ${senderName.trim()}` : null,
      senderPhone.trim() ? `• Phone: ${senderPhone.trim()}` : null,
      senderEmail.trim() ? `• Email: ${senderEmail.trim()}` : null,
      messageText.trim() ? `• Message: ${messageText.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    return getWhatsAppOrderUrl(whatsappNumber, lines);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power3.out',
          }
        );
      }

      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 0.1,
            ease: 'back.out(1.25)',
          }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 0.16,
            ease: 'back.out(1.25)',
          }
        );
      }

      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: faqRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="contact-page-heading"
      className="relative z-20 w-full max-w-[84rem] mx-auto px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12 pb-16 sm:pb-24 text-cocoa-brown"
    >
      {/* =====================================================================
          1. COMIC SPLASH HEADER
          ===================================================================== */}
      <div
        ref={headerRef}
        className="w-full flex flex-col items-center text-center mb-10 sm:mb-14"
      >
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-butter-yellow border-[0.16rem] border-cocoa-brown shadow-[0.18rem_0.18rem_0_#4B1F0F]">
          <Sparkles className="w-3.5 h-3.5 text-red-orange stroke-[2.75]" />
          <span className="font-jakarta text-[0.6875rem] sm:text-xs font-extrabold tracking-[0.15em] text-cocoa-brown uppercase">
            {contact?.eyebrow || 'THE POPRIO HOTLINE ✦ DHAKA CRUNCH HQ'}
          </span>
        </div>

        {/* Main Headline */}
        <h1
          id="contact-page-heading"
          className="m-0 mt-4 font-hero text-3xl sm:text-5xl lg:text-[clamp(3.25rem,5.8vw,5.5rem)] leading-[1.0] tracking-[-0.02em] text-cocoa-brown uppercase"
        >
          {contact?.headline ? (
            contact.headline
          ) : (
            <>
              LET&apos;S TALK <span className="text-red-orange">POPCORN!</span>
            </>
          )}
        </h1>

        {/* Comic Inked Underline */}
        <svg
          aria-hidden="true"
          viewBox="0 0 340 16"
          className="w-44 sm:w-64 h-3.5 sm:h-4 mt-2 overflow-visible"
        >
          <path
            d="M6 11 Q 170 3 334 10"
            fill="none"
            stroke="#E0351B"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M18 14 Q 170 8 320 13"
            fill="none"
            stroke="#4B1F0F"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>

        {/* Supporting Subtitle */}
        <p className="m-0 mt-3.5 max-w-[38rem] font-jakarta text-sm sm:text-base lg:text-[1.125rem] font-bold leading-relaxed text-cocoa-brown/85">
          {contact?.subtitle ||
            'Planning a movie night, ordering bulk party pouches, looking to stock POPRIO at your store, or just want to say hello? Drop us a Crunch Gram below!'}
        </p>
      </div>

      {/* =====================================================================
          2. MAIN 2-COLUMN COMIC DISPATCH GRID
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
        {/* LEFT COLUMN (5 COLS): DIRECT WHATSAPP DISPATCH & INFO CARDS */}
        <div
          ref={leftColRef}
          className="lg:col-span-5 flex flex-col gap-5 sm:gap-6"
        >
          {/* Featured WhatsApp Fast-Track Card */}
          <div
            className="relative rounded-[1.5rem] bg-butter-yellow border-[0.24rem] border-solid border-cocoa-brown p-5 sm:p-6 overflow-hidden"
            style={{ boxShadow: '0.375rem 0.375rem 0 #4B1F0F' }}
          >
            {/* Subtle Halftone Background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.09]"
              style={{
                backgroundImage:
                  'radial-gradient(#4B1F0F 1.5px, transparent 1.5px)',
                backgroundSize: '16px 16px',
              }}
            />

            <div className="relative z-10 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-cream border-[0.14rem] border-cocoa-brown font-jakarta text-[0.65rem] font-extrabold tracking-[0.12em] text-red-orange uppercase shadow-[0.12rem_0.12rem_0_#4B1F0F]">
                <span className="w-2 h-2 rounded-full bg-red-orange animate-pulse" />
                FASTEST RESPONSE
              </span>

              <span className="font-comic text-sm tracking-wider text-cocoa-brown uppercase">
                INSTANT ORDERING
              </span>
            </div>

            <div className="relative z-10 mt-4 flex items-center gap-4">
              <div className="flex-1">
                <h2 className="m-0 font-hero text-xl sm:text-2xl leading-tight text-cocoa-brown uppercase">
                  DIRECT WHATSAPP HOTLINE
                </h2>
                <p className="m-0 mt-1.5 font-jakarta text-xs sm:text-sm font-bold text-cocoa-brown/85 leading-snug">
                  Skip the queue and chat directly with our Dhaka team for
                  instant flavour availability and same-day dispatch.
                </p>
                <p className="m-0 mt-2.5 inline-flex items-center gap-1.5 font-hero text-sm sm:text-base text-cocoa-brown">
                  <PhoneCall className="w-4 h-4 text-red-orange stroke-[2.75]" />
                  <span>{effectivePhone}</span>
                </p>
              </div>

              <img
                src={ORIGIN_STORY_ASSETS.scene5.mascotPointing.src}
                alt="POPRIO mascot pointing to WhatsApp hotline"
                className="w-24 sm:w-28 h-24 sm:h-28 object-contain shrink-0 drop-shadow-[0_6px_0_rgba(75,31,15,0.25)] select-none"
                draggable={false}
              />
            </div>

            {directWhatsAppUrl && (
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 mt-5 w-full py-3.5 px-5 rounded-full bg-red-orange text-warm-cream border-[0.2rem] border-cocoa-brown font-jakarta text-xs sm:text-sm font-extrabold tracking-[0.08em] uppercase inline-flex items-center justify-center gap-2.5 shadow-[0.25rem_0.25rem_0_#4B1F0F] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0.35rem_0.35rem_0_#4B1F0F] active:translate-y-0"
              >
                <WhatsAppSvg />
                <span>CHAT ON WHATSAPP NOW</span>
              </a>
            )}
          </div>

          {/* 3 Comic Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
            {/* Email Card */}
            <div
              className="rounded-[1.125rem] bg-accent-pink border-[0.2rem] border-cocoa-brown p-4 flex items-center gap-3.5"
              style={{ boxShadow: '0.25rem 0.25rem 0 #4B1F0F' }}
            >
              <div className="w-11 h-11 rounded-[0.75rem] bg-warm-cream border-[0.15rem] border-cocoa-brown flex items-center justify-center shrink-0 shadow-[0.125rem_0.125rem_0_#4B1F0F]">
                <Mail className="w-5 h-5 text-cocoa-brown stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <p className="m-0 font-jakarta text-[0.65rem] font-extrabold tracking-[0.12em] text-red-orange uppercase">
                  EMAIL &amp; PARTNERSHIPS
                </p>
                <p className="m-0 font-hero text-sm sm:text-base text-cocoa-brown truncate">
                  {effectiveEmail}
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div
              className="rounded-[1.125rem] bg-light-cocoa border-[0.2rem] border-cocoa-brown p-4 flex items-center gap-3.5"
              style={{ boxShadow: '0.25rem 0.25rem 0 #4B1F0F' }}
            >
              <div className="w-11 h-11 rounded-[0.75rem] bg-butter-yellow border-[0.15rem] border-cocoa-brown flex items-center justify-center shrink-0 shadow-[0.125rem_0.125rem_0_#4B1F0F]">
                <MapPin className="w-5 h-5 text-cocoa-brown stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <p className="m-0 font-jakarta text-[0.65rem] font-extrabold tracking-[0.12em] text-warm-purple uppercase">
                  KITCHEN &amp; DISPATCH HQ
                </p>
                <p className="m-0 font-hero text-sm sm:text-base text-cocoa-brown">
                  {effectiveLocation}
                </p>
              </div>
            </div>

            {/* Hours Card */}
            <div
              className="rounded-[1.125rem] bg-caramel border-[0.2rem] border-cocoa-brown p-4 flex items-center gap-3.5"
              style={{ boxShadow: '0.25rem 0.25rem 0 #4B1F0F' }}
            >
              <div className="w-11 h-11 rounded-[0.75rem] bg-warm-cream border-[0.15rem] border-cocoa-brown flex items-center justify-center shrink-0 shadow-[0.125rem_0.125rem_0_#4B1F0F]">
                <Clock className="w-5 h-5 text-cocoa-brown stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <p className="m-0 font-jakarta text-[0.65rem] font-extrabold tracking-[0.12em] text-warm-cream uppercase">
                  POPPING HOURS
                </p>
                <p className="m-0 font-hero text-sm sm:text-base text-cocoa-brown">
                  {effectiveHours}
                </p>
              </div>
            </div>
          </div>

          {/* Social Connect Bar (Title at top, Socials at bottom) */}
          <div
            className="rounded-[1.125rem] bg-warm-cream border-[0.2rem] border-cocoa-brown p-4 flex flex-col items-start gap-3"
            style={{ boxShadow: '0.25rem 0.25rem 0 #4B1F0F' }}
          >
            <span className="font-hero text-xs sm:text-sm uppercase tracking-wide text-cocoa-brown">
              JOIN THE CRUNCH CLUB:
            </span>
            <div className="flex flex-wrap items-center gap-2.5 w-full">
              {(meta?.socialLinks?.length ? meta.socialLinks : SOCIAL_LINKS).map((social) => {
                const href = /^https?:\/\//i.test(social.url)
                  ? social.url
                  : `https://${social.url}`;
                return (
                  <a
                    key={social.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-butter-yellow border-[0.14rem] border-cocoa-brown font-jakarta text-[0.6875rem] sm:text-xs font-extrabold uppercase text-cocoa-brown shadow-[0.12rem_0.12rem_0_#4B1F0F] hover:-translate-y-0.5 transition-transform"
                  >
                    {social.id}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (7 COLS): INTERACTIVE "SEND A CRUNCH GRAM" COMIC FORM */}
        <div ref={rightColRef} className="lg:col-span-7">
          <div
            className="rounded-[1.5rem] sm:rounded-[1.75rem] bg-warm-cream border-[0.25rem] border-solid border-cocoa-brown p-5 sm:p-8"
            style={{ boxShadow: '0.45rem 0.45rem 0 #4B1F0F' }}
          >
            {/* Form Header */}
            <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b-[0.1875rem] border-cocoa-brown">
              <div>
                <span className="font-jakarta text-[0.6875rem] font-extrabold tracking-[0.14em] text-red-orange uppercase">
                  OFFICIAL DISPATCH FORM
                </span>
                <h2 className="m-0 mt-0.5 font-hero text-xl sm:text-2xl lg:text-3xl text-cocoa-brown uppercase">
                  SEND A CRUNCH GRAM
                </h2>
              </div>

              <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-butter-yellow border-[0.15rem] border-cocoa-brown font-comic text-sm tracking-wider text-cocoa-brown uppercase shadow-[0.125rem_0.125rem_0_#4B1F0F]">
                POP! MAIL
              </span>
            </div>

            {isSubmitted ? (
              <div className="py-8 px-4 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-butter-yellow border-[0.2rem] border-cocoa-brown flex items-center justify-center shadow-[0.25rem_0.25rem_0_#4B1F0F] mb-4">
                  <CheckCircle2 className="w-9 h-9 text-red-orange stroke-[2.75]" />
                </div>

                <h3 className="m-0 font-hero text-2xl sm:text-3xl text-cocoa-brown uppercase">
                  POW! CRUNCH GRAM READY!
                </h3>
                <p className="m-0 mt-2 max-w-md font-jakarta text-sm sm:text-base font-bold text-cocoa-brown/85 leading-relaxed">
                  We&apos;ve packaged your inquiry! Click below to send it
                  straight to our Dhaka team on WhatsApp for an immediate reply,
                  or send another message.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
                  {buildFormWhatsAppUrl() && (
                    <a
                      href={buildFormWhatsAppUrl() ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-red-orange text-warm-cream border-[0.2rem] border-cocoa-brown font-jakarta text-xs sm:text-sm font-extrabold tracking-[0.08em] uppercase inline-flex items-center justify-center gap-2 shadow-[0.25rem_0.25rem_0_#4B1F0F] hover:-translate-y-0.5 transition-all"
                    >
                      <WhatsAppSvg />
                      <span>OPEN IN WHATSAPP</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessageText('');
                    }}
                    className="w-full sm:w-auto py-3.5 px-5 rounded-full bg-butter-yellow text-cocoa-brown border-[0.2rem] border-cocoa-brown font-jakarta text-xs sm:text-sm font-extrabold tracking-[0.08em] uppercase cursor-pointer shadow-[0.25rem_0.25rem_0_#4B1F0F] hover:-translate-y-0.5 transition-all"
                  >
                    WRITE ANOTHER
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* 1. Topic Selector */}
                <div>
                  <label className="block font-hero text-xs sm:text-sm uppercase tracking-wide text-cocoa-brown mb-2">
                    01. WHAT&apos;S POPPING? (SELECT TOPIC)
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {effectiveTopics.map((topic) => {
                      const active = selectedTopic === topic.id;
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => setSelectedTopic(topic.id)}
                          className={`py-2.5 px-3 rounded-[0.875rem] border-[0.16rem] border-cocoa-brown font-jakarta text-xs sm:text-sm font-extrabold text-cocoa-brown text-left flex items-center justify-between gap-2 cursor-pointer transition-all duration-150 ${
                            active
                              ? '-translate-y-0.5 shadow-[0.2rem_0.2rem_0_#4B1F0F]'
                              : 'bg-white/75 opacity-80 hover:opacity-100'
                          }`}
                          style={{
                            backgroundColor: active
                              ? topic.badgeColor
                              : undefined,
                          }}
                        >
                          <span className="truncate">{topic.label}</span>
                          <span
                            className={`w-3 h-3 rounded-full border-[0.12rem] border-cocoa-brown shrink-0 ${
                              active ? 'bg-red-orange' : 'bg-warm-cream'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Favourite Flavour Selector (3 by 2 Grid) */}
                <div>
                  <label className="block font-hero text-xs sm:text-sm uppercase tracking-wide text-cocoa-brown mb-2">
                    02. PICK YOUR FAVOURITE FLAVOUR
                  </label>
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {effectiveProducts.map((product) => {
                      const isSelected = selectedFlavourId === product.id;
                      const shortName = product.title
                        .replace(' Popcorn', '')
                        .replace('Chocolate Peanut Caramel', 'Choco Peanut');
                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => setSelectedFlavourId(product.id)}
                          title={product.title}
                          className={`group p-2 sm:p-2.5 rounded-[0.875rem] border-[0.16rem] border-cocoa-brown flex flex-col items-center justify-center gap-1.5 overflow-hidden cursor-pointer transition-all duration-150 ${
                            isSelected
                              ? 'bg-butter-yellow -translate-y-0.5 shadow-[0.2rem_0.2rem_0_#4B1F0F]'
                              : 'bg-white/75 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={product.packageImage}
                            alt={product.title}
                            className="w-11 h-14 sm:w-13 sm:h-16 object-contain select-none drop-shadow-[0_3px_0_rgba(75,31,15,0.2)]"
                            draggable={false}
                          />
                          <span className="w-full px-1 font-jakarta text-[0.65rem] sm:text-xs font-extrabold text-cocoa-brown uppercase text-center leading-tight truncate">
                            {shortName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Name & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-hero text-xs uppercase tracking-wide text-cocoa-brown mb-1.5"
                    >
                      03. YOUR NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Ayesha Rahman"
                      className="w-full px-3.5 py-2.5 rounded-[0.75rem] bg-white border-[0.16rem] border-cocoa-brown font-jakarta text-sm font-bold text-cocoa-brown placeholder:text-cocoa-brown/40 focus:outline-none focus:bg-butter-yellow/20 shadow-[0.15rem_0.15rem_0_#4B1F0F]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block font-hero text-xs uppercase tracking-wide text-cocoa-brown mb-1.5"
                    >
                      04. PHONE / WHATSAPP *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder="e.g. +880 17XX-XXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-[0.75rem] bg-white border-[0.16rem] border-cocoa-brown font-jakarta text-sm font-bold text-cocoa-brown placeholder:text-cocoa-brown/40 focus:outline-none focus:bg-butter-yellow/20 shadow-[0.15rem_0.15rem_0_#4B1F0F]"
                    />
                  </div>
                </div>

                {/* 4. Optional Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-hero text-xs uppercase tracking-wide text-cocoa-brown mb-1.5"
                  >
                    05. EMAIL ADDRESS (OPTIONAL)
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-[0.75rem] bg-white border-[0.16rem] border-cocoa-brown font-jakarta text-sm font-bold text-cocoa-brown placeholder:text-cocoa-brown/40 focus:outline-none focus:bg-butter-yellow/20 shadow-[0.15rem_0.15rem_0_#4B1F0F]"
                  />
                </div>

                {/* 5. Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-hero text-xs uppercase tracking-wide text-cocoa-brown mb-1.5"
                  >
                    06. YOUR MESSAGE *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Tell us how many pouches you need, event dates, or any questions..."
                    className="w-full px-3.5 py-2.5 rounded-[0.75rem] bg-white border-[0.16rem] border-cocoa-brown font-jakarta text-sm font-bold text-cocoa-brown placeholder:text-cocoa-brown/40 focus:outline-none focus:bg-butter-yellow/20 shadow-[0.15rem_0.15rem_0_#4B1F0F] resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="mt-1 w-full py-3.5 sm:py-4 px-6 rounded-full bg-red-orange text-warm-cream border-[0.2rem] border-cocoa-brown font-hero text-sm sm:text-base tracking-wider uppercase inline-flex items-center justify-center gap-2.5 cursor-pointer shadow-[0.3rem_0.3rem_0_#4B1F0F] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0.4rem_0.4rem_0_#4B1F0F] active:translate-y-0"
                >
                  <Send className="w-4 h-4 stroke-[2.75]" />
                  <span>SEND CRUNCH GRAM</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. FREQUENTLY POPPED QUESTIONS (COMIC ACCORDION GRID)
          ===================================================================== */}
      <div ref={faqRef} className="mt-16 sm:mt-20">
        <div className="text-center mb-8 sm:mb-10">
          <span className="font-jakarta text-xs font-extrabold tracking-[0.16em] text-red-orange uppercase">
            QUICK ANSWERS
          </span>
          <h2 className="m-0 mt-1.5 font-hero text-2xl sm:text-4xl text-cocoa-brown uppercase">
            FREQUENTLY POPPED QUESTIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {effectiveFaqs.map((faq, idx) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-[1.25rem] border-[0.2rem] border-cocoa-brown overflow-hidden transition-all duration-200"
                style={{
                  backgroundColor: isOpen
                    ? faq.accentColor
                    : 'var(--color-warm-cream)',
                  boxShadow: '0.28rem 0.28rem 0 #4B1F0F',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer bg-transparent border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-full bg-warm-cream border-[0.14rem] border-cocoa-brown font-comic text-xs text-cocoa-brown flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-hero text-xs sm:text-sm lg:text-base text-cocoa-brown uppercase leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className={`w-7 h-7 rounded-full bg-warm-cream border-[0.14rem] border-cocoa-brown flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-butter-yellow' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-cocoa-brown stroke-[2.75]" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 border-t-[0.14rem] border-cocoa-brown/20">
                    <p className="m-0 pt-3 font-jakarta text-xs sm:text-sm font-bold text-cocoa-brown/90 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
