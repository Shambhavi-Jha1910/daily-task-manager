function FilterButtons({ filter, setFilter }) {
  return (
    <div className="filters">
      {["all", "pending", "done"].map((f) => (
        <button
          key={f}
          className={filter === f ? "active" : ""}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;