import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/projectService";
import ProjectCard from "../components/ProjectCard";
import Stats from "../components/Stats";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const domains = useMemo(() => {
    return ["All", ...new Set(projects.map((p) => p.domain))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const text = search.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(text) ||
        project.domain.toLowerCase().includes(text) ||
        project.plant.toLowerCase().includes(text);

      const matchesDomain =
        domain === "All" || project.domain === domain;

      return matchesSearch && matchesDomain;
    });
  }, [projects, search, domain]);

  const featured =
    projects.find((p) => p.featured) ||
    filteredProjects[0] ||
    projects[0];

  if (loading) {
    return (
      <div
        className="app"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          color: "white",
          fontSize: "22px",
        }}
      >
        Loading projects...
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <h2>SAIL Stream</h2>
          <p>Digital Transformation Knowledge Hub</p>
        </div>

        <input
          className="search"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </nav>

      <Stats />

      {featured && (
        <section className="hero">
          <div className="overlay">
            <span className="badge">
              FEATURED INITIATIVE
            </span>

            <h1>{featured.title}</h1>

            <p>{featured.description}</p>

            <div className="buttons">
              <button
                className="primary"
                onClick={() =>
                  navigate(`/project/${featured.id}`)
                }
              >
                ▶ Watch Video
              </button>

              <button
                className="secondary"
                onClick={() =>
                  navigate(`/project/${featured.id}`)
                }
              >
                More Information
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="projects">
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >
          {domains.map((item) => (
            <button
              key={item}
              onClick={() => setDomain(item)}
              style={{
                padding: "10px 18px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                background:
                  domain === item ? "#2563EB" : "#1F2937",
                color: "white",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <h2>
          Projects ({filteredProjects.length})
        </h2>

        <div className="cardRow">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;