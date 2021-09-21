import { useState, useEffect } from 'react';
import './Styles.css';

function Name(props) {

    const placeholder = 'Name: ';

    const [name, setName] = useState(placeholder);

    useEffect(() => {
        props.name && setName(placeholder + props.name);
    }, [props.name]);

    const handleChange = (e) => {
        let value = e.target.value;

        if(value.length === 0) {
            setName(placeholder);
        } else if(value.length < placeholder.length) {
            return;
        } else {
            setName(value);
        }

        let cleanValue = value.replace(placeholder, '');
        props.updateFormData({ name: cleanValue });
    }

    return (
        <div className="Name">
            <input className={`Input ${props.error ? 'HasError' : ''}`}
                type="text"
                value={name}
                onChange={handleChange}
            />
            {
                props.error 
                ? (
                    <div className="Error">
                        <p>* Name missing</p>
                    </div>
                )
                : null
            }
        </div>
    );
}

export default Name;