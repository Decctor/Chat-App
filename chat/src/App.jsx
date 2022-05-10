import { useEffect, useState } from "react";
import ChatFeed from "./components/ChatFeed";
import ChatList from "./components/ChatList";
import ChatOptions from "./components/ChatOptions";
import LogSign from "./components/LogSign";

function App() {
  const [user, setUser] = useState();
  const [currentChat, setCurrentChat] = useState();
  function logOut() {
    setUser(undefined);
    window.localStorage.removeItem("user");
  }
  useEffect(() => {
    let userOnLS = JSON.parse(window.localStorage.getItem("user"));
    setUser(userOnLS);
  }, []);
  return (
    <>
      {user ? (
        <div className="grid gap-1 bg-gradient-to-t from-blue-500 to-blue-600 box-border grid-cols-3 max-w-screen-2xl min-h-screen">
          <ChatList user={user} setCurrentChat={setCurrentChat} />
          <ChatFeed user={user} currentChat={currentChat} />
          <ChatOptions logOut={logOut} user={user} currentChat={currentChat} />
        </div>
      ) : (
        <div className="flex bg-cyan-900 items-center justify-center items-center max-w-screen-2xl min-h-screen">
          <LogSign setUser={setUser} />
        </div>
      )}
    </>
  );
}

export default App;
