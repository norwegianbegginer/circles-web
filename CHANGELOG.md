# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Logo is now clickable, redirects to the home view.
- Version displayed in the settings drawer.
- Room avatars.
- Menu popover for quick options in the upper right corner.
- Profile view styling.
- Button to close a room.
- New message FCM notifications.
- Friends list view.
- Skeleton loading for list views.
- Animations for fetched elements on Home view.

### Changed
- Settings drawer will be kept mounted to avoid expensive refetching of background thumbnails.
- Display full name for rooms with only 2 members.
- Room view aesthetics.

### Fixed
- Room list items clickable area expanded to full button instead of just text.
- Chat box drifted away from the viewport.
- Fetching accounts friends.

## [1.0.0-alpha.1] - 2021-01-18
### Added
- This CHANGELOG file to keep track of all changes.
- First alpha release ever created.
