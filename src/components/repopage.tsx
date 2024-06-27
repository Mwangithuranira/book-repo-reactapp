
import React from 'react';
import { Action } from '../types';
import '../App.scss'

interface PaginationProps {
    currentPage: number;
    booksPerPage: number;
    totalBooks: number;
    dispatch: React.Dispatch<Action>;
}

const Page: React.FC<PaginationProps> = ({
    currentPage,
    booksPerPage,
    totalBooks,
    dispatch,
}) => {
    const totalPages = Math.ceil(totalBooks / booksPerPage);

    const handlePrev = () => {
        if (currentPage > 1) {
            dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 });
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 });
        }
    };

    return (
        <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Page;
