import type { MouseEventHandler, PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './button.module.scss'

type ButtonVariant = 'primary' | 'cancel'

type Props = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>
  variant?: ButtonVariant
  type?: HTMLButtonElement['type']
}>

export const Button = ({ onClick, children, variant = 'primary', type = 'button' }: Props) => (
  <button className={clsx(styles.button, styles[variant])} type={type} onClick={onClick}>
    {children}
  </button>
)
