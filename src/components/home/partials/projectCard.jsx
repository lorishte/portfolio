import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// Constants
import {CLIENTS, RESOLUTIONS} from "../../../constants/constants";

// Utils
import UTILS from '../../../utils/utils'


class ProjectCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isMobile: false,
        };

    }

    componentDidMount() {
        this.checkResolution();
        window.addEventListener('resize', this.checkResolution);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkResolution);
    }

    checkResolution = () => {
        if (window.innerWidth <= RESOLUTIONS.sm) {
            this.setState({isMobile: true})
        } else {
            this.setState({isMobile: false})
        }
    }

    render() {
        let {project, activeLanguage} = this.props;

        let imageUrl =
            this.state.isMobile ?
                UTILS.generateUrl(project.projectFolder, project.mobileThumbnail) :
                UTILS.generateUrl(project.projectFolder, project.thumbnail)

        let client_id = project.client_id

        let client = CLIENTS[client_id][activeLanguage]

        return (
            <div className='project-card'>
                <Link to={'/projects/' + project.url}
                      aria-label={project.name[activeLanguage]}>

                    <figure className="img-container">
                        <img className="thumbnail" src={imageUrl} alt={project.name[activeLanguage]}/>
                    </figure>

                    <div className="project-info">

                        <div>
                            <p className='client'>{client}</p>
                            <p className='project-description'>{project.description[activeLanguage]}</p>
                        </div>

                    </div>

                </Link>
            </div>
        );
    }

}

export default ProjectCard;

ProjectCard.propTypes = {
    project: PropTypes.object,
    activeLanguage: PropTypes.string,
};