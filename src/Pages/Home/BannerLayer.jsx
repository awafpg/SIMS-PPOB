const BannerLayer = () => {
  const images = [
    { src: "/src/assets/Website Assets/Banner 1.png" },
    { src: "/src/assets/Website Assets/Banner 2.png" },
    { src: "/src/assets/Website Assets/Banner 3.png" },
    { src: "/src/assets/Website Assets/Banner 4.png" },
    { src: "/src/assets/Website Assets/Banner 5.png" },
  ];
  return (
    <div>
      <p className="p-4 pt-8 pl-8 font-semibold">Temukan Promo Menarik</p>
      <div id="image-container" className="flex justify-between gap-2 px-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex flex-col w-[250px] justify-center items-center"
          >
            <img src={image.src} alt={image.caption} />
            <p className="text-[10px]">{image.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerLayer;
