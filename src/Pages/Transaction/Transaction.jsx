import { Button, Input } from "@nextui-org/react";
import { BsCash } from "react-icons/bs";
import { selectCurrentService } from "../../Store/transaction/transactionSlice";
import { useSelector } from "react-redux";
import { useTransactionMutation } from "../../Store/transaction/transactionReducer";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const navigate = useNavigate();
  const [transact, { isLoading }] = useTransactionMutation();
  const currentService = useSelector(selectCurrentService);
  console.log(currentService);
  const handlePay = async () => {
    try {
      const result = await transact({
        service_code: currentService.service_code,
      }).unwrap();
      console.log(result);
      if (result.status === 0) {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.data.message);
    }
    navigate("/profile");
  };
  return (
    <div className="px-10">
      <p>PemBayaran</p>
      <div className="flex items-center py-1">
        <img
          className="w-[30px]"
          src={currentService.service_icon}
          alt={currentService.service_code}
        />
        <p className="text-[12px]">{currentService.service_name}</p>
      </div>
      <div className="py-3 w-full flex flex-col gap-3">
        <Input
          disabled
          radius="none"
          type="number"
          className="rounded size-10"
          placeholder={currentService.service_tariff}
          startContent={<BsCash className="text-2xl text-default-400 " />}
        />
        <Button
          disabled={isLoading}
          onClick={handlePay}
          radius="none"
          className="bg-[#f42c1c] text-white rounded"
        >
          {isLoading ? "Loading" : "Bayar"}
        </Button>
      </div>
    </div>
  );
};

export default Transaction;
