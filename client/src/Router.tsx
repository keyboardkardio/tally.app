import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppBar from 'src/components/AppBar/AppBar';
import RequireAuth from 'src/components/RequireAuth';
import Home from 'src/views/home/Home';
import UserLogin from 'src/views/user/UserLogin';
import UserRegistration from 'src/views/user/UserRegistration';
import CreateWorkoutEntry from 'src/views/workout/CreateWorkoutEntry';
import WorkoutLog from 'src/views/workout/WorkoutLog';

export default function Router() {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path='/register' element={<UserRegistration />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
        <Route path='/workout-log' element={<RequireAuth><WorkoutLog /></RequireAuth>} />
        <Route path='/create' element={<RequireAuth><CreateWorkoutEntry /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}
