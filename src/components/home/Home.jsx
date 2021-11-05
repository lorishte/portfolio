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
            projects: PROJECTS,
        };

    }


    render() {

        let activeLanguage = this.context.language;

        let projects = this.state.projects
            .filter(p => !p.isBlocked)
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .map(p => {
                return (
                    <ProjectCard key={p._id}
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

