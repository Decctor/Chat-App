import axios from "axios";
import React, { useEffect, useState } from "react";

function ChatFeed({ user, currentChat }) {
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  function fetchChat() {
    if (currentChat)
      axios
        .get(`http://localhost:3001/chat/specific/get/${currentChat}`)
        .then((res) => setChat(res.data));
  }
  useEffect(() => {
    fetchChat();
  }, [currentChat]);
  function sendMessage(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/chat/msg/create/${chat._id}`, {
        senderID: user._id,
        senderUsername: user.username,
        text,
      })
      .then(() => {
        setText("");
        fetchChat();
      });
  }
  return (
    <>
      {chat ? (
        <div className="flex h-screen flex-col relative p-2 border-x border-sky-200">
          <div className="flex flex-col items-center my-4">
            <h1 className="text-2xl font-semibold text-sky-100">{chat.name}</h1>
            <p className="text-sm text-sky-300">
              {chat.people?.map((person) => `${person.username} `)}
            </p>
          </div>
          <div className="flex flex-col-reverse max-h-full overflow-auto px-4 my-2 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin">
            {chat.messages?.length > 0 &&
              chat.messages
                .slice(0)
                .reverse()
                .map((msg, index) =>
                  msg.senderID == user._id ? (
                    <div className="flex justify-end min-h-[40px] mt-3">
                      <p className="bg-blue-400 w-fit py-1 px-3 rounded-sm">
                        {msg?.text}
                      </p>
                    </div>
                  ) : (
                    <div className="flex justify-start min-h-[40px] mt-3">
                      <span className="mr-4 text-purple-400">
                        {msg.senderUsername}
                      </span>
                      <p className="bg-blue-700 text-white w-fit py-1 px-3 rounded-sm">
                        {msg?.text}
                      </p>
                    </div>
                  )
                )}
          </div>
          <div className="sticky top-full">
            <form className="flex w-full h-[40px] gap-2 justify-between">
              <input
                value={text}
                onSubmit={(e) => sendMessage(e)}
                className="bg-white w-full outline-none text-black rounded py-1 px-4"
                placeholder="Digite sua mensagem..."
                type="text"
                onChange={(e) => setText(e.target.value)}
              />
              <button
                onClick={(e) => sendMessage(e)}
                className="bg-green-500 rounded w-[100px] text-sm text-white font-bold"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-screen flex-col relative p-2 border-x border-sky-200">
          <h1 className="self-center text-xl font-semibold text-sky-200">
            Chat não escolhido.
          </h1>
        </div>
      )}
    </>
  );
}

export default ChatFeed;
