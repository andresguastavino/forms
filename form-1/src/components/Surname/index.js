import { useState, useEffect } from 'react';
import './Styles.css';

function Surname(props) {

    const placeholder = 'Surname: ';

    const [surname, setSurame] = useState(placeholder);

    useEffect(() => {
        props.surname && setSurame(placeholder + props.surname);
    }, [props.surname]);

    const handleChange = (e) => {
        let value = e.target.value;

        if(value.length === 0) {
            setSurame(placeholder);
        } else if(value.length < placeholder.length) {
            return;
        } else {
            setSurame(value);
        }

        let cleanValue = value.replace(placeholder, '');
        props.updateFormData({ surname: cleanValue });
    }

    return (
        <div className="Surname">
            <input className={`Input ${props.error ? 'HasError' : ''}`}
                type="text"
                value={surname}
                onChange={handleChange}
            />
            {
                props.error 
                ? (
                    <div className="Error">
                        <p>* Surname missing</p>
                    </div>
                )
                : null
            }
        </div>
    );
}

export default Surname;