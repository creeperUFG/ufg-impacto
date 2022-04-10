import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Projects from './pages/Projects';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Projects}/>
            </Switch>
        </BrowserRouter>
    );
}

