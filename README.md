# Irri-gator 🐊🪴

Irri-gator is a cross-functional, IoT-automated plant watering system designed to scale from a single houseplant to an entire indoor garden. By combining affordable edge hardware, a centralized local orchestrator, and a cloud-backed mobile application, Irri-gator makes automated plant care accessible, observable, and intelligent.

## 🚀 System Architecture

The Irri-gator ecosystem relies on a three-tier architecture to manage data flow, scheduling, and device orchestration:

### 1. The Pot Unit (Edge Device)
Designed as a low-cost consumer product, each individual pot contains dedicated hardware to manage a single plant's immediate needs and report metrics back to the Hub.
*   **Raspberry Pi Zero W:** Handles local logic, sensor reading, and Wi-Fi communication.
*   **Water Pump & Switch:** Executes watering commands by drawing from the local reservoir.
*   **Sensors:** Monitors soil saturation levels and tracks water reservoir levels.
*   **Power Supply:** Powers the onboard logic and mechanical pump.

### 2. The Hub (Orchestrator)
The Hub acts as the local brain of the operation, interfacing with multiple individual pot units simultaneously.
*   **Orchestration:** Distributes watering schedules down to the specific pots and aggregates telemetry data.
*   **Connectivity:** Uses Bluetooth for secure initial setup and provisioning with the mobile app, and Wi-Fi to communicate with the pots and cloud.
*   **Cloud Sync:** Regularly pushes observability data to the backend database and pulls updated user configurations.

### 3. Backend & Cloud 
*   **Python Flask Application:** Handles the RESTful API endpoints for user authentication, device provisioning, and schedule updates.
*   **Cloud Storage Database:** Houses historical sensor telemetry, user account relationships, and unique plant profiles.

### 4. Mobile Application
The control center for the end user.
*   **Secure Provisioning:** Connects securely to nearby Hubs via Bluetooth using encrypted account/password verification.
*   **Observability Dashboard:** Real-time visual tracking of soil saturation, reservoir water levels, and power status.
*   **Customizable Schedules:** Set unique, automated watering intervals tailored to specific plants.
*   **Plant Profiles:** Personalize your garden by assigning names, custom descriptions, and specific plant species to keep track of individual botanical needs.

---

## 📸 Interface & Design Preview

*Place your application mockups, system designs, or physical hardware images here by replacing the placeholder paths below.*

### Mobile Frontend

<p float="left">
  <img src="https://github.com/user-attachments/assets/d102ef86-d1d1-4fec-9e66-8def203527ac" alt="Simulator Screenshot - iPhone 15 Pro - 2024-04-16 at 17 51 57" width="300" />
  <img src="https://github.com/user-attachments/assets/e0fafe29-d4b4-4905-912a-522b90fa173b" alt="Simulator Screenshot - iPhone 15 Pro - 2024-04-16 at 17 52 09" width="300" />
</p>


### IoT Context Diagram
<img width="777" height="341" alt="Screenshot 2026-09-09 at 1 58 48 PM" src="https://github.com/user-attachments/assets/3168837f-c620-42cc-8cbb-4a547d34b814" />


---

## 🛠️ Tech Stack

*   **Firmware/Edge:** Python (Raspberry Pi Zero W interaction, GPIO sensor polling)
*   **Local Orchestration:** Python / Node.js (Hub automation engine)
*   **Backend:** Python (Flask), WSGI Server
*   **Database:** MongoDB
*   **Mobile App:** React Native / JavaScript
*   **Protocols:** Bluetooth LE (Provisioning), MQTT/HTTP (Local IoT network), HTTPS (Cloud communication)

---

## 🏁 Getting Started

### Prerequisites
*   A provisioned Irri-gator Hub hardware unit.
*   At least one Irri-gator Smart Pot.
*   The Irri-gator Mobile App installed on an iOS or Android device (Note: the app does not exist on any app store).

### Initial Setup & Provisioning
1.  **Power On:** Plug in your Hub and your individual Irri-gator Pots. Ensure the pots are within Wi-Fi range of the Hub.
2.  **Open the App:** Log into your secure Irri-gator account.
3.  **Pair the Hub:** Turn on your phone's Bluetooth, select "Add New Hub", and follow the secure password pairing prompt.
4.  **Connect Pots:** The Hub will automatically scan for unassigned local pot units. Name your plant, choose its species, and assign it a watering schedule directly through the app UI.
