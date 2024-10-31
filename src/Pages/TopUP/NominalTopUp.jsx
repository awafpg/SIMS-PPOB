import { Button, Input } from "@nextui-org/react";
import { BsCash } from "react-icons/bs";

export const NominalTopUp = () => {
  const nominalButton = [
    { nominal: 10000 },
    { nominal: 10000 },
    { nominal: 10000 },
  ];
  return (
    <div className="px-10">
      <div>
        <p>Silahkan masukan</p>
        <p className="text-3xl font-bold">Nominal Top Up</p>
      </div>
      <div className="flex justify-between h-full w-full gap-2">
        <div className="py-3 w-8/12 flex flex-col gap-2">
          <Input
            radius="none"
            type="number"
            className="rounded size-10"
            placeholder="masukan nominal Top Up"
            startContent={<BsCash className="text-2xl text-default-400 " />}
          />
          <Button radius="none" className="rounded">
            Top Up
          </Button>
        </div>
        <div className="py-3 w-4/12 flex flex-col gap-2">
          <div className="flex gap-2">
            {nominalButton.map((nomina, index) => (
              <Button
                key={index}
                radius="none"
                className="bg-white border-2 rounded"
              >
                Rp. {nomina.nominal}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {nominalButton.map((nomina, index) => (
              <Button
                key={index}
                radius="none"
                className="bg-white border-2 rounded"
              >
                Rp. {nomina.nominal}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// export default NominalTopUp;
