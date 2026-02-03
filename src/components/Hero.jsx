export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-b from-surface via-surface to-surface-elevated"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center gap-6">
        <p
          className="text-sm uppercase tracking-[0.25em] text-accent animate-fade-in-up opacity-0 animate-delay-100"
          style={{ animationFillMode: "forwards" }}
        >
          Product Designer & Frontend Developer
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-primary animate-fade-in-up opacity-0 animate-delay-200"
          style={{ animationFillMode: "forwards" }}
        >
          I design and build{" "}
          <span className="text-accent">clean, thoughtful</span> digital
          experiences.
        </h1>
        <p
          className="max-w-2xl text-base sm:text-lg text-muted animate-fade-in-up opacity-0 animate-delay-300"
          style={{ animationFillMode: "forwards" }}
        >
          Focusing on user-centered interfaces, smooth interactions, and
          practical frontend implementation from concept to production.
        </p>
        <div
          className="flex flex-wrap justify-center gap-3 mt-4 animate-fade-in-up opacity-0 animate-delay-400"
          style={{ animationFillMode: "forwards" }}
        >
          <a
            href="#projects"
            className="rounded-full border-2 border-accent bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-transparent hover:text-accent transition-all duration-300 hover:scale-105"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-border px-5 py-2.5 text-sm font-medium text-primary hover:border-accent hover:text-accent transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
