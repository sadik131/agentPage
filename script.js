document.addEventListener('DOMContentLoaded', function () {
    const progress1 = document.getElementById('progress1');
    const progress2 = document.getElementById('progress2');

    function setProgress(element, percent) {
        const radius = 40; // Adjust based on your SVG
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;
        const circle = element.querySelector('.progress-ring__circle');
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = offset;
        const text = element.querySelector('.progress-text') || element.querySelector('.progress-text-green');
        text.textContent = `${Math.round(percent)}%`; // Round to nearest integer
    }

    function animateProgress(element, percent) {
        const duration = 1000; // animation duration in milliseconds
        const start = 0;
        const stepCount = 100; // Number of steps for smooth animation
        const increment = percent / stepCount;
        let currentPercent = start;

        function step() {
            if (currentPercent < percent) {
                currentPercent += increment;
                setProgress(element, Math.min(currentPercent, percent));
                requestAnimationFrame(step);
            } else {
                setProgress(element, percent);
            }
        }

        step();
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const percent = element.id === 'progress1' ? 71 : 91;
                animateProgress(element, percent);
                observer.unobserve(element); // Stop observing once animation is triggered
            }
        });
    });

    observer.observe(progress1);
    observer.observe(progress2);
});
