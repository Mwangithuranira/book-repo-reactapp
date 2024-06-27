import React from 'react';

interface PaginationProps {
    currentPage: number;
    booksPerPage: number;
    totalBooks: number;
    onPageChange: (page: number) => void;
}

const Repopage: React.FC<PaginationProps> = ({ currentPage, booksPerPage, totalBooks, onPageChange }) => {
    const totalPages = Math.ceil(totalBooks / booksPerPage);

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
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

export default Repopage;
