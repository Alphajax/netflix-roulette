import type { PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './button.module.scss'

type ButtonType = 'primary'

type Props = PropsWithChildren<{
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  type?: ButtonType
}>

export const Button = ({ onClick, children, type = 'primary' }: Props) => (
  <button className={clsx(styles.button, styles[type])} onClick={onClick}>
    {children}
  </button>
)
