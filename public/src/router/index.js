import React, { Component } from "react";

import LandingPage from '../components/LandingPage/';

class ViewRouter extends Component {
    render() {
		return (
			<div
				style={
					{
						background: '#eee'
					}
				}
			>
				<LandingPage/>
			</div>
        );
    }
}

export default ViewRouter;