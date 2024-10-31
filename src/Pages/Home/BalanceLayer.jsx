import { Card, CardBody } from "@nextui-org/react";
import { FiEye } from "react-icons/fi";

const BalanceLayer = () => {
  return (
    <div className="flex justify-between w-full p-10 ">
      <div>
        <img src="/src/assets/Website Assets/Profile Photo.png" alt="Profil" />
        <p>Selamat datang,</p>
        <p className="text-2xl font-bold">Kristanto Wibowo Rasasti</p>
      </div>
      <div className="w-8/12 p-1">
        <Card className="bg-orange-600 w-full">
          <CardBody className="text-white">
            <p>Saldo Anda</p>
            <p className="text-2xl font-bold">
              Rp. <span>2000</span>
            </p>
            <p className="flex gap-2 items-center">
              Lihat saldo <FiEye className="-center size-[13px]" />
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default BalanceLayer;
