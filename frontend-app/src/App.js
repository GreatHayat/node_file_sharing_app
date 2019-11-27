import React from 'react';
import { Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Navbar from './components/navbar';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';
import DashBoard from './components/dashboard';
import Logout from './components/logout';
import UploadFiles from './components/uploadFiles';
import UploadedFilesList from './components/uploaded_files_list';
import FileDetail from './components/fileDetail';
import OtherUserFileUpload from './components/otherUsers';
import PrivateRoute from './commons/privateRoute';

class App extends React.Component {
	state = {};
	componentDidMount() {
		try {
			const token = localStorage.getItem('token');
			const user = jwtDecode(token);
			this.setState({ user });
		} catch (ex) {}
	}
	render() {
		return (
			<div className="App">
				<Navbar user={this.state.user} />
				<Switch>
					<Route path="/register" component={RegisterForm} />
					<Route path="/login" component={LoginForm} />
					<Route path="/logout" component={Logout} />
					<PrivateRoute path="/dashboard" component={DashBoard} />
					<PrivateRoute path="/upload_files" component={UploadFiles} />
					<PrivateRoute path="/uploaded_files" component={UploadedFilesList} />
					<Route path="/file_download/:id" component={FileDetail} />
					<PrivateRoute path="/other_users_files" component={OtherUserFileUpload} />
				</Switch>
			</div>
		);
	}
}

export default App;
