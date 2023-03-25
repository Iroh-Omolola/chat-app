

const CreateRoom = ({roomName, purpose, error, loading, setPurpose, setRoomName}) => {

  return (
    <div className="w-full my-[50%] md:my-[30%] lg:my-[10%] sm:w-1/2 xl:w-1/3">
      <div>
        <h4 className="text-[16px] text-center text-background_color">
         Create Room
        </h4>
      </div>
      {error && (
        <div>
          <h4 className="text-[red] text-center">{error}</h4>
        </div>
      )}
    
      {!loading && (
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white">
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              Room Name
            </label>
            <input
              type="text"
              className="block appearance-none focus:outline-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your email"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              Purpose of Room
            </label>
            <text>
              type="text"
              className="block appearance-none focus:outline-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your reason for creating a room.."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            </text>
          </div>
          <div>
            <div className=" flex justify-center flex-col gap-2">
              <button
                onClick={signUp}
                className="btn-black  cursor-pointer text-center hover:bg-[black] p-2 bg-background_color text-[white]"
              >
               Create
              </button>
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default CreateRoom;
