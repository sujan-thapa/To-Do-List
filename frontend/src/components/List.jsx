import React from "react";

function List(props) {
  return (
    <div>
      <h2>{props.note.notes}</h2>
      {/* <p>{props.note.content}</p> */}
    </div>
  );
}

export default List;