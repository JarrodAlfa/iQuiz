import React, { createContext, useContext, useState } from 'react';

type StatsContextType = {
  hearts: number;
  coins: number;
  streak: number;
  addHearts: (amount: number) => void;
  removeHearts: (amount: number) => void;
  addCoins: (amount: number) => void;
  removeCoins: (amount: number) => void;
  addStreak: () => void;
  resetStreak: () => void;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: React.ReactNode}) {
    const [hearts, setHearts] = useState(5);
    const [coins, setCoins] = useState(0)
    const [streak, setStreak] = useState(0);

    function addHearts(amount: number) {
        setHearts(prev => prev + amount);
    }

    function removeHearts(amount: number) {
        setHearts(prev => prev - amount);
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
        setStreak(0);
    }

    return (
        <StatsContext.Provider
            value={{
                hearts,
                coins,
                streak,
                addHearts,
                removeHearts,
                addCoins,
                removeCoins,
                addStreak,
                resetStreak,
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