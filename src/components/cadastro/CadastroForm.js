import React, { useState, useEffect } from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './CadastroForm.module.css';

function CadastroForm({ btnText }) {
    const [isWaiting, setIsWaiting] = useState(false); 
    const [fingerprintData, setFingerprintData] = useState(null); 
    const [ws, setWs] = useState(null); 

    const sexoOptions = [
        { value: '', label: 'Selecione o sexo' },
        { value: 'masculino', label: 'Masculino' },
        { value: 'feminino', label: 'Feminino' }
    ];

useEffect(() => {
    // Ajusta a URL do WebSocket para se conectar ao ESP8266
    const socket = new WebSocket('ws://192.168.100.83:81'); 

    setWs(socket);

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.success) {
            setFingerprintData("Cadastro concluído com sucesso!");
            setIsWaiting(false);
            resetForm(); // Reseta o formulário após o sucesso
        } else {
            setFingerprintData(data.message); // Exibe a mensagem de erro ou de espera
        }
    };

    return () => {
        socket.close();
    };
}, []);

    const sendDataToESP = (formData) => {
        if (ws) {
            // Send form data to the WebSocket server
            ws.send(JSON.stringify({ action: 'cadastrar', ...formData }));
            setFingerprintData("Aguardando digital válida...");
            setIsWaiting(true); 
        } else {
            console.error('WebSocket não está disponível');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            nome: e.target.name.value,
            cpf: e.target.cpf.value,
            email: e.target.email.value,
            sexo: e.target.sexo.value,
        };

        sendDataToESP(formData); 
    };

    const resetForm = () => {
        setFingerprintData(null);
        setIsWaiting(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input type="text" text="Nome" name="name" placeholder="Insira o seu nome:" required />
            <Input type="text" text="CPF" name="cpf" placeholder="Insira o seu CPF:" required />
            <Input type="email" text="Email" name="email" placeholder="Insira seu email:" required />
            <Select name="sexo" options={sexoOptions} />
            <SubmitButton text={btnText} />
            {isWaiting && (
                <div className={styles.waitingMessage}>
                    {fingerprintData ? fingerprintData : 'Aguardando a digital...'}
                </div>
            )}
        </form>
    );
}

export default CadastroForm;
