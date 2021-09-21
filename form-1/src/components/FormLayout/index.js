import './FormLayout.css';

function FormLayout(props) {

    return (
        <div className="FormLayout">
            <div className="Header">
                <div className="Title">
                    {props.page.title}
                </div>
            </div>
            <div className="Body">
                <div className="Children">
                    {props.children}
                </div>
            </div>
            <div className="Footer">
                <div className="Left">
                    {
                        props.page.id > 0
                        ? (
                            <button type="button" onClick={() => props.changeStep(props.page.id - 1)}>
                                Back
                            </button>
                        ) 
                        : null
                    }
                </div>
                <div className="Right">
                    <button type="button" onClick={() => props.changeStep(props.page.id + 1)}>
                        {
                            props.page.id + 1 === props.steps 
                            ? 'Send'
                            : 'Next'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormLayout;