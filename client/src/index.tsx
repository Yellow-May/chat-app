import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import AppProvider from 'context/store';
import reportWebVitals from 'services/reportWebVitals';
import 'styles/globalStyles.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AppProvider>
				<App />
			</AppProvider>
		</BrowserRouter>
	</React.StrictMode>
);

reportWebVitals(console.log);
