// Scroll Progress Bar - Shows progress as user scrolls down the page
document.addEventListener('DOMContentLoaded', function() {
  // Create the progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  progressBar.id = 'scroll-progress-bar';
  document.body.appendChild(progressBar);

  // Function to update progress bar
  function updateProgressBar() {
    // Calculate scroll percentage
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update the progress bar width
    progressBar.style.width = scrollPercent + '%';
  }

  // Add scroll event listener
  window.addEventListener('scroll', updateProgressBar);
});