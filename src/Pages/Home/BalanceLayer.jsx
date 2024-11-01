import { Card, CardBody } from "@nextui-org/react";
import { FiEye } from "react-icons/fi";
import { useProfileMutation } from "../../Store/membership/membershipReducer";
import { useEffect, useState } from "react";
import { useBalanceMutation } from "../../Store/transaction/transactionReducer";

const BalanceLayer = () => {
  const [balance, setBalance] = useState("");
  const [profile, setProfile] = useState("");
  const [getProfile, { isLoading }] = useProfileMutation();
  const [getBalance, { isLoadingBalance }] = useBalanceMutation();
  const [visible, setVisible] = useState(true);

  const fetchProfile = async () => {
    try {
      const result = await getProfile().unwrap();
      const resultBalance = await getBalance().unwrap();
      console.log(resultBalance);
      setProfile(result.data);
      setBalance(resultBalance.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      {isLoading && isLoadingBalance ? (
        <h1>Loading</h1>
      ) : (
        <div className="flex justify-between w-full px-12 pb-10 ">
          <div>
            <img
              src={profile.profile_image}
              className="size-[90px] rounded-full"
              alt="Profil"
            />
            <p>Selamat datang,</p>
            <p className="text-xl font-bold">
              {profile.first_name} {profile.last_name}
            </p>
          </div>
          <div className="w-8/12 p-1">
            <Card className="bg-[#f42c1c] w-full p-1">
              <CardBody className="flex flex-col gap-2 text-white">
                <p>Saldo Anda</p>
                <p className="text-2xl font-bold">
                  Rp. <span>{visible ? "*******" : balance.balance}</span>
                </p>
                <button
                  onClick={() => {
                    setVisible(!visible);
                  }}
                  className="flex gap-2 items-center"
                >
                  {visible ? "Lihat saldo" : "sembunyikan saldo"}
                  <FiEye className="text-center size-[13px]" />
                </button>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default BalanceLayer;
