const createResource = (promise: Promise<any>) => {
    let status = 'pending';
    let result: any;

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
