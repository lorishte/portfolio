import React from 'react';
import {LanguageContext} from '../common/languagesContext/LanguageContext';


// Partials
import ImagePreview from './partials/ImagePreview';
import ImageGallery from './partials/ImageGallery';



// Constants
import {PROJECTS} from "../../constants/projectsInfo";

class Project extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: {},

            selectedImage: '',

            direction: '',

            loading: true
        };

        this.image = React.createRef();
    }

    projectId = this.props.match.params.id;

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);

        this.loadProject();
    }

    componentWillReceiveProps(nextProps, nextContext) {

        // To reload page when select different project

        if (this.props.match.params.id !== nextProps.match.params.id) {

            this.setState({loading: true});

            this.projectId = nextProps.match.params.id;

            this.loadProject();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (e) => {

        if (e.key === 'ArrowLeft') this.changeState('left');

        if (e.key === 'ArrowRight') this.changeState('right');

        if (e.key === 'Escape') this.changeState('');
    };

    changeState = (direction) => {
        this.setState({direction});
    };

    loadProject = () => {

        let project = PROJECTS.filter(p => p.url === this.projectId)[0]

        this.setState({
                project: project,
                loading: false
            }
        )
    };

    showPreview = (e) => {
        let image = JSON.parse(e.target.getAttribute('data-target'));
        this.setState({selectedImage: image});
        document.removeEventListener('keydown', this.handleKeyPress);
    };

    hidePreview = () => {
        this.setState({
            selectedImage: '',
            direction: ''
        });
        document.addEventListener('keydown', this.handleKeyPress);
    };

    render() {

        if (this.state.loading) return (<div className="lds-dual-ring"/>);

        let activeLanguage = this.context.language;

        let project = this.state.project;

        let sections = this.state.allSections;


        return (
            <div id="project-story" className="container-fluid">


                {this.state.selectedImage !== '' &&
                <ImagePreview image={this.state.selectedImage}
                              projectFolder={project.projectFolder}
                              allImages={project.images}
                              activeLanguage={activeLanguage}
                              onClose={this.hidePreview}/>
                }



                {this.state.project.images.length > 0 &&
                <ImageGallery images={project.images}
                              projectFolder={project.projectFolder}
                              sections={sections}
                              showPreview={this.showPreview}
                              direction={this.state.direction}
                              language={activeLanguage}
                              changeState={this.changeState}/>
                }

            </div>
        );
    }

}

Project.contextType = LanguageContext;

export default Project;

