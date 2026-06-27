import { useNavigate } from "react-router-dom";
import { Play, Factory, Layers } from "lucide-react";

export default function FeaturedHero({ project }) {
  const navigate = useNavigate();

  if (!project) return null;

  const thumbnail = project.thumbnail
    ? `https://drive.google.com/thumbnail?id=${project.thumbnail}&sz=w1600`
    : null;

  return (
    <section className="relative mb-12 overflow-hidden rounded-[32px] border border-sky-500/10 bg-[#07111F] shadow-2xl">

      {/* Background */}

      {thumbnail && (
        <img
          src={thumbnail}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-[3000ms] hover:scale-105"
        />
      )}

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#050B16] via-[#07111F]/92 to-[#07111F]/30" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#050B16] via-transparent to-transparent" />

      {/* Decorative Glow */}

      <div className="absolute -left-40 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-sky-500/10 blur-[120px]" />

      {/* Content */}

      <div className="relative z-10 flex min-h-[540px] max-w-[760px] flex-col justify-center px-14 py-16">

        {/* Badge */}

        <div className="mb-6">

          <span className="rounded-full border border-sky-400/20 bg-sky-500/15 px-5 py-2 text-sm font-semibold tracking-[0.2em] text-sky-300">

            ★ FEATURED INITIATIVE

          </span>

        </div>

        {/* Title */}

        <h1 className="text-6xl font-black leading-[1.05] tracking-tight text-white">

          {project.title}

        </h1>

        {/* Meta */}

        <div className="mt-7 flex flex-wrap gap-5">

          <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-slate-300 backdrop-blur">

            <Factory size={18} />

            <span>{project.plant}</span>

          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-slate-300 backdrop-blur">

            <Layers size={18} />

            <span>{project.domain}</span>

          </div>

          <div className="rounded-full bg-emerald-500/20 px-4 py-2 font-medium text-emerald-300">

            {project.status}

          </div>

        </div>

        {/* Description */}

        <p className="mt-8 max-w-[680px] text-xl leading-9 text-slate-300">

          {project.description}

        </p>

        {/* Buttons */}

        <div className="mt-10 flex gap-4">

          <button
            onClick={() => navigate(`/project/${project.id}`)}
            className="group flex items-center gap-3 rounded-2xl bg-sky-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-sky-500"
          >

            <Play
              fill="currentColor"
              size={22}
              className="transition group-hover:scale-110"
            />

            Watch Now

          </button>

          <button
            onClick={() => navigate(`/project/${project.id}`)}
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg text-white backdrop-blur transition hover:border-sky-400/40 hover:bg-white/10"
          >

            View Details

          </button>

        </div>

      </div>

    </section>
  );
}