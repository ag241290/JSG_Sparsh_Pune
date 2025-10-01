# Testing Mobile Back Button Handling

## Test Scenarios

### 1. Basic Navigation Testing
- ? Open app ? Navigate to different pages ? Press back button
- ? Should navigate back through browser history
- ? On home page, should show exit confirmation

### 2. Registration Flow Testing
- ? Start registration ? Select category ? Press back
- ? Should return to category selection (with our scroll fix)
- ? From category selection ? Press back ? Should show exit dialog

### 3. Payment Flow Testing
- ? Fill form ? Go to payment ? Press back
- ? Should return to form (not exit app)
- ? From form ? Press back ? Should return to category selection

### 4. Exit Confirmation Testing
- ? From home page ? Press back ? Should show confirmation dialog
- ? Click "Yes" ? App should close
- ? Click "No" ? Should stay in app

## Android Testing Commands

```bash
# Build and install APK
./gradlew assembleDebug
adb install app/build/outputs/apk/debug/app-debug.apk

# Test back button behavior
adb shell input keyevent 4  # Simulates back button press

# Check logs
adb logcat | grep "WebApp"
```

## Debug JavaScript Bridge

Add this to test the bridge in browser console:

```javascript
// Test if running in Android WebView
console.log('User Agent:', navigator.userAgent);
console.log('Android Interface Available:', !!window.AndroidInterface);

// Test bridge methods (only works in Android WebView)
if (window.AndroidInterface) {
    window.AndroidInterface.showToast('Bridge is working!');
}
```

## Common Issues & Solutions

### Issue 1: Back button not working
**Solution**: Make sure JavaScript is enabled in WebView settings

### Issue 2: App crashes on back press
**Solution**: Add null checks in onBackPressed() method

### Issue 3: Exit dialog not showing
**Solution**: Ensure UI operations run on main thread using runOnUiThread()

### Issue 4: Web app not detecting Android environment
**Solution**: Check User-Agent string and AndroidInterface availability