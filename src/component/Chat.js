import moment from "moment";
import { useState, useEffect, useRef } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { supabase } from "../lib/api";
import ChatBubble from "./ChatBubble";
import CreateRoom from "./CreateRoom";
import Header from "./Header";
import UserUpdate from "./UserUpdate";

let messageSubscription = null;
let roomSubscription = null;

const Chat = ({ user_name, user_id, userName, setUserName }) => {
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("general");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [sender, setSender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomError, setRoomError] = useState("");
  const [roomLoading, setRoomLoading] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [userData, setUserData] = useState("");
  const [checkUserName, setCheckUserName] = useState(false);
  const messagesRef = useRef();

  useEffect(() => {
    loadMessages();
    messageSubscription = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((messages) => [...messages, payload.new]);
          if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeAllChannels();
    };
  }, [room, message]);

  useEffect(() => {
    loadRooms();
    roomSubscription = supabase
      .channel("public:rooms")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "rooms" },
        (payload) => {
          setRooms((rooms) => [...rooms, payload.new]);
        }
      )
      .subscribe();


    return () => {
      supabase.removeAllChannels();
    };
  }, [rooms]);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .eq("room", room)
      .order("created_at", { ascending: true });
    if (error) console.error(error);
    else {
      setMessages(data);
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }
  };

  const loadRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select()
      .order("created_at", { ascending: true });
    if (error) console.error(error);
    else {
      setRooms(data);
    }
  };

  const sendMessage = async (messageText) => {
    try {
      supabase.removeChannel(messageSubscription);

      let message = messageText.trim();
      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            message,
            user_id: userId,
            message_user_name: userData,
            room,
          },
        ])
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

  const createRoom = async (roomName) => {
    try {
      supabase.removeChannel(roomSubscription);

      let roomTitle = roomName.trim();
      const { data, error } = await supabase
        .from("rooms")
        .insert([
          {
            user_id: userId,
            room_name: roomTitle,
          },
        ])
        .single();
      if (error) console.log({});
      else {
        setRooms([...rooms, data]);
      }
    } catch (error) {
      console.error({});
    }
  };

  const onCreate = (e) => {
    e.preventDefault();
    if (roomName !== "") {
      createRoom(roomName);
      setRoomLoading(true);
      setShowRoom(false)
      setRoomName("");
      setRoomLoading(false);


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
      setEmail(data.user?.email);
      setUserData(data.user?.user_metadata?.user_name);
    }
  };
  useEffect(() => {
    getUserName();
  }, []);

  console.log("user", userName)
  const handleRoomChange = (event) => {
    if (userName !== " ") {
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
      const { error } = await supabase.auth.updateUser({
        email,
        data: { user_name: userName + new Date().getMilliseconds() },
      });
      if (error) {
        setNameError(error);
      } else {
        setCheckUserName(false);
        setLoading(false);
        setError("");
      }
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
        rooms={rooms}
        createRoom={() => setShowRoom(true)}
        handleRoomChange={handleRoomChange}
      />
      <div
        className="flex-1 p-4 overflow-y-scroll bg-[#d2e3ff]"
        ref={messagesRef}
      >
        {messages &&
          messages.length > 0 &&
          messages.map((message) => (
            <ChatBubble
              sender={sender}
              key={message?.id}
              myKey={message?.id}
              messageId={message?.user_id}
              time={moment(message?.created_at).format("h:mm a")}
              userId={user_id}
              room={room}
              username={`${message?.message_user_name}`}
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
      {checkUserName !== false && userData === "" &&(
        <UserUpdate
          userName={userName}
          setUserName={setUserName}
          onUpdateUser={onUpdateUser}
          loading={loading}
          error={nameError}
        />
      )}

      {showRoom && (
        <CreateRoom
          roomName={roomName}
          error={roomError}
          loading={roomLoading}
          onCancel={() => setShowRoom(false)}
          onCreateRoomSetup={onCreate}
          setRoomName={setRoomName}
        />
      )}
    </div>
  );
};

export default Chat;
