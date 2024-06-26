import styles from './Login.module.css'

import SubmitButton from '../form/SubmitButton'

function Login({btnText}) {
    return (
        // <div className={styles.login_container}>
        //     <button>Identificar pessoa</button>
        // </div>
        

        <div className={styles.login_container}>
            <h1>Identficar Pessoa</h1>
            <p>Insira o dedo no leitor para realizar a identificação</p>
            <SubmitButton text="Leitura Digital"/>
        </div>
    )
}

export default Login