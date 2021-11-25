import React, { Component } from 'react';

interface Prop {
    fallback: React.ReactNode;
}

interface State {
    error: boolean;
}

export class ErrorBoundary extends Component<Prop, State> {
    constructor(props: Prop) {
        super(props);
    }

    state = {
        error: false,
    };

    static getDerivedStateFromError() {
        return { error: true };
    }

    render() {
        if (this.state.error) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
