import { supabase } from "../lib/api";
import { IoIosPeople } from "react-icons/io";

const Header = ({ username, room, handleRoomChange }) => {
  return (
    <div className="flex items-center justify-between px-4 py-8 bg-background_color">
      <div className="flex items-center space-x-5">
        <span className="text-[white] text-[14px] sm:text-[15px]">
          Chat App
        </span>
        <span className="text-[white] text-[14px] sm:text-[15px]">
          {username}
        </span>
        <div>
          <IoIosPeople className="w-10 h-10 cursor-pointer" />
        </div>
        <div className="ml-4">
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
