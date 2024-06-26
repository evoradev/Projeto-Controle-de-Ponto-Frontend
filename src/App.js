import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Cadastro from './components/pages/Cadastro';

import Container  from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Container> */}
          {/* When the path is exactly '/', render the Home component */}
          <Route path="/" element={<Container><Home /></Container>} />
          
          {/* When the path is '/login', render the Login component */}
          <Route path="/login" element={<Container><Login /></Container>} />
          
          {/* When the path is '/cadastro', render the Cadastro component */}
          <Route path="/cadastro" element={<Container><Cadastro /></Container>} />
        {/* </Container> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
