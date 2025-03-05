import { SortOrder } from "antd/es/table/interface";
import { Employee } from "src/models/Employee";

interface ColumnProps {
    title: string,
    dataIndex: keyof Employee,
    type: 'text' | 'number' | 'date',
    width?: number,
    defaultSortOrder?: SortOrder,
    render?: (date: Date) => string,
}

const getColumnProps = ({ 
    title, 
    dataIndex, 
    type, 
    width,
    defaultSortOrder, 
    render 
}: ColumnProps) => {
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
        defaultSortOrder: sorter ? defaultSortOrder : undefined,
        render
    };
};

export default getColumnProps;
