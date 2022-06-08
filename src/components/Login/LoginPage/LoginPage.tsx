import { useEffect, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import logo from "../../../assets/images/logo-pg.png";
import { ILoginParams } from "../../../models/auth";
import handleLoginAPI from "../../../server/userServer";
import "./LoginPage.css";
import { RESPONSE_STATUS_SUCCESS } from "../../../utils/httpResponseCode";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    let navigate = useNavigate();

    let localStorageEmail = localStorage.getItem("email");
    let localStoragePasswod = localStorage.getItem("password");

    const onLogin = async (values: ILoginParams) => {
        setErrorMessage("");

        setLoading(true);

        // match API
        let res = await handleLoginAPI(values.email, values.password);
        // console.log(res);

        setLoading(false);

        if (localStorageEmail === values.email && localStoragePasswod === values.password) {
            if (values.rememberMe) {
                navigate("/home");
            } else {
                navigate("/contact");
            }
        }

        if (res?.code === RESPONSE_STATUS_SUCCESS) {
            console.log(values.rememberMe);
            if (values.rememberMe) {
                //post input-data in localStorage
                navigate("/home");
                const localStorageValues = [
                    { key: "email", value: values.email },
                    { key: "password", value: values.password },
                ];

                localStorageValues.forEach((localStorageValue) =>
                    localStorage.setItem(localStorageValue.key, localStorageValue.value)
                );
            } else {
                navigate("/contact");
            }
        }

        //! invalid account
        if (res?.error) {
            setErrorMessage(res.message);
        }
    };

    return (
        <div className="container">
            <img src={logo} alt="" style={{ maxWidth: "250px", margin: "32px" }} />
            <LoginForm onLogin={onLogin} isLoading={loading} errorMessage={errorMessage} />
        </div>
    );
}

export default LoginPage;
