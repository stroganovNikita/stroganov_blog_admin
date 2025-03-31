import { createBrowserRouter } from 'react-router-dom';
import App from './Components/App/App';
import LogIn from './Components/LogIn/LogIn';
import Post from './Components/Post/Post';
import Error from './Components/Error/Error';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />
    },
    {
        path: '/session',
        element: <LogIn />,
        errorElement: <Error />
    },
    {
        path:'/posts/:postId',
        element: <Post />,
        errorElement: <Error />
    }
]);

export { router };