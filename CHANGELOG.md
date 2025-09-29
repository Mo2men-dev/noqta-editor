## [1.4.0](https://github.com/Mo2men-dev/noqta-editor/compare/v1.3.0...v1.4.0) (2025-09-29)

### Features

- **extensions:** added ability to add an image from toolbar ([c425c51](https://github.com/Mo2men-dev/noqta-editor/commit/c425c51b08e37331d7ff34138d2b944b8d5d2631))

## [1.3.0](https://github.com/Mo2men-dev/noqta-editor/compare/v1.2.1...v1.3.0) (2025-09-28)

### Features

- **extentions:** added ability to align text in the document ([29bce67](https://github.com/Mo2men-dev/noqta-editor/commit/29bce67b132de9615272ed532db0fc988190c2aa))

## [1.2.1](https://github.com/Mo2men-dev/noqta-editor/compare/v1.2.0...v1.2.1) (2025-09-28)

### Bug Fixes

- **tables:** don't allow adding a table when inside of a table ([441d2f8](https://github.com/Mo2men-dev/noqta-editor/commit/441d2f83acf0b2c37c180a11cf7c65d5a6f27898))

## [1.2.0](https://github.com/Mo2men-dev/noqta-editor/compare/v1.1.0...v1.2.0) (2025-09-26)

### Features

- **tools-menu:** created a top menu that includes multible tools ([e87e5e6](https://github.com/Mo2men-dev/noqta-editor/commit/e87e5e67db524f58e628af91ecd5513cccd53b89))

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
