import { useEffect, useRef, useState } from "react";

export default function ExpandableCard({
  title,
  body,
  views = 0,
  likes = 0,
  date: propDate,
}) {
  const [open, setOpen] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const cardRef = useRef(null);
  const expandedRef = useRef(null);

  const date = propDate ? new Date(propDate) : new Date();

  const displayDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const displayTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",  
  });

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleClick(e) {
      if (
        !expandedRef.current?.contains(e.target) &&
        !cardRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Collapsed card */}
      <article
        ref={cardRef}
        onClick={() => setOpen(true)}
        className={`relative z-30 bg-neutral-800 text-white rounded-xl border  cursor-pointer transition-all w-[280px] sm:w-80 h-44 p-4 ${
          open ? "invisible" : ""
        }`}
      >
        <h3 className="font-semibold truncate text-lg">{title}</h3>

        <p className="text-xs text-neutral-400 mt-1">{displayDate}</p>

        <p className="mt-3 text-sm text-neutral-300 line-clamp-3">
          {body}
        </p>

        <div className="absolute bottom-3 right-4 text-xs text-neutral-400">
          {views} views • {currentLikes} likes
        </div>
      </article>

      {/* Expanded */}
      {open && (
        <article
          ref={expandedRef}
          className="
            fixed z-50 bg-neutral-800 text-white rounded-xl border border-red-900/30 shadow-2xl
            left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-[90vw] max-w-3xl
            h-[85vh] max-h-[700px]
            p-4 sm:p-6 md:p-8
            flex flex-col
            overflow-hidden
          "
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-xl text-neutral-400 hover:text-white"
          >
            ✕
          </button>

          <header className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{title}</h2>
              <p className="text-neutral-400 mt-2">
                {displayDate} • {displayTime}
              </p>
            </div>

            <div className="flex gap-6 text-neutral-400">
              <div>{views} views</div>
              <div>{currentLikes} likes</div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto mt-6 whitespace-pre-wrap text-neutral-300 pr-2 scrollbar-thin scrollbar-thumb-red-900/30">
            {body}
          </div>

          <footer className="mt-6 pt-4 border-t border-red-900/30 flex flex-col sm:flex-row gap-4 justify-between">
            <button
              onClick={() => setCurrentLikes((v) => v + 1)}
              className="px-4 py-2 rounded-lg bg-red-900/20 border border-red-900/50 text-red-900 hover:bg-red-900/30 transition-colors"
            >
              Like ({currentLikes})
            </button>

            <button
              onClick={() => navigator.clipboard.writeText(body)}
              className="px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 text-white hover:bg-neutral-600 transition-colors"
            >
              Copy Text
            </button>
          </footer>
        </article>
      )}
    </>
  );
}