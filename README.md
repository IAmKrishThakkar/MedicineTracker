# Medicine Tracker

## 📌 Overview
Medicine Tracker is a mobile application designed to help users manage their medications efficiently. The app allows users to schedule medication reminders, track their medicine intake, and maintain a history of their prescriptions.

## 🚀 Features
- 📅 **Add Medications**: Users can add medicines with details like name, dosage, schedule, and duration.
- 🔔 **Reminders**: Receive timely alerts when it's time to take a medication.
- 📊 **Track Medication History**: Keep a log of medications taken for better health monitoring.
- 🎨 **User-Friendly Interface**: Intuitive and easy-to-use design for seamless user experience.

## 🛠️ Tech Stack
- **Frontend**: React Native (Expo)
- **Backend**: Firebase (Authentication, Firestore for storage)
- **Notifications**: Expo Notifications API

## 📂 Project Structure
```
MedicineTracker/
│── src/
│   ├── components/    # Reusable UI components
│   ├── screens/       # App screens (Home, AddMedicine, History, etc.)
│   ├── services/      # API and Firebase-related functions
│   ├── config/        # Configuration files
│   ├── constants/     # App-wide constants
│   ├── assets/        # Images and other static files
│── App.js             # Main application entry point
│── package.json       # Dependencies and scripts
│── README.md          # Project documentation
```

## 📲 Installation & Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/IAmKrishThakkar/MedicineTracker.git
   cd MedicineTracker
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Start the Application**
   ```sh
   expo start
   ```
4. **Run on Emulator or Device**
   - Press `i` to open in iOS simulator (Mac required)
   - Press `a` to open in Android emulator
   - Scan the QR code using the Expo Go app on your mobile device

## 🧪 Testing
- Run unit tests (if implemented)
  ```sh
  npm test
  ```

## 🚀 Future Enhancements
- 🌐 Cloud backup for medication history
- 📅 Calendar view for better schedule visualization
- 📌 Integration with wearable health devices
- 🔑 User authentication for personalized tracking

## 🤝 Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.


## 📞 Contact
- **Author**: Krish Thakkar
- **GitHub**: [IAmKrishThakkar](https://github.com/IAmKrishThakkar)
- **Email**: [kthakkar894@gmail.com]
