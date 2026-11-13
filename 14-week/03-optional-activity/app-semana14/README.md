# Optional Activity - Semana 14

## Quality & connectivity

This application properly manages native device permissions using Capacitor plugins, ensuring that camera and location access are explicitly requested before execution. User authentication is secured via Bearer token handling, which automatically attaches authorization headers to all protected API endpoints. In the event of an expired or invalid token, the application intercepts HTTP 401 Unauthorized responses and safely redirects the user to the login screen. Furthermore, offline status detection is implemented to gracefully notify users when there is no internet connection available. The user interface consistently reflects three distinct visual states—loading, success with data, and error—to ensure a smooth and responsive user experience.
