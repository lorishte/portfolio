import React from 'react';
import {LanguageContext} from '../common/languagesContext/LanguageContext';


// Partials
import ProjectCard from "./partials/projectCard";

// Constants
import {PROJECTS} from "../../constants/projectsInfo";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
        };

    }
    componentDidMount() {
        this.loadProjects()
    }


    loadProjects = () => {
        this.setState({
                projects: PROJECTS,
            }
        )
    }


    render() {

        let activeLanguage = this.context.language;

        let projects = this.state.projects.map(p => {
            return (
                <ProjectCard key={p._id }
                             project={p}
                             activeLanguage={activeLanguage}/>
            );
        })

        return (
            <div id="projects" className="container">
                {projects}
            </div>
        );
    }

}

Home.contextType = LanguageContext;

export default Home;

