import React from "react";

interface IVertListGroup {
  items: any[];
  textProperty?: string;
  valueProperty?: string;
  selectedItem: any;
  onItemSelect: any;
  isHorizontal?: boolean;
}
const ListGroup: React.FunctionComponent<IVertListGroup> = ({
  items,
  textProperty = "name",
  valueProperty = "_id",
  selectedItem,
  onItemSelect,
  isHorizontal = false,
}) => {
  return (
    <ul
      className={"list-group" + (isHorizontal ? " list-group-horizontal" : "")}
    >
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

export default ListGroup;
