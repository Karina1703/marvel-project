
import { Component } from "react/cjs/react.production.min";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

/*     static getDerivedStateFromError(error) {
        return { error: true }
    } */ 

    //только меняет состояние


    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
        this.setState({ error: true })
    }

    render() {
        if (this.state.error) {
            return <h2>Что-то пошло не так</h2>
        }

        return this.props.children
    }
}
export default ErrorBoundary;