import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

class FileDetail extends Component {
	state = {
		data: {},
		error: ''
	};
	async componentDidMount() {
		try {
			const response = await axios.get(`http://localhost:4000/api/files/${this.props.match.params.id}`);
			this.setState({ data: response.data });
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				this.setState({ error: ex.response.data });
			}
		}
	}
	downloadHandler = async (fileIndex) => {
		const file = fileIndex.filename;
		const data = {
			filename: file
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
		const { data } = this.state;
		return (
			<div className="container mt-5">
				<h2 className="h2">Download File</h2>
				{this.state.error ? (
					<div className="alert alert-danger">{this.state.error}</div>
				) : (
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>File</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{data.originalname}</td>
								<th>
									<button
										className="btn btn-outline-primary btn-sm"
										onClick={() => this.downloadHandler(data)}
									>
										Download
									</button>
								</th>
							</tr>
						</tbody>
					</table>
				)}
			</div>
		);
	}
}

export default FileDetail;
