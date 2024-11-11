# bloomreach-transactional-sms 

[![NPM version](https://img.shields.io/npm/v/bloomreach-transactional-sms.svg?style=flat-square)](https://www.npmjs.com/package/bloomreach-transactional-sms)
[![NPM downloads](https://img.shields.io/npm/dm/bloomreach-transactional-sms.svg?style=flat-square)](https://www.npmjs.com/package/bloomreach-transactional-sms)
[![Code Style](https://img.shields.io/badge/code%20style-prettier-brightgreen.svg)](https://github.com/prettier/prettier)

A nonofficial, feature complete, client library for sending transactional SMSes via Bloomreach.

The aim of the `bloomreach-transactional-sms` package is to get you going with the Bloomreach Transactional SMS API as quickly as possible. The sendSMS function takes the minimum number of required parameters to send an SMS. Other parameters are optional. Full details of all the options can be found in the [Blooreach Transactional SMS API documentation](https://documentation.bloomreach.com/engagement/reference/transactional-sms).

`bloomreach-transactional-sms` uses [axios](https://www.npmjs.com/package/axios), as a peer dependency, to make HTTP calls.

## Install

```
npm i -save bloomreach-transactional-sms
```

## Basic Examples

If you have Customer IDs and a default SMS integration setup in Bloomreach then you can use the minimum configuration to send an SMS by specifying a HTML body and a subject:

```
import { sendSMS } from 'bloomreach-transactional-sms';

const auth = {
    username: '...',    // Your APIKeyID
    password: '...',    // Your APISecret
    baseUrl: 'https://api.exponea.com', // Your base url
    projectToken: '...', // Your project token
};

const campaignName = 'MyCampaign';

const customerIds = {
    registered: 'marian@exponea.com'
};

const recipient = {
    phone: '+4407700000000',
    language: 'en',
};

const rawContent = {
    message: 'A message',
    sender: '+4407700000000'
};

await sendSMS(auth, campaignName, recipient, customerId, rawContent);

```
If you have a template set up you can also send an SMS using it:

```
const templateContent = {
    templateId: '60758e2d18883e1048b817a8',
    params: { first_name: 'Marian' }
}

await sendSMS(auth, campaignName, recipient, customerId, templateContent);
```
## Transfer Identity

You can specify a transfer identity of:

- enabled
- disabled
- first_click

```
 await sendSMS(auth, campaignName, recipient, customerId, templateContent, {
    transferUserIdentity: 'first_click',
});
```

## Settings

You can also add:

- Custom Event Properties
- UrlParams
- Transfer User Identity
- Consent Category
- Consent Category Tracking
- Link Shortener

Check the  [Blooreach Transactional SMS API documentation](https://documentation.bloomreach.com/engagement/reference/transactional-sms) for details:

```
await sendSMS(auth, campaignName, recipient, customerId, templateContent,
    {
        customEventProperties: {
            bannana: 'yellow',
            1: 2,
        },
        urlParams: {
            source: 'sms',
            1: 2,
        },
        transferUserIdentity: 'first_click',
        consentCategory: 'sms',
        consentCategoryTracking: 'sms',
        linkShortener: true
    } 
);
```