import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login/Component';
import RegistrationSuccess from './component/Registered/Component';
import Root from './component/Root/Component';
import Signup from './component/Signup/Component';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/registered" element={<RegistrationSuccess />} />
            </Routes>
        </Router>
    );
}

export default App;
