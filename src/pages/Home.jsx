import { useState } from "react";
import { useNavigate } from "react-router-dom";
import projects from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import Stats from "../components/Stats";
import "../App.css";

function Home() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");

  const domains = ["All", ...new Set(projects.map(p => p.domain))];

  const filteredProjects = projects.filter(project => {

    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.domain.toLowerCase().includes(search.toLowerCase()) ||
      project.plant.toLowerCase().includes(search.toLowerCase());

    const matchesDomain =
      domain === "All" || project.domain === domain;

    return matchesSearch && matchesDomain;

  });

  const featured =
    filteredProjects.length > 0
      ? filteredProjects[0]
      : projects[0];

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
          onChange={(e)=>setSearch(e.target.value)}
        />

      </nav>

      <Stats />

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
              onClick={()=>navigate(`/project/${featured.id}`)}
            >
              ▶ Watch Video
            </button>

            <button
              className="secondary"
              onClick={()=>navigate(`/project/${featured.id}`)}
            >
              More Information
            </button>

          </div>

        </div>

      </section>

      <section className="projects">

        <div
          style={{
            display:"flex",
            gap:"10px",
            flexWrap:"wrap",
            marginBottom:"25px"
          }}
        >

          {domains.map(item=>(
            <button
              key={item}
              onClick={()=>setDomain(item)}
              style={{
                padding:"10px 18px",
                borderRadius:"20px",
                border:"none",
                cursor:"pointer",
                background:
                  domain===item
                  ? "#2563EB"
                  : "#1F2937",
                color:"white"
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

          {filteredProjects.map(project=>(
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