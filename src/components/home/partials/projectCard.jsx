import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// Constants
import {BUTTONS} from "../../../constants/constants";

// Utils
import UTILS from '../../../utils/utils'


function ProjectCard(props) {

    let {project, activeLanguage} = props;

    let pathLang = activeLanguage === 'en' ? '/' + activeLanguage : '';

    let imageUrl = UTILS.generateUrl(project.projectFolder, project.thumbnail);

    return (
        <div className='project-card'>
            <Link to={pathLang + '/projects/' + project.url}
                  aria-label={project.name[activeLanguage]}>

                <figure className="img-container">
                    <img className="img-fit" src={imageUrl} alt={project.name[activeLanguage]}/>
                </figure>

                <div className="project-info">

                    <p className='project-name'>{project.name[activeLanguage]}</p>
                    <p className='project-description'>{project.description[activeLanguage]}</p>

                    <button className="btn"
                            aria-label={BUTTONS[activeLanguage].more}>{BUTTONS[activeLanguage].more}</button>
                </div>

            </Link>
        </div>
    );

}

export default ProjectCard;

ProjectCard.propTypes = {
    project: PropTypes.object,
    activeLanguage: PropTypes.string,
};