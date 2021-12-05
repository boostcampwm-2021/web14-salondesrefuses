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

    constructor(props: SuspenseProps) {
        super(props);
    }

    public componentDidMount() {
        this.mounted = true;
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    public componentDidCatch(p: any) {
        if (!this.mounted) return;
        if (isPromise(p.suspender)) {
            if (p.status === 'pending') {
                p.suspender.then(
                    () => {
                        this.state.pending && this.setState({ pending: false });
                    },
                    () => {
                        throw new Error('요청에 실패했습니다.');
                    },
                );
                this.setState({ pending: true });
            }
        }
    }

    public componentDidUpdate() {
        if (this.state.pending && this.state.error) {
            throw this.state.error;
        }
    }

    public render() {
        if (this.state.pending) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export default CSuspense;
