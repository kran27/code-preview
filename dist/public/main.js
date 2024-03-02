{
    const config = HFS.getPluginConfig()

    HFS.onEvent('fileMenu', ({ entry }) =>
    new RegExp(config.regex).test(entry.ext) &&
        { label: "Show", icon: 'image', onClick: () => preview(entry) })

    let originalDisplayValues = new Map();

    function preview(entry) {
        fetch(entry.uri)
            .then(response => response.text())
            .then(content => {
                const elementsToHide = document.querySelectorAll('.breadcrumb, .folder, .file, #folder-stats');
                elementsToHide.forEach(element => {
                    originalDisplayValues.set(element, element.style.display);
                    element.style.display = 'none';
                });

                const root = document.getElementById('preview');
                root.style.display = 'block';
                const previewContent = root.querySelector('#preview-content');
                previewContent.textContent = content; // Use textContent instead of innerText

                // Apply syntax highlighting
                hljs.initHighlighting.called = false;
                hljs.initHighlighting(previewContent);
                hljs.highlightBlock(previewContent);

                root.querySelector('#preview-title').innerText = entry.name;
            });
    }

    HFS.onEvent('afterMenuBar', () => `
            <div id='preview' style='display: none;'>
                <div>
                    <button onclick="closePreview()">✕</button>
                    <span id='preview-title'></span>
                </div>
                <pre id="preview-content" style="white-space: pre-wrap;"></pre>
            </div>
        `)

    function closePreview() {
        const previewPane = document.getElementById('preview');
        previewPane.style.display = 'none';

        // Reset the preview content element to its original state
        const previewContent = previewPane.querySelector('#preview-content');
        previewContent.textContent = '';
        previewContent.className = '';
        previewContent.removeAttribute('data-highlighted');

        originalDisplayValues.forEach((displayValue, element) => {
            element.style.display = displayValue;
        });
        originalDisplayValues.clear();
    }
}