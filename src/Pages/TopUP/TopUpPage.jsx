import BalanceLayer from "../Home/BalanceLayer";
import { NominalTopUp } from "./NominalTopUp";

const TopUpPage = () => {
  return (
    <>
      <div>
        <BalanceLayer />
        <NominalTopUp />
      </div>
    </>
  );
};

export default TopUpPage;
