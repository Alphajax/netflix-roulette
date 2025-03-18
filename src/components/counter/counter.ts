import clsx from "clsx";
import { Component, createElement } from "react";

import styles from "./counter.module.scss";

type Props = { initialValue: number };
type State = { value: number };

export class Counter extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { value: props.initialValue };
    }

    handleDecrementButtonClick = () => {
        this.setState(prev => ({
            ...prev,
            value: prev.value - 1,
        }));
    };

    handleIncrementButtonClick = () => {
        this.setState(prev => ({
            ...prev,
            value: prev.value + 1,
        }));
    };

    render() {
        return createElement(
            "div",
            { className: styles.counter },
            createElement("h1", null, this.state.value),
            createElement(
                "button",
                {
                    className: clsx(styles.button, styles.primary),
                    onClick: this.handleIncrementButtonClick,
                },
                "Increment",
            ),
            createElement(
                "button",
                {
                    className: clsx(styles.button, styles.cancel),
                    onClick: this.handleDecrementButtonClick,
                },
                "Decrement",
            ),
        );
    }
}
