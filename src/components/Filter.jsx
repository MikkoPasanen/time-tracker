import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { useSettings } from "../components/SettingsContext";
import { darkThemeStyle, lightThemeStyle } from "../styles/multiselectstyles";

export default function Filter({allTags, filterByTags}) {
    const {darkMode} = useSettings(); 
    const [filterOptions, setFilterOptions] = useState([]);

    useEffect(() => {
        generateFilterOptions(allTags);
    }, [allTags])

    const handleFilterChange = (selectedTags) => {
        const filterArr = selectedTags.map((option) => option.value);
        filterByTags(filterArr);
    };

    const generateFilterOptions = (allTags) => {
        let options = [];

        for (let tag of allTags) {
            options.push({ value: tag, label: tag });
        }
        setFilterOptions(options);
    };

    return (
        <>
            <CreatableSelect
                isMulti
                placeholder="Filter by tags"
                options={filterOptions}
                styles={darkMode ? darkThemeStyle : lightThemeStyle}
                onChange={handleFilterChange}
            />
        </>
    );
}