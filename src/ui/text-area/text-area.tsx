import clsx from 'clsx'
import styles from './styles.module.scss'
import type { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import { useId } from 'react'
import { FieldError } from 'react-hook-form'

interface TextAreaProps
  extends Omit<
    DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    'className'
  > {
  label?: string
  inputClassName?: string
  containerClassName?: string
  error?: FieldError
}

export const TextArea = ({
  label,
  inputClassName,
  containerClassName,
  error,
  ...props
}: TextAreaProps) => {
  const id = useId()
  return (
    <div className={clsx(styles.container, containerClassName)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea className={clsx(styles.textarea, inputClassName)} id={id} {...props} />
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  )
}
