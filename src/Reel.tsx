import { useState, useCallback, useRef } from "react";
import { motion } from "motion/react";
import reelBase1x from "./assets/reel-base.png";
import reelBase2x from "./assets/reel-base@2x.png";
import reelBase3x from "./assets/reel-base@3x.png";
import reelFrame1x from "./assets/reel-frame.png";
import reelFrame2x from "./assets/reel-frame@2x.png";
import reelFrame3x from "./assets/reel-frame@3x.png";
import rotateIcon from "./assets/rotate-icon.svg";
import { theme } from "./theme";

import blueItem1x from "./assets/reel-items/blue-item.png";
import blueItem2x from "./assets/reel-items/blue-item@2x.png";
import blueItem3x from "./assets/reel-items/blue-item@3x.png";
import crownItem1x from "./assets/reel-items/crown-item.png";
import crownItem2x from "./assets/reel-items/crown-item@2x.png";
import crownItem3x from "./assets/reel-items/crown-item@3x.png";
import glassItem1x from "./assets/reel-items/glass-item.png";
import glassItem2x from "./assets/reel-items/glass-item@2x.png";
import glassItem3x from "./assets/reel-items/glass-item@3x.png";
import greenItem1x from "./assets/reel-items/green-item.png";
import greenItem2x from "./assets/reel-items/green-item@2x.png";
import greenItem3x from "./assets/reel-items/green-item@3x.png";
import purpleItem1x from "./assets/reel-items/purple-item.png";
import purpleItem2x from "./assets/reel-items/purple-item@2x.png";
import purpleItem3x from "./assets/reel-items/purple-item@3x.png";
import redItem1x from "./assets/reel-items/red-item.png";
import redItem2x from "./assets/reel-items/red-item@2x.png";
import redItem3x from "./assets/reel-items/red-item@3x.png";
import ringItem1x from "./assets/reel-items/ring-item.png";
import ringItem2x from "./assets/reel-items/ring-item@2x.png";
import ringItem3x from "./assets/reel-items/ring-item@3x.png";
import sunItem1x from "./assets/reel-items/sun-item.png";
import sunItem2x from "./assets/reel-items/sun-item@2x.png";
import sunItem3x from "./assets/reel-items/sun-item@3x.png";
import timeItem1x from "./assets/reel-items/time-item.png";
import timeItem2x from "./assets/reel-items/time-item@2x.png";
import timeItem3x from "./assets/reel-items/time-item@3x.png";
import yellowItem1x from "./assets/reel-items/yellow-item.png";
import yellowItem2x from "./assets/reel-items/yellow-item@2x.png";
import yellowItem3x from "./assets/reel-items/yellow-item@3x.png";

interface SymbolImages {
  "1x": string;
  "2x": string;
  "3x": string;
}

interface Symbol {
  id: string;
  name: string;
  images: SymbolImages;
}

const SYMBOLS: Symbol[] = [
  {
    id: "blue",
    name: "Blue",
    images: { "1x": blueItem1x, "2x": blueItem2x, "3x": blueItem3x },
  },
  {
    id: "crown",
    name: "Crown",
    images: { "1x": crownItem1x, "2x": crownItem2x, "3x": crownItem3x },
  },
  {
    id: "glass",
    name: "Glass",
    images: { "1x": glassItem1x, "2x": glassItem2x, "3x": glassItem3x },
  },
  {
    id: "green",
    name: "Green",
    images: { "1x": greenItem1x, "2x": greenItem2x, "3x": greenItem3x },
  },
  {
    id: "purple",
    name: "Purple",
    images: { "1x": purpleItem1x, "2x": purpleItem2x, "3x": purpleItem3x },
  },
  {
    id: "red",
    name: "Red",
    images: { "1x": redItem1x, "2x": redItem2x, "3x": redItem3x },
  },
  {
    id: "ring",
    name: "Ring",
    images: { "1x": ringItem1x, "2x": ringItem2x, "3x": ringItem3x },
  },
  {
    id: "sun",
    name: "Sun",
    images: { "1x": sunItem1x, "2x": sunItem2x, "3x": sunItem3x },
  },
  {
    id: "time",
    name: "Time",
    images: { "1x": timeItem1x, "2x": timeItem2x, "3x": timeItem3x },
  },
  {
    id: "yellow",
    name: "Yellow",
    images: { "1x": yellowItem1x, "2x": yellowItem2x, "3x": yellowItem3x },
  },
];

const GRID_COLS = 6;
const GRID_ROWS = 4;
const ITEM_HEIGHT = 55;

// WIN GRID - Fill this with your desired win combination
// Format: [row][col] = symbol ID
// Example: All "crown" symbols in first row for a win
const WIN_GRID: string[][] = [
  ["green", "crown", "blue", "crown", "sun", "crown"], // Row 0
  ["yellow", "crown", "crown", "crown", "crown", "crown"], // Row 1
  ["crown", "ring", "crown", "purple", "crown", "yellow"], // Row 2
  ["crown", "red", "crown", "blue", "sun", "time"], // Row 3
];

interface ReelProps {
  className?: string;
  onSpinClick?: () => void;
}

function ReelColumn({
  colIndex,
  grid,
  targetGrid,
  isSpinning,
  hasCompletedSpin,
  onColumnComplete,
}: {
  colIndex: number;
  grid: string[][];
  targetGrid: string[][] | null;
  isSpinning: boolean;
  hasCompletedSpin: boolean;
  onColumnComplete: (colIndex: number) => void;
}) {
  const getSymbolById = (id: string) =>
    SYMBOLS.find((s) => s.id === id) || SYMBOLS[0];
  const getRandomSymbol = () =>
    SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

  const finalSymbols = targetGrid
    ? targetGrid.map((row) => row[colIndex])
    : grid.map((row) => row[colIndex]);

  // Get the final grid to check for crown items in win position
  const finalGrid = targetGrid || grid;

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: `${GRID_ROWS * ITEM_HEIGHT}px` }}
    >
      <motion.div
        className="flex flex-col"
        style={{
          willChange: isSpinning ? "transform" : "auto",
          transform: "translateZ(0)",
        }}
        animate={
          isSpinning
            ? { y: [0, -ITEM_HEIGHT * GRID_ROWS * 8] }
            : hasCompletedSpin
              ? { y: -ITEM_HEIGHT * GRID_ROWS * 8 }
              : { y: 0 }
        }
        transition={
          isSpinning
            ? {
                duration: 2.5 + Math.random() * 1,
                delay: colIndex * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }
            : { duration: 0 }
        }
        onAnimationComplete={() => onColumnComplete(colIndex)}
      >
        {Array(GRID_ROWS * 9)
          .fill(null)
          .map((_, rowIndex) => {
            let symbol: Symbol;
            if (rowIndex < GRID_ROWS)
              symbol = getSymbolById(grid[rowIndex][colIndex]);
            else if (rowIndex < GRID_ROWS * 8) symbol = getRandomSymbol();
            else {
              const targetIndex = rowIndex - GRID_ROWS * 8;
              symbol =
                targetIndex < finalSymbols.length
                  ? getSymbolById(finalSymbols[targetIndex])
                  : getRandomSymbol();
            }
            // Check if this is a crown item in the final win position
            // Only show border when animation has stopped
            // When hasCompletedSpin is true, the strip is at y: -ITEM_HEIGHT * GRID_ROWS * 8
            // So visible items are at rowIndex >= GRID_ROWS * 8 (the last GRID_ROWS items)
            const isFinalWinPosition = rowIndex >= GRID_ROWS * 8;
            const finalRowIndex = isFinalWinPosition
              ? rowIndex - GRID_ROWS * 8
              : -1;
            const isCrownInWinPosition =
              hasCompletedSpin &&
              isFinalWinPosition &&
              finalRowIndex >= 0 &&
              finalRowIndex < GRID_ROWS &&
              finalGrid[finalRowIndex]?.[colIndex] === "crown";

            // Animate appearance for visible items (first GRID_ROWS items or final position items)
            // Only animate visible items to maintain performance
            const isVisibleItem = rowIndex < GRID_ROWS || isFinalWinPosition;
            const shouldAnimateAppearance = isVisibleItem && !isSpinning;
            const randomDelay = shouldAnimateAppearance
              ? colIndex * 0.05 +
                (rowIndex < GRID_ROWS ? rowIndex : finalRowIndex) * 0.02 +
                Math.random() * 0.2
              : 0;

            return (
              <div
                key={rowIndex}
                className="flex items-center justify-center"
                style={{ height: ITEM_HEIGHT }}
              >
                <motion.img
                  src={symbol.images["1x"]}
                  alt={symbol.name}
                  srcSet={`${symbol.images["1x"]} 1x, ${symbol.images["2x"]} 2x, ${symbol.images["3x"]} 3x`}
                  className={`h-full w-full object-contain ${
                    isCrownInWinPosition
                      ? "rounded-lg border-4 border-yellow-400"
                      : ""
                  }`}
                  style={{
                    ...(isCrownInWinPosition
                      ? {
                          boxShadow: "0 0 15px rgba(255, 215, 0, 0.6)",
                          willChange: "transform",
                          transform: "translateZ(0)",
                        }
                      : {}),
                  }}
                  initial={
                    shouldAnimateAppearance ? { opacity: 0, scale: 0.5 } : false
                  }
                  animate={{
                    opacity: 1,
                    scale:
                      isCrownInWinPosition && shouldAnimateAppearance
                        ? [1, 1.1, 1]
                        : 1,
                  }}
                  transition={
                    shouldAnimateAppearance
                      ? {
                          opacity: {
                            duration: 0.5,
                            delay: randomDelay,
                            ease: [0.25, 0.1, 0.25, 1],
                          },
                          scale: isCrownInWinPosition
                            ? {
                                duration: 0.6,
                                delay: 0.2,
                                ease: [0.25, 0.1, 0.25, 1],
                              }
                            : {
                                duration: 0.5,
                                delay: randomDelay,
                                ease: [0.25, 0.1, 0.25, 1],
                              },
                        }
                      : { duration: 0 }
                  }
                />
              </div>
            );
          })}
      </motion.div>
    </div>
  );
}

function Reel({ className, onSpinClick }: ReelProps) {
  const [grid, setGrid] = useState<string[][]>(() =>
    Array(GRID_ROWS)
      .fill(null)
      .map(() =>
        Array(GRID_COLS)
          .fill(null)
          .map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)].id),
      ),
  );

  const [isSpinning, setIsSpinning] = useState(false);
  const [spinningColumns, setSpinningColumns] = useState<Set<number>>(
    new Set(),
  );
  const [targetGrid, setTargetGrid] = useState<string[][] | null>(null);
  const [hasCompletedSpin, setHasCompletedSpin] = useState(false);
  const completedColumnsRef = useRef<Set<number>>(new Set());

  const handleColumnComplete = useCallback(
    (colIndex: number) => {
      completedColumnsRef.current.add(colIndex);
      if (completedColumnsRef.current.size === GRID_COLS && targetGrid) {
        requestAnimationFrame(() => {
          setGrid(targetGrid);
          setTargetGrid(null);
          setSpinningColumns(new Set());
          setIsSpinning(false);
          setHasCompletedSpin(true);
          completedColumnsRef.current.clear();

          // Open modal when animation completes and win combination is set
          if (onSpinClick) {
            setTimeout(() => onSpinClick(), 1500);
          }
        });
      }
    },
    [targetGrid, onSpinClick],
  );

  const handleSpin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setHasCompletedSpin(false);
    completedColumnsRef.current.clear();
    setSpinningColumns(new Set(Array.from({ length: GRID_COLS }, (_, i) => i)));
    // Always use WIN_GRID as the target
    setTargetGrid(WIN_GRID);
  }, [isSpinning]);

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
        className="relative h-[302px] w-[391px] max-w-full overflow-hidden"
        style={{
          backgroundImage: `image-set(url(${reelBase1x}) 1x, url(${reelBase2x}) 2x, url(${reelBase3x}) 3x)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="grid h-full w-full grid-cols-6 py-5">
            {Array.from({ length: GRID_COLS }, (_, colIndex) => (
              <ReelColumn
                key={colIndex}
                colIndex={colIndex}
                grid={grid}
                targetGrid={targetGrid}
                isSpinning={spinningColumns.has(colIndex)}
                hasCompletedSpin={hasCompletedSpin}
                onColumnComplete={handleColumnComplete}
              />
            ))}
          </div>
        </div>
        <img
          src={reelFrame1x}
          alt="Reel Frame"
          srcSet={`${reelFrame1x} 1x, ${reelFrame2x} 2x, ${reelFrame3x} 3x`}
          className="pointer-events-none absolute inset-0"
        />
      </div>
      <motion.button
        className="relative -mt-[48px] flex size-[95px] items-center justify-center rounded-full"
        style={{
          background: `linear-gradient(180deg, #FFE6A2 0%, ${theme.colors.accent} 58.5%, #997002 132.5%)`,
        }}
        onClick={handleSpin}
        disabled={isSpinning}
      >
        <motion.img
          src={rotateIcon}
          alt=""
          className="w-[87px]"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
          }}
          animate={isSpinning ? { rotate: 360 } : { rotate: [0, 30, 0] }}
          transition={
            isSpinning
              ? { duration: 0.5, repeat: Infinity, ease: "linear" }
              : {
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "backInOut",
                    repeatDelay: 1,
                    repeatType: "reverse",
                    delay: 2,
                  },
                }
          }
          whileHover={
            !isSpinning
              ? { rotate: 30, transition: { duration: 0.2, delay: 0 } }
              : undefined
          }
        />
        <motion.div
          className="absolute -z-10 size-[95px] bg-[#FFEE04] blur-[44px]"
          style={{
            willChange: "auto",
            transform: "translateZ(0)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </motion.button>
    </motion.div>
  );
}

export default Reel;
