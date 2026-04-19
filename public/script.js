// Typing animation
const text = "Initializing system... Access granted ✔";
let i = 0;

function typeEffect() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 40);
    }
}
typeEffect();


// Load tools
let allTools = [];

fetch('/api/tools')
    .then(res => res.json())
    .then(tools => {
        allTools = tools;
        displayTools(tools);
    });

function displayTools(tools) {
    const container = document.getElementById('tools-container');
    container.innerHTML = "";

    tools.forEach(tool => {
        const name = tool.replace('.html', '');

        const card = document.createElement('a');
        card.href = `/tools/${tool}`;
        card.className = "tool-card";

        card.innerHTML = `
            <div class="tool-name">${name}</div>
            <div class="tag">click to open</div>
        `;

        container.appendChild(card);
    });
}

// Search filter
document.getElementById("search").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = allTools.filter(tool =>
        tool.toLowerCase().includes(value)
    );

    displayTools(filtered);
});

