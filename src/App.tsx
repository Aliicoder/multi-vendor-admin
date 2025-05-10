import { Route, Routes } from "react-router-dom";
import SellersChatsPage from "./pages/private/SellersChatsPage";
import SellerChatPage from "./pages/private/SellerChatPage";
import MainLayout from "./pages/layouts/MainLayout";
import SellersLayout from "./pages/layouts/SellersLayout";
import PersistLoginMiddleware from "./components/middlewares/PersistLoginMiddleware";
import ProtectedRoutesMiddleware from "./components/middlewares/ProtectedRoutesMiddleware";
import CategoriesPage from "./pages/private/CategoriesPage";
import ApplicantsPage from "./pages/private/ApplicantsPage";
import ProfilePage from "./pages/private/ProfilePage";
import CustomerSupportPage from "./pages/private/CustomerSupportPage";
import AdminsChatsPage from "./pages/private/AdminsChatsPage";
import LoginPage from "./pages/public/LoginPage";
import SignupPage from "./pages/public/SignupPage";
import SellerProfilePage from "./pages/private/SellerProfilePage";
import DashboardPage from "./pages/private/DashboardPage";
import MerchantsPage from "./pages/private/MerchantsPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<PersistLoginMiddleware />}>
        <Route element={<ProtectedRoutesMiddleware />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />

            <Route path="merchants" element={<SellersLayout />}>
              <Route index element={<MerchantsPage />} />
              <Route path=":userId" element={<SellerProfilePage />} />
            </Route>
            <Route path="applicants" element={<ApplicantsPage />} />

            <Route path="categories" element={<CategoriesPage />} />

            <Route path="adminsChats" element={<AdminsChatsPage />} />
            <Route path="sellersChats" element={<SellersChatsPage />}>
              <Route path=":chatId" element={<SellerChatPage />} />
            </Route>
            <Route path="customerSupport" element={<CustomerSupportPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
