import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Factory,
  Cpu,
  Play,
} from "lucide-react";
import { getProjects } from "../services/projectService";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08111F] text-slate-400">
        Loading initiative...
      </div>
    );
  }

  const project = projects.find(
    (p) => p.id === Number(id)
  );

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#08111F]">
        <h1 className="text-3xl font-bold text-white">
          Project not found
        </h1>

        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-xl bg-sky-600 px-5 py-3 font-medium text-white hover:bg-sky-500"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const thumbnail = project.thumbnail
    ? `https://drive.google.com/thumbnail?id=${project.thumbnail}&sz=w1600`
    : null;

  return (
    <div className="min-h-screen bg-[#08111F]">

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#08111F]/95 backdrop-blur">

        <div className="mx-auto flex max-w-[1700px] items-center justify-between px-8 py-5">

          <div>
            <h1 className="text-3xl font-bold text-white">
              SAIL Stream
            </h1>

            <p className="text-sky-400">
              Digital Transformation Visual Portal
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-white transition hover:border-sky-500"
          >
            <ArrowLeft size={18} />
            Home
          </button>

        </div>

      </header>

      <main className="mx-auto max-w-[1700px] px-8 py-10">

        <h1 className="text-4xl font-bold text-white">
          {project.title}
        </h1>

        <div className="mt-5 flex flex-wrap gap-6 text-slate-400">

          <div className="flex items-center gap-2">
            <Factory size={18} />
            {project.plant}
          </div>

          <div className="flex items-center gap-2">
            <Cpu size={18} />
            {project.domain}
          </div>

        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-2xl">

          {!playVideo ? (

            <div className="group relative aspect-video">

              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-75"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black">
                  <span className="text-6xl font-bold text-white/10">
                    SAIL
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />

              <button
                onClick={() => setPlayVideo(true)}
                className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-4 rounded-full bg-white px-8 py-5 text-xl font-semibold text-slate-900 shadow-2xl transition duration-300 hover:scale-105"
              >
                <Play
                  size={28}
                  fill="currentColor"
                />

                Play Video
              </button>

            </div>

          ) : (

            <iframe
              src={project.video}
              title={project.title}
              className="aspect-video w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />

          )}

        </div>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">

          <h2 className="text-2xl font-semibold text-white">
            Description
          </h2>

          <p className="mt-5 whitespace-pre-line leading-8 text-slate-300">
            {project.description}
          </p>

        </section>

        <section className="mt-12">

          <h2 className="mb-6 text-2xl font-semibold text-white">
            Related Initiatives
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            {relatedProjects.map((item) => (

              <div
                key={item.id}
                onClick={() => navigate(`/project/${item.id}`)}
                className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-sky-500/40"
              >
                <h3 className="font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-slate-400">
                  {item.domain}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {item.plant}
                </p>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default ProjectDetails;