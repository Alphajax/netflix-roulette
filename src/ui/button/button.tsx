import type { MouseEventHandler, PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './button.module.scss'

type ButtonVariant = 'primary' | 'cancel'

type ButtonProps = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>
  variant?: ButtonVariant
  type?: HTMLButtonElement['type']
}>

export const Button = ({
  onClick,
  children,
  variant = 'primary',
  type = 'button',
}: ButtonProps) => (
  <button className={clsx(styles.button, styles[variant])} type={type} onClick={onClick}>
    {children}
  </button>
)
