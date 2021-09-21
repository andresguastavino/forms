import { useState, useEffect} from 'react';
import './Styles.css';

function Telephone(props) {

    const placeholder = 'Telephone: ';

    const [telephone, setTelephone] = useState(placeholder);

    useEffect(() => {
        props.telephone && setTelephone(placeholder + props.telephone);
    }, [props.telephone]);

    const handleChange = (e) => {
        let value = e.target.value;
        let lastDigit = parseInt(value.substring(value.length - 1, value.length));
        let cleanValue = value.replace(placeholder, '');

        if(value.length === 0) {
            setTelephone(placeholder);
        } else if(value.length < placeholder.length || (isNaN(lastDigit) && cleanValue !== '')) {
            return;
        } else if(cleanValue.length <= 10) {
            setTelephone(value);
            props.updateFormData({ telephone: cleanValue });
        }


    }

    return (
        <div className="Telephone">
            <input className={`Input ${props.error ? 'HasError' : ''}`}
                type="text"
                value={telephone}
                onChange={handleChange}
            />
            {
                props.error 
                ? (
                    <div className="Error">
                        <p>* Telephone invalid or missing (must be 10 numbers)</p>
                    </div>
                )
                : null
            }
        </div>
    );
}

export default Telephone;