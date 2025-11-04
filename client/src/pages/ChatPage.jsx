import React from "react";
import { userAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { logout } = userAuthStore();
  return (
    <>
      <h1 className="text-3xl text-red-500 font-bold underline">
        Hello world!
      </h1>
      <button onClick={() => logout()} className="z-10 btn">
        logout
      </button>
    </>
  );
};

export default ChatPage;
