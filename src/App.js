import React from 'react';

import { LanguageContext, languages } from './components/common/languagesContext/LanguageContext';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Routes from './components/routes/Routes';

// CSS
import './css/main.css';
import './css/styles.css';



class App extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            language: languages.bg,
        };

    }

    updateLanguage = (language) => {
        this.setState({language: language});
    };



    render () {

        let activeLanguage = this.state.language;

        return (

            <LanguageContext.Provider value={{language: activeLanguage, updateLanguage: this.updateLanguage}}>

                <Header/>


                <Routes/>


                <Footer/>

            </LanguageContext.Provider>

        );
    }
}

export default App;
