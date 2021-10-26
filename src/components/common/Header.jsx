import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';

import {LanguageContext, languages} from './languagesContext/LanguageContext';

class HeaderC extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggleMenuBtn = React.createRef();
        this.mainNav = React.createRef();
    }


    toggleNav = () => {
        let toggleBtn = this.toggleMenuBtn.current;

        this.setState({isOpen: !this.state.isOpen});

        if (toggleBtn.classList.contains('clicked')) {
            toggleBtn.classList.remove('clicked');
            return;
        }

        toggleBtn.classList.add('clicked');
    };


    render() {

        let activeLanguage = this.context.language;

        let toggleBtn = (
            <button id="toggle-menu-btn"
                    aria-label="Toggle menu"
                    className="btn sm"
                    ref={this.toggleMenuBtn}
                    onClick={this.toggleNav}>
                <span className="toggle"/>
                <span className="toggle"/>
                <span className="toggle"/>
            </button>
        );

        let language = activeLanguage === languages.bg ? '' : '/' + activeLanguage;

        return (
            <header id="header">

                <Link to="/" id="brand" aria-label={'Logo'}/>

                <button id="lang-btn"
                        aria-label="Change language"
                        value={activeLanguage}>
                </button>

                {toggleBtn}

           </header>
        );
    }
}

// To fix mistake index.js:1452 Warning: withRouter(Header): Function components do not support contextType.
const Header = withRouter(HeaderC);
Header.WrappedComponent.contextType = LanguageContext;
export default Header;