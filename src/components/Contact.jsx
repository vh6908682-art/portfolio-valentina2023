import behanceIcon from "../assets/icons8-behance-94.png";
import dribbbleIcon from "../assets/dribbble.png";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-4 py-20 border-t border-border bg-gradient-to-b from-surface to-surface-elevated"
    >
      <div className="mx-auto max-w-5xl text-center space-y-6">
        <AnimateOnScroll>
          <h2 className="text-2xl font-semibold text-primary">
            Let&apos;s work together
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <p className="max-w-xl mx-auto text-sm text-muted">
            Looking for help with a product, website, or interface? I&apos;m
            open to remote freelance and long-term collaborations.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <a
            href="mailto:vh6908682@gmail.com"
            className="inline-flex items-center justify-center rounded-full border-2 border-accent bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-accent transition-all duration-300 hover:scale-105"
          >
            Email me
          </a>
        </AnimateOnScroll>
        <AnimateOnScroll delay={300}>
          <div className="flex justify-center items-center gap-6 text-muted mt-6">
            <a
              href="https://www.behance.net/valentihernand137"
              target="_blank"
              rel="noreferrer"
              aria-label="Behance"
              className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
            >
              <img src={behanceIcon} alt="" className="w-6 h-6" aria-hidden />
            </a>
            <a
              href="https://dribbble.com/ValentinaDesigner0120"
              target="_blank"
              rel="noreferrer"
              aria-label="Dribbble"
              className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300"
            >
              <img src={dribbbleIcon} alt="" className="w-6 h-6" aria-hidden />
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
