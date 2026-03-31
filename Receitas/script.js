/**
 * Recipe Hub Logic
 * Handles icons, print functions and AI image generation
 */

const apiKey = ""; // Canvas Environment provides the key

/**
 * Retries an API fetch with exponential backoff
 */
async function fetchWithRetry(url, options, retries = 5, backoff = 1000) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Fetch failed');
        return await response.json();
    } catch (err) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        throw err;
    }
}

/**
 * Generates an image using Imagen 4.0 model
 */
async function loadAIImage(prompt, elementId) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
    
    const payload = {
        instances: [{ prompt: prompt }],
        parameters: { sampleCount: 1 }
    };

    try {
        const data = await fetchWithRetry(url, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (data.predictions && data.predictions[0]) {
            const imgElement = document.getElementById(elementId);
            imgElement.src = `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
            imgElement.classList.remove('opacity-0');
        }
    } catch (error) {
        console.error(`Failed to load image for ${elementId}:`, error);
        // Fallback to a solid color or placeholder if needed
    }
}

/**
 * Initialize page
 */
window.addEventListener('DOMContentLoaded', async () => {
    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Se a API não estiver configurada (apiKey vazio), usamos as imagens locais já presentes no HTML
    if (!apiKey) {
        ['hero-image', 'gallery-1', 'gallery-2'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('opacity-0');
        });

        // Esconde o loader rapidamente
        setTimeout(() => {
            const loader = document.getElementById('loading-overlay');
            if (loader) loader.style.opacity = '0';
            setTimeout(() => { if (loader) loader.style.display = 'none'; }, 500);
        }, 300);

        return;
    }

    // Define image prompts (executa apenas se apiKey estiver configurada)
    const imageTasks = [
        loadAIImage("Professional food photography of a moist chocolate cake, rich dark ganache, gold flakes, rustic wood background, high resolution", "hero-image"),
        loadAIImage("Close up of a chocolate cake texture, sponge air bubbles, macro photography", "gallery-1"),
        loadAIImage("Delicious slice of chocolate cake on a ceramic plate, cinematic lighting", "gallery-2")
    ];

    // Wait for all images to start loading
    try {
        await Promise.all(imageTasks);
    } finally {
        // Hide loader after a short delay for smooth transition
        setTimeout(() => {
            const loader = document.getElementById('loading-overlay');
            if (loader) loader.style.opacity = '0';
            setTimeout(() => { if (loader) loader.style.display = 'none'; }, 500);
        }, 1000);
    }
});

