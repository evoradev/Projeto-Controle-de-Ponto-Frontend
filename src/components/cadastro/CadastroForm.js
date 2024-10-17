import React, { useState } from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './CadastroForm.module.css';

function CadastroForm({ btnText, socket }) {
    const [isWaiting, setIsWaiting] = useState(false);
    const [fingerprintData, setFingerprintData] = useState(null);

    const sexoOptions = [
        { value: '', label: 'Selecione o sexo' },
        { value: 'masculino', label: 'Masculino' },
        { value: 'feminino', label: 'Feminino' }
    ];

    // Função para enviar os dados do cadastro e acionar o recebimento da digital
    const sendDataToESP = (formData) => {
        setIsWaiting(true);
        const jsonData = JSON.stringify(formData);
        socket.send(`cadastrar ${jsonData}`); // Enviar a mensagem de cadastro

        // Lógica para receber a resposta do WebSocket
        socket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            setFingerprintData(data.message); // Armazena a mensagem recebida do ESP8266

            if (data.success) {
                alert("Cadastro concluído com sucesso!"); // Mensagem de sucesso
                resetForm(); // Reseta o formulário
            } else {
                setFingerprintData("Aguardando digital válida...");
            }
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            nome: e.target.name.value,
            cpf: e.target.cpf.value,
            email: e.target.email.value,
            sexo: e.target.sexo.value,
        };

        sendDataToESP(formData); // Envia os dados do cadastro ao ESP8266
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
