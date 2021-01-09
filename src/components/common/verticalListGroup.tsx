import React from "react";

interface IVertListGroup {
  items: any[];
  textProperty: string;
  valueProperty: string;
  selectedItem: any;
  onItemSelect: any;
}
const VerticalListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}: IVertListGroup) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

VerticalListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default VerticalListGroup;
