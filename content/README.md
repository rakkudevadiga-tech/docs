# Incident Report & Resolution Management System

Enterprise-grade hospital clinical safety, adverse event reporting, and root-cause resolution management web application.

---

## 🌐 6-Page Workflow Architecture

### 📊 Page 1 — Home / Dashboard
- **Key Performance Indicators (KPIs):**
  - **Total incidents:** Complete count of logged reports across the facility.
  - **Open incidents:** Incidents actively in investigation, corrective planning, or verification.
  - **High-priority incidents:** Critical and high-severity clinical hazards requiring expedited intervention.
  - **Resolved incidents:** Closed reports with completed corrective actions and signed audit verification.
  - **Overdue actions:** Remediation items past their target completion deadline.
  - **Resolution percentage:** Live calculated metric: `(Resolved / Total) * 100`.
- **Primary Buttons:**
  - `➕ Report Incident`: Direct jump to Page 2.
  - `📊 Management Dashboard`: Direct jump to Page 5 Follow-up registry.
  - `📲 Staff QR Direct Link`: Generates staff QR poster and copyable direct submission link.

---

### 📝 Page 2 — Report Incident (Frontline Staff & Mobile QR Accessible)
Directly accessible by frontline hospital staff via QR code scan or direct web link without requiring management passwords:
- **Incident date/time:** Timestamp of occurrence or discovery.
- **Location/department:** Inpatient Ward, ICU, OR, ER, Pharmacy, Radiology, etc.
- **Incident type:** Patient Fall, Medication Error, Equipment Malfunction, etc.
- **Priority:** Critical (Sentinel Event), High, Medium, Low (Near Miss).
- **Reporter:** Name & title or option to submit 100% anonymously.
- **People involved:** Patients (MRN), clinical personnel, attendants.
- **Witnesses:** Direct observers and corroborating staff.
- **What happened:** Detailed chronological factual narrative.
- **Immediate action:** First-aid, medical containment, or device quarantine.
- **Injury/harm/damage:** Severity assessment from Near Miss to Severe Harm.
- **Management notified:** Escalation status, supervisor alerted, and timestamp.
- **Contributing factors:** Workload pressure, communication gaps, alarm fatigue, policy ambiguity.

*On submission, an auto-incremented tracking reference (e.g. `IR-2026-0005`) and tracking QR code are instantly generated.*

---

### 🔍 Page 3 — Investigation (Management & Owner)
Structured root cause analysis framework for clinical investigators:
- **Investigator:** Name, role, and department.
- **Investigation date:** Formal review date.
- **Evidence:** Device logs, CCTV footage, physical inspections, medical chart audit.
- **Findings:** Objective summary of facts determined.
- **Root cause:** 5-Whys determination and underlying systemic failure point.
- **Contributing factors:** Organizational, environmental, and human factors.

---

### 🛠️ Page 4 — Corrective Action (Management & Owner)
CAPA (Corrective and Preventive Action) action item planner:
- **Corrective action:** Immediate remedial repair to fix the existing vulnerability.
- **Preventive action:** Long-term proactive safeguard to prevent institutional recurrence.
- **Responsible person:** Assigned action owner.
- **Target completion date:** Due date for implementation.
- **Resources required:** Budget, IT configuration, simulation training, hardware.
- **Action status:** `In Progress`, `Pending`, `Completed`, or `Overdue`.
- **Progress percentage:** Interactive 0–100% slider.

---

### 📋 Page 5 — Follow-up (Management & Owner)
Executive monitoring table tracking real-time resolution telemetry:
| Incident | Owner | Due Date | Stage | Progress | Actions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **IR-2026-0001** | Nurse Manager | 10 Oct | Investigation | 35% | View / Investigate / CAPA / Owner Edit |
| **IR-2026-0002** | Safety Officer | 12 Oct | Corrective Action | 65% | View / Investigate / CAPA / Owner Edit |

- Includes live keyword search, stage filtering, priority filtering, and CSV dataset export.

---

### ✅ Page 6 — Verification & Closure (Management & Owner)
Formal audit verification and quality closure sign-off:
- **Action completed?** `Yes`, `Partial`, or `No`.
- **Effectiveness verified?** `Yes`, `Pending observation`, or `No`.
- **Recurrence occurred?** `No` or `Yes`.
- **Verification remarks:** Auditor notes, sampling audit results, and clinical observations.
- **Verified by:** Authorized Quality Director or Risk Auditor.
- **Closure date:** Date of formal sign-off.
- **Final status:** `Closed — Fully Resolved`, `Closed — Residual Risk Mitigated`, or `Reopened`.
- *Generates an official printable Incident Dossier & Resolution Certificate.*

---

## 🔐 Role-Based Access Control (2 Privileged Access Levels + Public Staff)

Per system design, exactly **2 privileged access levels** are configured alongside direct frontline staff access:

| Access Role | Privileges | Default Passcode |
| :--- | :--- | :--- |
| **👑 System Owner ("Me")** | **Master Edit Access:** Can edit **ANY** field of **ANY** incident at any time, override lifecycle stages, delete records, customize hospital departments/incident types, change role passcodes, and backup/restore database. | `owner9999` |
| **📊 Management** | Full access to view all incident details, dashboard metrics, enter investigations, assign corrective actions, monitor follow-up, and execute closure sign-offs. | `mgmt2026` |
| **📱 Frontline Staff** | **Direct Submit Access:** Direct link or QR code opens Page 2 (Report Incident) with confidential filing and tracking receipt. Internal management review pages are locked. | *No Password Required* |

*(Passcodes can be changed by the System Owner under the **Owner Settings** panel).*

---

## 📲 Staff QR Code & Direct Link

- Click **"Staff QR Poster"** in the top navigation to view or print the ready-to-hang ward notice.
- Frontline staff scanning the QR code or clicking the link are routed directly to:
  `index.html?mode=staff&page=report`
- Staff mode restricts navigation to the reporting form and status lookup to protect sensitive clinical audit discussions.

---

## 🚀 How to Run the Application

The system is 100% self-contained and runs immediately on Windows without requiring Node.js, Python, or external installations:

### Option 1: Direct Browser Launch
- Double-click [`index.html`](file:///C:/Users/User/.gemini/antigravity/scratch/incident-management-system/index.html) in Windows File Explorer to open in **Google Chrome**, **Microsoft Edge**, or **Firefox**.

### Option 2: 1-Click Windows Batch Launcher
- Double-click [`start-server.bat`](file:///C:/Users/User/.gemini/antigravity/scratch/incident-management-system/start-server.bat) to launch the local web server at `http://localhost:8080` and open your browser automatically.

### Option 3: PowerShell Command
```powershell
Start-Process "C:\Users\User\.gemini\antigravity\scratch\incident-management-system\index.html"
```

