

const CreateRoom = ({roomName,onCreateRoomSetup,onCancel, purpose, error, loading, setPurpose, setRoomName}) => {

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-[-45px] mmd:top-0 bg-[blackAlpha] right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-[100vh]">
      <div className="relative p-4 w-full h-[100vh] md:h-auto mx-auto mt-[10%]">
        <div className="rounded-lg ">
          <div className="w-full bg-[white] my-[50%] mx-auto md:my-[30%] lg:my-[10%] sm:w-1/2 xl:w-1/3">
            <div>
              <h4 className="text-[16px] mb-2 text-center text-background_color">
                Create Room
              </h4>
            </div>
            {error && (
              <div>
                <h4 className="text-[red] text-center">{error}</h4>
              </div>
            )}
            {loading && <p>loading.....</p>}
            {!loading && (
              <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white">
                <div className="mb-4">
                  <label className="font-bold text-grey-darker block mb-2">
                    Room Name
                  </label>
                  <input
                    type="text"
                    className="block appearance-none w-full bg-white focus:outline-none border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                    placeholder="Your username"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="font-bold text-grey-darker block mb-2">
                    Purpose of Room
                  </label>
                  <input
                    type="text"
                    className="block appearance-none w-full bg-white focus:outline-none border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                    placeholder="Your username"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <div className=" flex justify-center flex-col gap-2">
                    <button
                      onClick={onCancel}
                      className="btn-black text-center cursor-pointer hover:bg-[black] p-2 bg-background_color text-[white]"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className=" flex justify-center flex-col gap-2">
                    <button
                      onClick={onCreateRoomSetup}
                      className="btn-black text-center cursor-pointer hover:bg-[black] p-2 bg-background_color text-[white]"
                    >
                      Enter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
