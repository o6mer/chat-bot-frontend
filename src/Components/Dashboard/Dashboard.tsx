import React, { useContext, useEffect, useState } from "react";
import MainFrame from "./MainFrame/MainFrame";
import SideBar from "./Sidebar/Sidebar";
import { io } from "socket.io-client";
import { TChat, TMessage } from "../../Types/Types";
import { DashboardContext } from "../../Contexts/DashbaordContext";
import { kStringMaxLength } from "buffer";

const Dashboard = () => {
  const [chatList, setChatList] = useState<Array<TChat>>();
  const [currentChatData, setCurrentChatData] = useState<TChat>();
  const { user, socket, setSocket, currentChatId }: any =
    useContext(DashboardContext);

  useEffect(() => {
    setSocket(
      io("http://localhost:3001/", {
        closeOnBeforeunload: false,
      })
    );
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      socket.emit("newAdminConnection", onNewAdminConnection);
      console.log("admin connected");

      socket.on("newChatStarted", onNewChat);
      socket.on("receiveMessage", onReceiveMessage);
    });

    return () => {
      socket?.removeAllListeners();
    };
  }, [socket]);

  useEffect(() => {
    socket?.emit("getChatData", currentChatId, (chat: TChat) => {
      setCurrentChatData(chat);
    });
  }, [currentChatId]);

  const onNewAdminConnection = (prevChatList: Array<any>) => {
    setChatList(prevChatList);
  };

  const onNewChat = (newChat: TChat) => {
    console.log("new chat: ", newChat);
    setChatList((prev: any) => [...prev, newChat]);
    socket.emit("joinChat", newChat.id);
  };

  const onReceiveMessage = ({
    message,
    id,
  }: {
    message: TMessage;
    id: string;
  }) => {
    addMessage(message);
  };

  const addMessage = (message: TMessage) => {
    setCurrentChatData((prev: any) => {
      return { ...prev, messages: [...prev.messages, message] };
    });
  };

  const sendMessage = (messageContent: string) => {
    socket?.emit(
      "sendMessage",
      {
        id: currentChatId,
        messageContent,
        user: user?.username || "admin",
      },
      addMessage
    );
  };

  const deleteAllChats = () => {
    socket.emit("deleteAllChats")
  }

  return (
    <main className="w-full h-full flex">
      <SideBar chatList={chatList} deleteAllChats={deleteAllChats}/>
      <MainFrame sendMessage={sendMessage} currentChatData={currentChatData} />
    </main>
  );
};

export default Dashboard;
