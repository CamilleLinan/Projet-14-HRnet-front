import { FC } from "react";
import "./_EmployeeTable.scss";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { Table } from "antd";
import getColumnProps from "../../utils/getColumnProps";
import { Employee } from "src/models/Employee";

const EmployeeTable: FC = () => {
  const employees = useSelector((state: RootState) => state.employees.list);

  const getFilters = (dataIndex: keyof Employee, type: "string" | "number" | "date") => {
    if (type === "date") {
        const uniqueDates = Array.from(
            new Set(
                employees
                    .map((employee) => employee[dataIndex])
                    .filter((date) => date !== undefined && date !== null)
                    .map((date) => new Date(date as string).toLocaleDateString())
            )
        );
        return uniqueDates.map((date) => ({
            text: date,
            value: date,
        }));
    }

    const uniqueValues = Array.from(
        new Set(
            employees.map((employee) => employee[dataIndex] as string | number)
        )
    );
    return uniqueValues.map((value) => ({
        text: value ? value.toString() : "N/A",
        value,
    }));
  };

  const columns = [
    getColumnProps({
      title: "First Name",
      dataIndex: "firstName",
      type: "text",
      width: 150,
      filters: getFilters("firstName", "string"),
      onFilter: (value, record) => record.firstName.includes(value),
    }),
    getColumnProps({ 
      title: "Last Name", 
      dataIndex: "lastName", 
      type: "text",
      filters: getFilters("lastName", "string"),
      onFilter: (value, record) => record.lastName.includes(value),
    }),
    getColumnProps({
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      type: "date",
      filters: getFilters("dateOfBirth", "date"),
      onFilter: (value, record) =>
          new Date(record.dateOfBirth).toLocaleDateString() === value,
    }),
    getColumnProps({
      title: "Start Date",
      dataIndex: "startDate",
      type: "date",
      filters: getFilters("startDate", "date"),
      onFilter: (value, record) =>
          new Date(record.startDate).toLocaleDateString() === value,
    }),
    getColumnProps({
      title: "Department",
      dataIndex: "department",
      type: "text",
      filters: getFilters("department", "string"),
      onFilter: (value, record) => record.department.includes(value),
    }),
    getColumnProps({ 
      title: "Street", 
      dataIndex: "street", 
      type: "text",
      filters: getFilters("street", "string"),
      onFilter: (value, record) => record.department.includes(value), 
    }),
    getColumnProps({ 
      title: "City", 
      dataIndex: "city", 
      type: "text",
      filters: getFilters("city", "string"),
      onFilter: (value, record) => record.department.includes(value),
    }),
    getColumnProps({ 
      title: "State", 
      dataIndex: "state", 
      type: "text",
      filters: getFilters("state", "string"),
      onFilter: (value, record) => record.state.includes(value),
    }),
    getColumnProps({ 
      title: "Zip Code", 
      dataIndex: "zipCode", 
      type: "number",
      filters: getFilters("zipCode", "number"),
      onFilter: (value, record) => record.zipCode === value,
    }),
  ];

  return (
    <div className="table-container">
      <h2>Current Employees</h2>
      <Table
        dataSource={employees.map((employee, index) => ({
          ...employee,
          key: index,
        }))}
        columns={columns}
        showSorterTooltip={false}
        pagination={{ 
          pageSize: 10,
          pageSizeOptions: ["10", "25", "50", "100"],
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} employee${total > 1 ? "s" : ""}`,
        }}
        scroll={{x: true}}
      />
    </div>
  );
};

export default EmployeeTable;
