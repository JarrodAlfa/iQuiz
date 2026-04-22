import React, { createContext, useContext, useState } from 'react';

type StatsContextType = {
  hearts: number;
  coins: number;
  streak: number;
  oldStreak: number;
  addHearts: (amount: number) => void;
  removeHeart: () => void;
  addCoins: (amount: number) => void;
  removeCoins: (amount: number) => void;
  addStreak: () => void;
  resetStreak: () => void;
  purchaseHeart: () => void;
  recoverStreak: () => void;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: React.ReactNode}) {
    const [hearts, setHearts] = useState(5);
    const [coins, setCoins] = useState(15)
    const [streak, setStreak] = useState(0);
    const [oldStreak, setOldStreak] = useState(0);

    function addHearts(amount: number) {
        setHearts(prev => prev + amount);
    }

    function removeHeart() {
        setHearts(prev => prev - 1);
    }

    function addCoins(amount: number) {
        setCoins(prev => prev + amount);
    }

    function removeCoins(amount: number) {
        setCoins(prev => prev - amount);
    }

    function addStreak() {
        setStreak(prev => prev + 1);
    }

    function resetStreak() {
        setOldStreak(streak);
        setStreak(0);
    }

    function purchaseHeart() {
        if (coins >= 20){
            setCoins(prev => prev - 20)
            setHearts(prev => prev + 1)
        }
    }

    function recoverStreak() {
        if (streak === 0 && coins >= 100){
            setCoins(prev => prev - 100)
            setStreak(oldStreak);
        }
    }

    return (
        <StatsContext.Provider
            value={{
                hearts,
                coins,
                streak,
                oldStreak,
                addHearts,
                removeHeart,
                addCoins,
                removeCoins,
                addStreak,
                resetStreak,
                purchaseHeart,
                recoverStreak,
            }}
        >
            {children}
        </StatsContext.Provider>
    )
}

export function useStats() {
    const context = useContext(StatsContext);

    if (!context) {
        throw new Error('useStats must be used inside StatsProvider')
    }

    return context;
}