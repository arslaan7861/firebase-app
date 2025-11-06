import { LoginForm } from "./pages/login";
import { SignupForm } from "./pages/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { UserProvider } from "./providers/user";
import { Toaster } from "sonner";
function App() {
  return (
    <div className="h-svh w-screen p-4 md:p-8">
      <BrowserRouter>
        <UserProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
