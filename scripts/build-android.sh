#!/bin/bash

# Remove old android build
rm -rf android

# Build android app
npx cap add android && npm run build

# AndroidManifest.xml file path
ANDROID_MANIFEST_FILE="android/app/src/main/AndroidManifest.xml"
# <intent-filter> content
NEW_INTENT_FILTER="<intent-filter>\n    <action android:name=\"android.intent.action.VIEW\" \/>\n    <category android:name=\"android.intent.category.DEFAULT\" \/>\n    <category android:name=\"android.intent.category.BROWSABLE\" \/>\n    <data android:scheme=\"@string\/custom_url_scheme\" \/>\n<\/intent-filter>"

sed -i -e "/<activity/,/<\/activity>/s/^\(\s*\)\(<\/activity>\)/\1    $NEW_INTENT_FILTER\n\1\2/" "$ANDROID_MANIFEST_FILE"


# Generate app icons
npx @capacitor/assets generate --android --assetPath resources --iconBackgroundColor \#e95428 --splashBackgroundColor \#121212

# Sync android app
npx cap sync android
