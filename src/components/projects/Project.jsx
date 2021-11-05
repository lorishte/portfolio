import React from 'react';
import {LanguageContext} from '../common/languagesContext/LanguageContext';
import {Link} from "react-router-dom";

// Partials
import ImagePreview from './partials/ImagePreview';
import ImageGallery from './partials/ImageGallery';
import VideoGallery from "./partials/VideoGallery";


// Constants
import {PROJECTS} from "../../constants/projectsInfo";
import {CLIENTS} from "../../constants/constants";


class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: {},

            selectedImage: '',

            hasScroll: false,

            loading: true
        };

        this.image = React.createRef();
    }

    projectUrl = this.props.match.params.name;

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        document.addEventListener('scroll', this.changeText);
        this.loadProject();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
        document.addEventListener('scroll', this.changeText);
    }


    loadProject = () => {

        let project = PROJECTS.filter(p => p.url === this.projectUrl)[0]

        this.setState({
                project: project,
                loading: false
            }
        )
        sessionStorage.setItem('currentUrl', this.projectUrl)

    };

    handleKeyPress = (e) => {

        if (e.key === 'ArrowLeft') this.showProject('prev');

        if (e.key === 'ArrowRight') this.showProject('next');

    };

    showProject = (direction) => {

        let projectIndex = PROJECTS.indexOf(this.state.project);

        let url = ''

        if (direction === 'prev' && projectIndex > 0) {
            url = '/projects/' + PROJECTS[projectIndex - 1].url
        } else if (direction === 'next' && projectIndex < PROJECTS.length - 1) {
            url = '/projects/' + PROJECTS[projectIndex + 1].url
        } else {
            return
        }

        this.props.history.push(url)

    }

    showPreview = (e) => {
        let image = e.target.getAttribute('name');
        this.setState({selectedImage: image});

        document.removeEventListener('keydown', this.handleKeyPress);
    };

    hidePreview = () => {
        this.setState({selectedImage: ''});
        document.addEventListener('keydown', this.handleKeyPress);

    };


    render() {

        if (this.state.loading) return (<div className="lds-dual-ring"/>);

        let activeLanguage = this.context.language;

        let project = this.state.project;

        let projectIndex = PROJECTS.indexOf(project);
        let nextProjectUrl = '/';
        let prevProjectUrl = '/';

        if (projectIndex < PROJECTS.length - 1) {
            nextProjectUrl = '/projects/' + PROJECTS[projectIndex + 1].url
        }

        if (projectIndex > 0) {
            prevProjectUrl = '/projects/' + PROJECTS[projectIndex - 1].url;
        }

        let prevBtnStyle = projectIndex > 0 ? '' : ' disabled'
        let nextBtnStyle = projectIndex < PROJECTS.length - 1 ? '' : ' disabled'


        let info =
            (<div className='project-info'>

                <div>
                    <p className='client'>{CLIENTS[project.client_id][activeLanguage]}</p>
                    <p className='description'>{project.description[activeLanguage]}</p>
                    <p className='year'>{project.year}</p>
                </div>

                <div className='btnControls'>
                    <Link to={prevProjectUrl} id='prevBtn' className={'btn btn-default sm' + prevBtnStyle}>prev</Link>
                    <Link to={nextProjectUrl} id='nextBtn' className={'btn btn-default sm' + nextBtnStyle}>next</Link>
                </div>
            </div>)


        return (
            <div id="project" className="container">

                {/*{buttons}*/}


                {this.state.selectedImage !== '' &&
                <ImagePreview image={this.state.selectedImage}
                              projectFolder={project.projectFolder}
                              allImages={project.images}
                              activeLanguage={activeLanguage}
                              onClose={this.hidePreview}/>
                }


                {this.state.project.images.length > 0 &&
                <ImageGallery images={project.images}
                              columns={project.galleryColumns}
                              projectFolder={project.projectFolder}
                              showPreview={this.showPreview}
                              language={activeLanguage}
                              changeState={this.changeState}/>
                }

                {this.state.project.videos.length > 0 &&
                <VideoGallery videos={project.videos}
                              projectFolder={project.projectFolder}/>
                }


                {info}


            </div>
        );
    }

}

Project.contextType = LanguageContext;

export default Project;

