import React from 'react';
import styles from './SubmitButton2.css'

function SubmitButton2({ text, onClick }) {
    return (
        <button type="button" className={styles.btn} onClick={onClick}>
            {text}
        </button>
    );
}

export default SubmitButton2;
