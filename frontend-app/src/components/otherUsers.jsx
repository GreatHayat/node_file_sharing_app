import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Navigation from './navigation';

class OtherUserFileUpload extends Component {
	url = React.createRef();
	state = {
		files: []
	};

	async componentDidMount() {
		try {
			const response = await axios.get('http://localhost:4000/api/files');
			const token = localStorage.getItem('token');
			const user = jwtDecode(token);
			this.setState({ files: response.data.filter((res) => res.tag_user === user.username) });
		} catch (ex) {
			if (ex.response && ex.response.status === 500) {
				console.log(ex.response.statusText);
			}
		}
	}
	downloadHandler = async (fileIndex) => {
		const file = fileIndex.filename;
		const data = {
			filename: file,
			fileId: fileIndex._id
		};
		const response = await axios.post('http://localhost:4000/api/files/download', data, {
			responseType: 'blob',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		saveAs(response.data, file);
	};

	render() {
		return (
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-3">
						<Navigation />
					</div>
					<div className="col-md-9">
						<table className="table table-bordered">
							<thead>
								<tr>
									<th>File Name</th>
									<th>File Type</th>
									<th>Uploaded By</th>
									<th>Tagged By</th>
									<th>Updload Date</th>
									<th>Expire Date</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{this.state.files.length === 0 ? (
									<tr className="bg-info text-center text-white">
										<td colSpan="7">No user yet tagged you in any files</td>
									</tr>
								) : (
									<React.Fragment>
										{this.state.files.map((file) => (
											<tr key={file._id}>
												<td>
													<Link to={`/file_download/${file._id}`}>
														{file.originalname.split('.').slice(0, -1).join('.')}
													</Link>
												</td>
												<td>
													{file.originalname.substring(
														file.originalname.lastIndexOf('.') + 1
													)}
												</td>
												<td>{file.user.username}</td>
												<td>{file.user.username}</td>
												<td>{file.upload_date.substring(0, 10)}</td>
												<td>{file.expire_date.substring(0, 10)}</td>
												<td>
													<button
														className="btn btn-outline-primary btn-sm"
														onClick={() => this.downloadHandler(file)}
													>
														Download
													</button>
												</td>
											</tr>
										))}
									</React.Fragment>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default OtherUserFileUpload;
