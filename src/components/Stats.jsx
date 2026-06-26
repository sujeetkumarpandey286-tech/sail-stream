import projects from "../data/projects";

function Stats() {

    const projectCount = projects.length;

    const plantCount =
        new Set(projects.map(p => p.plant)).size;

    const domainCount =
        new Set(projects.map(p => p.domain)).size;

    return (

        <div className="statsContainer">

            <div className="statCard">

                <h1>{projectCount}</h1>

                <p>Projects</p>

            </div>

            <div className="statCard">

                <h1>{plantCount}</h1>

                <p>Plants</p>

            </div>

            <div className="statCard">

                <h1>{domainCount}</h1>

                <p>Domains</p>

            </div>

            <div className="statCard">

                <h1>{projectCount}</h1>

                <p>Videos</p>

            </div>

        </div>

    );

}

export default Stats;