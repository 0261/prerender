import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PostDetail from './pages/PostDetail/PostDetail';
  
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: '/posts/:id',
    element: <PostDetail />
  },
  {
    path: '/photos/:id',
    element: <PostDetail />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render((
  <RouterProvider router={router}/>
));