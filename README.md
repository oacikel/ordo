# Ordo: File Management App

Ordo is a file management application designed to simplify the process of creating, organizing, and editing files. Developed using React Native with Expo, Ordo leverages modern tools and state management solutions to deliver an intuitive and functional user experience. This project was created as part of a React Native developer case study.

## Features

- **File Management**: Create, edit, and delete files with multiple input types.
- **Tab-Based Navigation**: View file details and additional data through separate tabs.
- **Search and Filter**: Easily search and filter files by status or keywords.
- **Firebase Analytics Integration**: Track user interactions and events for actionable insights.
- **State Management with Zustand**: Efficiently manage application state.
- **Theming with Styled Components**: Clean, maintainable, and customizable styles.

## Technologies Used

- **React Native with Expo**: Provides a flexible and easy-to-use framework for building mobile applications.
- **React Navigation**: Enables seamless navigation within the app.
- **Zustand**: Lightweight state management solution for storing and updating files.
- **Firebase Analytics**: Tracks user interactions and app usage patterns.
- **TypeScript**: Ensures type safety and reduces runtime errors.
- **Styled Components**: Enhances the styling experience with scoped and dynamic styles.

## Project Structure

```
Ordo
├── src
│   ├── components
│   │   ├── FileFields.tsx         # Form fields for file creation/editing
│   │   └── TabContent.tsx        # Content components for different tabs
│   ├── navigation
│   │   └── AppNavigator.tsx      # Main navigation setup
│   ├── screens
│   │   ├── HomeScreen.tsx        # Homepage with search and filter features
│   │   └── FileDetails.tsx       # File details with tabs and edit functionality
│   ├── services
│   │   └── analyticsService.ts   # Centralized Firebase Analytics logic
│   ├── state
│   │   └── fileStore.ts          # Zustand store for file management
│   ├── styles
│   │   └── theme.ts              # Theme and styled-components setup
│   ├── types
│   │   └── index.ts              # TypeScript types and enums
├── App.tsx                        # Entry point of the app
├── package.json                   # Project dependencies and scripts
└── README.md                      # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/oacikel/ordo.git
   cd ordo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   expo start
   ```

4. Scan the QR code using the Expo Go app on your device or run it in an emulator.

## Key Functionalities

### Home Screen

- Displays a list of files with search and filter capabilities.
- Filters by status: `All`, `Open`, `Closed`.
- Navigates to the details screen for viewing or editing files.

### File Details Screen

- Edit existing files or create new ones in "Edit Mode."
- Tab-based navigation:
  - **Tab A**: File fields and save functionality.
  - **Tab B** and **Tab C**: Placeholder content for extended details.
- Auto-generates file IDs for new files.

### Firebase Analytics Integration

- Centralized service for logging events (`analyticsService.ts`).

## Limitations

- Tabs B and C are placeholders and can be extended for additional features.
- Firebase Analytics integration is optimized for demonstration purposes and may need adjustments for production.

## Future Improvements

- Add support for file sharing and exporting.
- Add support for file deletion
- Integrate firestore for online data storage
- Include user authentication
- Enhance analytics with user demographics and session tracking.
- Implement persistent storage using Firebase Firestore.
- Improve tab content with detailed file insights.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Thanks to the team for providing the design inspirations and use cases.
- React Native and Expo documentation for excellent resources.

