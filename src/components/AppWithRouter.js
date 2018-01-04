import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
// vs BrowserRouter

const AppWithRouter = () => (
	<Router>
		<div>
			<div>
				<Link to="/">Home</Link>
				<Link to="/admin">Admin</Link>
				<Link to="/settings">Settings</Link>
			</div>
			<Route exact path="/" component={Home} />
			<Route path="/admin" component={Admin} />
			<Route path="/settings" component={Settings} />
		</div>
	</Router>
);

const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
);

const Admin = () => (
	<div>
		<h2>Admin</h2>
	</div>
);

const Settings = ({ match }) => (
	<div>
		<h2>Settings</h2>
		<ul>
			<li>
				<Link to={`${match.url}/advanced`}>Advanced</Link>
			</li>
			<li>
				<Link to={`${match.url}/normal`}>Normal</Link>
			</li>
			<li>
				<Link to={`${match.url}/basic`}>Basics</Link>
			</li>
		</ul>

		<Route path={`${match.url}/:topicId`} component={Control} />
		<Route
			exact
			path={match.url}
			render={() => <h3>Please select a topic.</h3>}
		/>
	</div>
);

const Control = ({ match }) => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
);

export default AppWithRouter;
