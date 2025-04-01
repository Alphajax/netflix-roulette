import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import SelectIcon from '../../assets/select-icon.svg'

import styles from './styles.module.scss'

export type SelectOption = string
export type SelectOptions = SelectOption[]

interface Props {
  options: SelectOptions
  name?: string
  onSelect: (name: string) => void
  initialSelectedOptions?: string[]
  multiSelect: boolean
}

export const Select = ({
  options,
  name,
  multiSelect,
  initialSelectedOptions = [],
  onSelect,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<SelectOption[]>(initialSelectedOptions)
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
    onSelect(option)
    if (multiSelect) {
      setSelected((prevSelected) => {
        if (prevSelected.includes(option)) {
          return prevSelected.filter((selectedOption) => selectedOption !== option)
        } else {
          return [...prevSelected, option]
        }
      })
    } else {
      setSelected([option])
    }
  }

  const isSelected = (option: SelectOption) => selected.includes(option)

  const placeholder = multiSelect ? name : selected[0]
  return (
    <div className={styles.container} id={name} ref={selectRef}>
      <select
        aria-label={name}
        className={styles.nativeSelect}
        id={name}
        multiple={multiSelect}
        name={name}
        value={multiSelect ? selected : selected[0]}
        onChange={(e) => {
          toggleSelection(e.target.value)
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        aria-expanded={isOpen}
        aria-hidden="true"
        className={styles.select}
        data-testid={`select-option-${name}`}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        {placeholder}
        <img
          alt="arrow-icon"
          className={clsx(styles.icon, { [styles.closedIcon]: !isOpen })}
          src={SelectIcon}
        />
      </button>

      {isOpen && (
        <div aria-hidden="true" className={styles.dropdown}>
          {options.map((option) => (
            <button
              className={styles.option}
              key={option}
              onClick={() => {
                toggleSelection(option)
              }}
            >
              <input
                aria-hidden="true"
                checked={isSelected(option)}
                className={styles.checkbox}
                data-testid={`select-option-${option}`}
                type="checkbox"
                onChange={() => {
                  toggleSelection(option)
                }}
              />
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
