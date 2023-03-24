import { useState, useEffect } from "react";
import { supabase } from "./lib/api";
import Auth from "./component/Auth";
import Chat from "./component/Chat";
import UserUpdate from "./component/UserUpdate";

function App() {
  const [session, setSession] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkUserName, setCheckUserName] = useState(false);

  const checkSession = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error) setSession(data);
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  };

  useEffect(() => {
    checkSession();
  }, []);

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
    <div className="w-full h-full #101828 overflow-x-hidden">
      {!session ? (
        <div className="w-full h-full flex justify-center items-center p-4">
          <Auth />
        </div>
      ) : (
        <>
          <Chat
            user_id={session?.user?.id}
            checkUserName={checkUserName}
            setCheckUserName={setCheckUserName}
            setUserName={setUserName}
            userName={userName}
            username={session?.user?.user_metadata?.user_name}
          />
          {checkUserName ===false && (
            <UserUpdate
              userName={userName}
              setUserName={setUserName}
              onUpdateUser={onUpdateUser}
              loading={loading}
              error={error}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
