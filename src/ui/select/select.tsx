import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import SelectIcon from '../../assets/select-icon.svg'

import styles from './styles.module.scss'

export type SelectOption = string
export type SelectOptions = SelectOption[]

interface Props {
  options: SelectOptions
  name: string
  onSelect: (name: string) => void
  initialSelectedOptions: string[]
  multiSelect: boolean
}

export const Select = ({ options, name, multiSelect, initialSelectedOptions, onSelect }: Props) => {
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
    onSelect(option)
    if (multiSelect) {
      setSelected((prevSelected) => {
        if (prevSelected.some((selectedOption) => selectedOption === option)) {
          return prevSelected.filter((selectedOption) => selectedOption !== option)
        } else {
          return [...prevSelected, option]
        }
      })
    } else {
      setSelected([option])
    }
  }

  const isSelected = (option: SelectOption) =>
    selected.some((selectedOption) => selectedOption === option)

  return (
    <div className={styles.container} ref={selectRef}>
      <select aria-label={name} className={styles.nativeSelect} id={name} name={name}>
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
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        {name}
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
