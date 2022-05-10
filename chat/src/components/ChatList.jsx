import React, { useEffect, useState } from "react";
import axios from "axios";
function ChatList({ user, setCurrentChat }) {
  const [chats, setChats] = useState([]);
  const [name, setName] = useState("");
  function getChats() {
    axios
      .get(`http://localhost:3001/chat/get/${user._id}`)
      .then((res) => setChats(res.data));
  }
  useEffect(() => {
    getChats();
  }, []);
  function createChat(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/chat/create/${user._id}`, {
        name,
        username: user.username,
      })
      .then((res) => {
        setName("");
        getChats();
      });
  }
  return (
    <div className="p-2">
      <div className="flex w-full h-[40px] gap-2 justify-between">
        <input
          value={name}
          className="bg-transparent w-full outline-none text-white  py-1 px-2"
          placeholder="Digite o nome do chat a ser criado..."
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={(e) => createChat(e)}
          className="bg-white rounded w-[100px] text-sm font-bold"
        >
          Criar chat
        </button>
      </div>
      <div className="mt-2">
        {chats.map((chat) => (
          <div
            onClick={() => setCurrentChat(chat._id)}
            className="flex flex-col mt-2 rounded hover:cursor-pointer bg-white min-h-[120px] px-2 py-4"
          >
            <h2 className="text-md font-semibold pl-5">{chat.name}</h2>
            <p className="text-sm text-gray-500 pl-5 mt-4">
              {chat.messages.length > 0 && chat.messages[-1]?.text}
            </p>
            <p className="text-sm self-end mt-4 px-2">
              {new Date(chat.updatedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
