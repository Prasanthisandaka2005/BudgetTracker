import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Signup from './components/Signup'
import { Toaster } from './components/ui/toaster'
import Login from './components/Login'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './components/Firebase/firebase'
import { logoutUser, setUser } from './features/user/userSlice'
import ProtectedRoute from './components/ProtectedRoute'
import Loading from './components/Loading'
import ItemsPage from './components/ItemsPage'
import OtherCostsPage from './components/OtherCostsPage'

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ name: user.displayName || '', email: user.email }));
      } else {
        dispatch(logoutUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/items" element={<ProtectedRoute><ItemsPage /></ProtectedRoute>} />
        <Route path="/other-costs" element={<ProtectedRoute><OtherCostsPage /></ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
