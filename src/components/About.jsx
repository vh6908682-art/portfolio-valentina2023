import photo from "../assets/photo.png";
import AnimateOnScroll from "./AnimateOnScroll";

export default function About() {
  return (
    <section
      id="about"
      className="px-4 py-20 border-t border-border bg-surface-elevated"
    >
      <div className="mx-auto max-w-5xl">
        <AnimateOnScroll>
          <h2 className="text-2xl font-semibold mb-10 text-primary">
            About
          </h2>
        </AnimateOnScroll>
        <div className="grid gap-10 md:grid-cols-2">
          <AnimateOnScroll delay={100}>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={photo}
                alt="Valentina"
                className="w-full aspect-square object-cover border border-border-light hover:scale-105 transition-transform duration-500"
              />
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="space-y-4 text-sm text-muted leading-relaxed flex flex-col justify-center">
              <p className="text-primary/90">
                My name is Valentina and I&apos;m a web designer who strives for
                clean, modern, and user-centric website designs.
              </p>
              <p>
                I primarily use Figma to design responsive web layouts, landing
                pages, and UI elements. My experience with Webflow and WordPress
                allows me to create designes efficiently and accurately. Adobe XD
                is the another option for design and My knowledge of HTML, CSS,
                and Bootstrap code is essential for creating realistic yet
                flexible designs.
              </p>
              <p>
                My work highlights: <br /> - Clear layouts and visual hierarchy
                <br /> - Mobile-friendly responsive design <br /> - Streamlined
                user flows that increase conversion rates
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
