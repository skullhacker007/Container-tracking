import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="paginationContainer">
      <button 
        className="paginationBtn" 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} /> Prev
      </button>
      
      <div className="pageNumbers">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`pageNumberBtn ${currentPage === idx + 1 ? 'activePage' : ''}`}
            onClick={() => onPageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <button 
        className="paginationBtn" 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}
