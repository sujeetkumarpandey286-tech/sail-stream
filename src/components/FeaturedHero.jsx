import { useNavigate } from "react-router-dom";
import { Play, Factory, Cpu } from "lucide-react";

export default function FeaturedHero({ project }) {
  const navigate = useNavigate();

  if (!project) return null;

  const thumbnail = project.thumbnail
    ? `https://drive.google.com/thumbnail?id=${project.thumbnail}&sz=w1600`
    : null;

  return (
    <section className="relative mb-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
      {thumbnail && (
        <img
          src={thumbnail}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-[#08111F] via-[#08111F]/90 to-[#08111F]/35" />

      <div className="relative z-10 flex min-h-[420px] max-w-3xl flex-col justify-center px-10 py-12">

        <span className="mb-4 w-fit rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold tracking-wide text-sky-300">
          FEATURED INITIATIVE
        </span>

        <h1 className="text-5xl font-bold leading-tight text-white">
          {project.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-6 text-slate-300">

          <div className="flex items-center gap-2">
            <Factory size={18} />
            <span>{project.plant}</span>
          </div>

          <div className="flex items-center gap-2">
            <Cpu size={18} />
            <span>{project.domain}</span>
          </div>

        </div>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          {project.description}
        </p>

        <div className="mt-8">
          <button
            onClick={() => navigate(`/project/${project.id}`)}
            className="flex items-center gap-3 rounded-xl bg-sky-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-sky-500"
          >
            <Play fill="currentColor" size={22} />
            Watch Now
          </button>
        </div>

      </div>
    </section>
  );
}