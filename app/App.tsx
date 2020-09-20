import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './Router';

const App: React.FC = () => {
	return (
		<Switch>
			{routes.map(({ component, ...route }: any, index: number) => {
				return <Route key={index} component={component} {...route} />;
			})}
		</Switch>
	);
};

export default App;
