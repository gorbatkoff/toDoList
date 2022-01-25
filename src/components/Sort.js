const Sort = ({sortByStatus, sortingTasks}) => {
    return (
        <div className="sort-wrapper">
            <div className="sort-by-status">
                <button onClick={() => sortByStatus("All")} >All</button>
                <button onClick={() => sortByStatus("Done")}>Done</button>
                <button onClick={() => sortByStatus("Undone")}>UnDone</button>
            </div>

            <div className="sort-by-date">
                <div>Sort By Date</div>

                <button onClick={() => sortingTasks('standart')}>▲</button>
                <button onClick={() => sortingTasks('reverse')}>▼</button>
            </div>
        </div>
    )
}

export default Sort;