import { Auth, sendSMS } from './../src/send-sms';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.test.env' });

describe('Send SMS', () => {
    const auth: Auth = {
        username: process.env.BLOOMREACH_USERNAME as string,
        password:  process.env.BLOOMREACH_PASSWORD as string,
        baseUrl:  process.env.BLOOMREACH_BASEURL as string,
        projectToken:  process.env.BLOOMREACH_PROJECT_TOKEN as string,
    }

    it('send sms', async () => {
        try
        {
            const resposne = await sendSMS(auth);
            console.log(resposne);
        }
        catch(error) {
            console.log(error.response.data);
        }
    });
});
