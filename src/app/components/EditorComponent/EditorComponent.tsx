'use client'

import { useEffect, useRef, useState, useCallback } from "react";
import EditorComponent from "../EditorComponent/EditorComponent";

// A4 dimensions in pixels at 96dpi
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const PAGE_MARGIN_TOP_BOTTOM = 96; // Adjust if needed, for top/bottom content margin
const PAGE_MARGIN_LEFT_RIGHT = 72; // Standard side margins (e.g., 0.75 inch)
const PAGE_GAP = 40; // Space between visual pages

const Page = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable area
  const [contentHeight, setContentHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // To track which page is primarily visible

  const usablePageHeight = A4_HEIGHT - PAGE_MARGIN_TOP_BOTTOM * 2;
  const pages = Math.max(1, Math.ceil(contentHeight / usablePageHeight));

  // Calculate content height and update on resize
  useEffect(() => {
    const calculateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    calculateHeight(); // Initial calculation
    const resizeObserver = new ResizeObserver(calculateHeight);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Handle scroll to update current page indicator (optional, but good for UX)
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      // Calculate which page is in view
      const newPage = Math.floor(scrollTop / (A4_HEIGHT + PAGE_GAP));
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className="flex flex-col items-center py-10 bg-[#f5f5f5] min-h-screen w-full">
      {/* Scrollable container that holds all virtual pages */}
      <div
        ref={scrollContainerRef}
        className="relative overflow-y-scroll"
        style={{
          width: A4_WIDTH,
          // Max height for the scrollable container, could be viewport height or fixed
          maxHeight: 'calc(100vh - 80px)', // Example: 100vh minus some padding
          // Ensure enough height to scroll through all content + gaps
          height: `${pages * (A4_HEIGHT + PAGE_GAP) - PAGE_GAP}px`, // Adjusted for total content height and gaps
          // Add a temporary background to see the scrollable area
          // backgroundColor: 'rgba(0,0,0,0.05)',
        }}
      >
        {/* Render each visual page background */}
        {Array.from({ length: pages }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white shadow-lg"
            style={{
              width: '100%',
              height: A4_HEIGHT,
              top: i * (A4_HEIGHT + PAGE_GAP), // Position each page
              left: 0,
            }}
          >
            {/* Page content "viewport" area - this is where the text will appear on each page */}
            <div
              style={{
                position: 'absolute',
                top: PAGE_MARGIN_TOP_BOTTOM,
                left: PAGE_MARGIN_LEFT_RIGHT,
                width: A4_WIDTH - PAGE_MARGIN_LEFT_RIGHT * 2,
                height: usablePageHeight,
                overflow: 'hidden', // This is key: clips content to current page's view
              }}
            >
              {/* Actual content container, which will be translated */}
              <div
                ref={contentRef}
                style={{
                  position: 'absolute', // Absolute to be translated
                  top: 0, // Starts at the top of its parent "viewport"
                  left: 0,
                  width: '100%',
                  // Translate Y to show appropriate content for the current visual page
                  transform: `translateY(-${i * usablePageHeight}px)`,
                  // Important: The actual content itself doesn't have minHeight to allow natural flow
                  // minHeight: '100%', // REMOVE THIS for proper flow
                }}
              >
                <EditorComponent />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Page number indicator */}
      <div className="mt-4 text-gray-600">
        Page {currentPage + 1} of {pages}
      </div>
    </div>
  );
};

export default Page;
