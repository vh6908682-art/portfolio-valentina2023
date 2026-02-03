import { useState, useEffect, useCallback } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

// Explicit imports (reliable on Vercel; all lowercase for cross-platform compatibility)
import clueplay1 from "../assets/projects/clueplay/clueplayai1.png";
import clueplay2 from "../assets/projects/clueplay/clueplayai2.png";
import forex1 from "../assets/projects/forex/forex1.jpg";
import forex2 from "../assets/projects/forex/forex2.jpg";
import forex3 from "../assets/projects/forex/forex3.jpg";
import forex4 from "../assets/projects/forex/forex4.jpg";
import forex5 from "../assets/projects/forex/forex5.jpg";
import forex6 from "../assets/projects/forex/forex6.jpg";
import forex7 from "../assets/projects/forex/forex7.jpg";
import forex8 from "../assets/projects/forex/forex8.jpg";
import forex9 from "../assets/projects/forex/forex9.jpg";
import forex10 from "../assets/projects/forex/forex10.jpg";
import forex11 from "../assets/projects/forex/forex11.jpg";
import forex12 from "../assets/projects/forex/forex12.jpg";
import forex13 from "../assets/projects/forex/forex13.jpg";
import forex14 from "../assets/projects/forex/forex14.jpg";
import forex15 from "../assets/projects/forex/forex15.jpg";
import forex16 from "../assets/projects/forex/forex16.jpg";
import forex17 from "../assets/projects/forex/forex17.jpg";
import forex18 from "../assets/projects/forex/forex18.jpg";
import forex19 from "../assets/projects/forex/forex19.jpg";
import forex20 from "../assets/projects/forex/forex20.jpg";
import glycoso1 from "../assets/projects/glycoso/glycoso1.jpg";
import glycoso2 from "../assets/projects/glycoso/glycoso2.jpg";
import glycoso3 from "../assets/projects/glycoso/glycoso3.jpg";
import glycoso4 from "../assets/projects/glycoso/glycoso4.jpg";
import glycoso5 from "../assets/projects/glycoso/glycoso5.jpg";
import glycoso6 from "../assets/projects/glycoso/glycoso6.jpg";
import glycoso7 from "../assets/projects/glycoso/glycoso7.jpg";
import glycoso8 from "../assets/projects/glycoso/glycoso8.jpg";
import glycoso9 from "../assets/projects/glycoso/glycoso9.jpg";
import glycoso10 from "../assets/projects/glycoso/glycoso10.jpg";
import glycoso11 from "../assets/projects/glycoso/glycoso11.jpg";
import glycoso12 from "../assets/projects/glycoso/glycoso12.jpg";
import glycoso13 from "../assets/projects/glycoso/glycoso13.jpg";
import glycoso14 from "../assets/projects/glycoso/glycoso14.jpg";
import glycoso15 from "../assets/projects/glycoso/glycoso15.jpg";
import glycoso16 from "../assets/projects/glycoso/glycoso16.jpg";
import gravelu1 from "../assets/projects/gravelu/gravelu1.jpg";
import gravelu2 from "../assets/projects/gravelu/gravelu2.jpg";
import gravelu3 from "../assets/projects/gravelu/gravelu3.jpg";
import gravelu4 from "../assets/projects/gravelu/gravelu4.jpg";
import gravelu5 from "../assets/projects/gravelu/gravelu5.jpg";
import gravelu6 from "../assets/projects/gravelu/gravelu6.jpg";
import gravelu7 from "../assets/projects/gravelu/gravelu7.jpg";
import gravelu8 from "../assets/projects/gravelu/gravelu8.jpg";
import gravelu9 from "../assets/projects/gravelu/gravelu9.jpg";
import gravelu10 from "../assets/projects/gravelu/gravelu10.jpg";
import gravelu11 from "../assets/projects/gravelu/gravelu11.jpg";
import gravelu12 from "../assets/projects/gravelu/gravelu12.jpg";
import gravelu13 from "../assets/projects/gravelu/gravelu13.jpg";
import gravelu14 from "../assets/projects/gravelu/gravelu14.jpg";
import gravelu15 from "../assets/projects/gravelu/gravelu15.jpg";
import gravelu16 from "../assets/projects/gravelu/gravelu16.jpg";
import gravelu17 from "../assets/projects/gravelu/gravelu17.jpg";
import healthcare1 from "../assets/projects/healthcare/healthcare.png";
import praxis1 from "../assets/projects/praxis/praxis1.png";
import praxis2 from "../assets/projects/praxis/praxis2.png";
import speakbetter1 from "../assets/projects/speakbetter/speakbetter1.png";
import speakbetter2 from "../assets/projects/speakbetter/speakbetter2.png";
import worldcup1 from "../assets/projects/wolrdcup/worldcup1.jpg";
import worldcup2 from "../assets/projects/wolrdcup/worldcup2.jpg";
import worldcup3 from "../assets/projects/wolrdcup/worldcup3.jpg";
import worldcup4 from "../assets/projects/wolrdcup/worldcup4.jpg";
import worldcup5 from "../assets/projects/wolrdcup/worldcup5.jpg";
import worldcup6 from "../assets/projects/wolrdcup/worldcup6.jpg";
import worldcup7 from "../assets/projects/wolrdcup/worldcup7.jpg";
import worldcup8 from "../assets/projects/wolrdcup/worldcup8.jpg";
import worldcup9 from "../assets/projects/wolrdcup/worldcup9.jpg";
import worldcup10 from "../assets/projects/wolrdcup/worldcup10.jpg";
import worldcup11 from "../assets/projects/wolrdcup/worldcup11.jpg";
import worldcup12 from "../assets/projects/wolrdcup/worldcup12.jpg";
import worldcup13 from "../assets/projects/wolrdcup/worldcup13.jpg";
import worldcup14 from "../assets/projects/wolrdcup/worldcup14.jpg";
import worldcup15 from "../assets/projects/wolrdcup/worldcup15.jpg";
import worldcup16 from "../assets/projects/wolrdcup/worldcup16.jpg";
import worldcup17 from "../assets/projects/wolrdcup/worldcup17.jpg";
import worldcup18 from "../assets/projects/wolrdcup/worldcup18.jpg";

const projects = [
  {
    title: "Clueplay.ai",
    images: [clueplay1, clueplay2],
    summary: "OTT platform revamp with a cinematic, user-centric interface.",
    description:
      "Website revamp exploring rich content previews, smooth transitions, and effortless navigation—helping users discover, engage, and continue watching seamlessly. A modern OTT experience that feels immersive and intuitive.",
  },
  {
    title: "Forex",
    images: [forex1, forex2, forex3, forex4, forex5, forex6, forex7, forex8, forex9, forex10, forex11, forex12, forex13, forex14, forex15, forex16, forex17, forex18, forex19, forex20],
    summary: "Trading and forex platform UI with clear data visualization.",
    description:
      "Dashboard and landing design for a forex platform. Focus on clarity, trust, and easy access to key metrics and trading tools across devices.",
  },
  {
    title: "Glycoso",
    images: [glycoso1, glycoso2, glycoso3, glycoso4, glycoso5, glycoso6, glycoso7, glycoso8, glycoso9, glycoso10, glycoso11, glycoso12, glycoso13, glycoso14, glycoso15, glycoso16],
    summary: "Health and wellness product site with a clean, approachable look.",
    description:
      "Web presence for a health-focused product. Clean layout and visual hierarchy to communicate values and guide users through information and actions.",
  },
  {
    title: "Gravelu",
    images: [gravelu1, gravelu2, gravelu3, gravelu4, gravelu5, gravelu6, gravelu7, gravelu8, gravelu9, gravelu10, gravelu11, gravelu12, gravelu13, gravelu14, gravelu15, gravelu16, gravelu17],
    summary: "Brand and product website with a distinct visual identity.",
    description:
      "Full-site design balancing brand personality with usability. Responsive layouts and clear CTAs to support discovery and conversion.",
  },
  {
    title: "Healthcare Operations Dashboard",
    images: [healthcare1],
    summary: "Admin dashboard for managing patient and doctor operations.",
    description:
      "Centralized platform for healthcare administrators to oversee appointments, patient records, and doctor assignments. Built for efficiency and clarity.",
  },
  {
    title: "Praxis Richter",
    images: [praxis1, praxis2],
    summary: "Modern dental clinic website focused on patient experience.",
    description:
      "Thoughtfully designed to enhance patient experience and inspire confidence. Clean layout and calming visual language for trust and professionalism. Patients can explore services, book appointments, and navigate with ease.",
  },
  {
    title: "SpeakBetter",
    images: [speakbetter1, speakbetter2],
    summary: "App UI that tracks filler words and supports confident speaking.",
    description:
      "UI/UX for an app that tracks filler words in real time and helps users speak more confidently by reducing them step by step. Simple, focused interface.",
  },
  {
    title: "WorldCup",
    images: [worldcup1, worldcup2, worldcup3, worldcup4, worldcup5, worldcup6, worldcup7, worldcup8, worldcup9, worldcup10, worldcup11, worldcup12, worldcup13, worldcup14, worldcup15, worldcup16, worldcup17, worldcup18],
    summary: "Event-themed web experience for a World Cup–related project.",
    description:
      "Landing and UI design with an event-driven, energetic feel. Responsive and engaging for fans and users during the campaign.",
  },
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [gallery, setGallery] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    if (gallery) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(id);
  }, [gallery]);

  const goTo = (index) => setCurrent(index);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  const next = () => setCurrent((prev) => (prev + 1) % projects.length);

  const openGallery = (proj) => {
    if (!proj?.images?.length) return;
    setGallery(proj);
    setGalleryIndex(0);
  };

  const closeGallery = useCallback(() => setGallery(null), []);
  const galleryPrev = () =>
    setGalleryIndex((prev) => {
      const n = gallery?.images?.length ?? 1;
      return prev <= 0 ? n - 1 : prev - 1;
    });
  const galleryNext = () =>
    setGalleryIndex((prev) => {
      const n = gallery?.images?.length ?? 1;
      return prev >= n - 1 ? 0 : prev + 1;
    });

  useEffect(() => {
    if (gallery) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [gallery]);

  useEffect(() => {
    const onKey = (e) => {
      if (!gallery) return;
      if (e.key === "Escape") {
        closeGallery();
        return;
      }
      const n = gallery.images?.length ?? 0;
      if (n === 0) return;
      if (e.key === "ArrowLeft") {
        setGalleryIndex((prev) => (prev <= 0 ? n - 1 : prev - 1));
        return;
      }
      if (e.key === "ArrowRight") {
        setGalleryIndex((prev) => (prev >= n - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gallery, closeGallery]);

  const p = projects[current];
  const galleryImages = gallery?.images ?? [];

  return (
    <>
      <section id="projects" className="px-4 py-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-4xl">
          <AnimateOnScroll>
            <h2 className="text-2xl font-semibold mb-8 text-primary">
              Selected Projects
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => openGallery(p)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openGallery(p);
                }
              }}
              className="rounded-2xl border border-border bg-surface-elevated overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-accent/40 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-video md:aspect-auto md:min-h-[300px] bg-border-light">
                {projects.map((proj, index) => (
                  <div
                    key={proj.title}
                    className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                    style={{
                      opacity: index === current ? 1 : 0,
                      pointerEvents: index === current ? "auto" : "none",
                    }}
                  >
                    {proj.images[0] ? (
                      <img
                        src={proj.images[0]}
                        alt=""
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full bg-border-light" />
                    )}
                  </div>
                ))}
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center min-h-[220px] md:min-h-[300px]">
                <div key={current}>
                  <h3 className="font-semibold text-lg mb-2 text-accent">
                    {p.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">
                    {p.summary}
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    {p.description}
                  </p>
                  {p.images.length > 0 && (
                    <p className="text-xs text-muted mt-3">
                      Click to view {p.images.length === 1 ? "1 image" : `${p.images.length} images`} →
                    </p>
                  )}
                </div>
              </div>
            </div>
            </div>
          </AnimateOnScroll>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous project"
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
            <div className="flex gap-1.5">
              {projects.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(index);
                  }}
                  aria-label={`Go to project ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current
                      ? "w-5 bg-accent"
                      : "w-1.5 bg-border hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next project"
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

      {gallery && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery: ${gallery.title}`}
        >
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
            <h3 className="text-lg font-semibold text-white truncate max-w-[60%]">
              {gallery.title}
            </h3>
            <button
              type="button"
              onClick={closeGallery}
              aria-label="Close gallery"
              className="rounded-full p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                aria-hidden
              >
                <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.88a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89z" />
              </svg>
            </button>
          </div>

          <div
            className="flex-1 flex items-stretch min-h-0 pt-16 pb-24 w-full"
            onClick={closeGallery}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                galleryPrev();
              }}
              aria-label="Previous image"
              className="shrink-0 flex items-center p-4 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 md:w-10 md:h-10"
                aria-hidden
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <div
              className="relative flex-1 flex items-center justify-center min-h-0 min-w-0 px-2"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages.map((src, i) => (
                <div
                  key={src}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                  style={{
                    opacity: i === galleryIndex ? 1 : 0,
                    pointerEvents: i === galleryIndex ? "auto" : "none",
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className="max-w-full max-h-[70vh] md:max-h-[80vh] w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                galleryNext();
              }}
              aria-label="Next image"
              className="shrink-0 flex items-center p-4 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 md:w-10 md:h-10"
                aria-hidden
              >
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <span className="text-sm text-white/70 tabular-nums">
              {galleryIndex + 1} / {galleryImages.length}
            </span>
            <div
              className="flex gap-1.5 max-w-[200px] overflow-x-auto overflow-y-hidden py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setGalleryIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 shrink-0 rounded-full transition-all ${
                    i === galleryIndex ? "w-4 bg-accent" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
