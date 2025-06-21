import React, { useState } from "react";

type Notice = {
  frontmatter: {
    title: string;
    pubDate: string | Date;
  };
  fileName: string;
};

type NoticesListProps = {
  notices: Notice[];
  pageSize?: number;
};

export function NoticesList({ notices, pageSize = 10 }: NoticesListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalNotices = notices.length;
  const totalPages = Math.ceil(totalNotices / pageSize);

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedNotices = notices.slice(startIdx, endIdx);

  const handlePageChange = (pageNum: number) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  return (
    <>
      <div className="max-w-[1200px] md:px-20 mx-auto">
        {paginatedNotices.map(({ frontmatter, fileName }, idx) => (
          <React.Fragment key={fileName}>
            <a href={`/notices/${fileName}`}>
              <div className="p-6 flex gap-5 items-center">
                <h3 className="font-bold text-lg">{frontmatter.title}</h3>
                <div className="text-sm text-gray-500">
                  {frontmatter.pubDate
                    ? new Date(frontmatter.pubDate).toLocaleDateString()
                    : null}
                </div>
              </div>
            </a>
            {idx === paginatedNotices.length - 1 ? null : (
              <div className="w-full h-[1px] bg-secondary"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      {totalPages > 1 && (
        <nav className="flex justify-center mt-10 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "text-gray-400 pointer-events-none"
                : "hover:bg-gray-100"
            }`}
          >
            이전
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNum
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
                aria-current={currentPage === pageNum ? "page" : undefined}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "text-gray-400 pointer-events-none"
                : "hover:bg-gray-100"
            }`}
          >
            다음
          </button>
        </nav>
      )}
    </>
  );
}
