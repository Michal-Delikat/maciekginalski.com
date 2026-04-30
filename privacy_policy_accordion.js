document.addEventListener('DOMContentLoaded', () => {
    const accordionHeader = document.querySelector('.accordion-header');
    accordionHeader.addEventListener('click', () => {
        const content = accordionHeader.nextElementSibling;
        const arrow = accordionHeader.querySelector('.accordion-arrow');
        
        content.classList.toggle('show');
        arrow.classList.toggle('rotate');   
    });
});