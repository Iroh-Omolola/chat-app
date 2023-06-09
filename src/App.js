import { useState, useEffect } from "react";
import { supabase } from "./lib/api";
import Auth from "./component/Auth";
import Chat from "./component/Chat";

function App() {
  const [session, setSession] = useState(null);


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
            user_name={session?.user?.user_metadata?.user_name}
          />
        </>
      )}
    </div>
  );
}

export default App;
