import CadastroForm from '../cadastro/CadastroForm'

import styles from './Cadastro.module.css'

function Cadastro() {
    return (
        <div className={styles.cadastro_container}>
            <h1>Cadastrar Pessoa</h1>
            <p>Cadastrar dados e digital para ficar registrado</p>
            <CadastroForm btnText="Cadastrar Digital"/>
        </div>
    )
}

export default Cadastro