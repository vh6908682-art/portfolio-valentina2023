import { useState, useEffect } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const reviews = [
  {
    quote:
      "Valentina delivered a clean, conversion-focused redesign for our corporate site. Our bounce rate dropped significantly, and the team loved how smooth the handoff was from design to development.",
    author: "Maria S.",
    role: "Product Manager, Olbap Design",
  },
  {
    quote:
      "She understood our users immediately and translated feedback into clear layouts and flows. The UI feels intuitive and stays on-brand. We'll definitely work with her again.",
    author: "Alex K.",
    role: "Founder, Startup",
  },
  {
    quote:
      "Working with Valentina was seamless. She handed off pixel-perfect, responsive designs and was always quick to iterate. Her UI/UX focus made our landing pages perform much better.",
    author: "David L.",
    role: "Marketing Lead",
  },
  {
    quote:
      "We've collaborated on multiple projects. She consistently delivers accessible, mobile-friendly designs that look great and convert. A reliable and talented designer.",
    author: "Elena R.",
    role: "Agency Partner",
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const goTo = (index) => setCurrent(index);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  const next = () =>
    setCurrent((prev) => (prev + 1) % reviews.length);

  return (
    <section
      id="reviews"
      className="px-4 py-20 border-t border-border bg-surface-elevated"
    >
      <div className="mx-auto max-w-3xl">
        <AnimateOnScroll>
          <h2 className="text-2xl font-semibold text-center mb-10 text-primary">
            Great reviews
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <div className="relative overflow-hidden min-h-[180px]">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: index === current ? 1 : 0,
                  pointerEvents: index === current ? "auto" : "none",
                }}
              >
                <blockquote className="text-center">
                  <p className="text-primary/90 text-base sm:text-lg leading-relaxed mb-6">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <footer className="text-sm text-muted">
                    <cite className="not-italic font-semibold text-primary">
                      {review.author}
                    </cite>
                    <span> — {review.role}</span>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous review"
            className="rounded-full p-2 text-muted hover:text-accent hover:bg-accent/10 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <div className="flex gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to review ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-6 bg-accent"
                    : "w-2 bg-border hover:bg-accent/50"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next review"
            className="rounded-full p-2 text-muted hover:text-accent hover:bg-accent/10 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden
            >
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
