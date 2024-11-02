import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { BsCash } from "react-icons/bs";
import { useTopupMutation } from "../../Store/transaction/transactionReducer";
import { useNavigate } from "react-router-dom";
import { formatedNumber } from "../../Store/store";

export const NominalTopUp = () => {
  const [topUP, { isLoading }] = useTopupMutation();
  const [topUpAmount, setTopUpAmount] = useState("");
  const navigate = useNavigate();
  const maxAmount = 1000000;

  const handleChange = (e) => {
    const value = e.target.value.replace(/\./g, ""); // Menghapus titik sebelum penyimpanan
    const numericValue = value.replace(/\D/g, ""); // Hanya angka

    // Periksa apakah nilai melebihi batas maksimum
    if (numericValue === "" || parseInt(numericValue, 10) <= maxAmount) {
      setTopUpAmount(numericValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can add logic to handle the top-up (e.g., send the amount to an API)

    try {
      const result = await topUP({ top_up_amount: topUpAmount }).unwrap();

      if (result.status === 0) {
        alert("TOP UP BERHASIL");
      }
    } catch (error) {
      console.log(error);
      alert(error.data.message);
    }
    // Reset the input field after submission
    setTopUpAmount("");
    navigate("/profile");
  };

  const nominalButton = [
    { nominal: 10000 },
    { nominal: 20000 },
    { nominal: 50000 },
  ];
  const nominalButtonTwo = [
    { nominal: 100000 },
    { nominal: 250000 },
    { nominal: 500000 },
  ];
  return (
    <div className="px-10">
      <div>
        <p>Silahkan masukan</p>
        <p className="text-3xl font-bold">Nominal Top Up</p>
      </div>
      <div className="flex justify-between h-full w-full gap-2">
        <div className="py-3 w-8/12 flex flex-col gap-2">
          <form onSubmit={handleSubmit}>
            <Input
              radius="none"
              type="text"
              className="rounded size-10"
              placeholder="masukan nominal Top Up"
              clearable
              value={formatedNumber(topUpAmount)}
              onChange={handleChange}
              required
              fullWidth
              step="0.01" // Allows for decimal values
              startContent={<BsCash className="text-2xl text-default-400" />}
            />
            <Button
              radius="none"
              disabled={isLoading}
              type="submit"
              className="rounded mt-2 w-full"
            >
              {isLoading ? "Loading..." : "Top Up"}
            </Button>
          </form>
        </div>
        <div className="py-3 w-4/12 flex flex-col gap-2">
          <div className="flex gap-2">
            {nominalButton.map((nomina, index) => (
              <Button
                key={index}
                radius="none"
                value={nomina.nominal}
                onClick={handleChange}
                className="bg-white border-2 rounded"
              >
                Rp. {formatedNumber(nomina.nominal)}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 ">
            {nominalButtonTwo.map((nomina, index) => (
              <Button
                key={index}
                radius="none"
                value={nomina.nominal}
                onClick={handleChange}
                className="bg-white border-2 rounded"
              >
                Rp. {formatedNumber(nomina.nominal)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
