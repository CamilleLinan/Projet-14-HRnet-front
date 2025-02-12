import { FC } from 'react';
import EmployeeTable from '@components/EmployeeTable/EmployeeTable';

const EmployeeList: FC = () => {
  return (
    <section className="section-employee-list">
      <EmployeeTable />
    </section>
  );
};

export default EmployeeList;