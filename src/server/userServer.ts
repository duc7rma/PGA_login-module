import axios from "axios";
import {urlAPI} from '../utils/constants'

interface ILoginAPIRes {
    message: string;
    error: boolean;
    code: number;
    data: object;
}

const handleLoginAPI = (email: string, password: string): ILoginAPIRes => {
    return <ILoginAPIRes>(
        (<unknown>
            (axios.post(urlAPI, { email, password })
            .then(response => response.data)
            .catch(error => error.response.data)
        ))
    )
};

export default handleLoginAPI