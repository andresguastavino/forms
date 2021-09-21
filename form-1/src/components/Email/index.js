import { useState, useEffect } from 'react';
import './Styles.css';

function Email(props) {

    const placeholder = 'Email: ';

    const [email, setEmail] = useState(placeholder);

    useEffect(() => {
        props.email && setEmail(placeholder + props.email);
    }, [props.email]);

    const handleChange = (e) => {
        let value = e.target.value;

        if(value.length === 0) {
            setEmail(placeholder);
        } else if(value.length < placeholder.length) {
            return;
        } else {
            setEmail(value);
        }

        let cleanValue = value.replace(placeholder, '');
        props.updateFormData({ email: cleanValue });
    }

    return (
        <div className="Email">
            <input className={`Input ${props.error ? 'HasError' : ''}`}
                type="text"
                value={email}
                onChange={handleChange}
            />
            {
                props.error 
                ? (
                    <div className="Error">
                        <p>* Email invalid or missing</p>
                    </div>
                )
                : null
            }
        </div>
    );
}

export default Email;