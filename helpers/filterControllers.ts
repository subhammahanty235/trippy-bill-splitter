interface Controller {
    value: string | any;
    error: string | null;
}
type FormControllers = Record<string, Controller>;

const filterFormControllersForBackend = (controllers: FormControllers) => {
    return Object.keys(controllers).reduce((filteredData, key) => {
        if (controllers[key].value !== undefined && controllers[key].value !== null) {
            filteredData[key] = controllers[key].value;
        }
        return filteredData;
    }, {} as Record<string, any>);
};

export default filterFormControllersForBackend;