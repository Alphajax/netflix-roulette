// Пример Dialog компонента
import { CloseOutlined } from '@ant-design/icons'
import { FocusTrap } from 'focus-trap-react'
import styles from './styles.module.scss'
import type { JSX } from 'react'

interface DialogProps {
  show: boolean
  title: string | JSX.Element
  onClose: () => void
  children: React.ReactNode
}

export const Dialog = ({ show, title, children, onClose }: DialogProps) =>
  show ? (
    <div className={styles.overlay}>
      <div aria-modal="true" className={styles.container} role="dialog">
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: () => document.body,
            onDeactivate: onClose,
          }}
        >
          <div>
            <h2 className={styles.title}>{title}</h2>
            <button
              className={styles.closeButton}
              data-testid="close"
              type="button"
              onClick={onClose}
            >
              <CloseOutlined className={styles.closeIcon} />
            </button>
            {children}
          </div>
        </FocusTrap>
      </div>
    </div>
  ) : null
