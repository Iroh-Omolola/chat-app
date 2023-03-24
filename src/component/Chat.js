import { useState, useEffect } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { supabase } from "../lib/api";
import ChatBubble from "./ChatBubble";
import Header from "./Header";
import UserUpdate from "./UserUpdate";

let messageSubscription = null;

const Chat = ({ user_name, user_id, userName, setUserName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("general");
  const [userId, setUserId] = useState("");
  const [sender, setSender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkUserName, setCheckUserName] = useState(false);

  useEffect(() => {
    loadMessages();
    messageSubscription = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((messages) => [...messages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeAllChannels();
    };
  }, [room, message]);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .eq("room", room)
      .order("created_at", { ascending: true });
    if (error) console.error(error);
    else {
      setMessages(data);
    }
  };
  console.log("check", checkUserName);

  const sendMessage = async (messageText) => {
    try {
      supabase.removeChannel(messageSubscription);

      let message = messageText.trim();
      const { data, error } = await supabase
        .from("messages")
        .insert([{ message, user_id: userId, room }])
        .single();
      if (error) console.log({});
      else {
        setMessage("");
        setMessages([...messages, data]);
      }
    } catch (error) {
      console.error({});
    }
  };

  const getUserId = async () => {
    const { data } = await supabase.auth.getUser();
    if (data) {
      setUserId(data.user?.id);
    } else {
      console.error({});
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  const getUserName = async () => {
    const { data } = await supabase.auth.getUser();
    if (data) {
      setUserName(data.user?.user_metadata?.user_name);
    }
  };
  useEffect(() => {
    getUserName();
  }, []);

  const handleRoomChange = (event) => {
    if (event.target.value !== "" && userName !== " ") {
      setCheckUserName(true);
      setRoom(event.target.value);
    } else {
      setCheckUserName(false);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (message !== "") {
      sendMessage(message);
    }
  };
  useEffect(() => {
    if (message?.user_id === userId) {
      setSender(true);
    }
  }, [message, userId]);

  const onUpdateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await supabase.auth.updateUser({
        user_name: userName,
      });
      setLoading(false);
      setError("");
    } catch (e) {
      console.error({});
      setError(e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f1e3c]">
      <Header
        username={user_name}
        room={room}
        handleRoomChange={handleRoomChange}
      />
      <div className="flex-1 p-4 overflow-y-scroll bg-[#d2e3ff]">
        {messages &&
          messages.length > 0 &&
          messages.map((message) => (
            <ChatBubble
              sender={sender}
              key={message?.id}
              myKey={message?.id}
              messageId={message?.user_id}
              userId={user_id}
              message={message?.message}
            />
          ))}
      </div>
      <form className="flex items-center justify-between px-4 py-2 ">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mr-4 bg-[#d2e3ff] focus:outline-none rounded-full py-2 px-4 text-[#1b1a1a]"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full"
          onClick={onSubmit}
        >
          <BsFillSendFill className="w-7 h-7" />
        </button>
      </form>
      {checkUserName !== false && (
        <UserUpdate
          userName={userName}
          setUserName={setUserName}
          onUpdateUser={onUpdateUser}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default Chat;
