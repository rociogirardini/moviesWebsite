import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();
    if (keyword.length < 4) {
      Swal.fire(
        "We have not found any matches.",
        "You must type in a keyword.",
        "info"
      );
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/results?keyword=${keyword}`);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="form-label labelSearchBar mb-0">
          <input
            className="form-control SearchBar"
            type="text"
            name="keyword"
            placeholder="Search..."
          />
        </label>
        <button className="btnSearchBar" type="submit">
        🔎
        </button>
      </form>
    </>
  );
}

export default SearchBar;
