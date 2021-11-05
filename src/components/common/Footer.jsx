import React from 'react';
import {LanguageContext} from './languagesContext/LanguageContext';

import {HEADER} from "../../constants/constants";


class Footer extends React.Component {

    render() {

        let activeLanguage = this.context.language;

        return (
            <footer>
                <span className='name'>{HEADER.name[activeLanguage]}</span>
                <span className='phone'><a href={'tel:' + HEADER.phone.en}>{HEADER.phone[activeLanguage]}</a></span>
                <span>&bull;</span>
                <span className='email'><a href={'mailto:' + HEADER.email}>{HEADER.email}</a></span>
            </footer>
        );
    }
}

Footer.contextType = LanguageContext;

export default Footer;
