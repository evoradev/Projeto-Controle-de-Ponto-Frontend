import styles from './Home.module.css'
function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Projeto 5</span></h1>
            <p>Escolha qual página deseja seguir</p>
        </section>
    )

}

export default Home