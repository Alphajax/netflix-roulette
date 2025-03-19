import clsx from "clsx";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";

import { KEY_CODE } from "../../constants";
import { Button } from "../button";

import styles from "./search.module.scss";

type Props = {
    initialSearch: string;
    onSearch: (search: string) => void;
};

export const Search = ({ initialSearch, onSearch }: Props) => {
    const [search, setSearch] = useState(initialSearch);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearchClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSearch(search);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KEY_CODE.ENTER) {
            e.preventDefault();
            onSearch(search);
        }
    };

    return (
        <div className={styles.container}>
            <input
                onKeyDown={handleKeyPress}
                type="text"
                onChange={handleInputChange}
                className={clsx(styles.searchInput)}
                value={search}
            />
            <Button onClick={handleSearchClick}>Search</Button>
        </div>
    );
};
