import React, { createContext, useContext, useState, useCallback } from "react";

const AgentStatusContext = createContext();

export const AgentStatusProvider = ({ children }) => {
  const [isAcceptingChats, setIsAcceptingChats] = useState(false);
  const [activeChats, setActiveChats] = useState([]);
  const MAX_ACTIVE_CHATS = 3;

  const canAcceptMore = activeChats.length < MAX_ACTIVE_CHATS;

  const startAccepting = useCallback(() => {
    setIsAcceptingChats(true);
  }, []);

  const stopAccepting = useCallback(() => {
    setIsAcceptingChats(false);
  }, []);

  const acceptChat = useCallback(
    (chat) => {
      if (activeChats.length >= MAX_ACTIVE_CHATS) return false;
      setActiveChats((prev) => [...prev, chat]);
      return true;
    },
    [activeChats.length],
  );

  const removeChat = useCallback((chatId) => {
    setActiveChats((prev) => prev.filter((c) => c.id !== chatId));
  }, []);

  return (
    <AgentStatusContext.Provider
      value={{
        isAcceptingChats,
        activeChats,
        canAcceptMore,
        maxChats: MAX_ACTIVE_CHATS,
        startAccepting,
        stopAccepting,
        acceptChat,
        removeChat,
      }}
    >
      {children}
    </AgentStatusContext.Provider>
  );
};

export const useAgentStatus = () => {
  const ctx = useContext(AgentStatusContext);
  if (!ctx)
    throw new Error("useAgentStatus must be used within AgentStatusProvider");
  return ctx;
};
