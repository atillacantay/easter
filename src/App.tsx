import { Route, Routes } from "react-router";
import DefaultLayout from "./layouts/default";
import Register from "pages/Register";
import Login from "pages/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "_firebase/authentication";
import Topics from "pages/Topics";

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) return null;

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Topics />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      {/* <Route path="/app" element={<AppLayout />}>
      <Route
        path="/app/recs"
        element={
          <RequireAuth>
            <Recommendations />
          </RequireAuth>
        }
      />
    </Route> */}
    </Routes>
  );
};

export default App;
