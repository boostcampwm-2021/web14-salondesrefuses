const createResource = (promise: Promise<any>) => {
    return wrapPromise(promise);
};

const wrapPromise = <T>(promise: Promise<T>) => {
    let status = 'pending';
    let result: T | null;

    let suspender = promise.then(
        (response) => {
            status = 'success';
            result = response;
        },
        (error) => {
            status = 'error';
            result = error;
        },
    );

    return {
        read() {
            switch (status) {
                case 'pending':
                    throw suspender;
                case 'error':
                    throw result;
                default:
                    return result;
            }
        },
    };
};

export default createResource;
