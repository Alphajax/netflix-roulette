import clsx from 'clsx'
import styles from './styles.module.scss'
import type { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'
import { useId } from 'react'

interface TextAreaProps
  extends Omit<
    DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    'className'
  > {
  label?: string
  inputClassName?: string
  containerClassName?: string
}

export const TextArea = ({
  label,
  inputClassName,
  containerClassName,
  ...props
}: TextAreaProps) => {
  const id = useId()
  return (
    <div className={clsx(styles.container, containerClassName)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea className={clsx(styles.textarea, inputClassName)} id={id} {...props} />
    </div>
  )
}
