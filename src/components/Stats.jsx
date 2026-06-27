import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import {
  FolderKanban,
  Factory,
  Cpu,
  PlayCircle,
} from "lucide-react";

function Stats() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setProjects(data);
    }

    loadProjects();
  }, []);

  const stats = [
    {
      title: "Projects",
      value: projects.length,
      icon: FolderKanban,
    },
    {
      title: "Plants",
      value: new Set(projects.map((p) => p.plant)).size,
      icon: Factory,
    },
    {
      title: "Domains",
      value: new Set(projects.map((p) => p.domain)).size,
      icon: Cpu,
    },
    {
      title: "Videos",
      value: projects.length,
      icon: PlayCircle,
    },
  ];

  return (
    <section className="mb-10">
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur transition-all duration-300 hover:border-sky-500/40 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-white">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-sky-500/10 p-3">
                  <Icon
                    size={28}
                    className="text-sky-400"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;