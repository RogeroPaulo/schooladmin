import React from "react";
import ReactDOM from "react-dom";

import Router from "./router";
import './styles/index.scss';

try
{
    ReactDOM.render(
		<React.Fragment>
			<Router/>
		</React.Fragment>, document.getElementById('root')
	);
}
catch (err){
    console.log(err);
}