import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjects } from "../services/projectService";
import "../App.css";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <h2 style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
          Loading...
        </h2>
      </div>
    );
  }

  const project = projects.find(
    (p) => p.id === Number(id)
  );

  if (!project) {
    return (
      <div className="app">
        <h1 style={{ color: "white" }}>
          Project not found
        </h1>
      </div>
    );
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          <h2>SAIL Stream</h2>
          <p>Digital Transformation Knowledge Hub</p>
        </div>

        <button
          className="primary"
          onClick={() => navigate("/")}
        >
          ← Home
        </button>

      </nav>

      <div
        style={{
          width: "90%",
          margin: "40px auto",
        }}
      >

        <h1>{project.title}</h1>

        <p
          style={{
            color: "#94A3B8",
            marginBottom: "25px",
          }}
        >
          {project.plant} • {project.domain}
        </p>

        <iframe
          src={project.video}
          width="100%"
          height="600"
          allow="autoplay"
          style={{
            border: "none",
            borderRadius: "18px",
            background: "#111827",
          }}
          title={project.title}
        />

        <h2 style={{ marginTop: "40px" }}>
          Description
        </h2>

        <p
          style={{
            marginTop: "15px",
            lineHeight: "1.8",
          }}
        >
          {project.description}
        </p>

        <h2 style={{ marginTop: "35px" }}>
          Related Projects
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {relatedProjects.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                navigate(`/project/${item.id}`)
              }
              style={{
                background: "#111827",
                padding: "20px",
                borderRadius: "15px",
                cursor: "pointer",
                border: "1px solid #1F2937",
              }}
            >
              <h3>{item.title}</h3>

              <p
                style={{
                  color: "#94A3B8",
                }}
              >
                {item.domain}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ProjectDetails;