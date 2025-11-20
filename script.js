document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('generate-form');
    const promptInput = document.getElementById('prompt-input');
    const loading = document.getElementById('loading');
    const imageContainer = document.getElementById('image-container');
    const aiImage = document.getElementById('ai-image');
    const downloadBtn = document.getElementById('download-btn');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const prompt = promptInput.value.trim();
        if (!prompt) {
            showError('Please enter a prompt!');
            return;
        }

        // Hide previous results
        imageContainer.style.display = 'none';
        errorMessage.style.display = 'none';
        loading.style.display = 'block';

        // Generate random seed for variety
        const seed = Math.floor(Math.random() * 1000000);

        // Use Pollinations.ai free endpoint
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&seed=${seed}&nologo=true`;

        try {
            aiImage.src = url;
            aiImage.alt = `AI generated image: ${prompt}`;

            aiImage.onload = function() {
                loading.style.display = 'none';
                imageContainer.style.display = 'block';
                downloadBtn.style.display = 'block';
                errorMessage.style.display = 'none';
            };

            aiImage.onerror = function() {
                loading.style.display = 'none';
                showError('Failed to generate image. Try a different prompt.');
            };

            // Download functionality
            downloadBtn.onclick = function() {
                const link = document.createElement('a');
                link.download = `ai-image-${Date.now()}.png`;
                link.href = url;
                link.click();
            };

        } catch (err) {
            loading.style.display = 'none';
            showError('An error occurred. Please try again.');
        }
    });

    function showError(msg) {
        errorMessage.textContent = msg;
        errorMessage.style.display = 'block';
    }
});