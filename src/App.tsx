import { LoginForm } from "./pages/login";
import { SignupForm } from "./pages/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { UserProvider } from "./providers/user";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./store";
import ChatPage from "./pages/chat";
import { MessageProvider } from "./providers/chats";
function App() {
  return (
    <Provider store={store}>
      <div className="h-svh w-screen overflow-x-hidden border">
        <BrowserRouter>
          <UserProvider>
            <MessageProvider>
              <Toaster position="top-right" />
              <Routes>
                <Route path="/details" element={<Dashboard />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/" element={<ChatPage />} />
              </Routes>
            </MessageProvider>
          </UserProvider>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
