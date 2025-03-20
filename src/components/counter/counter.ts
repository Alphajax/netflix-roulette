import clsx from 'clsx'
import { Component, createElement } from 'react'

import styles from './counter.module.scss'

interface Props {
  initialValue: number
}
interface State {
  value: number
}

export class Counter extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { value: props.initialValue }
  }

  handleDecrementButtonClick = () => {
    this.setState((prev) => ({
      value: prev.value - 1,
    }))
  }

  handleIncrementButtonClick = () => {
    this.setState((prev) => ({
      value: prev.value + 1,
    }))
  }

  render() {
    const incrementButton = createElement(
      'button',
      {
        className: clsx(styles.button, styles.primary),
        onClick: this.handleIncrementButtonClick,
      },
      'Increment',
    )

    const decrementButton = createElement(
      'button',
      {
        className: clsx(styles.button, styles.cancel),
        onClick: this.handleDecrementButtonClick,
      },
      'Decrement',
    )

    return createElement(
      'div',
      { className: styles.counter },

      createElement('h1', null, this.state.value),
      incrementButton,
      decrementButton,
    )
  }
}
