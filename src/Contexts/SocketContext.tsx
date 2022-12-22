import React, { createContext, useEffect, useState, ReactNode } from "react";
import { useSocket } from "../Hooks/useSocket";
import { TChat, TConversation, TTemplate, TUser } from "../Types/Types";
import io from "socket.io-client";

export type TSocketContext = {
  chatList?: Array<TChat>;
  deleteAllChats?: () => void;
  sendMessage: (message: string) => void;
  currentChatData?: TChat;
  setChatStatus: (status?: string, chatId?: string) => void;
  setFilteredChatList: (filter: string) => void;
  templateList?: Array<TTemplate>;
  updateTemplate: (template: TTemplate) => void;
  deleteTemplate: (templateId?: string) => void;
  createTemplate: (title: string, content: string) => void;
  createConversation: (coversation: TConversation) => void;
};

export const SocketContext = createContext<TSocketContext | null>(null);

const socket = io("http://localhost:3001/", {
  closeOnBeforeunload: false,
});

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    chatList,
    deleteAllChats,
    sendMessage,
    currentChatData,
    setChatStatus,
    setFilteredChatList,
    templateList,
    updateTemplate,
    deleteTemplate,
    createTemplate,
    createConversation,
  } = useSocket(socket);

  return (
    <SocketContext.Provider
      value={{
        chatList,
        deleteAllChats,
        sendMessage,
        currentChatData,
        setChatStatus,
        setFilteredChatList,
        templateList,
        updateTemplate,
        deleteTemplate,
        createTemplate,
        createConversation,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
