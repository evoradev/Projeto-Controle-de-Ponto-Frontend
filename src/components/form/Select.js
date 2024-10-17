import styles from './Select.module.css'

function Select({ name, text, options }) {
    return (
        <div>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;