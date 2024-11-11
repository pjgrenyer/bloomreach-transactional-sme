export class BloomreachError extends Error {
    private _status: number;
    private _statusText: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _response: any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(status: number, statusText: string, response: any) {
        super(`${status} - ${statusText} - ${JSON.stringify(response, null, 2)}`);

        this._status = status;
        this._statusText = statusText;
        this._response = response;
    }

    getStatus() {
        return this._status;
    }

    getStatusText() {
        return this._statusText;
    }

    getResponse() {
        return this._response;
    }
}

export class BloomreachBadRequest extends BloomreachError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(status: number, statusText: string, response: any) {
        super(status, statusText, response);
    }
}

export class BloomreachTemplateNotFound extends BloomreachBadRequest {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(status: number, statusText: string, response: any) {
        super(status, statusText, response);
    }
}
