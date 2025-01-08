import { FC, useState } from "react";
import "./_EmployeeTable.scss";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { Input, Table } from "antd";
import getColumnProps from "../../utils/getColumnProps";
// import { Employee } from "src/models/Employee";

const normalizeString = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const EmployeeTable: FC = () => {
  const employees = useSelector((state: RootState) => state.employees.list);
  const [searchText, setSearchText] = useState<string>("");

  const filteredEmployees = employees.filter((employee) => {
    return Object.values(employee).some((value) => {
      if (value) {
        const normalizedValue = normalizeString(value.toString());
        const normalizedSearchText = normalizeString(searchText);
        return normalizedValue.includes(normalizedSearchText);
      }
      return false;
    });
  });

  const columns = [
    getColumnProps({
      title: "First Name",
      dataIndex: "firstName",
      type: "text",
      width: 150,
    }),
    getColumnProps({ 
      title: "Last Name", 
      dataIndex: "lastName", 
      type: "text",
    }),
    getColumnProps({
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      type: "date",
    }),
    getColumnProps({
      title: "Start Date",
      dataIndex: "startDate",
      type: "date",
    }),
    getColumnProps({
      title: "Department",
      dataIndex: "department",
      type: "text",
    }),
    getColumnProps({ 
      title: "Street", 
      dataIndex: "street", 
      type: "text",
    }),
    getColumnProps({ 
      title: "City", 
      dataIndex: "city", 
      type: "text",
    }),
    getColumnProps({ 
      title: "State", 
      dataIndex: "state", 
      type: "text",
    }),
    getColumnProps({ 
      title: "Zip Code", 
      dataIndex: "zipCode", 
      type: "number",
    }),
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Current Employees</h2>
        <Input
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <Table
        dataSource={filteredEmployees.map((employee, index) => ({
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
