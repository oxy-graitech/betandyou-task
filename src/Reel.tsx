import { motion } from "motion/react";
import reelBase1x from "./assets/reel-base.png";
import reelBase2x from "./assets/reel-base@2x.png";
import reelBase3x from "./assets/reel-base@3x.png";
import reelFrame1x from "./assets/reel-frame.png";
import reelFrame2x from "./assets/reel-frame@2x.png";
import reelFrame3x from "./assets/reel-frame@3x.png";
import rotateIcon from "./assets/rotate-icon.svg";
import { theme } from "./theme";

interface ReelProps {
  className?: string;
  onSpinClick?: () => void;
}

function Reel({ className, onSpinClick }: ReelProps) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center pb-1 ${className || ""}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="bg-primary text-accent relative top-[21px] z-50 px-6 py-[17px] font-extrabold uppercase shadow-[0px_0px_10px_0px_#0B2252]"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 1 }}
      >
        <span>Spin to get a bonus</span>
      </motion.div>
      <div
        className={`h-[302px] w-[391px] max-w-full bg-cover bg-center`}
        style={{
          backgroundImage: `image-set(
          url(${reelBase1x}) 1x,
          url(${reelBase2x}) 2x,
          url(${reelBase3x}) 3x
        )`,
        }}
      >
        <img
          src={reelFrame1x}
          alt="Reel Frame"
          srcSet={`${reelFrame1x} 1x, ${reelFrame2x} 2x, ${reelFrame3x} 3x`}
        />
      </div>
      <motion.button
        className="-mt-[48px] flex size-[95px] items-center justify-center rounded-full"
        style={{
          background: `linear-gradient(180deg, #FFE6A2 0%, ${theme.colors.accent} 58.5%, #997002 132.5%)`,
        }}
        whileHover="hover"
        initial="initial"
        onClick={onSpinClick}
      >
        <motion.img
          src={rotateIcon}
          alt=""
          className="w-[87px]"
          animate={{
            rotate: [0, 30, 0],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "backInOut",
              repeatDelay: 1,
              repeatType: "reverse",
              delay: 2,
            },
          }}
          variants={{
            initial: { rotate: 0 },
            hover: { rotate: 30 },
          }}
        />
        <div className="absolute -z-10 size-[95px] bg-[#FFEE04] blur-[44px]"></div>
      </motion.button>
    </motion.div>
  );
}

export default Reel;
