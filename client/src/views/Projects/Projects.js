import React from 'react';
import './Projects.css';

const PROJECT_API = '/api/project';
class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = { projects: [] };
    }

    //Get Projects from API as an array.
    componentDidMount() {
        fetch(PROJECT_API)
        .then(response => response.json())
        .then(response => this.setState({ projects: response }))
        .catch(err => {
            console.log("Error fetching Projects:" + err);
        });
    }

	render() {

        const { projects } = this.state;

        //Sort Projects by date, render each project object, store in projectList variable.
        const projectList = projects.sort(function (a, b) {
            return parseInt(Date.parse(b.displayed_date)) - parseInt(Date.parse(a.displayed_date))  //Sort with most recent date first.
          }).map(project => {

            return (
                <div className="grid-containerP">
                    <div className="project-item">
                        <tr key={project._id}>
                            <div className="project-title">
                                <td><h2>{project.title}</h2></td>
                            </div>
                            <div className="project-info">
                            <img alt="" src={project.image} />
                                <td>{project.text}</td>
                            </div>
                            <div>
                                <td>{project.displayed_date}</td>
                            </div>
                            <div>
                                <a href={project.doc_link}>Document Link</a>
                            </div>
                        </tr>
                    </div>
                </div>
            );
        });

        //Return projectList variable of rendered projects.
        return (
            <div>{projectList}</div> 
        );
	}
}
export default Project;