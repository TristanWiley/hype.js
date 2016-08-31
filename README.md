# Hype.js
jQuery plugin to add cool hype animations to your site

Original hype code by Tristan Wiley, made into a JS library by the one, the only [Daniel Hsing](https://github.com/Arthelon)!!!

### Requirements
1. jQuery Core 1.4+

### Usage
```
var $handler = $(selector).hype(options)
$handler.stopTheHype()  //Stops the animation
```

**options**
- delay (Integer)
    + Delay between each animation in milliseconds *(default: 100)*
- color (Boolean)
    + Enable random background colors *(default: true)*
- rotate (Integer)
    + Rotation per animation interval in degrees *(default: 0)*
- timeout (Integer)
    + Stops the animation when timeout (in ms) is reached. Loops forever if below 0 *(default: -1)*
- slide (Boolean)
    + Slides to random location if true *(default: true)*

