import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import PrivateRoute from './PrivateRoute'
import GuestRoute from './GuestRoute'
import Home from '../pages/Home'
import Ideas from '../pages/Ideas'
import IdeaDetails from '../pages/IdeaDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AddIdea from '../pages/AddIdea'
import MyIdeas from '../pages/MyIdeas'
import MyInteractions from '../pages/MyInteractions'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/ideas" element={<Ideas />} />

        {/* Only for visitors who are not signed in */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Members only: guests are redirected to /login */}
        <Route element={<PrivateRoute />}>
          <Route path="/ideas/:id" element={<IdeaDetails />} />
          <Route path="/add-idea" element={<AddIdea />} />
          <Route path="/my-ideas" element={<MyIdeas />} />
          <Route path="/my-interactions" element={<MyInteractions />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
