import AnimateOnScroll from "./AnimateOnScroll";

const experiences = [
  {
    company: "Olbap Design",
    role: "Web Designer",
    period: "March 2024 - December 2025",
    description: [
      "I worked as a Web Designer within a company, responsible for designing and improving corporate websites and service landing pages with a strong focus on UI/UX.",
      "I collaborated closely with product managers and developers to ensure design consistency from concept to implementation. By incorporating user feedback and data-driven insights, I continuously refined designs to enhance usability and conversion rates.",
      "I delivered responsive, brand-aligned web designs optimized for multiple devices and browsers.",
    ],
  },
  {
    company: "Agencia Pópuli",
    role: "Part time Web Designer",
    period: "April 2022 - January 2023",
    description: [
      "I worked as a part-time Junior Developer, supporting the development and maintenance of web applications. I assisted in implementing features, fixing bugs, and improving code quality under the guidance of senior developers.",
      "Through hands-on collaboration and real-world tasks, I strengthened my understanding of development workflows and best practices.",
    ],
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="px-4 py-20 border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-5xl">
        <AnimateOnScroll>
          <h2 className="text-2xl font-semibold mb-8 text-primary">
            Employment history
          </h2>
        </AnimateOnScroll>
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <AnimateOnScroll key={exp.company} delay={i * 100}>
              <div
                className="flex flex-col gap-2 rounded-2xl border border-border bg-surface-elevated p-6 md:flex-row md:items-start md:justify-between transition-all duration-300 hover:shadow-lg hover:border-accent/30"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-primary">{exp.role}</h3>
                  <p className="text-sm text-accent font-medium">{exp.company}</p>
                  <div className="mt-2 space-y-2 text-sm text-muted">
                    {exp.description.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-muted shrink-0 md:text-right">
                  {exp.period}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
