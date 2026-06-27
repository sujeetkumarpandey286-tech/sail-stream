import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";

export default function ProjectRow({ title, projects }) {
  const rowRef = useRef(null);

  function scroll(direction) {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: direction * 720,
      behavior: "smooth",
    });
  }

  if (!projects?.length) return null;

  return (
    <section className="group relative mb-12">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <span className="text-sm text-slate-400">
          {projects.length} Initiative{projects.length !== 1 ? "s" : ""}
        </span>
      </div>

      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 z-20 hidden h-14 w-14 -translate-x-7 -translate-y-2 rounded-full border border-slate-700 bg-slate-900/90 text-white backdrop-blur transition hover:scale-110 hover:border-sky-500 hover:bg-slate-800 lg:flex lg:items-center lg:justify-center lg:opacity-0 lg:group-hover:opacity-100"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 z-20 hidden h-14 w-14 translate-x-7 -translate-y-2 rounded-full border border-slate-700 bg-slate-900/90 text-white backdrop-blur transition hover:scale-110 hover:border-sky-500 hover:bg-slate-800 lg:flex lg:items-center lg:justify-center lg:opacity-0 lg:group-hover:opacity-100"
      >
        <ChevronRight size={28} />
      </button>

      <div
        ref={rowRef}
        className="flex gap-6 overflow-x-auto pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-[340px] min-w-[340px] flex-shrink-0"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <style>{`
        div::-webkit-scrollbar{
          display:none;
        }
      `}</style>

    </section>
  );
}