function CatItem(props) {
    return (
      <li>
        <img
          src={props.img}
          style={{ width: "150px", border: "1px solid red" }}
        />
      </li>
    );
  }

export default CatItem;