import styles from './styles.module.scss'
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { useId } from 'react'
import clsx from 'clsx'

interface InputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'className'
  > {
  label?: string
  inputClassName?: string
  containerClassName?: string
}

export const Input = ({ label, inputClassName, containerClassName, ...props }: InputProps) => {
  const inputId = useId()
  return (
    <div className={clsx(styles.container, containerClassName)}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input className={clsx(styles.input, inputClassName)} id={inputId} {...props} type="text" />
    </div>
  )
}
