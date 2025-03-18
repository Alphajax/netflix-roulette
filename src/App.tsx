import { useCallback } from "react";

import { Counter } from "./components";
import { Search } from "./ui";

import "./App.css";

function App() {
    const onSearch = useCallback((search: string) => {
        alert("search by value:" + search)
    }, []);

    return (
        <>
            <Counter initialValue={7} />
            <Search initialSearch={"netflix"} onSearch={onSearch} />
        </>
    );
}

export default App;
