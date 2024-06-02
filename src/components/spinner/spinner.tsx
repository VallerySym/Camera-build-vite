import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner__container">
      <div className="spinner"></div>
      <span className="spinner__info">Loading</span>
    </div>

  );
}

export default Spinner;
