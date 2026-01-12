import { useState } from "react";
import {
  UserProvider,
  PostProvider,
  CommunityProvider,
} from "./context/AppContext";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { PostFeed } from "./components/PostFeed";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <UserProvider>
      <PostProvider>
        <CommunityProvider>
          <div className="min-h-screen bg-white">
            <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            <div className="flex">
              <Sidebar />
              <PostFeed searchQuery={searchQuery} />
            </div>
          </div>
        </CommunityProvider>
      </PostProvider>
    </UserProvider>
  );
}
