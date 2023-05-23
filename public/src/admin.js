import React from "react";
import ReactDOM from "react-dom";

import AdminRouter from "./router/AdminRouter";
import './styles/admin.scss';

try
{
    ReactDOM.render(
        <React.Fragment>
            <AdminRouter/>
        </React.Fragment>, document.getElementById('root'));
}
catch (err){
    console.log(err);
}
