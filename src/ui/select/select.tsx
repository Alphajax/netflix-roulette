import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import SelectIcon from "../../assets/select-icon.svg";

import styles from "./styles.module.scss";

export type SelectOption = string;
export type SelectOptions = Array<SelectOption>;

type Props = {
    options: SelectOptions;
    name: string;
    onSelect: (name: string) => void;
    selectedOptions: string[];
    multiSelect: boolean;
};

export const Select = ({
                           options,
                           name,
                           multiSelect,
                           selectedOptions,
                           onSelect}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const [selected, setSelected] = useState<SelectOption[]>([
        ...selectedOptions,
    ]);

    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [isSelectFocused, setIsSelectFocused] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mouseup", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);

    const toggleSelection = (option: SelectOption) => {
        onSelect(option);
        if (multiSelect) {
            setSelected(prevSelected => {
                if (prevSelected.some(selectedOption => selectedOption === option)) {
                    return prevSelected.filter(
                        selectedOption => selectedOption !== option,
                    );
                } else {
                    return [...prevSelected, option];
                }
            });
        } else {
            setSelected([option]);
        }
    };

    const isSelected = (option: SelectOption) => {
        return selected.some(selectedOption => selectedOption === option);
    };

    const handleFocusOption = (index: number) => {
        setFocusedIndex(index);
    };

    const handleBlurOption = () => {
        setFocusedIndex(null);
    };

    const handleSelectFocus = () => {
        setIsSelectFocused(true);
    };

    const handleSelectBlur = () => {
        setIsSelectFocused(false);
    };

    return (
        <div className={styles.container} ref={selectRef}>
            <select
                name={name}
                id={name}
                className={styles.nativeSelect}
                aria-label={name}
            >
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <button
                className={clsx(styles.select, {
                    [styles.focusedSelect]: isSelectFocused,
                })}
                onClick={() => setIsOpen(!isOpen)}
                aria-hidden="true"
                aria-expanded={isOpen}
                onFocus={handleSelectFocus}
                onBlur={handleSelectBlur}
            >
                {name}
                <img
                    alt={"arrow-icon"}
                    src={SelectIcon}
                    className={clsx(styles.icon, { [styles.closedIcon]: !isOpen })}
                />
            </button>

            {isOpen && (
                <div className={styles.dropdown} aria-hidden="true">
                    {options.map((option, index) => (
                        <button
                            key={option}
                            className={clsx(styles.option, {
                                [styles.focusedOption]: focusedIndex === index,
                            })}
                            onClick={() => toggleSelection(option)}
                            onFocus={() => handleFocusOption(index)}
                            onBlur={handleBlurOption}
                        >
                            <input
                                type="checkbox"
                                checked={isSelected(option)}
                                onChange={() => toggleSelection(option)}
                                className={styles.checkbox}
                                aria-hidden="true"
                            />
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
