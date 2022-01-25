import { Button } from 'antd';

function Page({changeCurrentPage, pageNumber}) {
  return <div>
    <Button
        className="page-button"
        onClick={() => changeCurrentPage(pageNumber)}
    >
        {pageNumber}
    </Button>
  </div>;
}

export default Page;
