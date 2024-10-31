import { Button, Input } from "@nextui-org/react";
import { BsCash } from "react-icons/bs";

const Transaction = () => {
  const images = {
    src: "/src/assets/Website Assets/Listrik.png",
    caption: "Listrik Prabayar",
  };
  return (
    <div className="px-10">
      <p>PemBayaran</p>
      <div className="flex items-center py-1">
        <img className="w-[20px]" src={images.src} alt={images.caption} />
        <p className="text-[10px]">{images.caption}</p>
      </div>
      <div className="py-3 w-8/12 flex flex-col gap-2">
        <Input
          radius="none"
          type="number"
          className="rounded size-10"
          placeholder="masukan nominal Top Up"
          startContent={<BsCash className="text-2xl text-default-400 " />}
        />
        <Button radius="none" className="bg-orange-600 rounded">
          Bayar
        </Button>
      </div>
    </div>
  );
};

export default Transaction;
