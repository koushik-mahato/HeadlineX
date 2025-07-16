import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./pages/layout/RootLayout";
import PrivateRoute from "./pages/layout/PrivateRoute";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Favourites from "./pages/Favourites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
// import ArticlePage from "./pages/ArticlePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="article/:id" element={<ArticlePage />} /> */}
          <Route path="search" element={<SearchResults />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<PrivateRoute />}>
            <Route path="favourites" element={<Favourites />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
