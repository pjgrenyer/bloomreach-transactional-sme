import axios from 'axios';

export interface Auth {
    username: string;
    password: string;
    baseUrl: string;
    projectToken: string;
}

export const sendSMS = async (auth: Auth) => {
    const body = {
        message: "Testing 123",
        sender: "+447764621928",
        max_message_parts: 1,
        "recipient": {
            "phone": "+447764621928",
            "customer_ids": {
                "registered": "paul.grenyer@haven.com"
            },
            "language": "en"
        },
    };

    const response = await axios.post(`${auth.baseUrl}/sms/v1/projects/${auth.projectToken}/sync`, body, {
        headers: {
            'content-type': 'application/json',
        },
        auth: {
            username: auth.username,
            password: auth.password,
        },
    });

    return response.data;
}