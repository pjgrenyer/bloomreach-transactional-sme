import axios from 'axios';
import { BloomreachBadRequest, BloomreachError, BloomreachTemplateNotFound } from './lib/errors';

export interface Auth {
    username: string;
    password: string;
    baseUrl: string;
    projectToken: string;
}

export interface RawContent {
    message: string;
    sender: string;
    maxMessageParts?: number;
}

export interface TemplateContent {
    templateId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: any;
}

export interface Recipient {
    phone: string;
    language?: string;
}

export interface AlphaNumericDictionary {
    [name: string | number]: string | number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomEventProperties extends AlphaNumericDictionary {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UrlParams extends AlphaNumericDictionary {}

export interface Settings {
    customEventProperties?: CustomEventProperties;
    urlParams?: UrlParams;
    transferUserIdentity?: 'enabled' | 'disabled' | 'first_click';
    consentCategory?: string;
    consentCategoryTracking?: string;
    linkShortener?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sendSMS = async (auth: Auth, campaignName: string, recipient: Recipient, customerIds: any, content: RawContent | TemplateContent, settings?: Settings) => {
    checkConfig(auth);

    const body = {
        content: {
            ...('templateId' in content
                ? {
                      template_id: content.templateId,
                      params: content.params,
                  }
                : {
                      message: content.message,
                      sender: content.sender,
                      max_message_parts: content.maxMessageParts,
                  }),
        },
        campaign_name: campaignName,
        recipient: {
            phone: recipient.phone,
            customer_ids: customerIds,
            language: recipient.language,
        },
        settings: settings
            ? {
                  custom_event_properties: settings?.customEventProperties,
                  url_params: settings?.urlParams,
                  transfer_user_identity: settings?.transferUserIdentity,
                  consent_category: settings?.consentCategory,
                  consent_category_tracking: settings?.consentCategoryTracking,
                  link_shortener: settings?.linkShortener,
              }
            : undefined,
    };

    try {
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const statusCode = error.response?.status;
        const statusText = error.response?.statusText;
        const response = error.response?.data ?? error.message;

        if (statusCode === 400) {
            if (
                response?.errors?.email_content?.template_id?.find(
                    (mes: string) => mes.toLocaleLowerCase().includes('not found') || mes.toLocaleLowerCase().includes('no such an email design')
                )
            ) {
                throw new BloomreachTemplateNotFound(statusCode, statusText, response);
            }

            throw new BloomreachBadRequest(statusCode, statusText, response);
        }

        throw new BloomreachError(statusCode, statusText, response);
    }
};

const checkConfig = (auth: Auth) => {
    if (!auth.username) {
        throw new Error('Username not set!');
    }

    if (!auth.password) {
        throw new Error('Password not set!');
    }

    if (!auth.baseUrl) {
        throw new Error('Base url not set!');
    }

    if (!auth.projectToken) {
        throw new Error('Project token not set!');
    }
};
