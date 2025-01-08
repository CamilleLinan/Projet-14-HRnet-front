import { Employee } from "src/models/Employee";

interface ColumnProps {
    title: string,
    dataIndex: keyof Employee,
    type: 'text' | 'number' | 'date',
    width?: number,
}

const getColumnProps = ({ title, dataIndex, type, width }: ColumnProps) => {
    let sorter;

    switch (type) {
        case 'text':
            sorter = (a: Employee, b: Employee) =>
                String(a[dataIndex]).localeCompare(String(b[dataIndex]));
            break;

        case 'number':
            sorter = (a: Employee, b: Employee) =>
                Number(a[dataIndex]) - Number(b[dataIndex]);
            break;

        case 'date':
            sorter = (a: Employee, b: Employee) =>
                new Date(String(a[dataIndex])).getTime() -
                new Date(String(b[dataIndex])).getTime();
            break;

        default:
            sorter = undefined;
    }

    return {
        title,
        dataIndex,
        key: dataIndex,
        width,
        sorter,
    };
};

export default getColumnProps;
