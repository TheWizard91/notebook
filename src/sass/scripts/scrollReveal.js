export default function initScrollReveal(targetElements, defaultProps) {
    if (!targetElements.length) return;

    ScrollReveal({ element, animation }) => {
        ScrollReveal().reveal(element, Object.assign({}, defaultProps, animation));
    }

}