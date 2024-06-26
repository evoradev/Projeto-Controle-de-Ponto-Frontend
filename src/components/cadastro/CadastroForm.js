import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './CadastroForm.module.css'

function CadastroForm({btnText}) {
    return (
        <form className={styles.form}> 
            <Input type="text" text="Nome do projeto" name="name" placeholder="insira o seu nome:"/>
            <Select name="sexo" text="Selecione o sexo"/>
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default CadastroForm