const API_BASE_URL = 'http://localhost:8000/api';

// DOM Elements
const loadEventsBtn = document.getElementById('load-events-btn');
const eventsContainer = document.getElementById('events-container');
const registerForm = document.getElementById('register-form');
const registerMessage = document.getElementById('register-message');

// Load Events Feature
loadEventsBtn.addEventListener('click', async () => {
    try {
        eventsContainer.innerHTML = '<p>Loading events...</p>';
        
        // Fetch events from the backend
        const response = await fetch(`${API_BASE_URL}/events`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const events = await response.json();
        
        // Display events
        if (events.length === 0) {
            eventsContainer.innerHTML = '<p>No events found.</p>';
            return;
        }

        let html = '';
        events.forEach(event => {
            html += `
                <div class="event-card">
                    <h3>${event.title}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                </div>
            `;
        });
        
        eventsContainer.innerHTML = html;
        
    } catch (error) {
        eventsContainer.innerHTML = `<p style="color: red;">Error loading events: ${error.message}. Make sure the backend is running!</p>`;
        console.error('Error fetching events:', error);
    }
});

// Registration Feature
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload
    
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    
    const userData = {
        name: nameInput,
        email: emailInput
    };
    
    try {
        // Send POST request to backend
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        
        // Show success message
        registerMessage.textContent = result.message;
        registerMessage.style.color = '#27ae60';
        
        // Clear form
        registerForm.reset();
        
    } catch (error) {
        registerMessage.textContent = `Error registering: ${error.message}. Make sure the backend is running!`;
        registerMessage.style.color = 'red';
        console.error('Error registering user:', error);
    }
});
