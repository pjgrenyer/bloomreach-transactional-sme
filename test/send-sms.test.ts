import { sendSMS } from '../src/send-sms';
import nock from 'nock';

describe('Send SMS', () => {
    const username = 'username';
    const password = 'password';
    const baseUrl = 'https://api.exponea.com';
    const projectToken = 'project-token';

    const auth = {
        username,
        password,
        baseUrl,
        projectToken,
    };

    const campaignName = 'campaign';
    const customerId = { key: 'value' };
    const rawContent = {
        message: 'A message',
        sender: '+4407700000000',
        maxMessageParts: 8,
    };
    const templateContent = {
        templateId: 'templateId',
        params: { key: 'value' },
    };
    const recipient = {
        phone: '+4407700000000',
        language: 'en',
    };

    const authorization = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';
    const successResponse = { message: 'SMS was sent successfully.', success: true };

    it('should send raw SMS', async () => {
        nock(baseUrl)
            .matchHeader('authorization', authorization)
            .matchHeader('content-type', 'application/json')
            .post(`/sms/v1/projects/${projectToken}/sync`, {
                content: {
                    message: rawContent.message,
                    sender: rawContent.sender,
                    max_message_parts: rawContent.maxMessageParts,
                },
                campaign_name: campaignName,
                recipient: {
                    phone: recipient.phone,
                    customer_ids: customerId,
                    language: recipient.language,
                },
                settings: undefined,
            })
            .reply(200, successResponse);

        await sendSMS(auth, campaignName, recipient, customerId, rawContent);
    });

    it('should send template SMS', async () => {
        nock(baseUrl)
            .matchHeader('authorization', authorization)
            .matchHeader('content-type', 'application/json')
            .post(`/sms/v1/projects/${projectToken}/sync`, {
                content: {
                    template_id: templateContent.templateId,
                    params: templateContent.params,
                },
                campaign_name: campaignName,
                recipient: {
                    phone: recipient.phone,
                    customer_ids: customerId,
                    language: recipient.language,
                },
                settings: undefined,
            })
            .reply(200, successResponse);

        await sendSMS(auth, campaignName, recipient, customerId, templateContent);
    });

    describe('settings', () => {
        it('should send custom event properties', async () => {
            nock(baseUrl)
                .matchHeader('authorization', authorization)
                .matchHeader('content-type', 'application/json')
                .post(`/sms/v1/projects/${projectToken}/sync`, {
                    content: {
                        template_id: templateContent.templateId,
                        params: templateContent.params,
                    },
                    campaign_name: campaignName,
                    recipient: {
                        phone: recipient.phone,
                        customer_ids: customerId,
                        language: recipient.language,
                    },
                    settings: {
                        custom_event_properties: {
                            key: 'value',
                            1: 2,
                        },
                    },
                })
                .reply(200, successResponse);

            await sendSMS(auth, campaignName, recipient, customerId, templateContent, {
                customEventProperties: {
                    key: 'value',
                    1: 2,
                },
            });
        });

        it('should send transfer user identity', async () => {
            nock(baseUrl)
                .matchHeader('authorization', authorization)
                .matchHeader('content-type', 'application/json')
                .post(`/sms/v1/projects/${projectToken}/sync`, {
                    content: {
                        template_id: templateContent.templateId,
                        params: templateContent.params,
                    },
                    campaign_name: campaignName,
                    recipient: {
                        phone: recipient.phone,
                        customer_ids: customerId,
                        language: recipient.language,
                    },
                    settings: {
                        transfer_user_identity: 'first_click',
                    },
                })
                .reply(200, successResponse);

            await sendSMS(auth, campaignName, recipient, customerId, templateContent, {
                transferUserIdentity: 'first_click',
            });
        });

        it('should send url params', async () => {
            nock(baseUrl)
                .matchHeader('authorization', authorization)
                .matchHeader('content-type', 'application/json')
                .post(`/sms/v1/projects/${projectToken}/sync`, {
                    content: {
                        template_id: templateContent.templateId,
                        params: templateContent.params,
                    },
                    campaign_name: campaignName,
                    recipient: {
                        phone: recipient.phone,
                        customer_ids: customerId,
                        language: recipient.language,
                    },
                    settings: {
                        url_params: {
                            key: 'value',
                            1: 2,
                        },
                    },
                })
                .reply(200, successResponse);

            await sendSMS(auth, campaignName, recipient, customerId, templateContent, {
                urlParams: {
                    key: 'value',
                    1: 2,
                },
            });
        });

        it('should send consent category', async () => {
            nock(baseUrl)
                .matchHeader('authorization', authorization)
                .matchHeader('content-type', 'application/json')
                .post(`/sms/v1/projects/${projectToken}/sync`, {
                    content: {
                        template_id: templateContent.templateId,
                        params: templateContent.params,
                    },
                    campaign_name: campaignName,
                    recipient: {
                        phone: recipient.phone,
                        customer_ids: customerId,
                        language: recipient.language,
                    },
                    settings: {
                        consent_category: 'sms',
                    },
                })
                .reply(200, successResponse);

            await sendSMS(auth, campaignName, recipient, customerId, templateContent, {
                consentCategory: 'sms',
            });
        });

        it('should send consent category tracking', async () => {
            nock(baseUrl)
                .matchHeader('authorization', authorization)
                .matchHeader('content-type', 'application/json')
                .post(`/sms/v1/projects/${projectToken}/sync`, {
                    content: {
                        template_id: templateContent.templateId,
                        params: templateContent.params,
                    },
                    campaign_name: campaignName,
                    recipient: {
                        phone: recipient.phone,
                        customer_ids: customerId,
                        language: recipient.language,
                    },
                    settings: {
                        consent_category_tracking: 'sms',
                    },
                })
                .reply(200, successResponse);

            await sendSMS(auth, campaignName, recipient, customerId, templateContent, {
                consentCategoryTracking: 'sms',
            });
        });

        it('should send linkShortener', async () => {
            nock(baseUrl)
                .matchHeader('authorization', authorization)
                .matchHeader('content-type', 'application/json')
                .post(`/sms/v1/projects/${projectToken}/sync`, {
                    content: {
                        template_id: templateContent.templateId,
                        params: templateContent.params,
                    },
                    campaign_name: campaignName,
                    recipient: {
                        phone: recipient.phone,
                        customer_ids: customerId,
                        language: recipient.language,
                    },
                    settings: {
                        link_shortener: true,
                    },
                })
                .reply(200, successResponse);

            await sendSMS(auth, campaignName, recipient, customerId, templateContent, {
                linkShortener: true,
            });
        });
    });
});
