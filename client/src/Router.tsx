import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppBar } from 'src/components/AppBar/AppBar';
import { Home } from 'src/views/home/Home';
import { UserLogin } from 'src/views/user/UserLogin';
import { UserRegistration } from 'src/views/user/UserRegistration';
import { CreateWorkoutEntry } from 'src/views/workout/CreateWorkoutEntry';

export function Router() {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<UserRegistration />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/create' element={<CreateWorkoutEntry />} />
      </Routes>
    </BrowserRouter>
  );
}
