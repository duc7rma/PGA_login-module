import { useState } from "react";
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

    const onLogin = async (values: ILoginParams) => {
        setErrorMessage("");
        setLoading(true);
        let res = await handleLoginAPI(values.email, values.password);
        // console.log(res);
        setLoading(false);

        if (res?.code === RESPONSE_STATUS_SUCCESS) {
            navigate("/home");
        }

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
