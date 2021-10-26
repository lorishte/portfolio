import React from 'react';
import {LanguageContext} from '../common/languagesContext/LanguageContext';


class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let activeLanguage = this.context.language;

        return (
            <div id="projects" className="container-fluid">

            </div>
        );
    }

}

NotFound.contextType = LanguageContext;

export default NotFound;

