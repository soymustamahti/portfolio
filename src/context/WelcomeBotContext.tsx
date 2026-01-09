"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface WelcomeBotContextType {
  isWelcomeBotVisible: boolean;
  setWelcomeBotVisible: (visible: boolean) => void;
}

const WelcomeBotContext = createContext<WelcomeBotContextType | undefined>(
  undefined
);

export const WelcomeBotProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isWelcomeBotVisible, setIsWelcomeBotVisible] = useState(false);

  const setWelcomeBotVisible = useCallback((visible: boolean) => {
    setIsWelcomeBotVisible(visible);
  }, []);

  return (
    <WelcomeBotContext.Provider
      value={{ isWelcomeBotVisible, setWelcomeBotVisible }}
    >
      {children}
    </WelcomeBotContext.Provider>
  );
};

export const useWelcomeBot = () => {
  const context = useContext(WelcomeBotContext);
  if (context === undefined) {
    throw new Error("useWelcomeBot must be used within a WelcomeBotProvider");
  }
  return context;
};
