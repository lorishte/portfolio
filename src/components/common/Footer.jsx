import React from 'react';
import { Link } from 'react-router-dom';

import { LanguageContext, languages } from './languagesContext/LanguageContext';


class Footer extends React.Component {

    render () {

        let activeLanguage = this.context.language;

        let language = activeLanguage === languages.bg ? '' : '/' + activeLanguage;

        let year = new Date().getFullYear();

        return (
            <footer>

                <p id='copy'>&copy;&nbsp;{year}&nbsp;}</p>

                <section id='social-media'>
                    <a href='https://www.facebook.com/ADDICT-Brand-Storyteller-110330240309410/'
                       aria-label={'Visit our Facebook page'}
                       target='_blank' rel='noopener noreferrer'>
                        <i className="fa fa-facebook-official" aria-hidden="true"/>
                    </a>

                    <a href='https://www.instagram.com/addict_brand_storyteller/'
                       aria-label={'Visit our Instagram page'}
                       target='_blank' rel='noopener noreferrer'>
                        <i className="fa fa-instagram" aria-hidden="true"/>
                    </a>
                </section>


            </footer>
        );
    }
}

Footer.contextType = LanguageContext;

export default Footer;
