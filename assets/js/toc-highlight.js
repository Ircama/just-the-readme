document.addEventListener('DOMContentLoaded', function() {
    // Get all section headings and TOC links
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const tocLinks = Array.from(document.querySelectorAll('nav ul li a'));
    const sidebar = document.querySelector('nav');

    // Create a mapping of heading IDs to their corresponding TOC links
    const tocMap = new Map();
    tocLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            tocMap.set(href.substring(1), link);
        }
    });

    // Function to get the currently visible heading
    function getCurrentHeading() {
        const scrollPosition = window.scrollY + 50;
        
        for (let i = headings.length - 1; i >= 0; i--) {
            const heading = headings[i];
            if (heading.offsetTop <= scrollPosition) {
                return heading;
            }
        }
        return headings[0];
    }

    // Function to scroll the sidebar to make the active item visible
    function scrollSidebarToActive(activeLink) {
        if (!activeLink || !sidebar) return;
        
        const navRect = sidebar.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        // Calculate if the active link is outside the visible area of the sidebar
        const isAbove = linkRect.top < navRect.top;
        const isBelow = linkRect.bottom > navRect.bottom;
        
        if (isAbove || isBelow) {
            // Calculate the new scroll position
            let newScrollTop;
            if (isAbove) {
                newScrollTop = sidebar.scrollTop + (linkRect.top - navRect.top) - 200;
            } else {
                newScrollTop = sidebar.scrollTop + (linkRect.bottom - navRect.bottom) + 200;
            }
            
            sidebar.scrollTo({
                top: newScrollTop,
                behavior: 'smooth'
            });
        }
    }

    // Function to highlight the current TOC item
    function highlightTocItem() {
        // Remove highlight from all TOC items
        tocLinks.forEach(link => {
            link.classList.remove('active');
            // Remove highlight from parent li elements
            let parentLi = link.closest('li');
            while (parentLi) {
                parentLi.classList.remove('active');
                parentLi = parentLi.parentElement.closest('li');
            }
        });

        // Add highlight to current TOC item
        const currentHeading = getCurrentHeading();
        if (currentHeading && currentHeading.id) {
            const currentLink = tocMap.get(currentHeading.id);
            if (currentLink) {
                currentLink.classList.add('active');
                // Add highlight to parent li elements
                let parentLi = currentLink.closest('li');
                while (parentLi) {
                    parentLi.classList.add('active');
                    parentLi = parentLi.parentElement.closest('li');
                }
                
                // Scroll sidebar to make active item visible
                scrollSidebarToActive(currentLink);
            }
        }
    }

    // Add CSS styles for highlighting
    const style = document.createElement('style');
    style.textContent = `
        nav ul li a.active {
            background-color: #cbd9e5 !important;
            padding: 2px 5px !important;
            margin: -2px -5px !important;
            border-radius: 3px !important;
        }
        nav ul li.active > a {
            font-weight: bold !important;
        }
    `;
    document.head.appendChild(style);

    // Add scroll event listener with debouncing
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            highlightTocItem();
        });
    });

    // Initial highlight
    highlightTocItem();
});
