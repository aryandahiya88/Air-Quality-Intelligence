import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 p-6 text-center text-slate-900">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="mt-2 text-slate-600">Please refresh the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
