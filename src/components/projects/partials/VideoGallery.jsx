import React from 'react';
import PropTypes from 'prop-types';
import UTILS from "../../../utils/utils";

class VideoGallery extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			volume: .5
		};

		this.container = React.createRef();
	}

	componentDidMount () {
		this.setVolumeOnPlayers();
	}


	componentWillUnmount () {
		window.removeEventListener('resize', this.moveGalleryToStart);
	}


	setVolumeOnPlayers = () => {

		for (let i = 0; i < this.props.videos.length; i++) {

			let name = 'video' + i;
			let video = this[name].current;
			video.volume = this.state.volume;

			video.onvolumechange = (e) => {this.saveVolumeValue(e);};
		}
	};

	saveVolumeValue = (e) => {
		let newVolume = e.target.volume;
		this.setState({volume: newVolume});

		this.changeVolume();
	};

	changeVolume = () => {
		for (let i = 0; i < this.props.videos.length; i++) {

			let name = 'video' + i;
			let video = this[name].current;
			video.volume = this.state.volume;
		}
	};

	stopOtherVideos = (e) => {

		let videoName = e.target.getAttribute('data-target-name');

		for (let i = 0; i < this.props.videos.length; i++) {

			let name = 'video' + i;

			if (name === videoName) continue;

			let video = this[name].current;

			if (!video.paused) video.pause();
		}
	};

	render () {


		let videos = this.props.videos.map((video, i) => {

			let name = 'video' + i;

			this[name] = React.createRef();

			let videoUrl = UTILS.generateUrl(this.props.projectFolder, video.url);
			let posterUrl = UTILS.generateUrl(this.props.projectFolder, video.poster);

			console.log(posterUrl)

			return (
				<div key={videoUrl} className='video-container'>

					<video poster={posterUrl}
					       data-target-name={name}
					       className='video'
					       controls
						   autoPlay
					       controlsList="nodownload"
					       onPlay={this.stopOtherVideos}
					       ref={this[name]}>
						<source src={videoUrl} type="video/mp4"/>
					</video>

				</div>
			);

		});

		return (

				<div id='video-gallery' ref={this.container}>
					{videos}
				</div>

		);
	}
}

export default VideoGallery;

VideoGallery.propTypes = {
	videos: PropTypes.array,
	projectFolder: PropTypes.string,
};