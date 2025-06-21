import React, { useState } from "react";

type Blog = {
  frontmatter: {
    title: string;
    pubDate: string | Date;
    author: string;
  };
  fileName: string;
};

type BlogsListProps = {
  blogs: Blog[];
  pageSize?: number;
};

export function BlogsList({ blogs, pageSize = 10 }: BlogsListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalBlogs = blogs.length;
  const totalPages = Math.ceil(totalBlogs / pageSize);

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const paginatedBlogs = blogs.slice(startIdx, endIdx);

  const handlePageChange = (pageNum: number) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  return (
    <>
      <div className="max-w-[1200px] md:px-20 mx-auto grid grid-cols-3">
        {paginatedBlogs.map(({ frontmatter, fileName }, idx) => (
          <>
            <a href={`/blogs/${fileName}`}>
              <img
                src={`/blog/thumbnails/${fileName}.png`}
                alt={`blog-${fileName}-thumbnail`}
              />
              <div className="py-6 flex flex-col gap-2">
                <h3 className="font-bold text-lg">{frontmatter.title}</h3>
                <div className="text-sm text-gray-500">
                  {frontmatter.author} -{" "}
                  {frontmatter.pubDate
                    ? new Date(frontmatter.pubDate).toLocaleDateString()
                    : null}
                </div>
              </div>
            </a>
            {idx === paginatedBlogs.length - 1 ? null : (
              <div className="w-full h-[1px] bg-secondary"></div>
            )}
          </>
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
