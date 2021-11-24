import React, { Component } from 'react';

interface SuspenseProps {
    fallback: React.ReactNode;
}

interface SuspenseState {
    pending: boolean;
    error?: any;
}

function isPromise(i: any): i is Promise<any> {
    return i && typeof i.then === 'function';
}

class CSuspense extends Component<SuspenseProps, SuspenseState> {
    state: SuspenseState = {
        pending: false,
    };

    constructor(props: SuspenseProps) {
        super(props);
    }

    static getDerivedStateFromError(err: any) {
        if (isPromise(err)) {
            console.log(err);
            return { pending: false };
        }
        return { pending: true };
    }

    public componentDidCatch(err: any) {
        if (isPromise(err)) {
            console.log(err);
            this.setState({ pending: true });
            err.then(() => {
                this.setState({ pending: false });
            }).catch((err) => {
                this.setState({ error: err || new Error('Suspense Error') });
            });
        }
    }

    public componentDidUpdate() {
        if (this.state.pending && this.state.error) {
            throw this.state.error;
        }
    }

    public render() {
        console.log('pending : ', this.state.pending);
        if (this.state.pending) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export default CSuspense;
