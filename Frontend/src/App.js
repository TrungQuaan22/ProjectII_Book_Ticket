import { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ModalTrailer from "./components/ModalTrailer";
import LazyLoad from "./components/LazyLoad";
import Loading from "./components/Loading";
// layout
import MainLayout from "./layouts/MainLayout";
// guards

import CheckoutRoute from "./guards/CheckoutRoute";
import UserProfileRoute from "./guards/UserProfileRoute";
// page
import Homepage from "./pages/Homepage";
import EventDetail from "./pages/EventDetail";
import UserProfile from "./pages/UserProfile";
import BookTicket from "./pages/BookTicket";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
function App() {
  return (
    <BrowserRouter>
      <Loading />
      <ModalTrailer />
      <Suspense fallback={<LazyLoad />}>
        <Switch>
          <Route exact path={["/", "/detail/:maSukien", "/taikhoan"]}>
            <MainLayout>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/detail/:maSukien" component={EventDetail} />
              <UserProfileRoute
                exact
                path="/taikhoan"
                component={UserProfile}
              />
            </MainLayout>
          </Route>

          <CheckoutRoute
            exact
            path="/datve/:maLichChieu"
            component={BookTicket}
          />

          <Route exact path={["/login", "/signUp"]}>
            <MainLayout>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signUp" component={Register} />
            </MainLayout>
          </Route>

          <Route component={Page404} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
