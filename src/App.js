import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import Register from "./components/Register";
import Steps from "./components/Steps";
import PageNotFound from "./components/PageNotFound";
import ViewProfile from "components/ViewProfile";
import "./App.css";

/**Bootstrap Imports*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

/**
 * App main component that list all routes to redirect to their corresponding components
 */
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />

        {/* PROTECTED ROUTES */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Login />} />
          <Route path="/steps" element={<Steps />} />
          <Route path="/viewProfile" element={<ViewProfile />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
