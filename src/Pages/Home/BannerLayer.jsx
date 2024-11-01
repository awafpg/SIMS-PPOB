import { useEffect, useState } from "react";
import { useBannerMutation } from "../../Store/information/informationReducer";
import { Spinner } from "@nextui-org/react";

const BannerLayer = () => {
  const [data, setData] = useState([]);
  const [getBanner, { isLoadingBanner }] = useBannerMutation();

  const fetchBanner = async () => {
    try {
      const result = await getBanner().unwrap();

      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  if (isLoadingBanner)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  else
    return (
      <div>
        <p className="p-4 pt-8 pl-8 font-semibold">Temukan Promo Menarik</p>
        <div id="image-container" className="flex justify-between gap-2 px-8">
          {data.map((image, index) => (
            <div
              key={index}
              className="flex flex-col w-[250px] justify-center items-center"
            >
              <img src={image.banner_image} alt={image.banner_name} />
            </div>
          ))}
        </div>
      </div>
    );
};

export default BannerLayer;
