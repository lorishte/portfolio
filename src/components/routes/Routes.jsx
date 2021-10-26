import React from 'react';
import { Switch, Route } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

// PAGES
import Home from "../home/Home";
import Project from "../projects/Project";

// ERRORS and CONFIRMATIONS
import NotFound from '../errors/NotFound';

const RouteContainer = posed.div({
    enter: {
        opacity: 1,
        delay: 0,
        beforeChildren: true,
        transition: {
            opacity: {ease: 'easeIn', duration: 200, delay: 500},
        },
    },
    exit: {
        opacity: 0,
        transition: {
            opacity: {ease: 'easeOut', duration: 300},
        },
    },
});

let Routes = () => {

    return (

        <Route render={({location}) => (

            <PoseGroup>
                <RouteContainer key={location.key || '200'}>
                    <Switch location={location}>

                        <Route exact path='/' component={Home}/>

                        <Route exact path='/projects/:name/:lng' component={Project}/>

                        <Route path='*' component={NotFound} key='error'/>
                    </Switch>
                </RouteContainer>
            </PoseGroup>

        )}/>
    );
};

export default Routes;

