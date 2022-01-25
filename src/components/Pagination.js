import React from 'react';
import Page from './Page';

function Pagination({changeCurrentPage, amountPages, currentPage}) {

    const pages = [];

    for(let i = 0; i < amountPages; i++){
        pages.push(i);
    }

    // console.log(pages);

    return (
        <div className="pages">
            {
                pages.map((none, index) => 
                    <Page 
                        pageNumber={index +1}
                        key = {index}
                        changeCurrentPage = {changeCurrentPage}
                    />
                )
            }
        </div>
    );
}

export default Pagination;