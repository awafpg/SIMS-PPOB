import BalanceLayer from "./BalanceLayer";
import BannerLayer from "./BannerLayer";
import ServiceLayer from "./ServiceLayer";

const HomePage = () => {
  return (
    <div className="h-screen">
      <BalanceLayer />
      <ServiceLayer />
      <BannerLayer />
    </div>
  );
};

export default HomePage;
