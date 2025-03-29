import { createBrowserRouter } from 'react-router-dom';
import App from './Components/App/App';
import LogIn from './Components/LogIn/LogIn';
// import Post from './components/Post/Post';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: 'session',
        element: <LogIn />
    }
]);

export { router };