import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Stats from "../components/Stats";
import FeaturedHero from "../components/FeaturedHero";
import ProjectRow from "../components/ProjectRow";
import { getProjects } from "../services/projectService";

export default function Home() {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return projects;

    return projects.filter((project) =>
      [
        project.title,
        project.plant,
        project.domain,
        project.status,
        project.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [projects, search]);

  const featuredProject = useMemo(() => {
    return (
      filteredProjects.find((p) => p.featured) ??
      filteredProjects[0] ??
      null
    );
  }, [filteredProjects]);

  const groupedProjects = useMemo(() => {
    const groups = {};

    filteredProjects.forEach((project) => {
      const key = project.domain || "Other";

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(project);
    });

    return Object.entries(groups).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }, [filteredProjects]);

  return (
    <div className="min-h-screen bg-[#08111F]">
      <Header
        search={search}
        setSearch={setSearch}
      />

      <main className="mx-auto w-full max-w-[1700px] px-8 py-8">
        {!loading && (
          <FeaturedHero project={featuredProject} />
        )}

        <Stats />

        {loading ? (
          <div className="py-24 text-center text-slate-400">
            Loading initiatives...
          </div>
        ) : groupedProjects.length === 0 ? (
          <div className="py-24 text-center text-slate-400">
            No initiatives found.
          </div>
        ) : (
          groupedProjects.map(([domain, items]) => (
            <ProjectRow
              key={domain}
              title={domain}
              projects={items}
            />
          ))
        )}
      </main>
    </div>
  );
}