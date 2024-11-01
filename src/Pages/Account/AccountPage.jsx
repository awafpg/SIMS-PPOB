import { Avatar, Input } from "@nextui-org/react";
import { MdOutlineAlternateEmail, MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { removeAuthToken } from "../../utils/memberUtil";
import { useEffect, useState } from "react";
import { useProfileMutation } from "../../Store/membership/membershipReducer";

const AccountPage = () => {
  const [data, setData] = useState([]);
  const [getProfile, { isLoading }] = useProfileMutation();
  const fetchProfile = async () => {
    try {
      const result = await getProfile().unwrap();

      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const navigate = useNavigate();
  const toEdit = () => {
    navigate("/account/edit");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    navigate("/login");
  };
  return (
    <div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <Avatar
          src={data.profile_image}
          className={`w-[140px] h-full text-large`}
        />
        <p className="text-3xl font-semibold">
          {data.first_name} {data.last_name}
        </p>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center gap-2 w-6/12">
          <div className="w-10/12">
            <Input
              id="email"
              disabled
              classNames={{
                inputWrapper: "text-center bg-white border-2 rounded-none",
              }}
              type="email"
              required
              label="Email"
              placeholder={isLoading ? "Loading" : data.email}
              labelPlacement="outside"
              startContent={
                <MdOutlineAlternateEmail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>

          <div className="w-10/12">
            <Input
              id="name"
              disabled
              classNames={{
                inputWrapper: "text-center bg-white border-2",
              }}
              type="text"
              required
              radius="none"
              label="Nama Depan"
              placeholder={data.first_name}
              labelPlacement="outside"
              startContent={
                <MdPerson className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
          <div className="w-10/12">
            <Input
              id="nama"
              disabled
              classNames={{
                inputWrapper: "text-center bg-white border-2 rounded-none",
              }}
              type="text"
              required
              label="Nama Depan"
              placeholder={data.last_name}
              labelPlacement="outside"
              startContent={
                <MdPerson className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
          <div className="flex flex-col w-10/12 justify-center">
            <button
              onClick={toEdit}
              className="py-2 w-full my-3 rounded-md text-[#f43424] border-[#f43424] border-1 font-bold font-['Poppins'] bg-white hover:opacity-70"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="py-2 w-full rounded-md text-white font-bold font-['Poppins'] bg-[#f43424] hover:opacity-70"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
