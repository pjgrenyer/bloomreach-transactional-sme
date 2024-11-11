import { BloomreachBadRequest, BloomreachError, BloomreachTemplateNotFound } from '../src/lib/errors';
import { Auth, sendSMS } from '../src/send-sms';
import nock from 'nock';

describe('error handling', () => {
    const username = 'username';
    const password = 'password';
    const baseUrl = 'https://api.exponea.com';
    const projectToken = 'project-token';

    const campaignName = 'campaign';
    const customerId = { key: 'value' };
    const content = {
        message: 'A message',
        sender: '+4407700000000',
    };
    const recipient = {
        phone: '+4407700000000',
    };

    describe('config', () => {
        it('should thow if username missing', async () => {
            expect.assertions(1);
            const auth = {} as Auth;

            try {
                await sendSMS(auth, campaignName, recipient, customerId, content);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                expect(error).toEqual(new Error('Username not set!'));
            }
        });

        it('should thow if password missing', async () => {
            expect.assertions(1);
            const auth = {
                username,
            } as Auth;

            try {
                await sendSMS(auth, campaignName, recipient, customerId, content);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                expect(error).toEqual(new Error('Password not set!'));
            }
        });

        it('should thow if baseurl missing', async () => {
            expect.assertions(1);
            const auth = {
                username,
                password,
            } as Auth;

            try {
                await sendSMS(auth, campaignName, recipient, customerId, content);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                expect(error).toEqual(new Error('Base url not set!'));
            }
        });

        it('should thow if project token missing', async () => {
            expect.assertions(1);
            const auth = {
                username,
                password,
                baseUrl,
            } as Auth;

            try {
                await sendSMS(auth, campaignName, recipient, customerId, content);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                expect(error).toEqual(new Error('Project token not set!'));
            }
        });
    });

    describe('http', () => {
        it('should throw 500 BloomreachError', async () => {
            expect.assertions(2);

            const auth = {
                username,
                password,
                baseUrl,
                projectToken,
            };

            nock(baseUrl).post(`/sms/v1/projects/${projectToken}/sync`).reply(500, 'error!');

            try {
                await sendSMS(auth, campaignName, recipient, customerId, content);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                expect(error).toBeInstanceOf(BloomreachError);
                expect(error.message).toEqual('500 - null - "error!"');
            }
        });

        it('should throw BloomreachBadRequest', async () => {
            expect.assertions(2);

            const auth = {
                username,
                password,
                baseUrl,
                projectToken,
            };

            nock(baseUrl).post(`/sms/v1/projects/${projectToken}/sync`).reply(400, 'error!');

            try {
                await sendSMS(auth, campaignName, recipient, customerId, content);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                expect(error).toBeInstanceOf(BloomreachBadRequest);
                expect(error.message).toEqual('400 - null - "error!"');
            }
        });

        it('should throw BloomreachTemplateNotFound', async () => {
            expect.assertions(2);

            const auth = {
                username,
                password,
                baseUrl,
                projectToken,
            };

            nock(baseUrl)
                .post(`/sms/v1/projects/${projectToken}/sync`)
                .reply(400, {
                    errors: {
                        email_content: { template_id: ['The template you have asked for is NOT FOUND!'] },
                    },
                });

            try {
                await sendSMS(auth, campaignName, recipient, customerId, content);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                expect(error).toBeInstanceOf(BloomreachTemplateNotFound);
                expect(error.message).toEqual(
                    `400 - null - ${JSON.stringify(
                        {
                            errors: {
                                email_content: {
                                    template_id: ['The template you have asked for is NOT FOUND!'],
                                },
                            },
                        },
                        null,
                        2
                    )}`
                );
            }
        });

        it('should throw BloomreachTemplateNotFound - alternitive message', async () => {
            expect.assertions(2);

            const auth = {
                username,
                password,
                baseUrl,
                projectToken,
            };

            nock(baseUrl)
                .post(`/sms/v1/projects/${projectToken}/sync`)
                .reply(400, {
                    errors: {
                        email_content: { template_id: ['Failed to use stored template: no such an email design'] },
                    },
                });

            try {
                await sendSMS(auth, campaignName, recipient, customerId, content);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                expect(error).toBeInstanceOf(BloomreachTemplateNotFound);
                expect(error.message).toEqual(
                    `400 - null - ${JSON.stringify(
                        {
                            errors: {
                                email_content: {
                                    template_id: ['Failed to use stored template: no such an email design'],
                                },
                            },
                        },
                        null,
                        2
                    )}`
                );
            }
        });

        it('should throw BloomreachBadRequest if errors is not an array', async () => {
            expect.assertions(2);

            const auth = {
                username,
                password,
                baseUrl,
                projectToken,
            };

            nock(baseUrl)
                .post(`/sms/v1/projects/${projectToken}/sync`)
                .reply(400, {
                    errors: {
                        other_error_type: { message: 'Other ErrorType' },
                    },
                });

            try {
                await sendSMS(auth, campaignName, recipient, customerId, content);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                expect(error).toBeInstanceOf(BloomreachBadRequest);
                expect(error.message).toEqual(
                    `400 - null - ${JSON.stringify(
                        {
                            errors: {
                                other_error_type: { message: 'Other ErrorType' },
                            },
                        },
                        null,
                        2
                    )}`
                );
            }
        });
    });
});
