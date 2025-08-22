# [1.1.0](https://github.com/Mo2men-dev/noqta-editor/compare/v1.0.1...v1.1.0) - (22-8-2025)

### Features

- Added support for changing the font in the editor.

# [1.0.1](https://github.com/Mo2men-dev/noqta-editor/compare/v1.0.0...v1.0.1) - (22-8-2025)

### Refactorings

- Refactored the Styling system of the editor.

We refactored the styling system to use CSS variables instead of React Context and inline styles. This should improve performance by reducing the number of re-renders required when styles change.

## [1.0.0](https://github.com/Mo2men-dev/noqta-editor/compare/v0.10.0...v1.0.0) - (11-8-2025)

### Breaking Changes

- Refactored the Theming system of the editor.

The old theming system was a little too confusing and not very flexible, so we decided to refactor it to make it more intuitive and easier to use. The new theming system is based on much simpler objects that can be easily modified. This should make it easier to create custom themes and modify existing ones.
