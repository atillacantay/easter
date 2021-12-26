import { Route, Routes } from "react-router";
import DefaultLayout from "./layouts/default";
import Register from "pages/Register";
import Login from "pages/Login";
import Posts from "pages/Posts";
import React from "react";
import { useAppDispatch } from "hooks/redux";
import { auth } from "_firebase/init";
import { setCurrentUser } from "_redux/features/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import Post from "pages/Post";

const App = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        await dispatch(setCurrentUser({ uid }));
      }
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Posts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<Post />} />
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
