import React from 'react';

import { LanguageContext, languages } from './components/common/languagesContext/LanguageContext';


// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Routes from './components/routes/Routes';

// Constants
import {RESOLUTIONS} from "./constants/constants";

// CSS
import './css/main.css';
import './css/styles.css';
import './css/responsive.css';


class App extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            language: languages.bg,
            hasScrolled: false
        };

        this.scrollTopBtn = React.createRef();
        this.main = React.createRef();
    }

    updateLanguage = (language) => {
        this.setState({language: language});
    };

    componentDidMount () {
        document.addEventListener('scroll', this.makeVisualChanges);
    }

    componentWillUnmount () {
        document.removeEventListener('scroll', this.makeVisualChanges);
    }

    componentWillUpdate (nextProps, nextState, nextContext) {
        this.goToTop();
    }

    makeVisualChanges = () => {
        this.showHideBtn();
        // this.changeBackgroundColor();
    }

    showHideBtn = () => {

        let scrollTopBtn = this.scrollTopBtn.current;
        let mainContainer = this.main.current;


        if (window.scrollY > window.innerHeight - 500) {
            scrollTopBtn.classList.add('visible');

            // Add more distance from bottom of page because of footer

            if (window.innerWidth <= RESOLUTIONS.sm) {
                if (window.scrollY + window.innerHeight >= mainContainer.clientHeight) {
                    scrollTopBtn.classList.add('bottom');
                } else {
                    scrollTopBtn.classList.remove('bottom');
                }
            }

        } else {
            scrollTopBtn.classList.remove('visible');
        }
    };

    changeBackgroundColor = () => {
        let mainContainer = this.main.current;

        if (window.scrollY > 0) {
            window.requestAnimationFrame(function () {
                mainContainer.style.background = '#ddd';
                mainContainer.style.transition = '.3s';
            });
        } else {
            mainContainer.style.background = '#fff'
        }

    }

    goToTop = () => {
        window.scroll({top: 0, left: 0});
    };

    scrollTop = () => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    };

    render () {

        let activeLanguage = this.state.language;

        return (

            <LanguageContext.Provider value={{language: activeLanguage, updateLanguage: this.updateLanguage}}>

                <Header/>

                <main ref={this.main}>

                    <Routes/>

                    <button id='go-to-top-btn'
                            ref={this.scrollTopBtn}
                            className='btn btn-default sm'
                            aria-label="Go to top"
                            onClick={this.scrollTop}>
                        <i className="fa fa-arrow-up" aria-hidden="true"/>

                    </button>

                </main>

                {window.innerWidth < RESOLUTIONS.sm &&
                <Footer/>
                }


            </LanguageContext.Provider>

        );
    }
}

export default App;
