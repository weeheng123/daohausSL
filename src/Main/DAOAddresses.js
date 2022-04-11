import "./DAOAddresses.css";

function DAOAddresses(props) {
  return (
    <div className="dao-addresses">
      {props.molochesArray.map((object, index) => (
        <h4
          key={index}
          value={object.id}
          onClick={() => props.onShowOverlay(object.id)}
        >
          {object.id}
        </h4>
      ))}
    </div>
  );
}

export default DAOAddresses;
