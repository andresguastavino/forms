function Success(props) {

    return (
        <div className="Success">
            <p>
                Name: {props.name}
            </p>
            <p>
                Surname: {props.surname}
            </p>
            <p>
                Telephone: {props.telephone}
            </p>
            <p>
                Email: {props.email}
            </p>
        </div>
    );
}

export default Success;