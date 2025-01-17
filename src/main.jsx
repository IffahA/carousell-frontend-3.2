import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Auth0Provider } from "@auth0/auth0-react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./Components/Home";
import NewListingForm from "./Components/NewListingForm";
import Listing from "./Components/Listing";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Route that renders home content */}
      <Route index element={<Home />} />

      <Route path="new" element={<NewListingForm />} />
      {/* Route that renders individual sightings */}
      <Route path="listing/:listingId" element={<Listing />} />
      {/* Route that matches all other paths */}
      <Route path="*" element={"Nothing here!"} />
    </Route>
  )
);

//IMPORT FROM ENV
const domain = import.meta.env.VITE_SOME_AUTH0_DOMAIN;
const client = import.meta.env.VITE_SOME_AUTH0_CLIENT;
const audience = import.meta.env.VITE_SOME_AUTH0_AUDIENCE;
const scope = import.meta.env.VITE_SOME_AUTH0_SCOPE;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={domain}
    clientId={client}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: `${audience}`,
      scope: `${scope}`,
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
