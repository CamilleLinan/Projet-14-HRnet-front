import { FC } from "react";
import "./_EmployeeTable.scss";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { Table } from "antd";
import getColumnProps from "../../utils/getColumnProps";

const EmployeeTable: FC = () => {
  const employees = useSelector((state: RootState) => state.employees.list);

  const columns = [
    getColumnProps({
      title: "First Name",
      dataIndex: "firstName",
      type: "text",
    }),
    getColumnProps({ title: "Last Name", dataIndex: "lastName", type: "text" }),
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
    getColumnProps({ title: "Street", dataIndex: "street", type: "text" }),
    getColumnProps({ title: "City", dataIndex: "city", type: "text" }),
    getColumnProps({ title: "State", dataIndex: "state", type: "text" }),
    getColumnProps({ title: "Zip Code", dataIndex: "zipCode", type: "number" }),
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
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default EmployeeTable;
