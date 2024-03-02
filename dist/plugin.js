exports.version = 1
exports.description = "highlight.js based preview for code files"
exports.apiRequired = 8.1
exports.repo = "kran27/code-preview"
exports.frontend_js = ['main.js', 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@latest/build/highlight.min.js']
exports.frontend_css = 'eighties.min.css'

exports.config = {
    regex: {
        frontend: true, type: 'string', defaultValue: 'txt|vb|js|ts|py|java|c|h|cpp|cxx|hpp|cs|html|css|json|xml|vcxproj|csproj|vbproj|sln|config|resx|xaml|props|targets|ruleset|settings|user|yaml|toml|git.+|filters|def|md',
        helperText: "Regex for supported file types"
    }
}