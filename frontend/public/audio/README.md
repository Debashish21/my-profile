# Audio Files

## How to Add Your Music

1. **Place your music file** in this folder (`/public/audio/`)
   - Supported formats: `.mp3`, `.wav`, `.ogg`
   - Recommended: `.mp3` for best browser compatibility

2. **Update the AudioController**
   - Open: `/frontend/src/components/alterego/AudioController.jsx`
   - Find line 11: `const audioSrc = null;`
   - Replace with: `const audioSrc = '/audio/your-music-file.mp3';`
   - Example: `const audioSrc = '/audio/cyberpunk-theme.mp3';`

3. **File naming tips**
   - Use lowercase
   - No spaces (use hyphens instead)
   - Example: `cyber-ambient.mp3`, `alter-ego-theme.mp3`

## Example

If you add a file named `background-music.mp3` to this folder:

```javascript
const audioSrc = '/audio/background-music.mp3';
```

## Current Status

- ✅ AudioController updated to support custom files
- ⏳ Waiting for music file to be added
- 📁 Place your file in this folder
- 🔧 Update the path in AudioController.jsx
