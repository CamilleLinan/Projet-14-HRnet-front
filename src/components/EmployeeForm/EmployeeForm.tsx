import { useState } from "react";
import "./_EmployeeForm.scss";
import dayjs from "dayjs";
import { Form, Input, DatePicker, Select, Button, Row, Col } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { addEmployee } from "@redux/slices/employeeSlice";
import { Employee } from "../../models/Employee";
import { states } from "../../utils/states";
import { departments } from "../../utils/departments";
import { ConfirmModal } from "@camlin/react-confirm-modal";

const { Option } = Select;

const EmployeeForm = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleModal = () => {
    setModalOpen(false);
  };

  const saveEmployee = (values: Employee) => {
    const newEmployee: Employee = {
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
      startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
      department: values.department,
      street: values.street,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
    };

    dispatch(addEmployee(newEmployee));
    setModalOpen(true);
    form.resetFields();
  };

  return (
    <article className="form-container">
      <h2>Create Employee</h2>

      <Form form={form} layout="vertical" onFinish={saveEmployee}>
        <div className="bg-white">
          <h3>Informations</h3>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter the first name" },
                ]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter the last name" },
                ]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Please select the date of birth" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select date of birth"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[
                  { required: true, message: "Please select the start date" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select start date"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please select a department" },
                ]}
              >
                <Select placeholder="Select a department">
                  {departments.map((d, i) => (
                    <Option key={i} value={d.name}>{d.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="bg-white">
          <h3>Address</h3>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Street"
                name="street"
                rules={[{ required: true, message: "Please enter the street" }]}
              >
                <Input placeholder="Enter street" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter the city" }]}
              >
                <Input placeholder="Enter city" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: "Please select a state" }]}
              >
                <Select placeholder="Select a state">
                  {states.map((s, i) => (
                    <Option key={i} value={s.abbreviation}>{s.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Zip Code"
                name="zipCode"
                rules={[{ required: true, message: "Please enter the zip code" }]}
              >
                <Input type="number" placeholder="Enter zip code" />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Row justify={"center"}>
          <Button type="primary" htmlType="submit">
            SUBMIT
          </Button>
        </Row>
      </Form>
      <ConfirmModal
        open={modalOpen}
        title={
          <>
            <InfoCircleOutlined className="modal-icon" />
            Confirmation
          </>
        }
        content="Employee created !"
        footerButtons={[
          {
            text: 'OK',
            type: 'primary',
            onClick: handleModal
          }
        ]}/>
    </article>
  );
};

export default EmployeeForm;
