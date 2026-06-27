import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Play, MapPin } from "lucide-react";

function ProjectCard({ project, loading = false }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  if (loading) {
    return (
      <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="aspect-video bg-slate-800" />

        <div className="space-y-4 p-5">
          <div className="h-6 w-3/4 rounded bg-slate-800" />

          <div className="h-4 w-1/2 rounded bg-slate-800" />

          <div className="h-6 w-24 rounded-full bg-slate-800" />

          <div className="space-y-2">
            <div className="h-4 rounded bg-slate-800" />
            <div className="h-4 w-5/6 rounded bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((rect.height / 2 - y) / rect.height) * 8;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
      scale(1.02)
    `;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
      scale(1)
    `;
  }

  function statusColor(status = "") {
    const s = status.toLowerCase();

    if (s.includes("complete")) return "bg-emerald-500/90";
    if (s.includes("progress")) return "bg-amber-500/90";
    if (s.includes("pilot")) return "bg-sky-500/90";
    if (s.includes("plan")) return "bg-violet-500/90";

    return "bg-slate-600";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/project/${project.id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-[transform,border-color,box-shadow] duration-300 hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/20"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div className="relative aspect-video overflow-hidden">
        {project.thumbnail ? (
          <img
            src={`https://drive.google.com/thumbnail?id=${project.thumbnail}&sz=w1000`}
            alt={project.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-sky-800 via-slate-900 to-slate-950">
            <span className="text-5xl font-bold text-white/10">
              SAIL
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

        <div
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur ${statusColor(project.status)}`}
        >
          {project.status}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="flex h-16 w-16 scale-90 items-center justify-center rounded-full bg-white/90 shadow-xl transition duration-300 group-hover:scale-100">
            <Play
              size={28}
              fill="currentColor"
              className="ml-1 text-slate-900"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-7 text-white">
          {project.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <MapPin size={15} />
          <span>{project.plant}</span>
        </div>

        <span className="inline-flex rounded-full bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-300">
          {project.domain}
        </span>

        <p className="line-clamp-2 text-sm leading-6 text-slate-400">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;