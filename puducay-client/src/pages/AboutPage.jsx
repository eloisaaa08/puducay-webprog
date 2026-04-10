import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  alt="Team collaboration"
  className="h-full w-full object-cover"
/>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Us
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Designing simple, scalable, and user-focused digital experiences.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              We focus on building clean and structured interfaces that prioritize usability and clarity. Our approach combines thoughtful design with practical development to create systems that are easy to scale and maintain.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Our Experience
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Key highlights and achievements
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">05+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Years Experience
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">20+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Completed Projects
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">10+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Happy Clients
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Core Services
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              What We Do
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              Our workflow and process
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Research & Planning
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  We start by understanding user needs and defining clear goals to guide the design process.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Design & Prototyping
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Creating wireframes and prototypes to visualize ideas and refine user experience.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Development & Delivery
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Turning designs into functional, scalable applications ready for real-world use.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Work Preview
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
                "https://images.unsplash.com/photo-1504639725590-34d0984388bd"
              ].map((src, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`Work ${i}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            <Button className="mt-5">View Portfolio</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;