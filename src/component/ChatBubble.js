import React from "react";

const ChatBubble = ({
  room,
  myKey,
  sender,
  username,
  time,
  messageId,
  userId,
  message,
}) => {
  return (
    <div
      key={myKey}
      className={`flex ${
        messageId === userId ? "justify-end" : "justify-start"
      }`}
    >
      <span>
        {messageId !== userId && !sender && (
          <svg
            className="text-[#7294b2] -scale-x-[1] "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 13"
            width="8"
            height="13"
          >
            <path
              opacity=".13"
              d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
            ></path>
            <path
              fill="currentColor"
              d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
            ></path>
          </svg>
        )}
      </span>
      <div
        className={`flex flex-col space-y-1 ${
          messageId === userId && `rounded-bl-lg bg-[#7294b2] `
        } ${
          messageId !== userId && !sender && `rounded-tr-lg bg-[#7294b2]`
        }   rounded-bl-lg  whitespace-normal max-w-[100%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%] rounded-br-lg mb-4 px-4 py-2`}
      >
        <p className="text-[#151515]"> {message}</p>
        <span
          className={`${
            messageId === userId ? "text-end" : "text-start"
          } text-[10px]`}
        >
          <p className="text-[12px]">
            {room === "" ? time : `from ${username}   ${ time }`}
          </p>
        </span>
      </div>
      {messageId === userId && (
        <span>
          <svg
            className="text-[#7d8ea9]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 13"
            width="8"
            height="13"
          >
            <path
              opacity=".13"
              d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
            ></path>
            <path
              fill="currentColor"
              d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
            ></path>
          </svg>
        </span>
      )}
    </div>
  );
};

export default ChatBubble;
