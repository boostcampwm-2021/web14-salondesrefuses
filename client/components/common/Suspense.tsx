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
    private mounted = false;

    state: SuspenseState = {
        pending: false,
    };

    public componentDidMount() {
        this.mounted = true;
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    public componentDidCatch(err: any) {
        console.log('componentDidCatch', isPromise(err));
        if (!this.mounted) return;
        if (isPromise(err)) {
            this.setState({ pending: true });
            err.then(() => {
                this.setState({ pending: false });
            }).catch((err) => {
                this.setState({ error: err || new Error('Suspense Error') });
            });
        } else {
            throw err;
        }
    }

    public componentDidUpdate() {
        if (this.state.pending && this.state.error) {
            throw this.state.error;
        }
    }

    public render() {
        console.log(this.state.pending);
        return this.state.pending ? this.props.fallback : this.props.children;
    }
}

export default CSuspense;
