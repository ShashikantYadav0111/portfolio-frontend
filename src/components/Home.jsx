import { useNavigate } from "react-router-dom";
import CardRowContainer from "./CardRowContainer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100 font-sans overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-4 sm:px-6 md:px-8 py-8 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Shashikant Yadav{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-900 text-3xl sm:text-4xl md:text-5xl  hover:text-red-800 transition-colors inline-block"
          >
            .
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 mt-2 md:mt-0 font-medium">
          Node.js Developer
        </p>
      </header>

      {/* Intro */}
      <section className="w-full px-4 sm:px-6 md:px-12 lg:px-24 mt-12 md:mt-16 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          Whatever I Think, I Write Here
        </h2>
        <p className="text-neutral-400 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
          A concise archive of my ideas, experiments, engineering notes.
        </p>
      </section>

      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 mt-12 md:mt-16">
        <div className="border-t border-neutral-700 opacity-60" />
      </div>

      {/* Posts */}
      <section className="w-full px-4 sm:px-6 mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg sm:text-xl font-semibold mb-6 px-2 sm:px-0">
            Daily Notes
          </h3>

          <div className="w-full">
            <CardRowContainer />
          </div>
        </div>
      </section>
    </main>
  );
}
