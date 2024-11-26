import { Auth, sendSMS } from '../src/send-sms';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.test.env' });

describe('Send SMS', () => {
    const auth: Auth = {
        username: process.env.BLOOMREACH_USERNAME as string,
        password: process.env.BLOOMREACH_PASSWORD as string,
        baseUrl: process.env.BLOOMREACH_BASEURL as string,
        projectToken: process.env.BLOOMREACH_PROJECT_TOKEN as string,
    };

    const campaignName = 'MyNewCampaign';

    const customerIds = { HavenID: '123456' };

    it('send raw sms', async () => {
        try {
            const resposne = await sendSMS(
                auth,
                campaignName,
                {
                    phone: '+447764621928',
                    language: 'en',
                },
                customerIds,
                {
                    message: 'Hello, world!',
                    sender: '+447764621928',
                    maxMessageParts: 1,
                }
            );

            console.log(resposne);
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    });

    it('send templated sms', async () => {
        try {
            const resposne = await sendSMS(
                auth,
                campaignName,
                {
                    phone: '+447764621928',
                    language: 'en',
                },
                customerIds,
                {
                    templateId: '6731cb0d0c65d67cead5346a',
                    //templateId: '60758e2d18883e1048b817b4',
                    params: {},
                }
            );

            console.log(resposne);
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    });
});
