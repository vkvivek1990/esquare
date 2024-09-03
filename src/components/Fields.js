import { Form } from "react-bootstrap";
import "./fields.css";

export const Input = (props) => {
  return (
    <>
      <Form.Control
        type="text"
        onChange={(e) => props.onChange(e, e.target.value)}
        value={props.firstName}
        placeholder={props.fieldName}
        id={props.fieldId}
        required={true}
      />
    </>
  );
};

export const Textarea = (props) => {
  return (
    <>
      <Form.Control
        as="textarea"
        onChange={(e) => props.onChange(e, e.target.value)}
        value={props.firstName}
        placeholder={props.fieldName}
        id={props.fieldId}
        required={true}
      />
    </>
  );
};

export const Select = (props) => {
  return (
    <>
      <Form.Select
        as="textarea"
        onChange={(e) => props.onChange(e, e.target.value)}
        value={props.firstName}
        placeholder={props.fieldName}
        id={props.fieldId}
        required={true}
      >
        {props.fieldOptions.map((fieldValues) => {
          return <option value={fieldValues.value}>{fieldValues.lable}</option>;
        })}
      </Form.Select>
    </>
  );
};

const Fields = (props) => {
  //   const fieldType = () => {
  //     return { input: Input };
  //   };

  const Fields = (props) => {
    if (props.fieldType === "input") {
      return <Input {...props} />;
    } else if (props.fieldType === "textarea") {
      return <Textarea {...props} />;
    } else if (props.fieldType === "dropdown") {
      return <Select {...props} />;
    }
  };
  return (
    <div className="fieldsComp">
      <Fields
        fieldType={props.fieldProp.fieldType}
        fieldId={props.fieldProp.fieldId}
        onChange={props.onChange}
        fieldName={props.fieldProp.fieldName}
        fieldOptions={props.fieldProp.fieldOptions}
        {...props}
      />
    </div>
  );
};

export default Fields;
