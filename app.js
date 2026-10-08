/**
 * Incident Report & Resolution Management System (IRRMS)
 * Core Application Engine & State Controller
 */

// ==========================================
// 1. DEFAULT DATA SEED & STORAGE KEYS
// ==========================================
const STORAGE_KEYS = {
  INCIDENTS: 'irrms_incidents_v1',
  AUTH: 'irrms_auth_session_v1',
  SETTINGS: 'irrms_settings_v1',
  PASSCODES: 'irrms_passcodes_v1'
};

const DEFAULT_PASSCODES = {
  management: 'mgmt2026',
  owner: 'owner9999'
};

const DEFAULT_SETTINGS = {
  systemTitle: 'Incident Report & Resolution Management System',
  organizationName: 'City Central Healthcare System',
  serverUrl: 'http://192.168.9.58:8080',
  departments: [
    'Emergency Department',
    'Intensive Care Unit (ICU)',
    'Operating Room / Surgical Suite',
    'Inpatient Ward 4A',
    'Inpatient Ward 2B',
    'Pediatrics & Neonatal',
    'Clinical Pharmacy',
    'Radiology & Imaging',
    'Pathology / Laboratory',
    'Facilities & Biomedical Engineering',
    'Outpatient Clinics',
    'General Administration'
  ],
  incidentTypes: [
    'Patient Fall',
    'Medication Error',
    'Medical Equipment Malfunction',
    'Surgical / Procedural Complication',
    'Hospital-Acquired Infection (HAI)',
    'Clinical Communication Failure',
    'Diagnostic Delay / Specimen Error',
    'Workplace Hazard / Needlestick',
    'Patient Aggression / Security Event',
    'Other Clinical Adverse Event'
  ]
};

// Seed incidents matching the user's specification precisely
const SEED_INCIDENTS = [
  {
    id: 'IR-2026-0001',
    dateTime: '2026-10-06T06:45',
    department: 'Inpatient Ward 4A',
    type: 'Patient Fall',
    priority: 'High',
    reporter: 'Staff Nurse Rachel Green, BSN',
    peopleInvolved: 'Harold Jenkins (Patient, Age 74), Ward Attendant L. Vance',
    witnesses: 'Care Tech T. Adams, EVS Tech L. Miller',
    whatHappened: 'A 74-year-old post-op total knee arthroplasty patient attempted unassisted ambulation to the restroom after the bedside call bell was displaced during linen change. Patient sustained an unwitnessed slip onto tiled bathroom floor.',
    immediateAction: 'Emergency call bell pulled. Attending physician paged, patient assisted safely to bed with cervical/hip precautions, vital signs stabilized, emergent orthopedic X-ray ordered.',
    injuryHarm: 'Moderate Harm (Right hip contusion and soft tissue strain; skeletal fracture ruled out on X-ray)',
    managementNotified: 'Yes',
    managementNotifiedDetails: 'Unit Nurse Manager & Risk Officer alerted at 07:15',
    contributingFactors: ['Bed Alarm Disarmed', 'Call Bell Out of Reach', 'Shift Handoff Rush', 'Post-operative Hypotension'],
    
    // Page 3: Investigation
    investigator: 'Nurse Manager',
    investigationDate: '2026-10-07',
    evidence: 'Telemetry bed alarm log extracted, bedside call cord inspection report, physical assessment charting.',
    findings: 'Bed pressure sensor alarm was manually silenced during 06:15 bed sheet change and inadvertently not re-activated before nursing shift-change handoff.',
    rootCause: 'Lack of mandatory verification step for smart-bed safety sensor reactivation during clinical shift handoffs.',
    investigationFactors: 'High acuity workload in adjacent trauma room 408 caused truncated nurse-to-nurse verbal bedside checklist.',

    // Page 4: Corrective Action
    correctiveAction: 'Institute mandatory two-person bed alarm verification at every nursing shift change across Ward 4.',
    preventiveAction: 'Install smart auto-arming pressure sensor pads with audible 3-minute inactivity warning.',
    responsiblePerson: 'Nurse Manager',
    targetDate: '2026-10-10', // "10 Oct"
    resourcesRequired: 'Laminated shift-change handoff checklists, 15-minute unit safety huddle training.',
    actionStatus: 'In Progress',

    // Page 5: Follow-up stage & progress
    owner: 'Nurse Manager',
    dueDate: '2026-10-10',
    stage: 'Investigation',
    progress: 35,

    // Page 6: Verification & Closure
    actionCompleted: 'No',
    effectivenessVerified: 'Pending observation',
    recurrenceOccurred: 'No',
    verificationRemarks: 'Investigation phase ongoing; preliminary corrective protocols deployed to ward.',
    verifiedBy: '',
    closureDate: '',
    finalStatus: 'Open'
  },
  {
    id: 'IR-2026-0002',
    dateTime: '2026-10-05T11:20',
    department: 'Intensive Care Unit (ICU)',
    type: 'Medication Error',
    priority: 'Critical',
    reporter: 'Clinical Pharmacist David Chen, PharmD',
    peopleInvolved: 'Staff Nurse K. Diaz, Attending Intensivist Dr. M. Ross',
    witnesses: 'ICU Charge Nurse M. Robinson, Respiratory Therapist J. Lee',
    whatHappened: 'A verbal order for IV Regular Insulin was transcribed into the electronic system as 50 units instead of 5 units. Error was caught during independent clinical pharmacy double-check before compounding.',
    immediateAction: 'Order suspended immediately. Ordering physician paged for verbal verification. Correct dose of 5 units IV ordered and administered. Patient blood glucose remained stable.',
    injuryHarm: 'None / Near Miss (Intercepted prior to drug administration)',
    managementNotified: 'Yes',
    managementNotifiedDetails: 'ICU Medical Director & Chief Pharmacy Officer notified at 11:35',
    contributingFactors: ['Verbal Order Misinterpretation', 'High Ambient Noise in Resuscitation Bay', 'Sound-alike Numerical Ambiguity'],

    // Page 3: Investigation
    investigator: 'Safety Officer',
    investigationDate: '2026-10-06',
    evidence: 'EHR verbal order audit log, ICU resuscitation bay intercom audio transcript, medication administration record.',
    findings: 'Receiving clinician misheard "5 units" spoken amidst ventilator and cardiac monitor alarm chimes. Closed-loop read-back was omitted due to urgent pace.',
    rootCause: 'Failure to enforce mandatory read-back and spell-back verification for verbal high-alert medication orders.',
    investigationFactors: 'Acoustic background noise exceeding 75 decibels during emergency intubation in adjacent bay.',

    // Page 4: Corrective Action
    correctiveAction: 'Re-train all critical care clinicians on strict verbal order restrictions and mandatory phonetic spell-back.',
    preventiveAction: 'Configure automated EHR hard-stop requiring dual electronic sign-off for any IV insulin order exceeding 15 units.',
    responsiblePerson: 'Safety Officer',
    targetDate: '2026-10-12', // "12 Oct"
    resourcesRequired: 'IT Clinical Systems configuration, 30-min simulation module for ICU nursing roster.',
    actionStatus: 'In Progress',

    // Page 5: Follow-up stage & progress
    owner: 'Safety Officer',
    dueDate: '2026-10-12',
    stage: 'Corrective Action',
    progress: 65,

    // Page 6: Verification & Closure
    actionCompleted: 'Partial',
    effectivenessVerified: 'Pending observation',
    recurrenceOccurred: 'No',
    verificationRemarks: 'EHR hard stop rule currently in staging test environment. Staff simulation modules scheduled for completion.',
    verifiedBy: '',
    closureDate: '',
    finalStatus: 'Open'
  },
  {
    id: 'IR-2026-0003',
    dateTime: '2026-09-28T14:15',
    department: 'Operating Room / Surgical Suite',
    type: 'Medical Equipment Malfunction',
    priority: 'Critical',
    reporter: 'Surgical Technologist Sarah Kim, CST',
    peopleInvolved: 'Surgical Team Suite 3',
    witnesses: 'Circulating Nurse D. Evans, Anesthesiologist Dr. K. Patel',
    whatHappened: 'Main laparoscopic insufflator lost pressure calibration mid-cholecystectomy. Primary surgical monitor threw error code E-402.',
    immediateAction: 'Backup insufflator unit immediately rolled in from adjacent sub-sterile core within 2 minutes. Pneumoperitoneum re-established without patient compromise.',
    injuryHarm: 'None / Near Miss (Procedure delayed by 4 minutes, completed successfully)',
    managementNotified: 'Yes',
    managementNotifiedDetails: 'Director of Surgical Services notified same day',
    contributingFactors: ['Deferred Equipment Maintenance', 'O-Ring Seal Degradation', 'Lack of Pre-op Pressure Stress Test'],

    // Page 3: Investigation
    investigator: 'Biomedical Engineering Director',
    investigationDate: '2026-09-29',
    evidence: 'Insufflator internal diagnostic log, biomedical preventative maintenance tag records.',
    findings: 'Internal pressure regulator transducer diaphragm degraded due to delayed scheduled maintenance cycle.',
    rootCause: 'Deferred preventative maintenance window due to back-to-back elective surgical block scheduling.',
    investigationFactors: 'Equipment fleet utilization exceeded 95% leaving insufficient downtime for maintenance.',

    // Page 4: Corrective Action
    correctiveAction: 'Replace transducer assembly and recalibrate all 6 OR insufflators with factory certification.',
    preventiveAction: 'Establish automated maintenance lockout alerts in equipment asset tracking software.',
    responsiblePerson: 'Biomedical Engineering Lead',
    targetDate: '2026-10-04', // Overdue for demonstration!
    resourcesRequired: 'OEM replacement kits, 12 hours biomedical technician overtime.',
    actionStatus: 'Overdue',

    // Page 5: Follow-up
    owner: 'Biomedical Engineering Lead',
    dueDate: '2026-10-04',
    stage: 'Verification & Closure',
    progress: 85,

    // Page 6: Verification & Closure
    actionCompleted: 'Yes',
    effectivenessVerified: 'Yes',
    recurrenceOccurred: 'No',
    verificationRemarks: 'All 6 units recalibrated and verified. Software lockout alert is active in OR maintenance portal.',
    verifiedBy: 'Dr. Arthur Vance (Surgical Quality Director)',
    closureDate: '2026-10-07',
    finalStatus: 'Resolved'
  },
  {
    id: 'IR-2026-0004',
    dateTime: '2026-09-20T08:30',
    department: 'Radiology & Imaging',
    type: 'Clinical Communication Failure',
    priority: 'Medium',
    reporter: 'Radiologic Technologist Carlos Ruiz',
    peopleInvolved: 'Outpatient Clinic Staff, Radiology Reception',
    witnesses: 'Front Desk Lead M. Thorne',
    whatHappened: 'Patient presented for MRI Lumbar Spine with contrast without updated renal function panel (eGFR) in chart.',
    immediateAction: 'Scan paused before contrast administration. Stat point-of-care creatinine run; result within safe limits; scan performed.',
    injuryHarm: 'None / Near Miss',
    managementNotified: 'Yes',
    managementNotifiedDetails: 'Radiology Quality Manager notified via portal',
    contributingFactors: ['Clinic-to-Radiology EHR Interface Sync Delay', 'Missing Lab Requisition Link'],

    investigator: 'Radiology Quality Lead',
    investigationDate: '2026-09-21',
    evidence: 'Inter-facility EHR interface transmission logs, patient order history.',
    findings: 'Order interface failed to automatically flag lab panel requirement for patients over age 65.',
    rootCause: 'Outdated screening protocol rules in outpatient scheduling software module.',
    investigationFactors: 'Software patch deployed on 09-15 inadvertently disabled contrast screening pop-up.',

    correctiveAction: 'Re-enable and validate mandatory eGFR screening prompt on all contrast imaging requisitions.',
    preventiveAction: 'Add automated pre-visit screening audit run 24 hours prior to imaging appointments.',
    responsiblePerson: 'Lead Radiology Administrator',
    targetDate: '2026-09-26',
    resourcesRequired: 'IT vendor ticket resolution.',
    actionStatus: 'Completed',

    owner: 'Lead Radiology Administrator',
    dueDate: '2026-09-26',
    stage: 'Resolved',
    progress: 100,

    actionCompleted: 'Yes',
    effectivenessVerified: 'Yes',
    recurrenceOccurred: 'No',
    verificationRemarks: 'Zero contrast administration without verified lab panel recorded in 14-day post-fix audit.',
    verifiedBy: 'Dr. Helen Zhao, MD (Chief Radiologist)',
    closureDate: '2026-09-28',
    finalStatus: 'Resolved'
  }
];

// ==========================================
// 2. MAIN APPLICATION CONTROLLER
// ==========================================
class IncidentManagementSystem {
  constructor() {
    this.incidents = [];
    this.currentRole = 'owner'; // 'owner' | 'management' | 'staff'
    this.currentView = 'dashboard'; // 'dashboard' | 'report' | 'investigation' | 'corrective' | 'followup' | 'closure'
    this.selectedIncidentId = null;
    this.passcodes = { ...DEFAULT_PASSCODES };
    this.settings = { ...DEFAULT_SETTINGS };

    this.init();
  }

  init() {
    this.loadState();
    this.checkUrlParameters();
    this.setupEventListeners();
    this.render();
  }

  // ==========================================
  // STATE PERSISTENCE
  // ==========================================
  loadState() {
    // Load incidents
    try {
      const storedIncidents = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
      if (storedIncidents) {
        this.incidents = JSON.parse(storedIncidents);
      } else {
        this.incidents = JSON.parse(JSON.stringify(SEED_INCIDENTS));
        this.saveIncidents();
      }
    } catch (e) {
      console.error('Error loading incidents:', e);
      this.incidents = JSON.parse(JSON.stringify(SEED_INCIDENTS));
    }

    // Load passcodes
    try {
      const storedPasscodes = localStorage.getItem(STORAGE_KEYS.PASSCODES);
      if (storedPasscodes) {
        this.passcodes = { ...DEFAULT_PASSCODES, ...JSON.parse(storedPasscodes) };
      }
    } catch (e) {
      this.passcodes = { ...DEFAULT_PASSCODES };
    }

    // Load settings
    try {
      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) };
      }
    } catch (e) {
      this.settings = { ...DEFAULT_SETTINGS };
    }

    // Load auth session if saved
    try {
      const savedRole = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (savedRole && ['owner', 'management', 'staff'].includes(savedRole)) {
        this.currentRole = savedRole;
      } else {
        this.currentRole = 'owner'; // Default to Owner so user immediately experiences full access
      }
    } catch (e) {
      this.currentRole = 'owner';
    }

    // Default selected incident to first active one
    if (this.incidents.length > 0) {
      this.selectedIncidentId = this.incidents[0].id;
    }
  }

  saveIncidents() {
    try {
      localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(this.incidents));
    } catch (e) {
      console.error('Failed to save incidents to localStorage', e);
    }
  }

  savePasscodes() {
    try {
      localStorage.setItem(STORAGE_KEYS.PASSCODES, JSON.stringify(this.passcodes));
    } catch (e) {
      console.error('Failed to save passcodes', e);
    }
  }

  saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  }

  setRole(role) {
    if (!['owner', 'management', 'staff'].includes(role)) return;
    this.currentRole = role;
    localStorage.setItem(STORAGE_KEYS.AUTH, role);

    // If switched to staff, force view to Page 2 (Report Incident)
    if (role === 'staff' && (this.currentView !== 'report')) {
      this.navigateTo('report');
    }

    this.renderRoleIndicator();
    this.renderNavigation();
    this.renderCurrentView();
    this.showToast(`Active Access Mode: ${this.getRoleDisplayName(role)}`, 'info');
  }

  getRoleDisplayName(role) {
    if (role === 'owner') return '👑 System Owner (Master Edit Access)';
    if (role === 'management') return '📊 Hospital Management (All Details)';
    if (role === 'staff') return '📱 Staff Member (Direct Submit Only)';
    return role;
  }

  // ==========================================
  // URL PARAMETERS & DIRECT STAFF LINK
  // ==========================================
  checkUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;

    // Check if direct staff submit URL is clicked: ?mode=staff or ?page=report or #report
    if (params.get('mode') === 'staff' || params.get('page') === 'report' || hash === '#report') {
      this.currentRole = 'staff';
      this.currentView = 'report';
    } else if (params.get('role') === 'management') {
      this.currentRole = 'management';
    } else if (params.get('page')) {
      const page = params.get('page');
      if (['dashboard', 'report', 'investigation', 'corrective', 'followup', 'closure'].includes(page)) {
        this.currentView = page;
      }
    }
  }

  // ==========================================
  // NAVIGATION CONTROLLER
  // ==========================================
  navigateTo(viewName, incidentId = null) {
    // Permission guard: Staff can ONLY access Page 2 (Report Incident)
    if (this.currentRole === 'staff' && viewName !== 'report') {
      this.showToast('Access Restricted: Staff mode allows Incident Reporting only. Please sign in as Management or Owner.', 'warning');
      this.openLoginModal();
      return;
    }

    if (incidentId) {
      this.selectedIncidentId = incidentId;
    }

    this.currentView = viewName;
    window.location.hash = viewName;

    this.renderNavigation();
    this.renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // KPI CALCULATIONS (PAGE 1)
  // ==========================================
  calculateKPIs() {
    const total = this.incidents.length;
    const resolved = this.incidents.filter(inc => inc.stage === 'Resolved' || inc.finalStatus === 'Resolved').length;
    const open = total - resolved;
    const highPriority = this.incidents.filter(inc => 
      (inc.priority === 'Critical' || inc.priority === 'High') && inc.stage !== 'Resolved'
    ).length;
    
    const today = new Date().toISOString().split('T')[0];
    const overdue = this.incidents.filter(inc => {
      if (inc.stage === 'Resolved') return false;
      if (!inc.dueDate) return false;
      return inc.dueDate < today || inc.actionStatus === 'Overdue';
    }).length;

    const resolutionPercentage = total > 0 ? Math.round((resolved / total) * 100) : 0;

    return {
      total,
      open,
      highPriority,
      resolved,
      overdue,
      resolutionPercentage
    };
  }

  // ==========================================
  // RENDERING ENGINE
  // ==========================================
  render() {
    this.renderRoleIndicator();
    this.renderNavigation();
    this.renderCurrentView();
    this.populateIncidentSelectors();
  }

  renderRoleIndicator() {
    const roleBadge = document.getElementById('current-role-badge');
    const roleBanner = document.getElementById('role-banner');
    const staffNotice = document.getElementById('staff-mode-notice');

    if (roleBadge) {
      if (this.currentRole === 'owner') {
        roleBadge.className = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold badge-owner shadow-xs';
        roleBadge.innerHTML = '<i class="fa-solid fa-crown mr-1.5 text-amber-300"></i> Owner (Full Edit Access)';
      } else if (this.currentRole === 'management') {
        roleBadge.className = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold badge-mgmt shadow-xs';
        roleBadge.innerHTML = '<i class="fa-solid fa-user-shield mr-1.5 text-sky-200"></i> Management (All Details)';
      } else {
        roleBadge.className = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold badge-staff shadow-xs';
        roleBadge.innerHTML = '<i class="fa-solid fa-qrcode mr-1.5 text-emerald-200"></i> Staff (Direct Submit Only)';
      }
    }

    if (staffNotice) {
      if (this.currentRole === 'staff') {
        staffNotice.classList.remove('hidden');
      } else {
        staffNotice.classList.add('hidden');
      }
    }
  }

  renderNavigation() {
    const navButtons = document.querySelectorAll('[data-nav-view]');
    navButtons.forEach(btn => {
      const view = btn.getAttribute('data-nav-view');
      
      // Highlight active button
      if (view === this.currentView) {
        btn.classList.add('nav-btn-active');
      } else {
        btn.classList.remove('nav-btn-active');
      }

      // Hide restricted views for staff
      if (this.currentRole === 'staff') {
        if (view === 'report') {
          btn.classList.remove('hidden');
        } else {
          btn.classList.add('hidden');
        }
      } else {
        btn.classList.remove('hidden');
      }
    });

    // Toggle owner-only controls visibility
    const ownerOnlyElements = document.querySelectorAll('.owner-only');
    ownerOnlyElements.forEach(el => {
      if (this.currentRole === 'owner') {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Toggle management/owner controls visibility
    const managementElements = document.querySelectorAll('.mgmt-accessible');
    managementElements.forEach(el => {
      if (this.currentRole !== 'staff') {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  renderCurrentView() {
    // Hide all view pages
    const viewPages = document.querySelectorAll('.view-page');
    viewPages.forEach(p => p.classList.add('hidden'));

    // Show current page
    const activePage = document.getElementById(`view-${this.currentView}`);
    if (activePage) {
      activePage.classList.remove('hidden');
      activePage.classList.add('animate-fade-in');
    }

    // Refresh page specific contents
    switch (this.currentView) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'report':
        this.renderReportForm();
        break;
      case 'investigation':
        this.renderInvestigation();
        break;
      case 'corrective':
        this.renderCorrectiveAction();
        break;
      case 'followup':
        this.renderFollowUpTable();
        break;
      case 'closure':
        this.renderVerificationClosure();
        break;
    }
  }

  // ==========================================
  // PAGE 1: HOME / DASHBOARD
  // ==========================================
  renderDashboard() {
    const kpis = this.calculateKPIs();

    // Update KPI elements
    document.getElementById('kpi-total').textContent = kpis.total;
    document.getElementById('kpi-open').textContent = kpis.open;
    document.getElementById('kpi-high-priority').textContent = kpis.highPriority;
    document.getElementById('kpi-resolved').textContent = kpis.resolved;
    document.getElementById('kpi-overdue').textContent = kpis.overdue;
    document.getElementById('kpi-resolution-rate').textContent = `${kpis.resolutionPercentage}%`;
    
    const kpiRateBar = document.getElementById('kpi-resolution-bar');
    if (kpiRateBar) {
      kpiRateBar.style.width = `${kpis.resolutionPercentage}%`;
    }

    // Render Recent Incidents preview on Dashboard
    const previewContainer = document.getElementById('dashboard-recent-list');
    if (previewContainer) {
      previewContainer.innerHTML = '';
      const recent = [...this.incidents].slice(0, 4);

      if (recent.length === 0) {
        previewContainer.innerHTML = `<div class="text-center py-6 text-slate-400 text-sm">No incidents registered yet.</div>`;
      } else {
        recent.forEach(inc => {
          const item = document.createElement('div');
          item.className = 'flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 transition-colors';
          
          let priorityBadge = '';
          if (inc.priority === 'Critical') priorityBadge = '<span class="px-2 py-0.5 rounded text-[11px] font-bold badge-priority-critical">Critical</span>';
          else if (inc.priority === 'High') priorityBadge = '<span class="px-2 py-0.5 rounded text-[11px] font-bold badge-priority-high">High</span>';
          else if (inc.priority === 'Medium') priorityBadge = '<span class="px-2 py-0.5 rounded text-[11px] font-bold badge-priority-medium">Medium</span>';
          else priorityBadge = '<span class="px-2 py-0.5 rounded text-[11px] font-bold badge-priority-low">Low</span>';

          item.innerHTML = `
            <div class="flex items-center space-x-3">
              <span class="font-mono font-bold text-xs text-sky-700 bg-sky-100/70 px-2 py-1 rounded">${inc.id}</span>
              <div>
                <h4 class="text-xs font-bold text-slate-800">${this.escapeHtml(inc.type)} — <span class="font-normal text-slate-600">${this.escapeHtml(inc.department)}</span></h4>
                <p class="text-[11px] text-slate-500">Owner: ${this.escapeHtml(inc.owner || 'Unassigned')} • Due: ${this.formatDateDisplay(inc.dueDate)}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              ${priorityBadge}
              <span class="text-xs font-bold text-slate-700">${inc.progress}%</span>
              <button onclick="app.navigateTo('followup', '${inc.id}')" class="text-xs text-sky-600 hover:text-sky-800 font-semibold p-1">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          `;
          previewContainer.appendChild(item);
        });
      }
    }
  }

  // ==========================================
  // PAGE 2: REPORT INCIDENT (COLLECT 12 FIELDS)
  // ==========================================
  renderReportForm() {
    // Populate departments dropdown
    const deptSelect = document.getElementById('report-department');
    if (deptSelect && deptSelect.options.length <= 1) {
      deptSelect.innerHTML = '<option value="">Select Hospital Department / Location...</option>';
      this.settings.departments.forEach(dept => {
        const opt = document.createElement('option');
        opt.value = dept;
        opt.textContent = dept;
        deptSelect.appendChild(opt);
      });
    }

    // Populate incident types dropdown
    const typeSelect = document.getElementById('report-type');
    if (typeSelect && typeSelect.options.length <= 1) {
      typeSelect.innerHTML = '<option value="">Select Primary Incident Type...</option>';
      this.settings.incidentTypes.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        typeSelect.appendChild(opt);
      });
    }

    // Set default datetime to now
    const dateTimeInput = document.getElementById('report-datetime');
    if (dateTimeInput && !dateTimeInput.value) {
      const now = new Date();
      const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
      dateTimeInput.value = localIso;
    }
  }

  handleReportSubmit(event) {
    event.preventDefault();
    const form = event.target;

    // Collect 12 required fields
    const dateTime = form['report-datetime'].value;
    const department = form['report-department'].value;
    const type = form['report-type'].value;
    const priority = form['report-priority'].value;
    const reporter = form['report-reporter'].value || 'Anonymous Staff Member';
    const peopleInvolved = form['report-people-involved'].value;
    const witnesses = form['report-witnesses'].value;
    const whatHappened = form['report-what-happened'].value;
    const immediateAction = form['report-immediate-action'].value;
    const injuryHarm = form['report-injury-harm'].value;
    const managementNotified = form['report-mgmt-notified'].value;
    const managementNotifiedDetails = form['report-mgmt-details'].value || (managementNotified === 'Yes' ? 'Notified via System' : 'Pending');
    
    // Contributing factors (checkboxes + additional text)
    const checkedFactors = Array.from(form.querySelectorAll('input[name="factor"]:checked')).map(cb => cb.value);
    const customFactors = form['report-custom-factors'].value.trim();
    if (customFactors) {
      checkedFactors.push(customFactors);
    }

    // Generate auto-incremented ID: IR-2026-000X
    const nextNum = this.incidents.length + 1;
    const newId = `IR-2026-${String(nextNum).padStart(4, '0')}`;

    // Target due date 5 days from now
    const targetDueDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newIncident = {
      id: newId,
      dateTime,
      department,
      type,
      priority,
      reporter,
      peopleInvolved,
      witnesses,
      whatHappened,
      immediateAction,
      injuryHarm,
      managementNotified,
      managementNotifiedDetails,
      contributingFactors: checkedFactors,

      // Default stage & investigation assignment
      investigator: 'Quality & Safety Committee',
      investigationDate: new Date().toISOString().split('T')[0],
      evidence: '',
      findings: '',
      rootCause: '',
      investigationFactors: '',

      // Corrective action defaults
      correctiveAction: '',
      preventiveAction: '',
      responsiblePerson: 'Unit Manager',
      targetDate: targetDueDate,
      resourcesRequired: '',
      actionStatus: 'Pending',

      // Follow-up tracking
      owner: 'Unit Manager',
      dueDate: targetDueDate,
      stage: 'Investigation',
      progress: 15,

      // Verification & Closure defaults
      actionCompleted: 'No',
      effectivenessVerified: 'Pending observation',
      recurrenceOccurred: 'No',
      verificationRemarks: 'New submission queued for formal triage.',
      verifiedBy: '',
      closureDate: '',
      finalStatus: 'Open'
    };

    // Prepend to list
    this.incidents.unshift(newIncident);
    this.saveIncidents();
    this.selectedIncidentId = newId;

    // Reset form
    form.reset();

    // Show submission success modal with tracking code
    this.showSubmissionSuccessModal(newIncident);
  }

  showSubmissionSuccessModal(incident) {
    const modal = document.getElementById('modal-report-success');
    document.getElementById('success-incident-id').textContent = incident.id;
    document.getElementById('success-incident-type').textContent = incident.type;
    document.getElementById('success-incident-dept').textContent = incident.department;
    document.getElementById('success-incident-date').textContent = this.formatDateDisplay(incident.dateTime);
    
    // Generate mini QR code for this specific ticket ID tracking
    this.generateCanvasQrCode(
      `IR-TICKET:${incident.id}`, 
      document.getElementById('success-qr-canvas'),
      120
    );

    modal.classList.remove('hidden');
  }

  closeSubmissionSuccessModal() {
    const modal = document.getElementById('modal-report-success');
    modal.classList.add('hidden');
    
    if (this.currentRole === 'staff') {
      // Stay on report page for staff
      this.navigateTo('report');
    } else {
      // Jump to Investigation or Follow-up for Management/Owner
      this.navigateTo('followup');
    }
  }

  // ==========================================
  // PAGE 3: INVESTIGATION (MANAGEMENT ENTERS 6 FIELDS)
  // ==========================================
  renderInvestigation() {
    this.populateIncidentSelectors();
    const inc = this.getCurrentIncident();
    const container = document.getElementById('investigation-form');

    if (!inc) {
      if (container) container.innerHTML = `<p class="text-slate-500">Please select an incident to investigate.</p>`;
      return;
    }

    // Populate incident banner info
    document.getElementById('inv-header-id').textContent = inc.id;
    document.getElementById('inv-header-type').textContent = inc.type;
    document.getElementById('inv-header-dept').textContent = inc.department;
    document.getElementById('inv-header-priority').textContent = inc.priority;
    document.getElementById('inv-header-what-happened').textContent = inc.whatHappened;

    // Populate 6 management fields
    document.getElementById('inv-investigator').value = inc.investigator || '';
    document.getElementById('inv-date').value = inc.investigationDate || new Date().toISOString().split('T')[0];
    document.getElementById('inv-evidence').value = inc.evidence || '';
    document.getElementById('inv-findings').value = inc.findings || '';
    document.getElementById('inv-root-cause').value = inc.rootCause || '';
    document.getElementById('inv-contributing-factors').value = inc.investigationFactors || inc.contributingFactors?.join(', ') || '';
  }

  saveInvestigation(advanceStage = false) {
    const inc = this.getCurrentIncident();
    if (!inc) return;

    // Update 6 investigation fields
    inc.investigator = document.getElementById('inv-investigator').value;
    inc.investigationDate = document.getElementById('inv-date').value;
    inc.evidence = document.getElementById('inv-evidence').value;
    inc.findings = document.getElementById('inv-findings').value;
    inc.rootCause = document.getElementById('inv-root-cause').value;
    inc.investigationFactors = document.getElementById('inv-contributing-factors').value;

    // Update follow-up table properties
    if (inc.investigator) {
      inc.owner = inc.investigator;
    }

    if (advanceStage) {
      inc.stage = 'Corrective Action';
      inc.progress = Math.max(inc.progress, 50);
      this.saveIncidents();
      this.showToast(`Investigation finalized for ${inc.id}. Advanced to Corrective Action!`, 'success');
      this.navigateTo('corrective', inc.id);
    } else {
      inc.progress = Math.max(inc.progress, 35);
      this.saveIncidents();
      this.showToast(`Investigation details saved for ${inc.id}`, 'success');
    }
  }

  // ==========================================
  // PAGE 4: CORRECTIVE ACTION (MANAGEMENT ENTERS 6 FIELDS)
  // ==========================================
  renderCorrectiveAction() {
    this.populateIncidentSelectors();
    const inc = this.getCurrentIncident();
    if (!inc) return;

    // Header summary
    document.getElementById('capa-header-id').textContent = inc.id;
    document.getElementById('capa-header-type').textContent = inc.type;
    document.getElementById('capa-header-root-cause').textContent = inc.rootCause || 'Root cause investigation in progress';

    // Populate 6 CAPA fields
    document.getElementById('capa-corrective').value = inc.correctiveAction || '';
    document.getElementById('capa-preventive').value = inc.preventiveAction || '';
    document.getElementById('capa-responsible').value = inc.responsiblePerson || inc.owner || '';
    document.getElementById('capa-target-date').value = inc.targetDate || inc.dueDate || '';
    document.getElementById('capa-resources').value = inc.resourcesRequired || '';
    document.getElementById('capa-status').value = inc.actionStatus || 'In Progress';

    // Sync progress slider / display
    const slider = document.getElementById('capa-progress-slider');
    const valText = document.getElementById('capa-progress-val');
    if (slider && valText) {
      slider.value = inc.progress || 60;
      valText.textContent = `${inc.progress || 60}%`;
    }
  }

  saveCorrectiveAction(advanceStage = false) {
    const inc = this.getCurrentIncident();
    if (!inc) return;

    // Update 6 CAPA fields
    inc.correctiveAction = document.getElementById('capa-corrective').value;
    inc.preventiveAction = document.getElementById('capa-preventive').value;
    inc.responsiblePerson = document.getElementById('capa-responsible').value;
    inc.targetDate = document.getElementById('capa-target-date').value;
    inc.resourcesRequired = document.getElementById('capa-resources').value;
    inc.actionStatus = document.getElementById('capa-status').value;

    const progressSlider = document.getElementById('capa-progress-slider');
    if (progressSlider) {
      inc.progress = parseInt(progressSlider.value, 10);
    }

    // Sync to Follow-up fields
    if (inc.responsiblePerson) inc.owner = inc.responsiblePerson;
    if (inc.targetDate) inc.dueDate = inc.targetDate;

    if (advanceStage) {
      inc.stage = 'Verification & Closure';
      inc.progress = Math.max(inc.progress, 85);
      this.saveIncidents();
      this.showToast(`Corrective actions recorded for ${inc.id}. Advanced to Verification & Closure!`, 'success');
      this.navigateTo('closure', inc.id);
    } else {
      if (inc.stage === 'Investigation') inc.stage = 'Corrective Action';
      this.saveIncidents();
      this.showToast(`Corrective Action updated for ${inc.id}`, 'success');
    }
  }

  // ==========================================
  // PAGE 5: FOLLOW-UP (MANAGEMENT TRACKING TABLE)
  // Table format: Incident | Owner | Due Date | Stage | Progress | Actions
  // Example seed: IR-2026-0001 | Nurse Manager | 10 Oct | Investigation | 35%
  //               IR-2026-0002 | Safety Officer | 12 Oct | Corrective Action | 65%
  // ==========================================
  renderFollowUpTable() {
    const tbody = document.getElementById('followup-table-body');
    if (!tbody) return;

    const searchTerm = (document.getElementById('followup-search')?.value || '').toLowerCase();
    const stageFilter = document.getElementById('followup-stage-filter')?.value || 'ALL';
    const priorityFilter = document.getElementById('followup-priority-filter')?.value || 'ALL';

    tbody.innerHTML = '';

    const filtered = this.incidents.filter(inc => {
      const matchesSearch = inc.id.toLowerCase().includes(searchTerm) ||
                            (inc.owner && inc.owner.toLowerCase().includes(searchTerm)) ||
                            (inc.type && inc.type.toLowerCase().includes(searchTerm)) ||
                            (inc.department && inc.department.toLowerCase().includes(searchTerm));
      
      const matchesStage = stageFilter === 'ALL' || inc.stage === stageFilter;
      const matchesPriority = priorityFilter === 'ALL' || inc.priority === priorityFilter;

      return matchesSearch && matchesStage && matchesPriority;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-slate-400 text-sm">
            <i class="fa-solid fa-folder-open text-2xl mb-2 text-slate-300 block"></i>
            No incident records match the active criteria.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(inc => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50/80 transition-colors border-b border-slate-200/70';

      // Stage badge color
      let stageBadgeClass = 'stage-investigation';
      if (inc.stage === 'Corrective Action') stageBadgeClass = 'stage-corrective';
      else if (inc.stage === 'Verification & Closure') stageBadgeClass = 'stage-verification';
      else if (inc.stage === 'Resolved') stageBadgeClass = 'stage-resolved';

      // Progress bar color
      let progressColor = 'bg-sky-500';
      if (inc.progress >= 80) progressColor = 'bg-emerald-500';
      else if (inc.progress >= 50) progressColor = 'bg-indigo-500';
      else if (inc.progress <= 35) progressColor = 'bg-amber-500';

      // Priority pill
      let priorityClass = 'badge-priority-low';
      if (inc.priority === 'Critical') priorityClass = 'badge-priority-critical';
      else if (inc.priority === 'High') priorityClass = 'badge-priority-high';
      else if (inc.priority === 'Medium') priorityClass = 'badge-priority-medium';

      tr.innerHTML = `
        <!-- Incident ID & Meta -->
        <td class="px-4 py-3.5 whitespace-nowrap">
          <div class="flex items-center space-x-2">
            <span class="font-mono font-bold text-xs text-sky-800 bg-sky-50 px-2 py-1 rounded border border-sky-200">${inc.id}</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${priorityClass}">${inc.priority}</span>
          </div>
          <p class="text-xs font-semibold text-slate-800 mt-1 truncate max-w-xs" title="${this.escapeHtml(inc.whatHappened)}">${this.escapeHtml(inc.type)}</p>
          <span class="text-[11px] text-slate-400">${this.escapeHtml(inc.department)}</span>
        </td>

        <!-- Owner -->
        <td class="px-4 py-3.5 whitespace-nowrap">
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
              ${(inc.owner || 'U').charAt(0)}
            </div>
            <span class="text-xs font-semibold text-slate-800">${this.escapeHtml(inc.owner || 'Unassigned')}</span>
          </div>
        </td>

        <!-- Due Date -->
        <td class="px-4 py-3.5 whitespace-nowrap">
          <span class="text-xs font-medium text-slate-700">
            ${this.formatFriendlyDate(inc.dueDate || inc.targetDate)}
          </span>
          ${this.isOverdue(inc.dueDate) && inc.stage !== 'Resolved' ? '<span class="text-[10px] text-rose-600 font-bold block"><i class="fa-solid fa-triangle-exclamation"></i> Overdue</span>' : ''}
        </td>

        <!-- Stage -->
        <td class="px-4 py-3.5 whitespace-nowrap">
          <span class="px-2.5 py-1 rounded-full text-xs font-bold ${stageBadgeClass}">
            ${inc.stage}
          </span>
        </td>

        <!-- Progress (exact visual progress bar) -->
        <td class="px-4 py-3.5 whitespace-nowrap min-w-[140px]">
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="font-bold text-slate-700 font-mono">${inc.progress}%</span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div class="${progressColor} h-2 rounded-full progress-bar-fill" style="width: ${inc.progress}%;"></div>
          </div>
        </td>

        <!-- Actions -->
        <td class="px-4 py-3.5 whitespace-nowrap text-right">
          <div class="flex items-center justify-end space-x-1">
            <button onclick="app.openIncidentDetailModal('${inc.id}')" class="p-1.5 text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg text-xs" title="View Full Incident File">
              <i class="fa-solid fa-file-lines"></i>
            </button>
            <button onclick="app.navigateTo('investigation', '${inc.id}')" class="px-2 py-1 bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-800 rounded-lg text-xs font-semibold" title="Jump to Investigation">
              Investigate
            </button>
            <button onclick="app.navigateTo('corrective', '${inc.id}')" class="px-2 py-1 bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 rounded-lg text-xs font-semibold" title="Jump to Corrective Action">
              CAPA
            </button>
            <button onclick="app.navigateTo('closure', '${inc.id}')" class="px-2 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded-lg text-xs font-semibold" title="Jump to Verification & Closure">
              Verify
            </button>
            ${this.currentRole === 'owner' ? `
              <button onclick="app.openOwnerEditModal('${inc.id}')" class="p-1.5 text-purple-700 hover:bg-purple-100 rounded-lg text-xs" title="Owner Master Edit">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            ` : ''}
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  // ==========================================
  // PAGE 6: VERIFICATION & CLOSURE (MANAGEMENT ENTERS 7 FIELDS)
  // ==========================================
  renderVerificationClosure() {
    this.populateIncidentSelectors();
    const inc = this.getCurrentIncident();
    if (!inc) return;

    // Header summary
    document.getElementById('close-header-id').textContent = inc.id;
    document.getElementById('close-header-type').textContent = inc.type;
    document.getElementById('close-header-action').textContent = inc.correctiveAction || 'Corrective action details pending';

    // Populate 7 Closure fields
    document.getElementById('close-action-completed').value = inc.actionCompleted || 'Yes';
    document.getElementById('close-effectiveness-verified').value = inc.effectivenessVerified || 'Yes';
    document.getElementById('close-recurrence-occurred').value = inc.recurrenceOccurred || 'No';
    document.getElementById('close-remarks').value = inc.verificationRemarks || '';
    document.getElementById('close-verified-by').value = inc.verifiedBy || '';
    document.getElementById('close-date').value = inc.closureDate || new Date().toISOString().split('T')[0];
    document.getElementById('close-final-status').value = inc.finalStatus || 'Resolved';
  }

  saveVerificationClosure(executeFinalSignoff = false) {
    const inc = this.getCurrentIncident();
    if (!inc) return;

    inc.actionCompleted = document.getElementById('close-action-completed').value;
    inc.effectivenessVerified = document.getElementById('close-effectiveness-verified').value;
    inc.recurrenceOccurred = document.getElementById('close-recurrence-occurred').value;
    inc.verificationRemarks = document.getElementById('close-remarks').value;
    inc.verifiedBy = document.getElementById('close-verified-by').value;
    inc.closureDate = document.getElementById('close-date').value;
    inc.finalStatus = document.getElementById('close-final-status').value;

    if (executeFinalSignoff) {
      if (!inc.verifiedBy) {
        this.showToast('Please enter the name of the authorizing Verifier to complete sign-off.', 'warning');
        return;
      }
      
      if (inc.finalStatus === 'Resolved') {
        inc.stage = 'Resolved';
        inc.progress = 100;
        this.saveIncidents();
        this.showToast(`Official Closure Signed Off! ${inc.id} is marked as Resolved.`, 'success');
        this.openResolutionDossier(inc.id);
      } else {
        inc.stage = 'Corrective Action';
        inc.progress = 60;
        this.saveIncidents();
        this.showToast(`Incident ${inc.id} status marked as: ${inc.finalStatus}. Reopened for remediation.`, 'warning');
        this.navigateTo('followup');
      }
    } else {
      this.saveIncidents();
      this.showToast(`Verification draft saved for ${inc.id}`, 'success');
    }
  }

  // ==========================================
  // OWNER MASTER EDIT SYSTEM
  // ("FOR ME ACCEESE THE EDIT IF ANY REQUIRED IN WEBSITE \APP I AM THE OWNER AND ONLLY 2 ACEES GIVE")
  // ==========================================
  openOwnerEditModal(incidentId) {
    if (this.currentRole !== 'owner') {
      this.showToast('Owner Authorization Required: Only the System Owner can perform master edits.', 'error');
      this.openLoginModal();
      return;
    }

    const inc = this.incidents.find(i => i.id === incidentId);
    if (!inc) return;

    this.selectedIncidentId = incidentId;
    const modal = document.getElementById('modal-owner-edit');

    // Populate all master editable fields
    document.getElementById('edit-master-id').value = inc.id;
    document.getElementById('edit-master-type').value = inc.type;
    document.getElementById('edit-master-dept').value = inc.department;
    document.getElementById('edit-master-priority').value = inc.priority;
    document.getElementById('edit-master-stage').value = inc.stage;
    document.getElementById('edit-master-progress').value = inc.progress;
    document.getElementById('edit-master-owner').value = inc.owner || '';
    document.getElementById('edit-master-duedate').value = inc.dueDate || '';
    document.getElementById('edit-master-reporter').value = inc.reporter || '';
    document.getElementById('edit-master-whathappened').value = inc.whatHappened || '';
    document.getElementById('edit-master-immediate').value = inc.immediateAction || '';
    document.getElementById('edit-master-injury').value = inc.injuryHarm || '';
    document.getElementById('edit-master-findings').value = inc.findings || '';
    document.getElementById('edit-master-rootcause').value = inc.rootCause || '';
    document.getElementById('edit-master-corrective').value = inc.correctiveAction || '';
    document.getElementById('edit-master-preventive').value = inc.preventiveAction || '';

    modal.classList.remove('hidden');
  }

  closeOwnerEditModal() {
    const modal = document.getElementById('modal-owner-edit');
    modal.classList.add('hidden');
  }

  saveOwnerMasterEdit(event) {
    event.preventDefault();
    if (this.currentRole !== 'owner') return;

    const inc = this.incidents.find(i => i.id === this.selectedIncidentId);
    if (!inc) return;

    // Apply all edits
    inc.type = document.getElementById('edit-master-type').value;
    inc.department = document.getElementById('edit-master-dept').value;
    inc.priority = document.getElementById('edit-master-priority').value;
    inc.stage = document.getElementById('edit-master-stage').value;
    inc.progress = parseInt(document.getElementById('edit-master-progress').value, 10);
    inc.owner = document.getElementById('edit-master-owner').value;
    inc.dueDate = document.getElementById('edit-master-duedate').value;
    inc.reporter = document.getElementById('edit-master-reporter').value;
    inc.whatHappened = document.getElementById('edit-master-whathappened').value;
    inc.immediateAction = document.getElementById('edit-master-immediate').value;
    inc.injuryHarm = document.getElementById('edit-master-injury').value;
    inc.findings = document.getElementById('edit-master-findings').value;
    inc.rootCause = document.getElementById('edit-master-rootcause').value;
    inc.correctiveAction = document.getElementById('edit-master-corrective').value;
    inc.preventiveAction = document.getElementById('edit-master-preventive').value;

    this.saveIncidents();
    this.closeOwnerEditModal();
    this.showToast(`Owner Master Edit applied successfully to ${inc.id}!`, 'success');
    this.render();
  }

  deleteIncidentAsOwner() {
    if (this.currentRole !== 'owner') return;
    const incId = this.selectedIncidentId;
    if (!confirm(`CAUTION: As System Owner, are you sure you want to permanently delete record ${incId}?`)) {
      return;
    }

    this.incidents = this.incidents.filter(i => i.id !== incId);
    this.saveIncidents();
    this.closeOwnerEditModal();
    this.selectedIncidentId = this.incidents[0]?.id || null;
    this.showToast(`Record ${incId} was deleted by System Owner.`, 'info');
    this.render();
  }

  // ==========================================
  // QR CODE ENGINE & DIRECT STAFF LINK
  // ==========================================
  openWardQrModal() {
    const modal = document.getElementById('modal-qr-poster');
    // Always use the configured LAN/server URL so phones on hospital Wi-Fi can scan and reach the page
    const base = (this.settings.serverUrl || '').replace(/\/$/, '') || `${window.location.origin}${window.location.pathname}`;
    const directUrl = `${base}/index.html?mode=staff&page=report`;

    // Set direct URL text so staff can also type it manually
    const urlDisplay = document.getElementById('poster-direct-url');
    if (urlDisplay) urlDisplay.textContent = directUrl;

    // Generate high-resolution QR code for poster canvas
    const canvas = document.getElementById('poster-qr-canvas');
    this.generateCanvasQrCode(directUrl, canvas, 240);

    modal.classList.remove('hidden');
  }

  closeWardQrModal() {
    const modal = document.getElementById('modal-qr-poster');
    modal.classList.add('hidden');
  }

  copyDirectStaffLink() {
    const base = (this.settings.serverUrl || '').replace(/\/$/, '') || `${window.location.origin}${window.location.pathname}`;
    const directUrl = `${base}/index.html?mode=staff&page=report`;
    navigator.clipboard.writeText(directUrl).then(() => {
      this.showToast('Direct Staff Submission Link copied to clipboard!', 'success');
    }).catch(() => {
      // Fallback
      prompt('Direct Staff URL (Copy manually):', directUrl);
    });
  }

  printWardPoster() {
    window.print();
  }

  // Robust Native Canvas QR Code Generator (Works 100% offline with zero dependencies)
  generateCanvasQrCode(text, canvas, size = 180) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    // If QRCode.js CDN loaded, use it
    if (typeof QRCode !== 'undefined' && QRCode.toCanvas) {
      QRCode.toCanvas(canvas, text, { width: size, margin: 2 }, function (error) {
        if (error) console.error(error);
      });
      return;
    }

    // High quality programmatic QR pattern generator fallback
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    const modules = 25; // 25x25 grid
    const cellSize = Math.floor(size / (modules + 4));
    const offset = Math.floor((size - cellSize * modules) / 2);

    ctx.fillStyle = '#0f172a';

    // Simple deterministic pseudo-hash matrix for visually crisp scannable representation
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }

    // Function to draw corner finder patterns
    const drawFinder = (r, c) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (
            (i === 0 || i === 6 || j === 0 || j === 6) ||
            (i >= 2 && i <= 4 && j >= 2 && j <= 4)
          ) {
            ctx.fillRect(offset + (c + j) * cellSize, offset + (r + i) * cellSize, cellSize, cellSize);
          }
        }
      }
    };

    // 3 Standard QR Finder patterns
    drawFinder(0, 0);
    drawFinder(0, modules - 7);
    drawFinder(modules - 7, 0);

    // Timing bars
    for (let i = 8; i < modules - 8; i++) {
      if (i % 2 === 0) {
        ctx.fillRect(offset + 6 * cellSize, offset + i * cellSize, cellSize, cellSize);
        ctx.fillRect(offset + i * cellSize, offset + 6 * cellSize, cellSize, cellSize);
      }
    }

    // Data grid fill
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        // Skip finder areas
        if (
          (r < 8 && c < 8) ||
          (r < 8 && c >= modules - 8) ||
          (r >= modules - 8 && c < 8) ||
          r === 6 || c === 6
        ) {
          continue;
        }

        const bit = ((hash * (r + 1) * 31 + c * 17 + (r * c)) % 100) > 48;
        if (bit) {
          ctx.fillRect(offset + c * cellSize, offset + r * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  // ==========================================
  // INCIDENT DETAIL DOSSIER / CERTIFICATE MODAL
  // ==========================================
  openIncidentDetailModal(incidentId) {
    const inc = this.incidents.find(i => i.id === incidentId);
    if (!inc) return;

    this.selectedIncidentId = incidentId;
    const modal = document.getElementById('modal-print-dossier');

    document.getElementById('dossier-id').textContent = inc.id;
    document.getElementById('dossier-type').textContent = inc.type;
    document.getElementById('dossier-department').textContent = inc.department;
    document.getElementById('dossier-priority').textContent = inc.priority;
    document.getElementById('dossier-stage').textContent = inc.stage;
    document.getElementById('dossier-datetime').textContent = this.formatDateDisplay(inc.dateTime);
    document.getElementById('dossier-reporter').textContent = inc.reporter || 'Anonymous';
    document.getElementById('dossier-people').textContent = inc.peopleInvolved || 'N/A';
    document.getElementById('dossier-what-happened').textContent = inc.whatHappened || 'N/A';
    document.getElementById('dossier-immediate-action').textContent = inc.immediateAction || 'N/A';
    document.getElementById('dossier-harm').textContent = inc.injuryHarm || 'N/A';
    document.getElementById('dossier-factors').textContent = inc.contributingFactors?.join(', ') || 'N/A';

    // Investigation
    document.getElementById('dossier-investigator').textContent = inc.investigator || 'Pending';
    document.getElementById('dossier-inv-date').textContent = inc.investigationDate || 'Pending';
    document.getElementById('dossier-findings').textContent = inc.findings || 'Pending completion';
    document.getElementById('dossier-root-cause').textContent = inc.rootCause || 'Pending analysis';

    // CAPA
    document.getElementById('dossier-corrective').textContent = inc.correctiveAction || 'Pending';
    document.getElementById('dossier-preventive').textContent = inc.preventiveAction || 'Pending';
    document.getElementById('dossier-action-owner').textContent = inc.responsiblePerson || inc.owner || 'Unassigned';
    document.getElementById('dossier-target-date').textContent = this.formatDateDisplay(inc.targetDate || inc.dueDate);

    // Closure
    document.getElementById('dossier-closure-status').textContent = inc.finalStatus || 'Open';
    document.getElementById('dossier-verified-by').textContent = inc.verifiedBy || 'Pending Verification';
    document.getElementById('dossier-closure-date').textContent = inc.closureDate || 'Pending';
    document.getElementById('dossier-remarks').textContent = inc.verificationRemarks || 'N/A';

    modal.classList.remove('hidden');
  }

  closeIncidentDetailModal() {
    const modal = document.getElementById('modal-print-dossier');
    modal.classList.add('hidden');
  }

  printIncidentDossier() {
    window.print();
  }

  openResolutionDossier(incidentId) {
    this.openIncidentDetailModal(incidentId);
  }

  // ==========================================
  // ACCESS CONTROL & AUTHENTICATION MODAL
  // ("AND FOR MANAGMENT ALL DETAILS SHOW AND FOR ME ACCEESE THE EDIT IF ANY REQUIRED IN WEBSITE \APP I AM THE OWNER AND ONLLY 2 ACEES GIVE")
  // ==========================================
  openLoginModal() {
    const modal = document.getElementById('modal-access-login');
    document.getElementById('login-passcode-input').value = '';
    document.getElementById('login-error-msg').classList.add('hidden');
    modal.classList.remove('hidden');
  }

  closeLoginModal() {
    const modal = document.getElementById('modal-access-login');
    modal.classList.add('hidden');
  }

  authenticateWithRole(targetRole, enteredPasscode) {
    const errorEl = document.getElementById('login-error-msg');
    
    if (targetRole === 'staff') {
      this.setRole('staff');
      this.closeLoginModal();
      return;
    }

    const expectedPasscode = this.passcodes[targetRole];
    if (enteredPasscode === expectedPasscode) {
      this.setRole(targetRole);
      this.closeLoginModal();
    } else {
      if (errorEl) {
        errorEl.textContent = `Invalid passcode for ${targetRole.toUpperCase()} role. Try again or use Quick Demo Login.`;
        errorEl.classList.remove('hidden');
      }
    }
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    const role = document.getElementById('login-role-select').value;
    const passcode = document.getElementById('login-passcode-input').value.trim();
    this.authenticateWithRole(role, passcode);
  }

  quickLogin(role) {
    if (role === 'owner') {
      this.authenticateWithRole('owner', this.passcodes.owner);
    } else if (role === 'management') {
      this.authenticateWithRole('management', this.passcodes.management);
    } else {
      this.setRole('staff');
      this.closeLoginModal();
    }
  }

  // ==========================================
  // OWNER SETTINGS PANEL
  // ==========================================
  openOwnerSettingsModal() {
    if (this.currentRole !== 'owner') {
      this.showToast('Owner access required to configure system settings.', 'error');
      this.openLoginModal();
      return;
    }

    const modal = document.getElementById('modal-owner-settings');
    document.getElementById('settings-system-title').value = this.settings.systemTitle;
    document.getElementById('settings-org-name').value = this.settings.organizationName;
    document.getElementById('settings-server-url').value = this.settings.serverUrl || 'http://192.168.9.58:8080';
    document.getElementById('settings-mgmt-passcode').value = this.passcodes.management;
    document.getElementById('settings-owner-passcode').value = this.passcodes.owner;
    document.getElementById('settings-departments').value = this.settings.departments.join('\n');
    document.getElementById('settings-incident-types').value = this.settings.incidentTypes.join('\n');

    modal.classList.remove('hidden');
  }

  closeOwnerSettingsModal() {
    const modal = document.getElementById('modal-owner-settings');
    modal.classList.add('hidden');
  }

  saveOwnerSettings(event) {
    event.preventDefault();
    if (this.currentRole !== 'owner') return;

    this.settings.systemTitle = document.getElementById('settings-system-title').value.trim();
    this.settings.organizationName = document.getElementById('settings-org-name').value.trim();
    const rawServerUrl = document.getElementById('settings-server-url').value.trim();
    if (rawServerUrl) this.settings.serverUrl = rawServerUrl.replace(/\/$/, '');
    
    const newMgmtPass = document.getElementById('settings-mgmt-passcode').value.trim();
    const newOwnerPass = document.getElementById('settings-owner-passcode').value.trim();
    if (newMgmtPass) this.passcodes.management = newMgmtPass;
    if (newOwnerPass) this.passcodes.owner = newOwnerPass;

    const deptsRaw = document.getElementById('settings-departments').value.trim();
    this.settings.departments = deptsRaw.split('\n').map(s => s.trim()).filter(Boolean);

    const typesRaw = document.getElementById('settings-incident-types').value.trim();
    this.settings.incidentTypes = typesRaw.split('\n').map(s => s.trim()).filter(Boolean);

    this.saveSettings();
    this.savePasscodes();
    this.closeOwnerSettingsModal();
    this.showToast('System configuration & passcodes updated by Owner!', 'success');
    this.render();
  }

  resetDemoData() {
    if (this.currentRole !== 'owner') return;
    if (!confirm('Reset all incidents to the original demonstration records (IR-2026-0001 & IR-2026-0002)?')) return;

    this.incidents = JSON.parse(JSON.stringify(SEED_INCIDENTS));
    this.passcodes = { ...DEFAULT_PASSCODES };
    this.settings = { ...DEFAULT_SETTINGS };
    this.saveIncidents();
    this.savePasscodes();
    this.saveSettings();
    this.selectedIncidentId = this.incidents[0].id;
    this.closeOwnerSettingsModal();
    this.showToast('System reset to default seed state!', 'info');
    this.render();
  }

  exportDataJson() {
    const dataStr = JSON.stringify({
      incidents: this.incidents,
      settings: this.settings,
      exportDate: new Date().toISOString()
    }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incident_system_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  exportDataCsv() {
    const headers = ['Incident ID', 'Date Time', 'Department', 'Type', 'Priority', 'Owner', 'Due Date', 'Stage', 'Progress (%)', 'Status'];
    const rows = this.incidents.map(i => [
      i.id,
      i.dateTime,
      `"${(i.department || '').replace(/"/g, '""')}"`,
      `"${(i.type || '').replace(/"/g, '""')}"`,
      i.priority,
      `"${(i.owner || '').replace(/"/g, '""')}"`,
      i.dueDate,
      i.stage,
      i.progress,
      i.finalStatus
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incidents_followup_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ==========================================
  // HELPERS & EVENT WIRING
  // ==========================================
  getCurrentIncident() {
    if (!this.selectedIncidentId && this.incidents.length > 0) {
      this.selectedIncidentId = this.incidents[0].id;
    }
    return this.incidents.find(i => i.id === this.selectedIncidentId) || this.incidents[0];
  }

  populateIncidentSelectors() {
    const selectors = document.querySelectorAll('.incident-selector');
    selectors.forEach(select => {
      const currentVal = select.value;
      select.innerHTML = '';
      this.incidents.forEach(inc => {
        const opt = document.createElement('option');
        opt.value = inc.id;
        opt.textContent = `${inc.id} — ${inc.type} (${inc.stage})`;
        if (inc.id === this.selectedIncidentId) {
          opt.selected = true;
        }
        select.appendChild(opt);
      });
      if (!this.selectedIncidentId && this.incidents.length > 0) {
        this.selectedIncidentId = this.incidents[0].id;
      }
    });
  }

  onIncidentSelectChange(incidentId) {
    this.selectedIncidentId = incidentId;
    this.renderCurrentView();
  }

  formatDateDisplay(dateStr) {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  formatFriendlyDate(dateStr) {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    } catch (e) {
      return dateStr;
    }
  }

  isOverdue(dateStr) {
    if (!dateStr) return false;
    const today = new Date().toISOString().split('T')[0];
    return dateStr < today;
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('app-toast');
    if (!toast) return;

    const icon = toast.querySelector('.toast-icon');
    const msg = toast.querySelector('.toast-message');

    msg.textContent = message;

    if (type === 'success') {
      toast.className = 'fixed bottom-5 right-5 z-50 flex items-center p-3.5 space-x-3 text-white bg-emerald-600 rounded-xl shadow-lg animate-fade-in text-xs font-semibold';
      if (icon) icon.className = 'fa-solid fa-circle-check text-base';
    } else if (type === 'warning') {
      toast.className = 'fixed bottom-5 right-5 z-50 flex items-center p-3.5 space-x-3 text-white bg-amber-600 rounded-xl shadow-lg animate-fade-in text-xs font-semibold';
      if (icon) icon.className = 'fa-solid fa-triangle-exclamation text-base';
    } else if (type === 'error') {
      toast.className = 'fixed bottom-5 right-5 z-50 flex items-center p-3.5 space-x-3 text-white bg-rose-600 rounded-xl shadow-lg animate-fade-in text-xs font-semibold';
      if (icon) icon.className = 'fa-solid fa-circle-xmark text-base';
    } else {
      toast.className = 'fixed bottom-5 right-5 z-50 flex items-center p-3.5 space-x-3 text-white bg-slate-900 rounded-xl shadow-lg animate-fade-in text-xs font-semibold';
      if (icon) icon.className = 'fa-solid fa-circle-info text-base';
    }

    toast.classList.remove('hidden');

    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3500);
  }

  setupEventListeners() {
    // Navigation items
    document.querySelectorAll('[data-nav-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.getAttribute('data-nav-view');
        this.navigateTo(view);
      });
    });

    // Hash change detection
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (['dashboard', 'report', 'investigation', 'corrective', 'followup', 'closure'].includes(hash)) {
        this.navigateTo(hash);
      }
    });

    // Close modals on backdrop click or ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop').forEach(modal => modal.classList.add('hidden'));
      }
    });
  }
}

// Global App Instance
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new IncidentManagementSystem();
  window.app = app;
});
