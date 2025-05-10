// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English translations
const enTranslations = {
  translation: {
    common: {
      clinicName: "Dr. Abdullah's Clinic",
      specialty: "Obstetrics & Gynecology",
      dashboard: "Dashboard",
      patients: "Patient Management",
      treatments: "Treatment Plans",
      history: "Medical History",
      specialized: "Specialized Care",
      appointments: "Appointments",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit or Delete",
      delete: "Delete",
      print: "Print",
      add: "Add",
      update: "Update",
      welcome: "Welcome",
      logout: "Logout",
      login: "Login",
      register: "Register",
      search: "Search",
      confirmDelete: "Are you sure you want to delete this?",
      yes: "Yes",
      no: "No",
      success: "Success",
      error: "Error",
      changeLanguage: "العربية",
      select: "Select"
    },
    auth: {
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      name: "Name",
      age: "Age",
      loginPrompt: "Please login to continue",
      registerPrompt: "Create a new account",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      passwordRequired: "Password is required",
      passwordLength: "Password must be at least 6 characters",
      passwordMismatch: "Passwords do not match",
      nameRequired: "Name is required",
      ageRequired: "Age is required",
      ageInvalid: "Please enter a valid age",
      loginSuccess: "Login successful",
      registerSuccess: "Registration successful",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      registerHere: "Register here",
      loginHere: "Login here"
    },
    patients: {
      addPatient: "Add Patient",
      patientDetails: "Patient Details",
      patientName: "Patient Name",
      age: "Age",
      phone: "Phone Number",
      diagnosis: "Diagnosis",
      treatment: "Treatment",
      dateAdded: "Date Added",
      lastVisit: "Last Visit",
      patientsList: "Patients List",
      totalPatients: "Total Patients",
      last30Days: "Last 30 Days",
      noPatients: "No patients found",
      patientAdded: "Patient added successfully",
      patientUpdated: "Patient updated successfully",
      patientDeleted: "Patient deleted successfully"
    },
    treatments: {
      addTreatment: "Add Treatment Plan",
      treatmentDetails: "Treatment Details",
      treatmentName: "Treatment Name",
      description: "Description",
      duration: "Duration",
      medication: "Medication",
      instructions: "Instructions",
      followUp: "Follow-up Date",
      noTreatments: "No treatment plans found",
      treatmentAdded: "Treatment plan added successfully",
      treatmentUpdated: "Treatment plan updated successfully",
      treatmentDeleted: "Treatment plan deleted successfully"
    },
    appointments: {
      addAppointment: "Add Appointment",
      appointmentDetails: "Appointment Details",
      patientName: "Patient Name",
      date: "Date",
      time: "Time",
      status: "Status",
      type: "Appointment Type",
      notes: "Notes",
      promotion: "Promotion",
      noAppointments: "No appointments found",
      appointmentAdded: "Appointment added successfully",
      appointmentUpdated: "Appointment updated successfully",
      appointmentDeleted: "Appointment deleted successfully",
      upcoming: "Upcoming",
      completed: "Completed",
      cancelled: "Cancelled"
    },
    specialized: {
      addSurgery: "Add Surgical Case",
      surgeryDetails: "Surgery Details",
      patientName: "Patient Name",
      surgeryType: "Surgery Type",
      date: "Date",
      preOpNotes: "Pre-operation Notes",
      postOpNotes: "Post-operation Notes",
      status: "Status",
      noSurgeries: "No surgical cases found",
      surgeryAdded: "Surgical case added successfully",
      surgeryUpdated: "Surgical case updated successfully",
      surgeryDeleted: "Surgical case deleted successfully",
      scheduled: "Scheduled",
      completed: "Completed",
      cancelled: "Cancelled"
    }
  }
};

// Arabic translations
const arTranslations = {
  translation: {
    common: {
      clinicName: "عيادة د. عبدالله",
      specialty: "نساء وتوليد",
      dashboard: "الرئيسية",
      patients: "إدارة المرضى",
      treatments: "خطط العلاج",
      history: "التاريخ الطبي",
      specialized: "الرعاية المتخصصة",
      appointments: "المواعيد",
      save: "حفظ",
      cancel: "إلغاء",
      edit: "تعديل او حذف",
      delete: "حذف",
      print: "طباعة",
      add: "إضافة",
      update: "تحديث",
      welcome: "مرحبا",
      logout: "تسجيل الخروج",
      login: "تسجيل الدخول",
      register: "تسجيل جديد",
      search: "بحث",
      confirmDelete: "هل أنت متأكد من حذف هذا؟",
      yes: "نعم",
      no: "لا",
      success: "نجاح",
      error: "خطأ",
      changeLanguage: "English",
      select: "اختر"
    },
    auth: {
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      name: "الاسم",
      age: "العمر",
      loginPrompt: "الرجاء تسجيل الدخول للمتابعة",
      registerPrompt: "إنشاء حساب جديد",
      emailRequired: "البريد الإلكتروني مطلوب",
      emailInvalid: "الرجاء إدخال بريد إلكتروني صالح",
      passwordRequired: "كلمة المرور مطلوبة",
      passwordLength: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
      passwordMismatch: "كلمات المرور غير متطابقة",
      nameRequired: "الاسم مطلوب",
      ageRequired: "العمر مطلوب",
      ageInvalid: "الرجاء إدخال عمر صالح",
      loginSuccess: "تم تسجيل الدخول بنجاح",
      registerSuccess: "تم التسجيل بنجاح",
      noAccount: "ليس لديك حساب؟",
      haveAccount: "لديك حساب بالفعل؟",
      registerHere: "سجل هنا",
      loginHere: "تسجيل الدخول هنا"
    },
    patients: {
      addPatient: "إضافة مريض",
      patientDetails: "تفاصيل المريض",
      patientName: "اسم المريض",
      age: "العمر",
      phone: "رقم الهاتف",
      diagnosis: "التشخيص",
      treatment: "العلاج",
      dateAdded: "تاريخ الإضافة",
      lastVisit: "آخر زيارة",
      patientsList: "قائمة المرضى",
      totalPatients: "إجمالي المرضى",
      last30Days: "آخر 30 يوم",
      noPatients: "لم يتم العثور على مرضى",
      patientAdded: "تمت إضافة المريض بنجاح",
      patientUpdated: "تم تحديث بيانات المريض بنجاح",
      patientDeleted: "تم حذف المريض بنجاح"
    },
    treatments: {
      addTreatment: "إضافة خطة علاج",
      treatmentDetails: "تفاصيل العلاج",
      treatmentName: "اسم العلاج",
      description: "الوصف",
      duration: "المدة",
      medication: "الدواء",
      instructions: "التعليمات",
      followUp: "تاريخ المتابعة",
      noTreatments: "لم يتم العثور على خطط علاج",
      treatmentAdded: "تمت إضافة خطة العلاج بنجاح",
      treatmentUpdated: "تم تحديث خطة العلاج بنجاح",
      treatmentDeleted: "تم حذف خطة العلاج بنجاح"
    },
    appointments: {
      addAppointment: "إضافة موعد",
      appointmentDetails: "تفاصيل الموعد",
      patientName: "اسم المريض",
      date: "التاريخ",
      time: "الوقت",
      status: "الحالة",
      type: "نوع الموعد",
      notes: "ملاحظات",
      promotion: "العرض",
      noAppointments: "لم يتم العثور على مواعيد",
      appointmentAdded: "تمت إضافة الموعد بنجاح",
      appointmentUpdated: "تم تحديث الموعد بنجاح",
      appointmentDeleted: "تم حذف الموعد بنجاح",
      upcoming: "قادم",
      completed: "مكتمل",
      cancelled: "ملغي"
    },
    specialized: {
      addSurgery: "إضافة حالة جراحية",
      surgeryDetails: "تفاصيل الجراحة",
      patientName: "اسم المريض",
      surgeryType: "نوع الجراحة",
      date: "التاريخ",
      preOpNotes: "ملاحظات ما قبل العملية",
      postOpNotes: "ملاحظات ما بعد العملية",
      status: "الحالة",
      noSurgeries: "لم يتم العثور على حالات جراحية",
      surgeryAdded: "تمت إضافة الحالة الجراحية بنجاح",
      surgeryUpdated: "تم تحديث الحالة الجراحية بنجاح",
      surgeryDeleted: "تم حذف الحالة الجراحية بنجاح",
      scheduled: "مجدولة",
      completed: "مكتملة",
      cancelled: "ملغية"
    }
  }
};

// تحميل اللغة من localStorage
const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslations,
      ar: arTranslations
    },
    lng: savedLanguage, // استخدام اللغة المحفوظة
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;