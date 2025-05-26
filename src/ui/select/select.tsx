import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import SelectIcon from '../../assets/select-icon.svg'
import styles from './styles.module.scss'
import { shortenString } from '../../utils'

export type SelectOption = string
export type SelectOptions = SelectOption[]

interface SelectProps {
  options: SelectOptions
  name: string
  onSelect: (name: string[]) => void
  initialSelectedOptions: string[]
  multiSelect: boolean
  placeholder?: string
  id?: string
}

export const Select = ({
  options,
  name,
  multiSelect,
  initialSelectedOptions,
  onSelect,
  placeholder,
  id,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<SelectOption[]>([...initialSelectedOptions])
  const [focusedIndex, setFocusedIndex] = useState<number>(0)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mouseup', handleClickOutside)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [])

  const toggleSelection = (option: SelectOption) => {
    if (multiSelect) {
      setSelected((prevSelected) => {
        const exists = prevSelected.includes(option)
        const newValue = exists
          ? prevSelected.filter((o) => o !== option)
          : [...prevSelected, option]
        onSelect(newValue)
        return newValue
      })
    } else {
      setSelected([option])
      onSelect([option])
      setIsOpen(false)
    }
  }

  const isSelected = (option: SelectOption) => selected.includes(option)

  const visiblePlaceholder =
    (selected.length ? shortenString(selected.join(', '), 30) : null) ?? placeholder ?? name

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setIsOpen(true)
        setFocusedIndex((prev) => (prev + 1) % options.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setIsOpen(true)
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (isOpen) {
          toggleSelection(options[focusedIndex])
        } else {
          setIsOpen(true)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        break
      case 'Tab':
        setIsOpen(false)
        setFocusedIndex((prev) => (prev + 1) % options.length)
        break
    }
  }

  return (
    <>
      <div
        aria-activedescendant={`option-${focusedIndex.toString()}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-owns="listbox-id"
        className={styles.container}
        id={id}
        ref={selectRef}
        role="combobox"
      >
        <div
          className={styles.select}
          data-testid={`select-option-${name}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          {visiblePlaceholder}
          <img
            alt="arrow-icon"
            className={clsx(styles.icon, { [styles.closedIcon]: !isOpen })}
            src={SelectIcon}
          />
        </div>

        {isOpen && (
          <ul className={styles.dropdown} id="listbox-id" role="listbox">
            {options.map((option, index) => (
              <li
                aria-selected={isSelected(option)}
                key={option}
                role="option"
                tabIndex={-1}
                className={clsx(styles.option, {
                  [styles.focused]: focusedIndex === index,
                  [styles.selected]: isSelected(option),
                })}
              >
                <button
                  className={styles.optionButton}
                  ref={(el) => {
                    if (focusedIndex === index && el) {
                      el.focus()
                    }
                  }}
                  onClick={() => {
                    console.log(option)
                    toggleSelection(option)
                  }}
                >
                  {multiSelect && (
                    <input
                      readOnly
                      checked={isSelected(option)}
                      className={styles.checkbox}
                      data-testid={`select-option-${option}`}
                      type="checkbox"
                    />
                  )}

                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
