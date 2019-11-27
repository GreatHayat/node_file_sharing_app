import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = (props) => {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container">
					<a className="navbar-brand" href="#">
						File Sharing App!
					</a>
					<ul className="navbar-nav">
						<li className="nav-item active">
							<Link to="/upload_files" className="nav-link">
								Upload Files
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav float-right">
						{!props.user && (
							<React.Fragment>
								<Link to="/register" className="btn btn-primary">
									Register
								</Link>
								<Link to="/login" className="btn btn-primary ml-3">
									Login
								</Link>
							</React.Fragment>
						)}
						{props.user && (
							<React.Fragment>
								<Link to="/register" className="btn btn-primary">
									{props.user.username}
								</Link>
								<Link to="/logout" className="btn btn-primary ml-3">
									Logout
								</Link>
							</React.Fragment>
						)}
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
