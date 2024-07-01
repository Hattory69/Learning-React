import { Checkbox, Input, Flex } from "antd";
import "./listTitle.css";

export const ListTitle = ({ title, setTaskTitle, toggleAllItems }) => {
  const handleTitleChnge = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleCheckboxChange = () => {
    toggleAllItems();
  };

  return (
    <Flex className="listTitle-wrapper">
      <Checkbox
        checked="true"
        className="listTitle-checkbox"
        onClick={handleCheckboxChange}
      />
      <Input
        className="listTitle-input"
        value={title}
        onChange={handleTitleChnge}
      />
    </Flex>
  );
};
