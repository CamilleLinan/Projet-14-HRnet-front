import { FC, useState } from "react";
import "./_EmployeeTable.scss";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { Input, Table } from "antd";
import dayjs from "dayjs";
import getColumnProps from "../../utils/getColumnProps";

const normalizeString = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const EmployeeTable: FC = () => {
  const employees = useSelector((state: RootState) => state.employees.list);
  const [searchText, setSearchText] = useState<string>("");
  const [pagination, setPagination] = useState({ pageSize: 10, current: 1 });

  const filteredEmployees = employees.filter((employee) => {
    return Object.entries(employee).some(([key, value]) => {
      if (value) {
        let normalizedValue;

        if (["dateOfBirth", "startDate"].includes(key)) {
          normalizedValue = dayjs(value).format("MM/DD/YYYY");
        } else {
          normalizedValue = normalizeString(value.toString());
        }
  
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
      defaultSortOrder: "ascend",
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
      render: (date: Date) => (date ? dayjs(date).format("MM/DD/YYYY") : ""),
    }),
    getColumnProps({
      title: "Start Date",
      dataIndex: "startDate",
      type: "date",
      render: (date: Date) => (date ? dayjs(date).format("MM/DD/YYYY") : ""),
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
    <article className="table-container">
      <header className="table-header">
        <h2>Current Employees</h2>
        <Input
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </header>
      <Table
        dataSource={filteredEmployees.map((employee, index) => ({
          ...employee,
          key: index,
        }))}
        columns={columns}
        showSorterTooltip={false}
        pagination={{
          current: pagination.current, 
          pageSize: pagination.pageSize,
          pageSizeOptions: ["10", "25", "50", "100"],
          showSizeChanger: true,
          responsive: true,
          position: ["bottomCenter"],
          onChange: (page, pageSize) => {
            setPagination({ current: page, pageSize });
          },
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} employee${total > 1 ? "s" : ""}`,
        }}
        scroll={{x: true}}
      />
    </article>
  );
};

export default EmployeeTable;
