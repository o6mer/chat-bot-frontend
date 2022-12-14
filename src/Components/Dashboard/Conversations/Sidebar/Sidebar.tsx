import React, { useState, useContext } from "react";
import { TChat } from "../../../../Types/Types";
import SidebarChatsList from "./ChatList/SidebarChatsList";
import SidebarFilters from "./Filters/SidebarFilters";
import SidebarHeader from "./Header/SidebarHeader";
import Divider from "@mui/material/Divider";
import {
  DashboardContext,
  TDashbaordContext,
} from "../../../../Contexts/DashbaordContext";
import {
  SocketContext,
  TSocketContext,
} from "../../../../Contexts/SocketContext";
const SideBar = () => {
  const [sortBy, setSortBy] = useState("new");

  const { chatList, deleteAllChats } = useContext(
    SocketContext
  ) as TSocketContext;

  return (
    <aside className="flex flex-col h-full w-[20%] p-2 outline-[3px] outline outline-gray-200 ">
      <SidebarHeader />

      <Divider />

      <SidebarFilters
        chatListLength={chatList?.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <SidebarChatsList sortBy={sortBy} chatList={chatList} />
      <button onClick={deleteAllChats}>Delete</button>
    </aside>
  );
};

export default SideBar;
