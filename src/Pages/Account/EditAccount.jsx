import { Avatar, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  useProfileMutation,
  useUpdateProfileMutation,
} from "../../Store/membership/membershipReducer";
import { ImageModal } from "./ImageModal";

const EditAccount = () => {
  const [updateProfile, { isLoadingUpdate }] = useUpdateProfileMutation();
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
  });

  const [data, setData] = useState([]);
  const [getProfile, { isLoading }] = useProfileMutation();

  const fetchProfile = async () => {
    try {
      const result = await getProfile().unwrap();
      console.log(result);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleChange = (e) => {
    console.log("🚀 ~ handleChange ~ e:", e);

    setProfileData({
      ...profileData,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const navigate = useNavigate();
  const toAccount = () => {
    navigate("/account");
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    // Here you can add logic to handle the profile update (e.g., send the data to an API)
    console.log("Updated Profile Data:", profileData);
    try {
      const result = await updateProfile({
        ...profileData,
      }).unwrap();

      if (result.status === 0) {
        alert(result.message);
      }
    } catch (error) {
      alert(error.data.message);
    }
    // Reset the input fields after submission
    setProfileData({ first_name: "", last_name: "" });
    toAccount();
  };
  const [isModalOpen, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!isModalOpen);
  };
  return (
    <div>
      <ImageModal isOpen={isModalOpen} onClose={handleModal} />
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="relative">
          <Avatar
            src={data.profile_image}
            className={`w-[140px] object-cover h-full text-large`}
          />
          <button
            onClick={handleModal}
            className="absolute bottom-0 right-0 bg-transparent p-1 mr-4 rounded-full shadow-md"
          >
            <FaEdit className="text-gray-600" />
          </button>
        </div>
        <p className="text-3xl font-semibold">
          {data.first_name} {data.last_name}
        </p>
      </div>
      <form onSubmit={handleEdit}>
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
                placeholder={data.email}
                labelPlacement="outside"
                value={profileData.email}
                onChange={handleChange}
                startContent={
                  <MdOutlineAlternateEmail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>

            <div className="w-10/12">
              <Input
                id="first_name"
                classNames={{
                  inputWrapper: "text-center bg-white border-2",
                }}
                type="text"
                required
                radius="none"
                label="Nama Depan"
                placeholder={data.first_name}
                labelPlacement="outside"
                value={profileData.first_name}
                onChange={handleChange}
                startContent={
                  <MdPerson className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
            <div className="w-10/12">
              <Input
                id="last_name"
                classNames={{
                  inputWrapper: "text-center bg-white border-2 rounded-none",
                }}
                type="text"
                required
                label="Nama Depan"
                placeholder={data.last_name}
                labelPlacement="outside"
                value={profileData.last_name}
                onChange={handleChange}
                startContent={
                  <MdPerson className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
            <div className="flex py-4 flex-col w-10/12 justify-center">
              <button
                disabled={isLoadingUpdate}
                type="submit"
                className="py-2 w-full rounded-md text-white font-bold font-['Poppins'] bg-[#f43424] hover:opacity-70"
              >
                {isLoadingUpdate ? "Loading..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAccount;
