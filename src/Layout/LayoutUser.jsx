import { Outlet } from "react-router-dom";
import Header from "../Component/Header";

const LayoutUser = () => {
  return (
    <>
      <Header />
      <Outlet />;
    </>
  );
};

export default LayoutUser;
