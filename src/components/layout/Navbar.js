import {Link} from 'react-router-dom'

import Container from './Container';

import styles from './Navbar.module.css'
// import logo from '../../img/{nome_logo_site}' //-> adicionar uma imagem de logo para aparecer na aba do site

function Navbar() {
    return(
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">Home</Link>  {/*posso colocar uma imagem pra voltar pro index*/}
                <ul class={styles.list}>
                    <li class={styles.item}>
                        <Link to="/cadastro">Cadastro</Link>
                    </li>

                    <li class={styles.item}>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    );
}

export default Navbar;