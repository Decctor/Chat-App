import React, { useState, useEffect } from "react";
import axios from "axios";
function ChatOptions({ user, logOut, currentChat }) {
  const [chat, setChat] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const [possibleUsersToAdd, setPossibleUsersToAdd] = useState([]);
  const [userToAdd, setUserToAdd] = useState();
  console.log(userToAdd);
  function fetchChat() {
    if (currentChat)
      axios
        .get(`http://localhost:3001/chat/specific/get/${currentChat}`)
        .then((res) => setChat(res.data));
  }
  function getUsers() {
    axios
      .get("http://localhost:3001/user/get/all")
      .then((res) => setAllUsers(res.data));
  }
  function getDifference(array1, array2) {
    return array1.filter((object1) => {
      return !array2.some((object2) => {
        return object1._id === object2.userId;
      });
    });
  }
  function addUser() {
    if (userToAdd)
      axios
        .post(
          `http://localhost:3001/chat/people/add/${chat._id}`,
          JSON.parse(userToAdd)
        )
        .then(() => {
          setUserToAdd(undefined);
          fetchChat();
        });
  }
  useEffect(() => {
    getUsers();
    fetchChat();
  }, [currentChat]);
  useEffect(() => {
    if (chat) setPossibleUsersToAdd(getDifference(allUsers, chat.people));
  }, [chat]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col">
        <h1 className="self-center text-sky-300 text-2xl font-semibold">
          Perfil
        </h1>
        <h1 className="text-xl mt-4 font-semibold text-sky-100 self-center">
          {user?.username}
        </h1>
        <button onClick={() => logOut()} className="text-red-300">
          Sair
        </button>
      </div>
      <div className="h-[2px] mt-5 w-full bg-sky-200"></div>
      {chat && (
        <div className="flex flex-col">
          <h1 className="self-center mt-4 text-2xl text-sky-200">
            {chat.name}
          </h1>
          <div className="flex mt-4">
            <h3 className="mr-3 text-sky-500 font-semibold">Participantes:</h3>
            <p className="text-sky-100 italic">
              {chat.people?.map((person) => `${person.username} `)}
            </p>
          </div>
          <div className="flex flex-col mt-6 items-center gap-2">
            <h1 className="text-md  text-white">Adicionar participante:</h1>
            <select
              onChange={(e) => setUserToAdd(e.target.value)}
              className="px-4 py-2"
              name="users"
              id="users"
              defaultValue={"DEFAULT"}
            >
              <option value={"DEFAULT"} selected>
                Escolha um usuário
              </option>
              {possibleUsersToAdd.map((person) => (
                <option value={JSON.stringify(person)}>
                  {person.username}
                </option>
              ))}
            </select>
            <button
              onClick={addUser}
              className="px-4 p-2 bg-green-300 font-semibold rounded"
            >
              Adicionar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatOptions;
