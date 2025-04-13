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
        if (prevSelected.includes(option)) {
          const newValue = prevSelected.filter((selectedOption) => selectedOption !== option)
          onSelect(newValue)
          return newValue
        } else {
          const newValue = [...prevSelected, option]
          onSelect(newValue)
          return newValue
        }
      })
    } else {
      onSelect([option])
      setSelected([option])
    }
  }

  const isSelected = (option: SelectOption) => selected.includes(option)

  const visiblePlaceholder =
    (selected.length ? shortenString(selected.join(', '), 30) : null) ?? placeholder ?? name

  return (
    <div className={styles.container} ref={selectRef}>
      <select
        aria-label={name}
        className={styles.nativeSelect}
        defaultValue={multiSelect ? initialSelectedOptions : initialSelectedOptions[0]}
        id={id ?? name}
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
        type="button"
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
      </button>

      {isOpen && (
        <div aria-hidden="true" className={styles.dropdown}>
          {options.map((option) => (
            <button
              className={styles.option}
              key={option}
              type="button"
              onClick={() => {
                toggleSelection(option)
              }}
            >
              <input
                readOnly
                aria-hidden="true"
                checked={isSelected(option)}
                className={styles.checkbox}
                data-testid={`select-option-${option}`}
                type="checkbox"
              />
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
