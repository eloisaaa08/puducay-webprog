import Button from "../components/Button";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
      
      {/* 404 Text */}
      <h1 className="text-7xl font-bold text-zinc-900 sm:text-8xl">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold text-zinc-900 sm:text-3xl">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-center text-sm text-zinc-600 sm:text-base">
        Everything is fine... except this page 🔥
      </p>

      {/* ✅ BOX WITH MEME */}
      <div className="mt-8 flex h-64 w-64 items-center justify-center rounded-[1.5rem] border-2 border-zinc-900 bg-zinc-200 overflow-hidden">
        <img
          src="https://media1.tenor.com/m/2I-AUZavyLMAAAAC/ng.gif"
          alt="This is fine meme"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <Button to="/" variant="primary">
          Go Home
        </Button>
        <Button to="/articles">
          Browse Articles
        </Button>
      </div>

    </div>
  );
}

export default NotFoundPage;