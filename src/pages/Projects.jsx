import { useState, useEffect } from 'react';
import { getProjects } from '../services/projectService';
import Loading from '../components/Loading';


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Calling use effect in Projects');

    async function fetchProjects() {
      const response = await getProjects();
      const { data: projects } = response;
      setProjects(projects);
      setIsLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <>
      {isLoading ? <Loading /> :
        <div className="container">
          <div className="row pt-4">
            <div className="col-sm-2"></div>
            <div className="col-sm-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Open requests</th>
                    <th scope="col">Closed requests</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => {
                    return (<tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                      <td>{project.createdOn}</td>
                      <td>TBA</td>
                      <td>TBA</td>
                      <td>TBA</td>
                    </tr>)
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>}
    </>
   );
}
 
export default Projects;