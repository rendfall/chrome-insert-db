# InsertDB
A basic webservice to send request to remote server

# Install
Required file: manifest.json

```json
{
    "manifest_version": 2,
    "name": "InsertDB - WebService",
    "description": "A basic webservice to send request to remote server",
    "version": "1.0",
    "permissions": [
        "storage",
        "activeTab",
        "*://*.domain.com/*"
    ],
    "icons": { 
        "16": "images/icon16.png",
        "48": "images/icon48.png",
        "128": "images/icon128.png" 
    },
    "options_page": "options.html",
    "browser_action": {
        "default_icon": {                    
            "19": "images/icon48.png",          
            "38": "images/icon48.png"          
        },
        "default_popup": "popup.html"
    },
    "background": {
        "scripts": ["js/scripts.js"],
        "persistent": false
    },
    "web_accessible_resources": [
        "images/*",
        "js/*"
    ]
}
```
