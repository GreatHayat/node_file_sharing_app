import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Navigation from './navigation';
class UploadFiles extends Component {
	state = {
		selectedFile: '',
		fileName: '',
		message: '',
		tag_user: '',
		logged_userId: ''
	};
	componentDidMount() {
		const token = localStorage.getItem('token');
		const user = jwtDecode(token);
		this.setState({ logged_userId: user._id });
	}
	validate = () => {
		const { fileName, tag_user } = this.state;
		if (fileName.trim() === '') {
			return 'No File Choose to upload';
		}
		if (tag_user.trim() === '') {
			return 'Please Tag a User';
		}
	};
	handleChange = (e) => {
		this.setState({ selectedFile: e.target.files[0], fileName: e.target.files[0].name });
	};
	handleSubmit = async (e) => {
		e.preventDefault();
		const error = this.validate();
		if (error) {
			return;
		}
		const data = new FormData();
		data.append('file', this.state.selectedFile);
		data.append('tag_user', this.state.tag_user);
		data.append('user_id', this.state.logged_userId);
		try {
			const response = await axios.post('http://127.0.0.1:4000/api/files', data, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});
			this.setState({ message: 'File Uploaded Successfully!', fileName: '', tag_user: '' });
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				this.setState({ message: ex.response.data });
			}
		}
	};

	handleTagUser = (e) => {
		this.setState({ tag_user: (e.target.name = e.target.value) });
	};
	render() {
		return (
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-3">
						<Navigation />
					</div>
					<div className="col-md-9">
						{this.state.message && <div className="alert alert-info">{this.state.message}</div>}
						<form onSubmit={this.handleSubmit}>
							<div className="custom-file">
								<input
									type="file"
									className="custom-file-input"
									id="customFile"
									onChange={this.handleChange}
								/>
								<label className="custom-file-label" htmlFor="customFile">
									{this.state.fileName ? this.state.fileName : 'Choose file'}
								</label>
							</div>
							<div className="form-group mt-2">
								<label htmlFor="tag_user" className="label-control">
									Tag a User
								</label>
								<input
									type="email"
									name="tag_user"
									placeholder="Enter the email address to tag a user"
									className="form-control"
									value={this.state.tag_user}
									onChange={this.handleTagUser}
								/>
								<input type="hidden" name="user_id" value={this.state.logged_userId} />
							</div>
							<div className="form-group">
								<button disabled={this.validate()} className="btn btn-primary btn-block mt-2">
									Upload File
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default UploadFiles;
