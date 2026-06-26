import { useNavigate } from "react-router-dom";

function ProjectCard({ project }) {

  const navigate = useNavigate();

  return (

    <div
      className="card"
      onClick={() => navigate(`/project/${project.id}`)}
    >

      <div className="thumb">

        <div className="statusBadge">
          {project.status}
        </div>

        <button className="playButton">
          ▶
        </button>

      </div>

      <div className="cardContent">

        <h3>{project.title}</h3>

        <p className="plant">{project.plant}</p>

        <p className="domain">{project.domain}</p>

      </div>

    </div>

  );

}

export default ProjectCard;