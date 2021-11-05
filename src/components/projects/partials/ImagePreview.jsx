import React from 'react';
import PropTypes from 'prop-types';


class ImagePreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: '',

            allImages: this.props.allImages,

            touchStartPosition: 0,
            touchEndPosition: 0
        };

        this.image = React.createRef();
        this.previewContainer = React.createRef();
    }

    componentDidMount() {
        this.setState({
            image: this.props.image,
            allImages: this.props.allImages
        })

        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = (e) => {

        if (e.key === 'ArrowLeft') this.showPrevImage();

        if (e.key === 'ArrowRight') this.showNextImage();

        if (e.key === 'Escape') this.closeGallery();
    };

    showNextImage = () => {

        let image = this.image.current;

        let allImages = this.state.allImages;

        let index = this.getIndex() + 1;

        if (index >= allImages.length) {
            index = 0
        }

        this.fadeOut(image);

        this.saveNewImage(index, image)
    };

    showPrevImage = () => {

        let image = this.image.current;

        let index = this.getIndex() - 1;

        if (index < 0) {
            index = this.state.allImages.length - 1;
        }

        this.fadeOut(image);
        this.saveNewImage(index, image);
    };

    getIndex = () => {
        return this.state.allImages.indexOf(this.state.image);
    }

    saveNewImage = (index, image) => {

        setTimeout(() => {
            this.setState({image: this.state.allImages[index]});
            this.fadeIn(image);
        }, 600);
    }

    fadeOut = (el) => {

        window.requestAnimationFrame(function () {
            el.style.transition = 'opacity 400ms';
            el.style.opacity = 0;
        });
    };

    fadeIn = (el) => {

        window.requestAnimationFrame(function () {
            el.style.transition = 'opacity 1200ms';
            el.style.opacity = 1;
        });
    };

    closeGallery = () => {
        this.fadeOut(this.previewContainer.current);
        setTimeout(() => {
            this.props.onClose();
        }, 600);
    }

    onTouchStart = (e) => {

        let touchStart = e.changedTouches[0].clientX;

        this.setState({touchStartPosition: touchStart});

    };

    onTouchEnd = (e) => {

        let touchEnd = e.changedTouches[0].clientX;

        this.setState({touchEndPosition: touchEnd}, () => {

            let startPosition = this.state.touchStartPosition;
            let endPosition = this.state.touchEndPosition;

            if (startPosition >= endPosition) {
                this.showNextImage();
            } else {
                this.showPrevImage();
            }
        });

    };

    render() {

        let imageUrl = '/images/projects/' + this.props.projectFolder + '/' + this.state.image;

        return (
            <div id='image-preview' onTouchEnd={this.onTouchEnd} onTouchStart={this.onTouchStart} ref={this.previewContainer}>

                <figure className="image">
                    <img src={imageUrl}
                         className="img-fit"
                         alt={this.state.image}
                         ref={this.image}/>
                </figure>

                <div className="gallery-navigation">

                    <button className={'btn btn-default'}
                            aria-label={'Show previous image'}
                            onClick={this.showPrevImage}>
                        <i className="fa fa-arrow-left" aria-hidden="true"/>
                        {/*<img src='/images/buttons/arrow-left-white.svg' alt='close button'/>*/}
                    </button>
                    <button className={'btn btn-default'}
                            aria-label={'Show next image'}
                            onClick={this.showNextImage}>
                        <i className="fa fa-arrow-right" aria-hidden="true"/>
                        {/*<img src='/images/buttons/arrow-right-white.svg' alt='close button'/>*/}
                    </button>
                </div>

                <button id='close-btn' className="btn btn-default" aria-label={'Close'} onClick={this.closeGallery}>
                    <i className="fa fa-times" aria-hidden="true"/>
                    {/*<img src='/images/buttons/close-btn-white.svg' alt='close button'/>*/}
                </button>
            </div>
        );
    }
}

export default ImagePreview;

ImagePreview.propTypes = {
    image: PropTypes.string,
    projectFolder: PropTypes.string,
    allImages: PropTypes.array,
    activeLanguage: PropTypes.string,
    onClose: PropTypes.func,
    // direction: PropTypes.string
};