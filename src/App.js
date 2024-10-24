import './App.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import { HomeTemplate } from './Components/Layout/HomeTemplate';
import ProductDetail from './Components/Product/ProductDetail';
import Checkout from './Components/Checkout/Checkout';
import SignupSuccess from './Components/Modal/SignupSuccess';
import { AuthenticationTemplate } from './Components/Layout/AuthenticationTemplate';
import { AdminTemplate } from './Components/Layout/AdminTemplate';
import ChangePassword from './Components/isAuthentication/ChangePassword';
import EditProfile from './Components/isAuthentication/EditProfile';
import Wishlish from './Components/isAuthentication/Wishlish';
import Ordered from './Components/isAuthentication/Ordered';
import PageNotFound from './Components/Error/PageNotFound';
import Ordering from './Components/isAuthentication/Ordering';
import Voucher from './Components/isAuthentication/Voucher';
import Provider from './Components/Admin/Provider';
import Categories from './Components/Admin/Categories';
import SubCategory from './Components/Admin/SubCategory';
import Brand from './Components/Admin/Brand';
import Products from './Components/Admin/Products';
import User from './Components/Admin/User';
import StatisticalByRevenue from './Components/Admin/StatisticalByRevenue';
import StatisticalByProduct from './Components/Admin/StatisticalByProduct';
import { GridDemo } from './Components/Tailwind/GridDemo';
import PaddingMargin from './Components/Tailwind/PaddingMargin';
import WidthHeight from './Components/Tailwind/WidthHeight';
import FlexDemo from './Components/Tailwind/FlexDemo';
import Example from './Components/Tailwind/Example';
import BackgroundDemo from './Components/Tailwind/BackgroundDemo';
import BorderRadiusDemo from './Components/Tailwind/BorderRadiusDemo';
import ShadowDemo from './Components/Tailwind/ShadowDemo';
import TransitionDemo from './Components/Tailwind/TransitionDemo';
import JoinDemo from './Lodash/JoinDemo';
import './custom.css';
import LastFirstDemo from './Lodash/LastFirstDemo';
import ChunkDemo from './Lodash/ChunkDemo';
import FillDemo from './Lodash/FillDemo';
import SizeSortDemo from './Lodash/SizeSortDemo';
import IncludesDemo from './Lodash/IncludesDemo';
import UniqDemo from './Lodash/UniqDemo';
import FlattenDemo from './Lodash/FlattenDemo';
import CompareArrayObjectDemo from './Lodash/CompareArrayObjectDemo';
import DemoLodash from './Lodash/DemoLodash';
import Newpassword from './Components/isAuthentication/Newpassword';
import { NewPasswordTemplate } from './Components/Layout/NewPasswordTemplate';
import DemoHook from './Components/Layout/DemoHook';
import { CartTemplate } from './Components/Layout/CartTemplate';
import { ErrorTemplate } from './Components/Layout/ErrorTemplate';
import UpdateOrder from './Components/Admin/Order/UpdateOrder';
import HeaderComponent from './Components/Layout/HeaderComponent';
import Carousel from './Components/Admin/Carousel';
import SearchProductComponent from './Components/Product/ProductSearchComponent';
import { NoneSidebarTemplate } from './Components/Layout/NoneSidebarTemplate';
import FormAddressComponent from './Components/Checkout/FormAddressComponent';
import ListComponent from './Components/Tailwind/ListComponent';
import ContactComponent from './Components/Home/ContactComponent';
import TestDynamic from './Components/Tailwind/TestDynamic';
import ReactGa from 'react-ga';
import React, { useEffect } from 'react';
import { REACT_APP_GA_TRACKING_CODE } from './Common/API/domain';
import { history } from './libs/History/history';
import ChatDemo from './Components/Tailwind/ChatDemo';
import Measure from './Components/Admin/Measure';
import { SellerTemplate } from './Components/Layout/SellerTemplate';
import ProductSeller from './Components/Seller/Product/ProductSeller';
import Partner from './Components/Admin/Partner';
import OrderSeller from './Components/Seller/Order/OrderSeller';
import LuckySpinComponent from './Components/Tailwind/LuckySpinComponent';
import Event from './Components/Admin/Event';
import Events from './Components/Events/Events';
import Vouchers from './Components/Admin/Vouchers';
import { BackTop } from 'antd';
import { ToTopOutlined } from '@ant-design/icons';
import StoreComponent from './Components/Seller/Store/StoreComponent';
import AboutUsComponent from './Components/Home/AboutUsComponent';

const usePageViews = () => {
  let location = useLocation();
  useEffect(() => {
    ReactGa.initialize(REACT_APP_GA_TRACKING_CODE, {
      debug: true
    });
    ReactGa.set({ page: location.pathname });

    history.listen((location) => {
      ReactGa.pageview(location.pathname)
      console.log(location.pathname)
    })
  }, [location])
}
function App() {
  
  usePageViews();
  return (
    <>
      <div className="App">
        <Switch>
          <HomeTemplate path="/trang-chu" exact Component={Home} />
          <HomeTemplate path="/" exact Component={Home} />
          <NoneSidebarTemplate path="/chi-tiet/:masp" Component={ProductDetail} />
          <NoneSidebarTemplate path="/lien-he" exact Component={ContactComponent} />
          <HomeTemplate path="/success" exact Component={SignupSuccess} />
          <NoneSidebarTemplate path="/su-kien" exact Component={Events} />
          <NoneSidebarTemplate path="/search/:keyword" Component={SearchProductComponent} />
          <NoneSidebarTemplate path="/gioi-thieu" Component={AboutUsComponent} />
          <CartTemplate path="/gio-hang" exact Component={Cart} />
          <CartTemplate path="/thanh-toan" exact Component={Checkout} />
          <NewPasswordTemplate path="/mat-khau-moi" exact Component={Newpassword} />
          <AuthenticationTemplate path="/doi-mat-khau" exact Component={ChangePassword} />
          <AuthenticationTemplate path="/cap-nhat-ho-so" exact Component={EditProfile} />
          <AuthenticationTemplate path="/yeu-thich" exact Component={Wishlish} />
          <AuthenticationTemplate path="/lich-su-mua-hang" exact Component={Ordered} />
          <AuthenticationTemplate path="/don-hang-dang-cho" exact Component={Ordering} />
          <AuthenticationTemplate path="/ma-giam-gia" exact Component={Voucher} />
          <AdminTemplate path="/nha-cung-cap" exact Component={Provider} />
          <AdminTemplate path="/doi-tac" exact Component={Partner} />
          <AdminTemplate path="/nhom-loai" exact Component={Categories} />
          <AdminTemplate path="/loai-san-pham" exact Component={SubCategory} />
          <AdminTemplate path="/thuong-hieu" exact Component={Brand} />
          <AdminTemplate path="/san-pham" exact Component={Products} />
          <AdminTemplate path="/tai-khoan" exact Component={User} />
          <AdminTemplate path="/thong-ke-doanh-thu" exact Component={StatisticalByRevenue} />
          <AdminTemplate path="/thong-ke-san-pham" exact Component={StatisticalByProduct} />
          <AdminTemplate path="/duyet-don-hang" exact Component={UpdateOrder} />
          <AdminTemplate path="/carousel" exact Component={Carousel} />
          <AdminTemplate path="/quan-ly-su-kien" exact Component={Event} />
          <AdminTemplate path="/don-vi-tinh" exact Component={Measure} />
          <AdminTemplate path="/quan-ly-ma-giam-gia" exact Component={Vouchers} />
          <SellerTemplate path="/cua-hang" exact Component={StoreComponent} />
          <SellerTemplate path="/quan-ly-san-pham" exact Component={ProductSeller} />
          <SellerTemplate path="/quan-ly-thuong-hieu" exact Component={Brand} />
          <SellerTemplate path="/quan-ly-don-hang" exact Component={OrderSeller} />
          <SellerTemplate path="/quan-ly-doanh-thu" exact Component={StatisticalByRevenue} />
          <SellerTemplate path="/doanh-thu-san-pham" exact Component={StatisticalByProduct} />
          <Route path="/grid" exact component={GridDemo} />
          <Route path="/DemoList" exact component={ListComponent} />
          <Route path="/space" component={PaddingMargin} />
          <Route path="/width-height" component={WidthHeight} />
          <Route path="/flex" component={FlexDemo} />
          <Route path="/example" component={Example} />
          <Route path="/background" component={BackgroundDemo} />
          <Route path="/radius" component={BorderRadiusDemo} />
          <Route path="/shadow" component={ShadowDemo} />
          <Route path="/responsive" component={HeaderComponent} />
          <Route path="/transition" component={TransitionDemo} />
          <Route path="/joindemo" component={JoinDemo} />
          <Route path="/lastfirst" component={LastFirstDemo} />
          <Route path="/chunk" component={ChunkDemo} />
          <Route path="/fill" component={FillDemo} />
          <Route path="/sizesort" component={SizeSortDemo} />
          <Route path="/includes" component={IncludesDemo} /> 
          <Route path="/unique" component={UniqDemo} />
          <Route path="/flatten" component={FlattenDemo} />
          <Route path="/compare" component={CompareArrayObjectDemo} />
          <Route path="/demolodash" component={DemoLodash} />
          <Route path="/hook" component={DemoHook} />
          <Route path="/address" exact component={FormAddressComponent} />
          <Route path="/view" exact component={TestDynamic} />
          <Route path="/chat" exact component={ChatDemo} />
          <Route path="/lucky" exact component={LuckySpinComponent} />
          <ErrorTemplate path="*" Component={PageNotFound} />
        </Switch>
        <BackTop>
          <div className="h-10 w-10 rounded-full bg-gray-500 justify-items-center text-sm hover:bg-gray-800"><ToTopOutlined className="text-white mt-1 text-xl" /></div>
        </BackTop>
      </div>
    </>
  );
}

export default App;
