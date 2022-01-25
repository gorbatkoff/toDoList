function Page({changeCurrentPage, pageNumber}) {
  return <div>
    <button
        className="page-button"
        onClick={() => changeCurrentPage(pageNumber)}
    >
        {pageNumber}
    </button>
  </div>;
}

export default Page;
