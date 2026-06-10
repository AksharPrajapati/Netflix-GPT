import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Body from "./components/Body";
import Browse from "./components/Browse";
import TVShows from "./components/TVShows";
import MoviesPage from "./components/MoviesPage";
import NewPopular from "./components/NewPopular";
import MyList from "./components/MyList";
import DetailPage from "./components/DetailPage";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <Body />,
    children: [
      { index: true, element: <Browse /> },
      { path: "tv-shows", element: <TVShows /> },
      { path: "movies", element: <MoviesPage /> },
      { path: "new-popular", element: <NewPopular /> },
      { path: "my-list", element: <MyList /> },
      { path: "detail/:type/:id", element: <DetailPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
