import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Cadastro from './components/pages/Cadastro';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
    // Crie uma nova conexão WebSocket
    const socket = new WebSocket('ws://192.168.100.83:81'); // Substitua pelo IP do ESP8266

    // Evento quando a conexão for aberta
    socket.onopen = function(event) {
        console.log('Conectado ao WebSocket');
    };

    // Evento quando uma mensagem for recebida
    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        console.log('Mensagem recebida do ESP8266:', data);
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Container><Home /></Container>} />
                <Route path="/login" element={<Container><Login/></Container>} /> {/* Passando o socket */}
                <Route path="/cadastro" element={<Container><Cadastro/></Container>} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
