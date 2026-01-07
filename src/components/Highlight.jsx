import CardRowContainer from "./CardRowContainer";
import Highlight from "./Highlight";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100 font-sans">
      {/* Header */}
      <header className="w-full px-6 sm:px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Shashikant Yadav
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 mt-2 md:mt-0 font-medium">
          Node.js Developer
        </p>
      </header>

      {/* Intro */}
      <section className="px-6 sm:px-20 lg:px-48 mt-16 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          Whatever I Think, I Write Here
        </h2>

        <p className="text-neutral-400 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
          A concise archive of my ideas, experiments, engineering notes.
        </p>
      </section>

      <div className="mt-16 border-t border-neutral-700 opacity-60" />

      {/* Posts */}
      <section className="px-2 sm:px-6 md:px-20 lg:px-48 mt-16">
        <h3 className="text-lg sm:text-xl font-semibold mb-6 px-4 sm:px-0">
          Daily Notes
        </h3>

        <CardRowContainer
          posts={[
            {
              title: "Post 1",
              body:
                "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet...",
              views: 200,
              likes: 20,
            },
            {
              title: "Post 2",
              body:
                "Backend designs, patterns, etc Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet...",
              views: 350,
              likes: 47,
            },
          ]}
        />
      </section>
    </main>
  );
}
