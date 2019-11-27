import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
	return (
		<div>
			<ul className="list-group">
				<li className="list-group-item">
					<Link to="/upload_files">Upload Files</Link>
				</li>
				<li className="list-group-item">
					<Link to="/uploaded_files">My Uploaded Files</Link>
				</li>
				<li className="list-group-item">
					<Link to="/other_users_files">Other Users Uploaded Files</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navigation;
