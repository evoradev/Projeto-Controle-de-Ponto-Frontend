import styles from './Container.module.css'

// para poder modificar o meu container

function Container(props) {
    // todos os filhos pegarão esse estilo
    return <div className={styles.container}>{props.children}</div>
}

export default Container