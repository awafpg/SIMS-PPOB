const ServiceLayer = () => {
  const images = [
    { src: "/src/assets/Website Assets/Listrik.png", caption: "Listrik" },
    { src: "/src/assets/Website Assets/Kurban.png", caption: "Kurban" },
    { src: "/src/assets/Website Assets/Game.png", caption: "Game" },
    { src: "/src/assets/Website Assets/Musik.png", caption: "Musik" },
    { src: "/src/assets/Website Assets/Paket Data.png", caption: "Paket Data" },
    { src: "/src/assets/Website Assets/PBB.png", caption: "PBB" },
    { src: "/src/assets/Website Assets/PDAM.png", caption: "PDAM" },
    { src: "/src/assets/Website Assets/PGN.png", caption: "PGN" },
    { src: "/src/assets/Website Assets/Pulsa.png", caption: "Pulsa" },
    { src: "/src/assets/Website Assets/Televisi.png", caption: "Televisi" },
    {
      src: "/src/assets/Website Assets/Voucher Makanan.png",
      caption: "Voucher Makanan",
    },
    { src: "/src/assets/Website Assets/Zakat.png", caption: "Zakat" },
    // Add more images as needed
  ];

  return (
    <div>
      <div id="image-container" className="flex justify-between flex-wrap px-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex flex-col w-[50px] justify-center items-center"
          >
            <img src={image.src} alt={image.caption} />
            <p className="text-[10px]">{image.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceLayer;
