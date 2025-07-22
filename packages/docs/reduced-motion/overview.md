# Overview

## What is it?

The reduced motion plugin is an accessibility-focused plugin that prevents animations from playing when users have enabled reduced motion in their system settings. This is crucial for users who experience motion sensitivity, vestibular disorders, or other conditions that can be triggered by animations.

## Why does it exist?

### Accessibility Compliance

Many users have motion sensitivity or vestibular disorders that can be triggered by animations. The `prefers-reduced-motion` media query is a web standard that allows users to indicate their preference for reduced motion. This plugin ensures Vue Flip animations respect this preference.

### User Experience

By respecting reduced motion preferences, your application becomes more inclusive and provides a better experience for users who:
- Experience motion sickness from animations
- Have vestibular disorders
- Use assistive technologies
- Simply prefer a calmer interface

### Legal and Ethical Considerations

Many accessibility guidelines and regulations (like WCAG) recommend respecting user motion preferences. This plugin helps ensure compliance with these standards.

## Key Features

- **Automatic Detection**: Automatically detects if the user prefers reduced motion
- **Configurable**: Allows individual elements to override the global preference
- **Accessibility**: Ensures animations respect user accessibility settings
- **TypeScript Support**: Full TypeScript support with type augmentation
- **Dynamic Response**: Responds to changes in user preferences in real-time

## Behavior When Reduced Motion is Preferred

When `prefers-reduced-motion: reduce` is active:

- **Detach animations** are prevented (elements don't animate out)
- **Attach animations** are prevented (elements don't animate in)
- Elements appear/disappear instantly
- The user experiences a static, non-animated interface
