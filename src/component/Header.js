import { supabase } from "../lib/api";
import { IoIosPeople } from "react-icons/io";

const Header = ({createRoom, room, handleRoomChange }) => {
  return (
    <div className="flex items-center justify-between px-4 py-8 bg-background_color">
      <div className="flex items-center space-x-5 sm:space-x-8">
        <span className="text-[white] text-[14px] sm:text-[15px]">
          Chat App
        </span>
        <div
          className="cursor-pointer flex flex-col justify-center"
          onClick={createRoom}
        >
          <h4 className="text-[white]">Create Rooms</h4>
          <IoIosPeople className="w-8 h-8 flex justify-center text-center" />
        </div>
        <div className="ml-4">
          <h2 className="text-[white]">Chat Rooms</h2>
          <select
            value={room}
            onChange={handleRoomChange}
            className="text-white bg-gray-900 rounded-lg"
          >
            <option value="general">General</option>
            <option value="random">Random</option>
            <option value="test">Test</option>
          </select>
        </div>
      </div>
      <button
        className="bg-[white] p-2 rounded-sm cursor-pointer"
        onClick={async () => {
          const { error } = await supabase.auth.signOut();
          if (error) console.log({});
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
