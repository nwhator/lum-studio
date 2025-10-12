import { useRef } from "react";


export function useIsotop() {
  const isotopContainer = useRef<HTMLDivElement>(null);

  const initIsotop = async () => {
    try {
      const Isotope = (await import("isotope-layout")).default;

      if (!isotopContainer.current) return;

      // Initialize Isotope
      const isotope = new Isotope(isotopContainer.current, {
        itemSelector: ".grid-item",
        percentPosition: true,
        layoutMode: "masonry",
        masonry: {
          columnWidth: ".grid-item",
        },
      });

      // Simple delay for images to load (safer than imagesLoaded on mobile)
      setTimeout(() => {
        isotope.layout();
      }, 300);

      // Filter items on button click
      const filterButtons = document.querySelectorAll<HTMLButtonElement>('.masonary-menu button');
      filterButtons.forEach(button => {
        const handleClick = (event: MouseEvent) => {
          const filterValue = button.getAttribute('data-filter') || '*';
          isotope.arrange({ filter: filterValue });

          // For menu active class
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          event.preventDefault();
        };

        button.addEventListener('click', handleClick);

        // Cleanup function to remove event listeners
        return () => {
          button.removeEventListener('click', handleClick);
        };
      });
    } catch (error) {
      console.error('Isotope initialization failed:', error);
      // Fail silently - gallery will still display without filtering
    }
  }

  return {
    isotopContainer,
    initIsotop,
  };
}
