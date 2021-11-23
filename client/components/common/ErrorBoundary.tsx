import React, { Component } from 'react';

interface Prop {
    fallback: React.ReactChild;
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

    componentDidCatch() {
        console.log('error!');
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
