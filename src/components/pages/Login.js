import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import SubmitButton2 from '../form/SubmitButton2';

function Login({ btnText, socket }) {
    const [isWaiting, setIsWaiting] = useState(false); // Estado de espera pela digital
    const [fingerprintData, setFingerprintData] = useState(null); // Dados da digital recebida
    const [error, setError] = useState(null); // Estado para armazenar erros

    // Função para enviar um pedido de leitura ao ESP8266
    const requestFingerprintScan = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ action: 'ler_digital' })); // Envia uma mensagem ao ESP8266
            setIsWaiting(true); // Inicia o estado de espera
        } else {
            setError('Conexão WebSocket não está aberta.');
        }
    };

    // Efeito para receber dados do WebSocket
    useEffect(() => {
        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Mensagem recebida do ESP8266:', data);

            if (data.status === 'reconhecida') {
                setFingerprintData(`Digital reconhecida: ID ${data.id}`);
            } else {
                setFingerprintData('Digital não reconhecida.');
            }

            setIsWaiting(false); // Finaliza o estado de espera
        };

        if (socket) {
            socket.addEventListener('message', handleMessage); // Escuta as mensagens do WebSocket
        }

        return () => {
            if (socket) {
                socket.removeEventListener('message', handleMessage); // Remove o listener ao desmontar
            }
        };
    }, [socket]); // Executa sempre que o socket mudar

    return (
        <div className={styles.login_container}>
            <h1>Identificar Pessoa</h1>
            <p>Insira o dedo no leitor para realizar a identificação</p>

            {/* Botão de leitura da digital */}
            <SubmitButton2 text={btnText || "Leitura Digital"} onClick={requestFingerprintScan} />

            {/* Exibir o spinner e a mensagem de espera enquanto aguarda a digital */}
            {isWaiting && (
                <div>
                    <div className={styles.spinner}></div> {/* Spinner gráfico */}
                    <p>Aguardando leitura da digital...</p>
                </div>
            )}

            {/* Exibir o dado da digital quando reconhecido */}
            {fingerprintData && <p>{fingerprintData}</p>}
            {error && <p className={styles.error}>{error}</p>} {/* Exibir mensagem de erro se houver */}
        </div>
    );
}

export default Login;
