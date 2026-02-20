const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Initialize grid positions (optional, ensures they don't all stack at 0,0)
cubes.forEach((cube, index) => {
    cube.style.left = `${(index % 5) * 60}px`;
    cube.style.top = `${Math.floor(index / 5) * 60}px`;
    
    cube.addEventListener('mousedown', startDrag);
});

function startDrag(e) {
    activeCube = e.target;
    activeCube.style.cursor = 'grabbing';
    
    // Calculate where inside the cube the user clicked
    const rect = activeCube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Listen for move and up on the window to prevent "losing" the cube if moving fast
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (!activeCube) return;

    // Calculate new position relative to the container
    const containerRect = container.getBoundingClientRect();
    let newX = e.clientX - containerRect.left - offsetX;
    let newY = e.clientY - containerRect.top - offsetY;

    // --- Boundary Constraints ---
    const maxX = containerRect.width - activeCube.offsetWidth;
    const maxY = containerRect.height - activeCube.offsetHeight;

    // Clamp values between 0 and Max
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    activeCube.style.left = `${newX}px`;
    activeCube.style.top = `${newY}px`;
}

function stopDrag() {
    if (activeCube) {
        activeCube.style.cursor = 'grab';
    }
    activeCube = null;
    window.removeEventListener('mousemove', drag);
    window.removeEventListener('mouseup', stopDrag);
}