import { BloomreachError } from '../../src/lib/errors';

describe('BloomreachError tests', () => {
    const status = 42;
    const statusText = 'statusText';
    const response = { body: 'body' };

    it('should allow access to individual error elements', () => {
        const error = new BloomreachError(status, statusText, response);
        expect(error.message).toEqual(`${status} - ${statusText} - ${JSON.stringify(response, null, 2)}`);
        expect(error.getResponse()).toEqual(response);
        expect(error.getStatus()).toEqual(status);
        expect(error.getStatusText()).toEqual(statusText);
    });
});
