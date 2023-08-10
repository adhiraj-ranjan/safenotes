# SafeNotes: A Secure Note-Taking Web Application

SafeNotes is a streamlined and open-source web application designed to facilitate the effortless creation and management of notes. The application boasts an intuitive user interface that simplifies the processes of note creation, viewing, and editing. Notably, SafeNotes places a strong emphasis on security through robust authentication mechanisms, ensuring the confidentiality of your notes.

## Ready-to-Use Instance
For immediate access, you can utilize the instance hosted at:
[SafeNotes Instance](https://safenotes-v1.itertools.repl.co)

A version 2 of SafeNotes is also available here :
https://github.com/adhiraj-ranjan/safenotes-v2

## Key Features
- User-Friendly Interface: SafeNotes offers an uncomplicated user interface that makes note creation, viewing, and editing a seamless experience.
- Robust Authentication: The application mandates authentication, fortifying the protection of your notes and maintaining their confidentiality.
- Responsive Design: SafeNotes is built with a responsive design, enabling accessibility across various devices such as smartphones, tablets, and desktops.
- Open Source: As an open-source application, SafeNotes offers its source code freely, enabling customization and redistribution by the community.

## How to Utilize
To harness the capabilities of SafeNotes, adhere to the following steps:

1. Navigate to the SafeNotes website.
2. Select the "Sign up" button to establish an account, or "Sign in" if you already possess an account.
3. Following successful login, initiate note creation, viewing, and editing by selecting the "New Note" button located on the dashboard.
4. For note editing, simply click on the respective note to access the editing interface.
5. To delete a note, utilize the right-click functionality on the note in question.

## Installation Process
1. Clone the repository onto your local machine.
2. Employ pip to install the requisite Python packages: `pip install -r requirements.txt`
3. Generate a Firebase project and procure the Firebase credentials (service account key) in JSON format.
4. Replace the fields within `api/datamng.py` with your base64 encoded Firebase JSON credentials and Firebase realtime database URL.
5. Launch the Flask application.
6. Open your preferred web browser and navigate to http://localhost:5000 to access the web application.

## Contribution
Contributions are enthusiastically welcomed! Should you encounter issues or possess suggestions for enhancements, kindly initiate an issue or submit a pull request.

### Connect with Me
<p align="left">
  <a href="https://github.com/adhiraj-ranjan" target="_blank"><img src="https://img.shields.io/badge/Github-adhiraj--ranjan-green?style=for-the-badge&logo=github"></a>
  <a href="https://www.instagram.com/adhirajranjan_" target="_blank"><img src="https://img.shields.io/badge/IG-adhiraj_ranjan-pink?style=for-the-badge&logo=instagram"></a>
  <a href="https://t.me/adhirajranjan" target="_blank"><img src="https://img.shields.io/badge/TELEGRAM-ADHIRAJ%20RANJAN-blue?style=for-the-badge&logo=telegram"></a> 
</p>

## License 📃
[![GitHub](https://img.shields.io/github/license/adhiraj-ranjan/safenotes?style=for-the-badge)](https://github.com/adhiraj-ranjan/safenotes/blob/main/LICENSE)
