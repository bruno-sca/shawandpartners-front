import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wrapper } from "../components";
import { UserList } from "../pages";
import { UserDetails } from "../pages/UserDetails";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route path="" element={<UserList />} />
          <Route path=":username" element={<UserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
