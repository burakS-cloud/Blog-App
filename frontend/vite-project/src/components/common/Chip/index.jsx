/* eslint-disable react/prop-types */
import "./styles.css";

const Chip = ({ label, subCategory }) => {
  return (
    <>
      {subCategory ? (
        <p className="subChip">{label}</p>
      ) : (
        <p className="chip">{label}</p>
      )}
    </>
  );
};

export default Chip;
