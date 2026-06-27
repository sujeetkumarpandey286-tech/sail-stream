import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Play, MapPin } from "lucide-react";

function ProjectCard({ project, loading = false }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  if (loading) {
    return (
      <div className="animate-pulse overflow-hidden rounded-3xl bg-slate-900">
        <div className="aspect-video bg-slate-800" />
        <div className="space-y-4 p-5">
          <div className="h-6 w-3/4 rounded bg-slate-800" />
          <div className="h-4 w-1/2 rounded bg-slate-800" />
          <div className="h-4 w-full rounded bg-slate-800" />
          <div className="h-4 w-4/5 rounded bg-slate-800" />
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

    const rotateY = ((x / rect.width) - 0.5) * 7;
    const rotateX = ((rect.height / 2 - y) / rect.height) * 7;

    card.style.transform = `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
      scale(1.03)
    `;
  }

  function handleMouseLeave() {
    if (!cardRef.current) return;

    cardRef.current.style.transform = `
      perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0px)
      scale(1)
    `;
  }

  function badge(status = "") {
    const s = status.toLowerCase();

    if (s.includes("complete"))
      return "bg-emerald-500/90";

    if (s.includes("progress"))
      return "bg-amber-500/90";

    if (s.includes("pilot"))
      return "bg-sky-500/90";

    if (s.includes("plan"))
      return "bg-violet-500/90";

    return "bg-slate-700";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/project/${project.id}`)}
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        border-white/5
        bg-[#0A1323]
        transition-all
        duration-300
        hover:border-sky-500/40
        hover:shadow-[0_20px_45px_rgba(14,165,233,0.18)]
      "
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Image */}

      <div className="relative aspect-video overflow-hidden">

        {project.thumbnail ? (
          <img
            src={`https://drive.google.com/thumbnail?id=${project.thumbnail}&sz=w1200`}
            alt={project.title}
            className="
              h-full
              w-full
              object-cover
              transition-all
              duration-700
              group-hover:scale-110
              group-hover:brightness-110
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-sky-900 via-slate-900 to-black">
            <span className="text-6xl font-bold text-white/10">
              SAIL
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />

        <div
          className={`
            absolute
            left-4
            top-4
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-white
            ${badge(project.status)}
          `}
        >
          {project.status}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">

          <div className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-white/90
            shadow-2xl
            transition
            group-hover:scale-110
          ">

            <Play
              fill="currentColor"
              size={28}
              className="ml-1 text-slate-900"
            />

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="space-y-4 p-6">

        <h3 className="line-clamp-2 text-xl font-bold leading-7 text-white">
          {project.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-slate-400">

          <MapPin size={15} />

          {project.plant}

        </div>

        <div className="inline-flex rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">

          {project.domain}

        </div>

        <p className="line-clamp-3 text-sm leading-7 text-slate-400">

          {project.description}

        </p>

      </div>

    </div>
  );
}

export default ProjectCard;