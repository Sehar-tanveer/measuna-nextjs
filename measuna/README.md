# Mea Suna Madeira - Exact Page Loader

This is an exact replica of the page loader used on the Mea Suna Madeira website. The loader features four corner images that animate to the center and overlap each other, with a progress line going from bottom to top and percentage counting from 0 to 100%.

## Features

- **Four Corner Images**: Images positioned at top-left, top-right, bottom-left, and bottom-right
- **Center Animation**: All four images animate to center and overlap each other
- **Progress Line**: Bottom-to-top progress line animation
- **Percentage Counter**: Real-time percentage display (0-100%)
- **Brand Overlay**: "Mea Suna Madeira" appears when images meet in center
- **Smooth Transitions**: Elegant fade-out when loading completes
- **Responsive Design**: Works perfectly on all device sizes
- **Exact Recreation**: Matches the original Mea Suna loader animation

## Files

- `index.html` - Main HTML structure with loader and sample content
- `style.css` - Complete CSS styling with animations and responsive design
- `script.js` - JavaScript functionality for loading simulation and transitions
- `README.md` - This documentation

## How It Works

1. **Page Load**: The loader appears immediately when the page loads
2. **Loading Animation**: Shows spinning rings and progress bar
3. **Resource Simulation**: Simulates loading different website resources
4. **Progress Tracking**: Displays loading percentage (0-100%)
5. **Completion**: After 3 seconds, smoothly transitions to main content
6. **Content Reveal**: Main website content fades in with smooth animation

## Loader Components

### Visual Elements
- **Brand Text**: "Mea Suna" with glowing animation
- **Subtitle**: "Madeira" in blue accent color
- **Spinner**: Three rotating rings with different speeds
- **Progress Bar**: Animated progress bar with shine effect
- **Background**: Floating geometric elements

### Animations
- **Brand Fade-in**: Text slides up with fade effect
- **Spinner Rotation**: Multiple rings rotating at different speeds
- **Progress Animation**: Smooth progress bar filling
- **Background Float**: Floating elements with rotation
- **Fade Transitions**: Smooth loader-to-content transition

## Usage

1. Open `index.html` in a web browser
2. The loader will appear immediately
3. Watch the loading animation and progress bar
4. After 3 seconds, the main content will fade in
5. The loader disappears with a smooth transition

## Customization

### Loading Duration
```javascript
// Change loading duration (default: 3000ms)
this.loadingDuration = 5000; // 5 seconds
```

### Progress Animation
```javascript
// Adjust progress increment
const increment = 1; // Slower progress
const increment = 5; // Faster progress
```

### Brand Text
```html
<h1 class="brand-text">Your Brand</h1>
<div class="brand-subtitle">Your Subtitle</div>
```

### Colors
```css
/* Change accent color */
:root {
    --accent-color: #4a9eff; /* Blue */
    --accent-color: #ff6b6b; /* Red */
    --accent-color: #28a745; /* Green */
}
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance

- **Lightweight**: Pure CSS and JavaScript, no external dependencies
- **Smooth**: 60fps animations with hardware acceleration
- **Responsive**: Optimized for all screen sizes
- **Accessible**: Proper contrast and readable text

## Integration

To integrate this loader into your existing website:

1. Copy the loader HTML structure
2. Include the CSS and JavaScript files
3. Wrap your main content in `#mainContent`
4. Initialize the loader with `new PageLoader()`

## Dependencies

None - Pure HTML, CSS, and JavaScript implementation.

## License

This is a recreation of the Mea Suna Madeira website loader for educational purposes.
