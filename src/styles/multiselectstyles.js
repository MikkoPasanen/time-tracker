// These styles are for the react select dropdown menu
// both dark and light mode seperately

const darkThemeStyle = {
    multiValue: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#0c1b2d",
        color: "#eaf2fa",
        border: "2px solid #617d9e",
    }),
    option: (baseStyles, { isFocused }) => ({
        ...baseStyles,
        backgroundColor: "#0f2033",
        color: "#eaf2fa",
        border: "1px solid #617d9e",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#617d9e",
        },
        ...(isFocused && {
            backgroundColor: "#617d9e",
        }),
    }),
    multiValueLabel: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#0c1b2d",
        color: "#eaf2fa",
    }),
    multiValueRemove: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#0c1b2d",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "transparent",
        },
    }),
    menuList: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#0c1b2d",
    }),
    indicatorsContainer: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#0c1b2d",
    }),
    valueContainer: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#0c1b2d",
    }),
    control: (baseStyles, { isFocused }) => ({
        ...baseStyles,
        backgroundColor: "#0c1b2d",
        border: "2px solid #617d9e",
        "&:hover": {
            border: "2px solid #617d9e",
        },
        ...(isFocused && {
            border: "2px solid #617d9e",
        }),
    }),
    clearIndicator: (baseStyles) => ({
        ...baseStyles,
        color: "#eaf2fa",
        "&:hover": {
            color: "red",
            cursor: "pointer",
        },
    }),
    input: (baseStyles) => ({
        ...baseStyles,
        color: "#eaf2fa",
    }),
    placeholder: (baseStyles) => ({
        ...baseStyles,
        fontSize: "14px",
        color: "#eaf2fa",
        opacity: "50%",
    }),
    dropdownIndicator: (baseStyles) => ({
        ...baseStyles,
        "&:hover": {
            cursor: "pointer",
        },
    }),
};

const lightThemeStyle = {
    multiValue: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#f4f4f5",
        color: "#090a2a",
        border: "2px solid #73748c",
    }),
    option: (baseStyles, { isFocused }) => ({
        ...baseStyles,
        backgroundColor: "#fafafa",
        color: "#090a2a",
        border: "1px solid #73748c",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "lightgray",
        },
        ...(isFocused && {
            backgroundColor: "lightgray",
        }),
    }),
    multiValueLabel: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#f4f4f5",
        color: "#090a2a",
    }),
    multiValueRemove: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#f4f4f5",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "transparent",
        },
    }),
    menuList: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#f4f4f5",
    }),
    indicatorsContainer: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#f4f4f5",
    }),
    valueContainer: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "#f4f4f5",
    }),
    control: (baseStyles, { isFocused }) => ({
        ...baseStyles,
        backgroundColor: "#f4f4f5",
        border: "2px solid #73748c",
        "&:hover": {
            border: "2px solid #73748c",
        },
        ...(isFocused && {
            border: "2px solid #73748c",
        }),
    }),
    clearIndicator: (baseStyles) => ({
        ...baseStyles,
        color: "#090a2a",
        "&:hover": {
            color: "red",
            cursor: "pointer",
        },
    }),
    input: (baseStyles) => ({
        ...baseStyles,
        color: "#090a2a",
    }),
    placeholder: (baseStyles) => ({
        ...baseStyles,
        fontSize: "14px",
        color: "#090a2a",
        opacity: "50%",
    }),
    dropdownIndicator: (baseStyles) => ({
        ...baseStyles,
        "&:hover": {
            cursor: "pointer",
        },
    }),
};

export { darkThemeStyle, lightThemeStyle };
