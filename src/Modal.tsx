import { motion } from "motion/react";
import logoImg from "./assets/logo.svg";
import claimNowText from "./assets/claim-now-text.svg";
import flareImg from "./assets/flare.png";
import flareImg2x from "./assets/flare@2x.png";
import flareImg3x from "./assets/flare@3x.png";

interface ModalProps {
  className?: string;
  onClose?: () => void;
}

function Modal({ className, onClose }: ModalProps) {
  return (
    <motion.div
      className={`fixed flex size-full flex-col items-center justify-center bg-[#0354FFB5] ${className || ""}`}
      style={{
        backdropFilter: "blur(21.4px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.img
        src={logoImg}
        alt="Logo"
        className="mb-[15px] w-[227px]"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
      />
      <motion.div
        className="bg-primary flex flex-col items-center justify-center px-[48px] pt-[39px] pb-[69px]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
      >
        <motion.span
          className="text-accent text-2xl font-extrabold uppercase"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
        >
          you win!
        </motion.span>
        <motion.span
          className="text-7xl font-black text-white uppercase"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
        >
          450%
        </motion.span>
        <motion.span
          className="text-2xl font-extrabold text-[#49A5FF] uppercase"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
        >
          Deposit bonus
        </motion.span>
      </motion.div>
      <motion.button
        className="text-primary relative -mt-9 rounded-[3px] px-[30px] py-[27px] text-2xl font-bold uppercase shadow-[0px_0px_21px_0px_#072769]"
        style={{
          background: "linear-gradient(180deg, #FFFB04 0.6%, #D89E02 100%)",
        }}
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 0.7 }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2, delay: 0 } }}
      >
        <img src={claimNowText} alt="" />
        <motion.img
          src={flareImg}
          srcSet={`${flareImg} 1x, ${flareImg2x} 2x, ${flareImg3x} 3x`}
          alt="Flare"
          className="absolute -top-[35px] left-0"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.7 }}
        />
      </motion.button>
    </motion.div>
  );
}

export default Modal;
