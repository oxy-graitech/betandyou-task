import { useState } from "react";
import { motion } from "motion/react";
import mainBgImg from "./assets/main-bg.png";
import mainBgImg2x from "./assets/main-bg@2x.png";
import mainBgImg3x from "./assets/main-bg@3x.png";
import characterImg from "./assets/character.png";
import characterImg2x from "./assets/character@2x.png";
import characterImg3x from "./assets/character@3x.png";
import logoImg from "./assets/logo.svg";
import Reel from "./Reel";
import Modal from "./Modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="relative flex h-dvh items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `image-set(
          url(${mainBgImg}) 1x,
          url(${mainBgImg2x}) 2x,
          url(${mainBgImg3x}) 3x
        )`,
      }}
    >
      <motion.img
        src={characterImg}
        alt="Character"
        srcSet={`${characterImg} 1x, ${characterImg2x} 2x, ${characterImg3x} 3x`}
        className="absolute z-20 -mr-[80px] -mb-10 max-h-full max-w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 0.6, ease: "easeOut", delay: 0.4 },
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
      <img
        src={logoImg}
        alt="Logo"
        className="absolute top-[5px] left-[5px] z-10 w-[206px]"
      />
      <div className="absolute z-0 size-60 bg-[#FFFFE3] blur-[120px]"></div>
      <Reel
        className="absolute bottom-0 z-40"
        onSpinClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal className="z-50" onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default App;
