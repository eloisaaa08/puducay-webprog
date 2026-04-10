import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* HERO */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Articles
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Ideas, processes, and practical design insights
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              A collection of articles focused on real-world workflows—from research and wireframing to development and delivery. Each piece reflects our approach to building simple, scalable, and user-focused interfaces.
            </p>
            <div className="mt-6">
              <Button to="/">Back Home</Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                alt="Development workflow"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Knowledge Base
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Learn through our workflow and methods
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Understanding user needs",
              desc: "Learn how research and discovery shape better design decisions and meaningful user experiences.",
              img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
            },
            {
              title: "Wireframing and structure",
              desc: "Explore how low-fidelity layouts help organize content and guide interface development.",
              img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            },
            {
              title: "Design to development",
              desc: "Bridge the gap between design and code by building reusable and scalable components.",
              img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd"
            },
            {
              title: "Building scalable systems",
              desc: "Create UI systems that grow with your product while maintaining clarity and consistency.",
              img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            }
          ].map((article, i) => (
            <article key={i} className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
              <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                <img src={article.img} alt={article.title} className="h-full w-full object-cover" />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Article {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {article.desc}
              </p>
              <Button className="mt-4">Read More</Button>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-10 text-center">
        <h2 className="text-2xl font-semibold text-zinc-900">
          Continue learning and improving your workflow
        </h2>
        <p className="mt-3 text-sm text-zinc-600">
          Discover more insights on design systems, development practices, and building better digital products.
        </p>
        <Button className="mt-6">Explore More Articles</Button>
      </section>
    </div>
  );
};

export default ArticlePage;