export class BaseError extends Error {
    constructor(
        name: string,
        message: string,
        public errorCode: number,
        public originalError?: Error,
    ) {
        super(message);
        this.name = name;
        if (originalError) {
            this.originalError = originalError;
        }
    }

    public toObject(): Record<string, unknown> {
        const errorObject: Record<string, unknown> = {
            errorCode: this.errorCode,
            name: this.name,
            message: this.message,
        };

        if (this.originalError) {
            errorObject.originalError = {
                message: this.originalError.message,
            };
        }

        return errorObject;
    }
}
