import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

import {LanguageContext, languages} from './languagesContext/LanguageContext';
import {HEADER, BUTTONS, RESOLUTIONS} from "../../constants/constants";

class HeaderC extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            hasScroll: false
        };

        this.toggleMenuBtn = React.createRef();
        this.header = React.createRef();
        this.brand = React.createRef();
        this.contacts = React.createRef();
        this.info = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('scroll', this.fixedHeaderChanges);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.fixedHeaderChanges);
    }

    switchLanguage = (e) => {

        let currentLng = e.target.value;

        if (currentLng === languages.bg) {
            this.context.updateLanguage(languages.bg);
        } else {
            this.context.updateLanguage(languages.en);
        }
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

    fixedHeaderChanges = () => {

        let header = this.header.current;
        let brand = this.brand.current;
        let contacts = this.contacts.current;

        if (!this.state.hasScroll) {
            if (window.scrollY > 1) {

                this.setState({
                    hasScroll: !this.state.hasScroll
                }, () => {

                    header.classList.add('fixed');

                    this.moveLeft(brand, 150, 0.3);
                    this.fadeOut(contacts, 0);

                })
            }
        } else {
            if (window.scrollY <= 1) {

                this.setState({hasScroll: !this.state.hasScroll}, () => {

                    header.classList.remove('fixed');

                    this.moveRight(brand, 0, 0.3);

                    if (window.innerWidth >= RESOLUTIONS.sm) {
                        setTimeout(() => {
                            this.fadeIn(contacts, 300)
                        }, 0)
                    }
                })
            }
        }
    }

    fadeOut = (el, time) => {

        window.requestAnimationFrame(function () {
            el.style.transition = 'opacity ' + time + 'ms';
            el.style.opacity = 0;
        });
    };

    fadeIn = (el, time) => {
        window.requestAnimationFrame(function () {
            el.style.transition = 'opacity ' + time + 'ms';
            el.style.opacity = 1;
        });
    };

    moveLeft = (el, perCent, time) => {
        window.requestAnimationFrame(function () {
            el.style.transform = `translateX(-${perCent}%)`;
            el.style.transition = time + 's ease-out';
        });
    }

    moveRight = (el, perCent, time) => {
        window.requestAnimationFrame(function () {
            el.style.transform = `translateX(${perCent}%)`;
            el.style.transition = time + 's ease-out';
        });
    }



    render() {

        let activeLanguage = this.context.language;

        // Change button language
        let btnLng = activeLanguage === 'bg' ? languages.en : languages.bg;

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


        return (
            <header id="header" ref={this.header}>

                <Link to="/" id="brand" aria-label={'Logo'} ref={this.brand}>
                    <img id='brand' alt='logo' src='/images/LORISHTE.png'/>
                </Link>

                <div className='info'>
                    <div className='contacts' ref={this.contacts}>
                        <span className='name'>{HEADER.name[activeLanguage]}</span>
                        <span>&bull;</span>
                        <span className='phone'><a href={'tel:' + HEADER.phone.en}>{HEADER.phone[activeLanguage]}</a></span>
                        <span>&bull;</span>
                        <span className='email'><a href={'mailto:' + HEADER.email}>{HEADER.email}</a></span>
                    </div>

                    <button id="lng-btn"
                            aria-label="Change language"
                            className='btn btn-default sm'
                            value={btnLng}
                            onClick={this.switchLanguage}>
                        {btnLng}
                    </button>
                </div>

                {/*{toggleBtn}*/}


            </header>
        );
    }
}

// To fix mistake index.js:1452 Warning: withRouter(Header): Function components do not support contextType.
const Header = withRouter(HeaderC);
Header.WrappedComponent.contextType = LanguageContext;
export default Header;