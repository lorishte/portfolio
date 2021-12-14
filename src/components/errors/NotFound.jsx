import React from 'react';
import {LanguageContext} from '../common/languagesContext/LanguageContext';

// Partials
import ProjectCard from "../home/partials/projectCard";

// Constants
import {ERROR_PAGE} from "../../constants/constants";
import {PROJECTS} from "../../constants/projectsInfo";


class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let activeLanguage = this.context.language;

        let projects = PROJECTS
            .filter(p => !p.isBlocked)
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .slice(2, 7)
            .map(p => {
                return (
                    <ProjectCard key={p._id}
                                 project={p}
                                 activeLanguage={activeLanguage}/>
                );
            })

        return (
            <div id='error-page' className="container-fluid">
                <div className='container'>
                    <div className='page-header'>
                        <h1 className='headline'>{ERROR_PAGE.headline[activeLanguage]}</h1>
                        <a href='/' className='btn btn-transparent md accent'>{ERROR_PAGE.buttonText[activeLanguage]}</a>
                    </div>


                    {/*<div id="projects">*/}
                    {/*    {projects}*/}
                    {/*</div>*/}
                </div>
            </div>


        );
    }

}

NotFound.contextType = LanguageContext;

export default NotFound;

