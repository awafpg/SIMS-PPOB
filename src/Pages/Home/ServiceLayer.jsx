import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useServiceMutation } from "../../Store/information/informationReducer";
import { setDataService } from "../../Store/transaction/transactionSlice";
import { useDispatch } from "react-redux";

const ServiceLayer = () => {
  const [service, setservice] = useState([]);
  const [getService, { isLoadingService }] = useServiceMutation();
  const fetchService = async () => {
    try {
      const result = await getService().unwrap();
      console.log(result);
      setservice(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePayment = (index) => {
    navigate("/payment");
    dispatch(
      setDataService({
        service_icon: service[index].service_icon,
        service_code: service[index].service_code,
        service_name: service[index].service_name,
        service_tariff: service[index].service_tariff,
      })
    );
  };
  return (
    <>
      {isLoadingService ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div
            id="image-container"
            className="flex justify-between flex-wrap px-8"
          >
            {service.map((data, index) => (
              <div
                key={index}
                onClick={() => handlePayment(index)}
                className="flex flex-col w-[40px] justify-center items-center hover:cursor-pointer hover:bg-red-500"
              >
                <img
                  className="size-[40px]"
                  src={data.service_icon}
                  alt={data.service_code}
                />
                <p className="text-[8px]">{data.service_code}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceLayer;
