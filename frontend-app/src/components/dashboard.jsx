import React, { Component } from 'react';
import Navigation from './navigation';

class DashBoard extends Component {
	render() {
		return (
			<div className="container mt-5">
				<h2 className="h2">User Dashboard!</h2>
				<div className="row">
					<div className="col-md-3">
						<Navigation />
					</div>
				</div>
			</div>
		);
	}
}

export default DashBoard;
