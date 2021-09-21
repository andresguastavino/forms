import { useState } from 'react';
import FormLayout from '../FormLayout';
import Name from '../Name';
import Surname from '../Surname';
import Telephone from '../Telephone';
import Email from '../Email';
import Success from '../Success';
import './Form.css';

const defaultFormData = {
    name: '',
    surname: '',
    telephone: '',
    email: ''
}

const defaultErrors = {
    name: false,
    surname: false,
    telephone: false,
    email: false
}

function Form() {

    const [formData, setFormData] = useState(defaultFormData);
    const [errors, setErrors] = useState(defaultErrors);
    const [selected, setSelected] = useState(0);
    const [finished, setFinished] = useState(false);

    const updateFormData = (newFormData) => {
        setFormData({...formData, ...newFormData});
    }

    let steps = [
        {
            index: 0,
            title: 'Enter your name',
            html: (
                <Name
                    {...formData}
                    error={errors.name}
                    updateFormData={updateFormData}
                />
            ),
            validated: () => {
                setErrors({...errors, name: !formData.name});
                return formData.name;
            }
        },
        {
            index: 1,
            title: 'Enter your surname',
            html: (
                <Surname 
                    {...formData}
                    error={errors.surname}
                    updateFormData={updateFormData}
                />
            ),
            validated: () => {
                setErrors({...errors, surname: !formData.surname});
                return formData.surname;
            }
        },
        {
            index: 2,
            title: 'Enter your telephone',
            html: (
                <Telephone 
                    {...formData}
                    error={errors.telephone}
                    updateFormData={updateFormData}
                />
            ),
            validated: () => {
                setErrors({...errors, telephone: !formData.telephone || formData.telephone.length < 10});
                return formData.telephone && formData.telephone.length === 10;
            }
        },
        {
            index: 3,
            title: 'Enter your email',
            html: (
                <Email 
                    {...formData}
                    error={errors.email}
                    updateFormData={updateFormData}
                />
            ),
            validated: () => {
                // eslint-disable-next-line
                const regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
                setErrors({...errors, email: (!formData.email || !regexEmail.test(formData.email)) });
                return formData.email && regexEmail.test(formData.email);
            }
        }
    ];

    const changeStep = (newStep) => {
        let valid = false;

        if(newStep < selected && newStep >= 0) {
            valid = true;
        } else if(newStep > selected && newStep < steps.length) {
            if(steps[selected].validated ? steps[selected].validated() : true) {
                valid = true;
            }
        } else if(newStep === steps.length) {
            if(steps[selected].validated ? steps[selected].validated() : true) {
                setFinished(true);
                return;
            }
        }

        valid && setSelected(newStep);
    }

    return (
        <div className="Form">
            { finished && <Success {...formData} /> }
            
            { !finished && (
                <FormLayout 
                    steps={steps.length}
                    page={{
                        ...steps[selected],
                        id: selected
                    }}
                    changeStep={(newStep) => changeStep(newStep)}
                >
                    {steps[selected].html}
                </FormLayout>
            ) }
        </div>
    );
}

export default Form;