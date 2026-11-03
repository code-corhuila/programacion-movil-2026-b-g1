# Week 12 Optional Activity — Native Camera

**Student:** Juan Jose Guzman Bohorquez  
**Project:** Attendance Control  
**Platform:** Android  
**Plugin:** `@capacitor/camera`

## Camera and permissions

The camera demo is accessed from **Sesiones de clase → Probar cámara**. When the user taps **Tomar foto**, the app checks the camera permission and requests it if needed.

- **Permission granted.** The native camera opens. After the user takes and confirms a photo, the app displays it on the camera screen.
- **Permission denied.** The app displays **Permiso de cámara denegado** and explains how to enable camera access in Android settings.

[App source](../../11-week/workshop/app/)

## Run on Android

From the repository root:

```bash
cd 11-week/workshop/app
npm ci
npm run build
npx cap sync android
npx cap open android
```

In Android Studio, select the physical Android phone and press **Run**.

## Physical device test and evidence

| Test | Expected result | Evidence |
| --- | --- | --- |
| Tap **Tomar foto** and deny the permission. | The app displays the permission-denied message. | Pending — `camera-denied.png` |
| Enable camera access, return to the app, and take a photo. | The captured photo appears on the camera screen. | Pending — `camera-success.png` |
