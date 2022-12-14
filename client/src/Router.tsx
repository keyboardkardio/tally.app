import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserLogin } from './views/user/UserLogin';
import { UserRegistration } from './views/user/UserRegistration';
import { CreateWorkoutEntry } from './views/workout/CreateWorkoutEntry';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<UserRegistration />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/create' element={<CreateWorkoutEntry />} />
      </Routes>
    </BrowserRouter>
  );
}