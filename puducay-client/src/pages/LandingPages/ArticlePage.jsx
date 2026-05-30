import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../../components/Button.jsx';

const API_URL = 'http://localhost:8000/api/articles';

function ArticlePage() {
  const { name } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching article:', error);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return <p className="p-6">Loading article...</p>;
  }

  if (!article || article.message) {
    return <h1 className="p-6 text-3xl font-bold">Article not found</h1>;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">Back to Articles</Button>
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Article
          </p>

          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <img
            src={article.image}
            alt={article.title}
            className="w-full aspect-4/3 object-cover rounded-[1.25rem] border-2 border-zinc-900 mb-8"
          />

          <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
            {article.content?.map((paragraph, index) => (
              <p key={index} className="text-base leading-7 text-zinc-700 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t-2 border-zinc-900 pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;