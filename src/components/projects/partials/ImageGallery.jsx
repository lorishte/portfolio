import React from 'react';
import PropTypes from 'prop-types';
import posed from "react-pose";


const GalleryContainer = posed.div({
    enter: {
        opacity: 1,
        delay: 0,
        beforeChildren: true,
        transition: {
            opacity: {ease: 'easeIn', duration: 200, delay: 100},
        },
    },
    exit: {
        opacity: 0,
        transition: {
            opacity: {ease: 'easeOut', duration: 300},
        },
    },
});

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {

        let gallery = this.props.images.map((image, i) => {

            let name = 'img' + i;

            this[name] = React.createRef();

            return (
                <div key={name} className='img-container'>
                    <figure className="image"
                            ref={this[name]}
                            // onLoad={() => {
                            //     let img = this[name].current;
                            //
                            //     // Display landscape images on 2 columns
                            //     if (img.clientWidth > img.clientHeight) {
                            //         img.parentNode.classList.add('landscape');
                            //     }
                            // }}
                    >
                        <img src={'/images/projects/' + this.props.projectFolder + '/' + image}
                             className="img-fit"
                             alt={image}
                             name={image}
                             onClick={this.props.showPreview}/>

                    </figure>

                </div>
            );
        });

        let numberOfColumns = this.props.columns === '2' ? ' twoCols' : '';

        return (
            <GalleryContainer id="project-gallery" className={'gallery' + numberOfColumns}>
                {gallery}
            </GalleryContainer>
        );
    }
}

export default ImageGallery;

ImageGallery.propTypes = {
    images: PropTypes.array,
    columns: PropTypes.string,
    language: PropTypes.string,
    sections: PropTypes.object,
    projectFolder: PropTypes.string,
    showPreview: PropTypes.func,
    direction: PropTypes.string,
    changeState: PropTypes.func
};