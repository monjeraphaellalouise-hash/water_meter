#!/bin/bash

echo "========================================"
echo "   AquaMeter - Mobile App Builder"
echo "========================================"
echo ""

show_menu() {
    echo "What would you like to do?"
    echo ""
    echo "1. Test in Browser (Web Version)"
    echo "2. Build for Mobile"
    echo "3. Open Android Studio"
    echo "4. Open Xcode (Mac only)"
    echo "5. Full Setup (First Time)"
    echo "6. Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice

    case $choice in
        1) web;;
        2) build;;
        3) android;;
        4) ios;;
        5) setup;;
        6) exit 0;;
        *) echo "Invalid choice!"; show_menu;;
    esac
}

web() {
    echo ""
    echo "Starting web server..."
    echo "Open http://localhost:5173 in your browser"
    echo "Press Ctrl+C to stop"
    npm run dev
}

build() {
    echo ""
    echo "Building production version..."
    npm run build
    echo ""
    echo "Build complete!"
    echo ""
    echo "Now syncing to mobile platforms..."
    npx cap sync
    echo ""
    echo "Done! Your mobile apps are updated."
    echo ""
    read -p "Press Enter to continue..."
    show_menu
}

android() {
    echo ""
    echo "Opening Android Studio..."
    npx cap open android
    show_menu
}

ios() {
    echo ""
    echo "Opening Xcode..."
    npx cap open ios
    show_menu
}

setup() {
    echo ""
    echo "=========================================="
    echo "   First Time Setup"
    echo "=========================================="
    echo ""
    
    echo "Step 1: Installing npm packages..."
    npm install
    
    echo ""
    echo "Step 2: Building the app..."
    npm run build
    
    echo ""
    echo "Step 3: Initializing Capacitor..."
    npx cap init "AquaMeter" "com.aquameter.app"
    
    echo ""
    read -p "Do you want to add Android support? (y/n): " add_android
    if [ "$add_android" = "y" ]; then
        npx cap add android
        echo "Android added!"
    fi
    
    echo ""
    read -p "Do you want to add iOS support? (Mac only, y/n): " add_ios
    if [ "$add_ios" = "y" ]; then
        npx cap add ios
        echo "iOS added!"
    fi
    
    echo ""
    echo "Setup complete!"
    echo ""
    read -p "Press Enter to continue..."
    show_menu
}

# Start the menu
show_menu
