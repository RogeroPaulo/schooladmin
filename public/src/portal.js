import React from "react";
import ReactDOM from "react-dom";

import PortalRouter from "./router/PortalRouter";
import './styles/portal.scss';

try
{
    ReactDOM.render(
        <React.Fragment>
            <PortalRouter/>
        </React.Fragment>, document.getElementById('root'));
}
catch (err){
    console.log(err);
}
