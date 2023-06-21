// import Body from './Components/body';
import Navbar from './Components/navbar';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Body from './Components/body';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppLayout() {
	return (
		<>
			{' '}
			<ToastContainer />
			<Navbar />
			<Outlet />
			{/* <Body /> */}
		</>
	);
}

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <AppLayout />,
			children: [
				{
					path: '/',
					element: <Body />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default App;
