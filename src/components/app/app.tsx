// system
import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

// components
import Layout from "../layout/layout";
import HomePage from "../../pages/homePage/home";
import LoginPage from "../../pages/loginPage/login";
import RegisterPage from "../../pages/registerPage/register";
import ForgotPasswordPage from "../../pages/forgotPasswordPage/forgotPassword";
import ProfilePage from "../../pages/profile/profile";
import ResetPasswordPage from "../../pages/resetPasswordPage/resetPassword";
import MainPage from "../../pages/profile/main/main";
import HistoryPage from "../../pages/profile/history/history";
import { checkUserAuth } from "../../utils/api";
import { OnlyAuth, OnlyUnAuth } from "../protectedRoute/protectedroute";
import NotFoundPage from "../../pages/notFound/notFound";
import IngredientPage from "../../pages/ingredient/ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useAppDispatch } from "../../utils/hooks";
import FeedPage from "../../pages/feedPage/feed";
import OrderInfo from "../order-info/order-info";
import OrderPage from "../../pages/order/order";
import { closeModal } from "../../services/reducers/modalReducer/modalReducer";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const onClose = () => {
    dispatch(closeModal());
    navigate(-1);
  };
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="login"
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="register"
            element={<OnlyUnAuth component={<RegisterPage />} />}
          />
          <Route
            path="forgot-password"
            element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
          />
          <Route
            path="reset-password"
            element={<OnlyUnAuth component={<ResetPasswordPage />} />}
          />
          <Route path="feed" element={<FeedPage />} />

          <Route
            path="profile"
            element={<OnlyAuth component={<ProfilePage />} />}
          >
            <Route index element={<MainPage />} />
            <Route path="orders" element={<HistoryPage />} />
            <Route path="orders/:id" element={<OrderPage />} />
          </Route>
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="/feed/:id" element={<OrderPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={
              <Modal title="Детали ингредиента" handleClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal title="" handleClose={onClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:id"
            element={
         
                  <Modal title="" handleClose={onClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
      
        </Routes>
      )}
    </>
  );
}

export default App;
