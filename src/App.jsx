import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import logo from "./assets/logo.png";
import "./index.css";

const API_URL = "/api";

const ARABIC_TRANSLATIONS = {
  "Espace pédagogique": "الفضاء التربوي",
  "Suivi des difficultés scolaires": "تتبع الصعوبات الدراسية",
  "Suivi individualisé et plan de remédiation des élèves": "التتبع الفردي وخطة الدعم للتلاميذ",
  "Tableau de bord": "لوحة القيادة",
  "Les classes": "الأقسام",
  "Choisissez une classe pour consulter les élèves enregistrés.": "اختر قسماً للاطلاع على التلاميذ المسجلين.",
  "Chargement des classes...": "جارٍ تحميل الأقسام...",
  "Voir les élèves": "عرض التلاميذ",
  "Ajouter un élève": "إضافة تلميذ",
  "Année de naissance": "سنة الازدياد",
  "Photo de l’élève": "صورة التلميذ",
  "Choisir une photo": "اختيار صورة",
  "Enregistrer l’élève": "حفظ التلميذ",
  "Annuler": "إلغاء",
  "Élève ajouté avec succès.": "تمت إضافة التلميذ بنجاح.",
  "Veuillez vérifier les informations saisies.": "يرجى التحقق من المعلومات المدخلة.",
  "La photo ne doit pas dépasser 5 Mo.": "يجب ألا يتجاوز حجم الصورة 5 ميغابايت.",
  "Total des élèves": "مجموع التلاميذ",
  "Total des classes": "مجموع الأقسام",
  "Plans de remédiation": "خطط الدعم",
  "Suivis des activités": "تتبع الأنشطة",
  "Bilans trimestriels": "الحصائل المرحلية",
  "Bilans finaux": "الحصائل النهائية",
  "Statistiques de l'application": "إحصائيات التطبيق",
  "Élèves": "التلاميذ",
  "Classes": "الأقسام",
  "Plans": "الخطط",
  "Suivis": "التتبع",
  "Bilans": "الحصائل",
  "Classe sélectionnée": "القسم المحدد",
  "Toutes les classes": "جميع الأقسام",
  "Chargement des élèves...": "جارٍ تحميل التلاميذ...",
  "Aucun élève enregistré dans cette classe.": "لا يوجد تلاميذ مسجلون في هذا القسم.",
  "Ajoutez des élèves dans la base de données pour les afficher ici.": "أضف التلاميذ إلى قاعدة البيانات لعرضهم هنا.",
  "Consulter le dossier →": "الاطلاع على الملف ←",
  "Dossier individuel": "الملف الفردي",
  "Informations et suivi pédagogique de l’élève": "معلومات وتتبع التلميذ التربوي",
  "Télécharger le dossier (PDF)": "تحميل ملف التلميذ (PDF)",
  "Fermer le dossier": "إغلاق الملف",
  "1. Informations de l’élève": "1. معلومات التلميذ",
  "Nom": "النسب",
  "Prénom": "الاسم الشخصي",
  "Classe": "القسم",
  "Date de naissance": "تاريخ الازدياد",
  "Non renseigné": "غير محدد",
  "Non renseignée": "غير محددة",
  "Étape 1": "المرحلة 1",
  "Plan de remédiation": "خطة الدعم",
  "Sélectionnez les difficultés, les domaines et les besoins, puis définissez les actions prévues.": "حدد الصعوبات والمجالات والحاجات، ثم حدد الإجراءات المبرمجة.",
  "Chargement du plan de remédiation...": "جارٍ تحميل خطة الدعم...",
  "A. Difficultés observées": "أ. الصعوبات الملاحظة",
  "Cochez les difficultés identifiées chez cet élève.": "حدد الصعوبات التي تمت ملاحظتها لدى هذا التلميذ.",
  "B. Domaines concernés": "ب. المجالات المعنية",
  "Sélectionnez les matières concernées.": "حدد المواد المعنية.",
  "C. Besoins identifiés": "ج. الحاجات المحددة",
  "Cochez les besoins prioritaires de l’élève.": "حدد الحاجات ذات الأولوية لدى التلميذ.",
  "D. Objectifs et actions": "د. الأهداف والإجراءات",
  "Objectif de remédiation": "هدف الدعم",
  "Objectif à atteindre...": "الهدف المراد تحقيقه...",
  "Actions prévues": "الإجراءات المبرمجة",
  "Activités, stratégies et aides prévues...": "الأنشطة والاستراتيجيات والدعم المبرمج...",
  "Date de début": "تاريخ البداية",
  "Date de révision": "تاريخ المراجعة",
  "Élève :": "التلميذ:",
  "Enregistrement...": "جارٍ الحفظ...",
  "Enregistrer le plan": "حفظ الخطة",
  "Étape 2": "المرحلة 2",
  "Suivi des activités": "تتبع الأنشطة",
  "Ajoutez les activités réalisées et consignez les observations et résultats.": "أضف الأنشطة المنجزة وسجل الملاحظات والنتائج.",
  "Ajouter une activité": "إضافة نشاط",
  "Date de suivi": "تاريخ التتبع",
  "Activité réalisée": "النشاط المنجز",
  "Ex. : Lecture guidée": "مثال: قراءة موجهة",
  "Observation": "ملاحظة",
  "Observations pendant l’activité...": "ملاحظات أثناء النشاط...",
  "Résultat obtenu": "النتيجة المحققة",
  "Résultat et progrès observés...": "النتيجة والتقدم الملحوظ...",
  "Enregistrer le suivi": "حفظ التتبع",
  "Historique des suivis": "سجل التتبع",
  "Chargement des suivis...": "جارٍ تحميل بيانات التتبع...",
  "Aucun suivi enregistré pour cet élève.": "لا توجد بيانات تتبع مسجلة لهذا التلميذ.",
  "Aucune observation": "لا توجد ملاحظات",
  "Résultat": "النتيجة",
  "Aucun résultat renseigné": "لم يتم إدخال أي نتيجة",
  "Étape 3": "المرحلة 3",
  "Évolution de l’élève": "تطور التلميذ",
  "Évaluez les progrès observés dans chaque domaine.": "قيّم التقدم الملحوظ في كل مجال.",
  "Chargement de l’évaluation...": "جارٍ تحميل التقييم...",
  "Compréhension": "الفهم",
  "Lecture": "القراءة",
  "Écriture": "الكتابة",
  "Autonomie": "الاستقلالية",
  "Attention": "الانتباه",
  "Choisir une évaluation": "اختر تقييماً",
  "Très bien": "جيد جداً",
  "Satisfaisant": "مُرضٍ",
  "Léger": "طفيف",
  "Aucun": "لا شيء",
  "Persistant": "مستمر",
  "Date de l’évaluation": "تاريخ التقييم",
  "Observations générales": "ملاحظات عامة",
  "Progrès constatés, difficultés persistantes...": "التقدم الملحوظ، الصعوبات المستمرة...",
  "Enregistrer l’évolution": "حفظ تطور التلميذ",
  "Étape 4": "المرحلة 4",
  "Communication avec la famille": "التواصل مع الأسرة",
  "Enregistrez les rencontres et les décisions prises avec la famille.": "سجل اللقاءات والقرارات المتخذة مع الأسرة.",
  "Date de la rencontre": "تاريخ اللقاء",
  "Motif de la rencontre": "سبب اللقاء",
  "Ex. : difficultés scolaires": "مثال: صعوبات دراسية",
  "Difficultés abordées": "الصعوبات التي تمت مناقشتها",
  "Difficultés discutées avec la famille...": "الصعوبات التي نوقشت مع الأسرة...",
  "Observations des parents": "ملاحظات أولياء الأمور",
  "Remarques et informations partagées par les parents...": "ملاحظات ومعلومات قدمها أولياء الأمور...",
  "Décisions et recommandations": "القرارات والتوصيات",
  "Actions convenues avec la famille...": "الإجراءات المتفق عليها مع الأسرة...",
  "Enregistrer la rencontre": "حفظ اللقاء",
  "Historique des rencontres": "سجل اللقاءات",
  "Chargement des rencontres...": "جارٍ تحميل اللقاءات...",
  "Aucune rencontre enregistrée pour cet élève.": "لا توجد لقاءات مسجلة لهذا التلميذ.",
  "Rencontre du": "لقاء بتاريخ",
  "Motif :": "السبب:",
  "Difficultés abordées :": "الصعوبات التي تمت مناقشتها:",
  "Observations des parents :": "ملاحظات أولياء الأمور:",
  "Décisions et recommandations :": "القرارات والتوصيات:",
  "Étape 5": "المرحلة 5",
  "Bilans trimestriels": "الحصائل المرحلية",
  "Bilan final": "الحصيلة النهائية",
  "Enregistrer": "حفظ",
  "Ajouter": "إضافة",
  "Modifier": "تعديل",
  "Supprimer": "حذف",
  "Non renseignée": "غير محددة",
  "Non renseigné": "غير محدد",
  "Suivi des difficultés scolaires · Espace de suivi pédagogique": "تتبع الصعوبات الدراسية · فضاء التتبع التربوي",
  "Français": "الفرنسية",
  "Arabe": "العربية",
  "Mathématiques": "الرياضيات",
  "Éveil scientifique": "النشاط العلمي",
  "Difficulté en lecture / écriture": "صعوبة في القراءة / الكتابة",
  "Exécution lente": "بطء في الإنجاز",
  "Inattention": "ضعف الانتباه",
  "Difficultés en compréhension": "صعوبات في الفهم",
  "Difficultés en calcul": "صعوبات في الحساب",
  "Autre difficulté": "صعوبة أخرى",
  "Compréhension des consignes": "فهم التعليمات",
  "Décodage et phonologie": "فك الرموز والوعي الصوتي",
  "Calcul et numération": "الحساب والترقيم",
  "Graphisme et écriture": "الخط والكتابة",
  "Fixation de l’attention": "تركيز الانتباه",
  "Évaluez les acquis, les difficultés persistantes et les recommandations.": "قيّم المكتسبات والصعوبات المستمرة والتوصيات.",
  "Trimestre": "الدورة الدراسية",
  "1er trimestre": "الدورة الأولى",
  "2ème trimestre": "الدورة الثانية",
  "3ème trimestre": "الدورة الثالثة",
  "Année scolaire": "السنة الدراسية",
  "Format attendu : 2026-2027": "الصيغة المطلوبة: 2026-2027",
  "Acquis et progrès constatés": "المكتسبات والتقدم الملحوظ",
  "Compétences acquises, progrès observés...": "المهارات المكتسبة والتقدم الملحوظ...",
  "Difficultés persistantes": "الصعوبات المستمرة",
  "Difficultés qui nécessitent encore un accompagnement...": "الصعوبات التي ما زالت تحتاج إلى مواكبة...",
  "Recommandations": "التوصيات",
  "Recommandations pour la suite...": "توصيات للمرحلة المقبلة...",
  "Appréciation générale": "التقييم العام",
  "Appréciation générale de l’élève...": "التقييم العام للتلميذ...",
  "Enregistrer le bilan": "حفظ الحصيلة",
  "Chargement des bilans...": "جارٍ تحميل الحصائل...",
  "Aucun bilan enregistré pour cet élève.": "لا توجد حصائل مسجلة لهذا التلميذ.",
  "Année scolaire ": "السنة الدراسية ",
  "Acquis :": "المكتسبات:",
  "Difficultés persistantes :": "الصعوبات المستمرة:",
  "Recommandations :": "التوصيات:",
  "Appréciation générale :": "التقييم العام:",
  "Étape 6 — Bilan final": "المرحلة 6 — الحصيلة النهائية",
  "Synthèse finale des progrès et des difficultés de l’élève.": "خلاصة نهائية لتقدم التلميذ والصعوبات التي يواجهها.",
  "Chargement du bilan final...": "جارٍ تحميل الحصيلة النهائية...",
  "Date du bilan": "تاريخ الحصيلة",
  "Synthèse des progrès": "خلاصة التقدم",
  "Résumer les progrès réalisés par l’élève...": "لخص التقدم الذي أحرزه التلميذ...",
  "Difficultés restantes": "الصعوبات المتبقية",
  "Préciser les difficultés qui persistent...": "حدد الصعوبات التي ما زالت مستمرة...",
  "Objectifs atteints": "الأهداف المحققة",
  "Indiquer les objectifs atteints...": "اذكر الأهداف التي تم تحقيقها...",
  "Recommandations finales": "التوصيات النهائية",
  "Proposer les prochaines étapes...": "اقترح الخطوات المقبلة...",
  "Enregistrer le bilan final": "حفظ الحصيلة النهائية",
};


const INITIAL_PLAN = {
  difficultes: [],
  domaines: [],
  besoins: [],
  objectif: "",
  actions_prevues: "",
  date_debut: "",
  date_revision: "",
};

const DIFFICULTES = [
  "Difficulté en lecture / écriture",
  "Exécution lente",
  "Inattention",
  "Difficultés en compréhension",
  "Difficultés en calcul",
  "Autre difficulté",
];

const DOMAINES = [
  "Français",
  "Arabe",
  "Mathématiques",
  "Éveil scientifique",
];

const BESOINS = [
  "Compréhension des consignes",
  "Décodage et phonologie",
  "Calcul et numération",
  "Graphisme et écriture",
  "Fixation de l’attention",
];

function CheckboxGroup({ title, description, options, values, onChange }) {
  return (
    <div className="mt-7">
      <h4 className="font-bold text-[#102a43]">{title}</h4>
      {description && (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      )}

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((item) => (
          <label
            key={item}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
              values.includes(item)
                ? "border-[#d6a928] bg-amber-50"
                : "border-slate-200 bg-white hover:border-[#d6a928]"
            }`}
          >
            <input
              type="checkbox"
              checked={values.includes(item)}
              onChange={(event) => {
                onChange(
                  event.target.checked
                    ? [...values, item]
                    : values.filter((value) => value !== item)
                );
              }}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[#d6a928]"
            />
            <span className="text-sm font-medium text-[#102a43]">
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#102a43]">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#102a43] outline-none transition focus:border-[#d6a928] focus:ring-2 focus:ring-amber-100";

export default function App() {
  const [language, setLanguage] = useState("fr");

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language === "ar" ? "ar" : "fr";
    root.dir = language === "ar" ? "rtl" : "ltr";

    const dictionary = language === "ar"
      ? ARABIC_TRANSLATIONS
      : Object.fromEntries(Object.entries(ARABIC_TRANSLATIONS).map(([fr, ar]) => [ar, fr]));

    const translate = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const original = node.nodeValue;
        const trimmed = original.trim();
        if (dictionary[trimmed]) {
          node.nodeValue = original.replace(trimmed, dictionary[trimmed]);
        }
      }
      document.querySelectorAll("input[placeholder], textarea[placeholder], img[alt]").forEach((el) => {
        const attr = el.hasAttribute("placeholder") ? "placeholder" : "alt";
        if (dictionary[el.getAttribute(attr)]) el.setAttribute(attr, dictionary[el.getAttribute(attr)]);
      });
    };

    translate();
    const observer = new MutationObserver(translate);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [language]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [savingStudent, setSavingStudent] = useState(false);
  const [studentMessage, setStudentMessage] = useState("");
  const [studentMessageError, setStudentMessageError] = useState(false);
  const [studentPhotoPreview, setStudentPhotoPreview] = useState("");
  const [newStudent, setNewStudent] = useState({
    nom: "",
    prenom: "",
    annee_naissance: String(new Date().getFullYear() - 6),
    photo: null,
  });

const [dashboardStats, setDashboardStats] = useState({
  totalEleves: 0,
  totalClasses: 0,
  plans: 0,
  suivis: 0,
  bilans: 0,
  bilansFinaux: 0,
});

const [loadingDashboard, setLoadingDashboard] = useState(false);

useEffect(() => {
  const fetchDashboardStats = async () => {
    setLoadingDashboard(true);

    try {
      const response = await fetch(`${API_URL}/dashboard.php`);
      const data = await response.json();

      if (data.success) {
        setDashboardStats(data.stats);
      } else {
        console.error("Erreur lors du chargement du dashboard");
      }
    } catch (error) {
      console.error("Erreur API dashboard :", error);
    } finally {
      setLoadingDashboard(false);
    }
  };

  fetchDashboardStats();
}, []);


  const [plan, setPlan] = useState(INITIAL_PLAN);

  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [savingPlan, setSavingPlan] = useState(false);

const [suivis, setSuivis] = useState([]);
const [loadingSuivis, setLoadingSuivis] = useState(false);
const [savingSuivi, setSavingSuivi] = useState(false);

const [evolution, setEvolution] = useState({
  comprehension: "",
  lecture: "",
  ecriture: "",
  autonomie: "",
  attention: "",
  observations: "",
  date_evaluation: new Date().toLocaleDateString("en-CA"),
});

const [loadingEvolution, setLoadingEvolution] = useState(false);
const [savingEvolution, setSavingEvolution] = useState(false);

const [bilans, setBilans] = useState([]);
const [loadingBilans, setLoadingBilans] = useState(false);
const [savingBilan, setSavingBilan] = useState(false);

const [bilanFinal, setBilanFinal] = useState(null);
const [loadingBilanFinal, setLoadingBilanFinal] = useState(false);
const [savingBilanFinal, setSavingBilanFinal] = useState(false);
const [bilanFinalMessage, setBilanFinalMessage] = useState("");
const [bilanFinalError, setBilanFinalError] = useState(false);

const [nouveauBilanFinal, setNouveauBilanFinal] = useState({
  synthese_progres: "",
  difficultes_restantes: "",
  objectifs_atteints: "",
  recommandations_finales: "",
  conclusion: "",
  date_bilan: "",
});

const [bilanMessage, setBilanMessage] = useState("");
const [bilanError, setBilanError] = useState(false);

const [nouveauBilan, setNouveauBilan] = useState({
  trimestre: "1",
  annee_scolaire: "2026-2027",
  acquis: "",
  difficultes_persistantes: "",
  recommandations: "",
  appreciation_generale: "",
});


const [communications, setCommunications] = useState([]);
const [loadingCommunications, setLoadingCommunications] = useState(false);
const [savingCommunication, setSavingCommunication] = useState(false);
const [communicationMessage, setCommunicationMessage] = useState("");
const [communicationError, setCommunicationError] = useState(false);

const [nouvelleCommunication, setNouvelleCommunication] = useState({
  date_rencontre: new Date().toLocaleDateString("en-CA"),
  motif: "",
  difficultes_abordees: "",
  observations_parents: "",
  decisions_recommandations: "",
});

const [evolutionMessage, setEvolutionMessage] = useState("");
const [evolutionError, setEvolutionError] = useState(false);

const [suiviMessage, setSuiviMessage] = useState("");
const [suiviError, setSuiviError] = useState(false);

const [nouveauSuivi, setNouveauSuivi] = useState({
  date_suivi: new Date().toLocaleDateString("en-CA"),
  activite: "",
  observation: "",
  resultat: "",
});

  const [error, setError] = useState("");
  const [planMessage, setPlanMessage] = useState("");
  const [planError, setPlanError] = useState(false);

  // Charger les classes
  useEffect(() => {
    const controller = new AbortController();

    async function loadClasses() {
      setLoadingClasses(true);
      setError("");

      try {
        const response = await fetch(`${API_URL}/classes.php`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Impossible de charger les niveaux.");
        }

        const data = await response.json();
        setClasses(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Impossible de charger les classes. Vérifiez le serveur.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingClasses(false);
        }
      }
    }

    loadClasses();
    return () => controller.abort();
  }, []);

  // Charger les élèves de la classe choisie
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      return;
    }

    const controller = new AbortController();

    async function loadStudents() {
      setLoadingStudents(true);
      setError("");
      setStudents([]);

      try {
        const response = await fetch(
          `${API_URL}/eleves.php?classe_id=${selectedClass.id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Impossible de charger les élèves.");
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Impossible de charger les élèves de cette classe.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingStudents(false);
        }
      }
    }

    loadStudents();
    return () => controller.abort();
  }, [selectedClass]);

  // Charger le plan de remédiation de l'élève choisi
  useEffect(() => {
    if (!selectedStudent) {
      setPlan(INITIAL_PLAN);
      setPlanMessage("");
      setPlanError(false);
      return;
    }

    const controller = new AbortController();

    async function loadPlan() {
      setLoadingPlan(true);
      setPlanMessage("");
      setPlanError(false);
      setPlan(INITIAL_PLAN);

      try {
        const response = await fetch(
          `${API_URL}/plan_remediation.php?eleve_id=${selectedStudent.id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Erreur de chargement");
        }

        const data = await response.json();

        if (data) {
          setPlan({
            difficultes: data.difficultes ?? [],
            domaines: data.domaines ?? [],
            besoins: data.besoins ?? [],
            objectif: data.objectif ?? "",
            actions_prevues: data.actions_prevues ?? "",
            date_debut: data.date_debut ?? "",
            date_revision: data.date_revision ?? "",
          });
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setPlanMessage("Impossible de charger le plan de remédiation.");
          setPlanError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingPlan(false);
        }
      }
    }

    loadPlan();
    return () => controller.abort();
  }, [selectedStudent]);

useEffect(() => {
  if (!selectedStudent) {
    setSuivis([]);
    setSuiviMessage("");
    return;
  }

  const controller = new AbortController();

  async function loadSuivis() {
    setLoadingSuivis(true);
    setSuiviMessage("");

    try {
      const response = await fetch(
        `${API_URL}/suivis.php?eleve_id=${selectedStudent.id}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Erreur de chargement");
      }

      const data = await response.json();
      setSuivis(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setSuiviMessage("Impossible de charger les suivis.");
        setSuiviError(true);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoadingSuivis(false);
      }
    }
  }

  loadSuivis();

  return () => controller.abort();
}, [selectedStudent]);

async function saveSuivi(event) {
  event.preventDefault();

  if (!selectedStudent) return;

  setSavingSuivi(true);
  setSuiviMessage("");
  setSuiviError(false);

  try {
    const response = await fetch(`${API_URL}/suivis.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eleve_id: selectedStudent.id,
        ...nouveauSuivi,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Échec de l’enregistrement.");
    }

    const listeResponse = await fetch(
      `${API_URL}/suivis.php?eleve_id=${selectedStudent.id}`
    );

    if (!listeResponse.ok) {
      throw new Error("Suivi enregistré, mais impossible d’actualiser la liste.");
    }

    setSuivis(await listeResponse.json());

    setNouveauSuivi({
      date_suivi: new Date().toLocaleDateString("en-CA"),
      activite: "",
      observation: "",
      resultat: "",
    });

    setSuiviMessage("Suivi enregistré avec succès.");
  } catch (err) {
    setSuiviMessage(err.message || "Erreur lors de l’enregistrement.");
    setSuiviError(true);
  } finally {
    setSavingSuivi(false);
  }
}

  function updatePlan(field, value) {
    setPlan((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  // Enregistrer le plan dans MySQL
  async function savePlan(event) {
    event.preventDefault();

    if (!selectedStudent) return;

    setSavingPlan(true);
    setPlanMessage("");
    setPlanError(false);

    try {
      const response = await fetch(`${API_URL}/plan_remediation.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eleve_id: selectedStudent.id,
          ...plan,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Échec de l’enregistrement.");
      }

      setPlanMessage("Plan de remédiation enregistré avec succès.");
      setPlanError(false);
    } catch (err) {
      setPlanMessage(
        err.message || "Une erreur est survenue pendant l’enregistrement."
      );
      setPlanError(true);
    } finally {
      setSavingPlan(false);
    }
  }

useEffect(() => {
  if (!selectedStudent) {
    setEvolution({
      comprehension: "",
      lecture: "",
      ecriture: "",
      autonomie: "",
      attention: "",
      observations: "",
      date_evaluation: new Date().toLocaleDateString("en-CA"),
    });
    setEvolutionMessage("");
    return;
  }

  const controller = new AbortController();

  async function loadEvolution() {
    setLoadingEvolution(true);
    setEvolutionMessage("");
    setEvolutionError(false);

    try {
      const response = await fetch(
        `${API_URL}/evolutions.php?eleve_id=${selectedStudent.id}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Erreur de chargement");
      }

      const data = await response.json();

      setEvolution({
        comprehension: data?.comprehension ?? "",
        lecture: data?.lecture ?? "",
        ecriture: data?.ecriture ?? "",
        autonomie: data?.autonomie ?? "",
        attention: data?.attention ?? "",
        observations: data?.observations ?? "",
        date_evaluation:
          data?.date_evaluation ||
          new Date().toLocaleDateString("en-CA"),
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        setEvolutionMessage("Impossible de charger l’évolution.");
        setEvolutionError(true);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoadingEvolution(false);
      }
    }
  }

  loadEvolution();

  return () => controller.abort();
}, [selectedStudent]);

async function saveEvolution(event) {
  event.preventDefault();

  if (!selectedStudent) return;

  setSavingEvolution(true);
  setEvolutionMessage("");
  setEvolutionError(false);

  try {
    const response = await fetch(`${API_URL}/evolutions.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eleve_id: selectedStudent.id,
        ...evolution,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Échec de l’enregistrement.");
    }

    setEvolutionMessage("Évolution enregistrée avec succès.");
  } catch (err) {
    setEvolutionMessage(
      err.message || "Erreur lors de l’enregistrement."
    );
    setEvolutionError(true);
  } finally {
    setSavingEvolution(false);
  }
}

useEffect(() => {
  if (!selectedStudent) {
    setCommunications([]);
    setCommunicationMessage("");
    return;
  }

  const controller = new AbortController();

  async function loadCommunications() {
    setLoadingCommunications(true);
    setCommunicationMessage("");
    setCommunicationError(false);

    try {
      const response = await fetch(
        `${API_URL}/communications_famille.php?eleve_id=${selectedStudent.id}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Erreur de chargement");
      }

      const data = await response.json();
      setCommunications(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name !== "AbortError") {
        setCommunicationMessage(
          "Impossible de charger les communications."
        );
        setCommunicationError(true);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoadingCommunications(false);
      }
    }
  }

  loadCommunications();

  return () => controller.abort();
}, [selectedStudent]);

async function saveCommunication(event) {
  event.preventDefault();

  if (!selectedStudent) return;

  setSavingCommunication(true);
  setCommunicationMessage("");
  setCommunicationError(false);

  try {
    const response = await fetch(
      `${API_URL}/communications_famille.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eleve_id: selectedStudent.id,
          ...nouvelleCommunication,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.error || "Échec de l’enregistrement."
      );
    }

    const historiqueResponse = await fetch(
      `${API_URL}/communications_famille.php?eleve_id=${selectedStudent.id}`
    );

    if (!historiqueResponse.ok) {
      throw new Error("Communication enregistrée, mais erreur de rechargement.");
    }

    const historique = await historiqueResponse.json();
    setCommunications(Array.isArray(historique) ? historique : []);

    setNouvelleCommunication({
      date_rencontre: new Date().toLocaleDateString("en-CA"),
      motif: "",
      difficultes_abordees: "",
      observations_parents: "",
      decisions_recommandations: "",
    });

    setCommunicationMessage(
      "Communication enregistrée avec succès."
    );
  } catch (err) {
    setCommunicationMessage(
      err.message || "Erreur lors de l’enregistrement."
    );
    setCommunicationError(true);
  } finally {
    setSavingCommunication(false);
  }
}

useEffect(() => {
  if (!selectedStudent) {
    setBilans([]);
    setBilanMessage("");
    return;
  }

  const controller = new AbortController();

  async function loadBilans() {
    setLoadingBilans(true);
    setBilanMessage("");
    setBilanError(false);

    try {
      const response = await fetch(
        `${API_URL}/bilans_trimestriels.php?eleve_id=${selectedStudent.id}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Erreur de chargement");
      }

      const data = await response.json();
      setBilans(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name !== "AbortError") {
        setBilanMessage("Impossible de charger les bilans trimestriels.");
        setBilanError(true);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoadingBilans(false);
      }
    }
  }

  loadBilans();

  return () => controller.abort();
}, [selectedStudent]);

async function saveBilan(event) {
  event.preventDefault();

  if (!selectedStudent) return;

  setSavingBilan(true);
  setBilanMessage("");
  setBilanError(false);

  try {
    const response = await fetch(
      `${API_URL}/bilans_trimestriels.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eleve_id: selectedStudent.id,
          ...nouveauBilan,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.error || "Échec de l’enregistrement."
      );
    }

    const historiqueResponse = await fetch(
      `${API_URL}/bilans_trimestriels.php?eleve_id=${selectedStudent.id}`
    );

    if (!historiqueResponse.ok) {
      throw new Error(
        "Bilan enregistré, mais erreur de rechargement."
      );
    }

    const historique = await historiqueResponse.json();
    setBilans(Array.isArray(historique) ? historique : []);

    setBilanMessage("Bilan trimestriel enregistré avec succès.");
  } catch (err) {
    setBilanMessage(
      err.message || "Erreur lors de l’enregistrement."
    );
    setBilanError(true);
  } finally {
    setSavingBilan(false);
  }
}

useEffect(() => {
  if (!selectedStudent?.id) {
    setBilanFinal(null);
    return;
  }

  async function loadBilanFinal() {
    setLoadingBilanFinal(true);
    setBilanFinalMessage("");

    try {
      const response = await fetch(
        `/api/bilans_finaux.php?eleve_id=${selectedStudent.id}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors du chargement du bilan final.");
      }

      const data = await response.json();
      setBilanFinal(data);

      setNouveauBilanFinal({
        synthese_progres: data?.synthese_progres || "",
        difficultes_restantes: data?.difficultes_restantes || "",
        objectifs_atteints: data?.objectifs_atteints || "",
        recommandations_finales: data?.recommandations_finales || "",
        conclusion: data?.conclusion || "",
        date_bilan: data?.date_bilan || "",
      });
    } catch (error) {
      setBilanFinalMessage(error.message);
      setBilanFinalError(true);
    } finally {
      setLoadingBilanFinal(false);
    }
  }

  loadBilanFinal();
}, [selectedStudent?.id]);

async function saveBilanFinal(event) {
  event.preventDefault();

  if (!selectedStudent?.id) return;

  setSavingBilanFinal(true);
  setBilanFinalMessage("");
  setBilanFinalError(false);

  try {
    const response = await fetch("/api/bilans_finaux.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eleve_id: selectedStudent.id,
        ...nouveauBilanFinal,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Erreur lors de l'enregistrement.");
    }

    setBilanFinal(nouveauBilanFinal);
    setBilanFinalMessage("Bilan final enregistré avec succès !");
    setBilanFinalError(false);
  } catch (error) {
    setBilanFinalMessage(error.message);
    setBilanFinalError(true);
  } finally {
    setSavingBilanFinal(false);
  }
}

  function chooseClass(classe) {
    setSelectedClass(classe);
    setSelectedStudent(null);
    setPlan(INITIAL_PLAN);
    setPlanMessage("");
    setError("");
  }

  function chooseStudent(student) {
    setSelectedStudent(student);
    setPlanMessage("");
    setPlanError(false);
  }

  function resetNewStudentForm() {
    if (studentPhotoPreview) URL.revokeObjectURL(studentPhotoPreview);
    setStudentPhotoPreview("");
    setNewStudent({
      nom: "",
      prenom: "",
      annee_naissance: String(new Date().getFullYear() - 6),
      photo: null,
    });
    setStudentMessage("");
    setStudentMessageError(false);
  }

  async function addStudent(event) {
    event.preventDefault();
    if (!selectedClass) return;

    setSavingStudent(true);
    setStudentMessage("");
    setStudentMessageError(false);

    try {
      const formData = new FormData();
      formData.append("classe_id", String(selectedClass.id));
      formData.append("nom", newStudent.nom.trim());
      formData.append("prenom", newStudent.prenom.trim());
      formData.append("annee_naissance", newStudent.annee_naissance);
      if (newStudent.photo) formData.append("photo", newStudent.photo);

      const response = await fetch(`${API_URL}/eleves.php`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Impossible d’ajouter l’élève.");
      }

      const listResponse = await fetch(
        `${API_URL}/eleves.php?classe_id=${selectedClass.id}`
      );
      if (!listResponse.ok) {
        throw new Error("Élève enregistré, mais impossible d’actualiser la liste.");
      }

      const updatedStudents = await listResponse.json();
      setStudents(updatedStudents);
      setShowAddStudent(false);
      resetNewStudentForm();
      setStudentMessage("Élève ajouté avec succès.");

      const statsResponse = await fetch(`${API_URL}/dashboard.php`);
      const statsData = await statsResponse.json();
      if (statsData.success) setDashboardStats(statsData.stats);
    } catch (err) {
      setStudentMessage(err.message || "Erreur lors de l’ajout de l’élève.");
      setStudentMessageError(true);
    } finally {
      setSavingStudent(false);
    }
  }

  function formatDate(date) {
    if (!date) return "Non renseignée";

    const parsed = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsed.getTime())) return date;

    return parsed.toLocaleDateString("fr-FR");
  }

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} lang={language} className="min-h-screen bg-slate-50 text-slate-800">
      <style>{`
        @media print {
          @page { size: A4; margin: 12mm; }
          body * { visibility: hidden !important; }
          #dossier-eleve, #dossier-eleve * { visibility: visible !important; }
          #dossier-eleve {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            box-shadow: none !important;
            background: white !important;
          }
          .no-print { display: none !important; }
          /* Masquer les boutons d'action dans le dossier imprimé */
          #dossier-eleve button {
            display: none !important;
          }
          #dossier-eleve input,
          #dossier-eleve select,
          #dossier-eleve textarea {
            print-color-adjust: exact;
          }
        }
      `}</style>
      {/* En-tête */}
      <header className="border-b-4 border-[#d6a928] bg-[#102a43] text-white">
        <div className="no-print flex justify-end px-5 pt-4">
          <button
            type="button"
            onClick={() => setLanguage((current) => current === "fr" ? "ar" : "fr")}
            className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
          >
            {language === "fr" ? "العربية" : "Français"}
          </button>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-6 sm:flex-row">
          <img
            src={logo}
            alt="Logo de l’établissement"
            className="h-20 w-20 rounded-2xl bg-white object-contain p-2"
          />

          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              Espace pédagogique
            </p>
            <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
             Suivi pédagogique des élèves en difficultés scolaires
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Suivi individualisé et plan de remédiation des élèves
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Choix de classe */}
        <section>
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-wider text-[#b18a13]">
              Tableau de bord
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#102a43]">
              Les niveaux
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Choisissez un niveau pour consulter les élèves enregistrés.
            </p>
          </div>

{loadingClasses ? (
            <p className="rounded-xl bg-white p-5 text-slate-500 shadow-sm">
              Chargement des niveaux...
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {classes.map((classe) => (
                <button
                  key={classe.id}
                  type="button"
                  onClick={() => chooseClass(classe)}
                  className={`rounded-2xl border p-5 text-left transition duration-200 hover:-translate-y-1 hover:shadow-md ${
                    selectedClass?.id === classe.id
                      ? "border-[#d6a928] bg-[#102a43] text-white shadow-md"
                      : "border-slate-200 bg-white text-[#102a43] hover:border-[#d6a928]"
                  }`}
                >
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#d6a928] font-extrabold text-[#102a43]">
                    ➜
                  </span>
                  <span className="font-bold">{classe.nom}</span>
                  <span
                    className={`mt-1 block text-xs ${
                      selectedClass?.id === classe.id
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    Voir les élèves
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>


        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Liste des élèves */}
        {selectedClass && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#b18a13]">
                  Niveau sélectionné
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#102a43]">
                  Niveau {selectedClass.nom}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    resetNewStudentForm();
                    setShowAddStudent((visible) => !visible);
                  }}
                  className="rounded-lg bg-[#d6a928] px-4 py-2 text-sm font-bold text-[#102a43] transition hover:bg-amber-400"
                >
                  + Ajouter un élève
                </button>
                <button
                type="button"
                onClick={() => {
                  setSelectedClass(null);
                  setSelectedStudent(null);
                  setPlan(INITIAL_PLAN);
                  setError("");
                }}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Toutes les classes
                </button>
              </div>
            </div>

            {studentMessage && (
              <p className={`mt-4 rounded-lg p-3 text-sm ${
                studentMessageError
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}>
                {studentMessage}
              </p>
            )}

            {showAddStudent && (
              <form
                onSubmit={addStudent}
                className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/50 p-5"
              >
                <h3 className="mb-4 text-lg font-extrabold text-[#102a43]">
                  Ajouter un élève — Classe {selectedClass.nom}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nom">
                    <input
                      required
                      maxLength={100}
                      className={inputClass}
                      value={newStudent.nom}
                      onChange={(e) => setNewStudent({ ...newStudent, nom: e.target.value })}
                      placeholder="Nom"
                    />
                  </Field>
                  <Field label="Prénom">
                    <input
                      required
                      maxLength={100}
                      className={inputClass}
                      value={newStudent.prenom}
                      onChange={(e) => setNewStudent({ ...newStudent, prenom: e.target.value })}
                      placeholder="Prénom"
                    />
                  </Field>
                  <Field label="Année de naissance">
                    <input
                      required
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      className={inputClass}
                      value={newStudent.annee_naissance}
                      onChange={(e) => setNewStudent({ ...newStudent, annee_naissance: e.target.value })}
                    />
                  </Field>
                  <Field label="Photo de l’élève">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-amber-100 file:px-3 file:py-2`}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (studentPhotoPreview) URL.revokeObjectURL(studentPhotoPreview);
                        setStudentPhotoPreview(file ? URL.createObjectURL(file) : "");
                        setNewStudent({ ...newStudent, photo: file });
                        setStudentMessage("");
                      }}
                    />
                    <p className="mt-1 text-xs text-slate-500">JPG, PNG ou WEBP · 5 Mo maximum</p>
                    {studentPhotoPreview && (
                      <img
                        src={studentPhotoPreview}
                        alt="Aperçu de la photo"
                        className="mt-3 h-20 w-20 rounded-full border border-slate-200 object-cover"
                      />
                    )}
                  </Field>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={savingStudent}
                    className="rounded-xl bg-[#102a43] px-5 py-3 font-bold text-white transition hover:bg-blue-900 disabled:opacity-50"
                  >
                    {savingStudent ? "Enregistrement..." : "Enregistrer l’élève"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddStudent(false);
                      resetNewStudentForm();
                    }}
                    className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}

            {loadingStudents ? (
              <p className="mt-6 text-sm text-slate-500">
                Chargement des élèves...
              </p>
            ) : students.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="font-semibold text-[#102a43]">
                  Aucun élève enregistré dans cette classe.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Ajoutez des élèves dans la base de données pour les afficher
                  ici.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {students.map((student) => (
                  <button
                    key={student.id}
                    type="button"
                    onClick={() => chooseStudent(student)}
                    className={`flex items-center gap-4 rounded-xl border p-4 text-left transition hover:border-[#d6a928] hover:bg-amber-50 ${
                      selectedStudent?.id === student.id
                        ? "border-[#d6a928] bg-amber-50"
                        : "border-slate-200"
                    }`}
                  >
                    {student.photo ? (
                      <img
                        src={student.photo.startsWith("http") || student.photo.startsWith("/") ? student.photo : `${API_URL}/${student.photo}`}
                        alt=""
                        className="h-14 w-14 rounded-full border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#102a43] text-lg font-bold text-amber-300">
                        {`${student.prenom?.[0] ?? ""}${student.nom?.[0] ?? ""}`}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate font-bold text-[#102a43]">
                        {student.prenom} {student.nom}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Classe {selectedClass.nom}
                      </p>
                      <p className="mt-2 text-xs font-semibold text-[#9b7610]">
                        Consulter le dossier →
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Statistiques du tableau de bord */}
<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {[
    {
      label: "Total des élèves",
      value: dashboardStats.totalEleves,
      icon: "👨‍🎓",
    },
    {
      label: "Total des niveaux",
      value: dashboardStats.totalClasses,
      icon: "🏫",
    },
    {
      label: "Plans de remédiation",
      value: dashboardStats.plans,
      icon: "📋",
    },
    {
      label: "Suivis des activités",
      value: dashboardStats.suivis,
      icon: "📈",
    },
    {
      label: "Bilans trimestriels",
      value: dashboardStats.bilans,
      icon: "📊",
    },
    {
      label: "Bilans finaux",
      value: dashboardStats.bilansFinaux,
      icon: "🎯",
    },
  ].map((stat) => (
    <div
      key={stat.label}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {stat.label}
        </p>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-xl">
          {stat.icon}
        </span>
      </div>

      <p className="mt-4 text-3xl font-extrabold text-[#102a43]">
        {loadingDashboard ? "..." : stat.value}
      </p>
    </div>
  ))}
</div>

<div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <h3 className="mb-5 text-lg font-extrabold text-[#102a43]">
    Statistiques de l'application
  </h3>

  <div className="h-72 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={[
          { nom: "Élèves", total: dashboardStats.totalEleves },
          { nom: "Classes", total: dashboardStats.totalClasses },
          { nom: "Plans", total: dashboardStats.plans },
          { nom: "Suivis", total: dashboardStats.suivis },
          { nom: "Bilans", total: dashboardStats.bilans },
          { nom: "Bilans finaux", total: dashboardStats.bilansFinaux },
        ]}
        margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="nom" tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="total" fill="#d6a928" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

          

        {/* Dossier de l'élève */}
        {selectedStudent && (
          <section
            id="dossier-eleve"
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#b18a13]">
                  Dossier individuel
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#102a43] sm:text-3xl">
                  {selectedStudent.prenom} {selectedStudent.nom}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Informations et suivi pédagogique de l’élève
                </p>
              </div>

              <div className="no-print flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#d6a928] px-4 py-2 text-sm font-bold text-[#102a43] transition hover:bg-amber-400"
                >
                  <span aria-hidden="true">⬇</span>
                  Télécharger le dossier (PDF)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStudent(null);
                    setPlan(INITIAL_PLAN);
                    setPlanMessage("");
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Fermer le dossier
                </button>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="mt-7">
              <h3 className="text-lg font-bold text-[#102a43]">
                1. Informations de l’élève
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Nom
                  </p>
                  <p className="mt-2 font-bold text-[#102a43]">
                    {selectedStudent.nom || "Non renseigné"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Prénom
                  </p>
                  <p className="mt-2 font-bold text-[#102a43]">
                    {selectedStudent.prenom || "Non renseigné"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Classe
                  </p>
                  <p className="mt-2 font-bold text-[#102a43]">
                    {selectedClass?.nom || "Non renseignée"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date de naissance
                  </p>
                  <p className="mt-2 font-bold text-[#102a43]">
                    {formatDate(selectedStudent.date_naissance)}
                  </p>
                </div>
              </div>
            </div>

            <div className="my-8 border-t border-slate-200" />

            {/* Plan de remédiation */}
            <form onSubmit={savePlan}>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#b18a13]">
                  Étape 1
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-[#102a43]">
                  Plan de remédiation
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Sélectionnez les difficultés, les domaines et les besoins,
                  puis définissez les actions prévues.
                </p>
              </div>

              {loadingPlan ? (
                <p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                  Chargement du plan de remédiation...
                </p>
              ) : (
                <>
                  <CheckboxGroup
                    title="A. Difficultés observées"
                    description="Cochez les difficultés identifiées chez cet élève."
                    options={DIFFICULTES}
                    values={plan.difficultes}
                    onChange={(value) => updatePlan("difficultes", value)}
                  />

                  <CheckboxGroup
                    title="B. Domaines concernés"
                    description="Sélectionnez les matières concernées."
                    options={DOMAINES}
                    values={plan.domaines}
                    onChange={(value) => updatePlan("domaines", value)}
                  />

                  <CheckboxGroup
                    title="C. Besoins identifiés"
                    description="Cochez les besoins prioritaires de l’élève."
                    options={BESOINS}
                    values={plan.besoins}
                    onChange={(value) => updatePlan("besoins", value)}
                  />

                  <div className="mt-8 border-t border-slate-200 pt-7">
                    <h4 className="font-bold text-[#102a43]">
                      D. Objectifs et actions
                    </h4>

                    <div className="mt-5 grid gap-5">
                      <Field label="Objectif de remédiation">
                        <textarea
                          rows={3}
                          value={plan.objectif}
                          onChange={(event) =>
                            updatePlan("objectif", event.target.value)
                          }
                          placeholder="Objectif à atteindre..."
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Actions prévues">
                        <textarea
                          rows={4}
                          value={plan.actions_prevues}
                          onChange={(event) =>
                            updatePlan("actions_prevues", event.target.value)
                          }
                          placeholder="Activités, stratégies et aides prévues..."
                          className={inputClass}
                        />
                      </Field>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Date de début">
                          <input
                            type="date"
                            value={plan.date_debut}
                            onChange={(event) =>
                              updatePlan("date_debut", event.target.value)
                            }
                            className={inputClass}
                          />
                        </Field>

                        <Field label="Date de révision">
                          <input
                            type="date"
                            value={plan.date_revision}
                            onChange={(event) =>
                              updatePlan("date_revision", event.target.value)
                            }
                            className={inputClass}
                          />
                        </Field>
                      </div>
                    </div>
                  </div>

                  {/* Enregistrement */}
                  <div className="mt-8 border-t border-slate-200 pt-6">
                    {planMessage && (
                      <div
                        role="status"
                        className={`mb-4 rounded-xl border p-4 text-sm ${
                          planError
                            ? "border-red-200 bg-red-50 text-red-700"
                            : "border-green-200 bg-green-50 text-green-800"
                        }`}
                      >
                        {planMessage}
                      </div>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-slate-500">
                        Élève :{" "}
                        <strong className="text-[#102a43]">
                          {selectedStudent.prenom} {selectedStudent.nom}
                        </strong>
                      </p>

                      <button
                        type="submit"
                        disabled={savingPlan}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#102a43] px-7 py-3 font-bold text-white shadow-sm transition hover:bg-[#183d5d] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {savingPlan ? (
                          "Enregistrement..."
                        ) : (
                          <>
                            <span>Enregistrer le plan</span>
                            <span aria-hidden="true">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
            
<div className="mt-10 border-t border-slate-200 pt-8">
  <p className="text-sm font-bold uppercase tracking-wider text-[#b18a13]">
    Étape 2
  </p>

  <h3 className="mt-1 text-2xl font-extrabold text-[#102a43]">
    Suivi des activités
  </h3>

  <p className="mt-2 text-sm text-slate-500">
    Ajoutez les activités réalisées et consignez les observations et résultats.
  </p>

  <form
    onSubmit={saveSuivi}
    className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5"
  >
    <h4 className="font-bold text-[#102a43]">
      Ajouter une activité
    </h4>

    <div className="mt-4 grid gap-5 sm:grid-cols-2">
      <Field label="Date de suivi">
        <input
          type="date"
          required
          value={nouveauSuivi.date_suivi}
          onChange={(event) =>
            setNouveauSuivi((prev) => ({
              ...prev,
              date_suivi: event.target.value,
            }))
          }
          className={inputClass}
        />
      </Field>

      <Field label="Activité réalisée">
        <input
          type="text"
          required
          value={nouveauSuivi.activite}
          onChange={(event) =>
            setNouveauSuivi((prev) => ({
              ...prev,
              activite: event.target.value,
            }))
          }
          placeholder="Ex. : Lecture guidée"
          className={inputClass}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Observation">
          <textarea
            rows={3}
            value={nouveauSuivi.observation}
            onChange={(event) =>
              setNouveauSuivi((prev) => ({
                ...prev,
                observation: event.target.value,
              }))
            }
            placeholder="Observations pendant l’activité..."
            className={inputClass}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Résultat obtenu">
          <textarea
            rows={3}
            value={nouveauSuivi.resultat}
            onChange={(event) =>
              setNouveauSuivi((prev) => ({
                ...prev,
                resultat: event.target.value,
              }))
            }
            placeholder="Résultat et progrès observés..."
            className={inputClass}
          />
        </Field>
      </div>
    </div>

    {suiviMessage && (
      <div
        role="status"
        className={`mt-4 rounded-xl border p-4 text-sm ${
          suiviError
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-green-200 bg-green-50 text-green-800"
        }`}
      >
        {suiviMessage}
      </div>
    )}

    <button
      type="submit"
      disabled={savingSuivi}
      className="mt-5 rounded-xl bg-[#102a43] px-6 py-3 font-bold text-white transition hover:bg-[#183d5d] disabled:opacity-60"
    >
      {savingSuivi ? "Enregistrement..." : "Enregistrer le suivi"}
    </button>
  </form>

  <div className="mt-8">
    <h4 className="font-bold text-[#102a43]">
      Historique des suivis
    </h4>

    {loadingSuivis ? (
      <p className="mt-4 text-sm text-slate-500">
        Chargement des suivis...
      </p>
    ) : suivis.length === 0 ? (
      <p className="mt-4 rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500">
        Aucun suivi enregistré pour cet élève.
      </p>
    ) : (
      <div className="mt-4 space-y-4">
        {suivis.map((suivi) => (
          <article
            key={suivi.id}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h5 className="font-bold text-[#102a43]">
                {suivi.activite}
              </h5>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-[#8b6b0b]">
                {suivi.date_suivi}
              </span>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Observation
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                  {suivi.observation || "Aucune observation"}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Résultat
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                  {suivi.resultat || "Aucun résultat renseigné"}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    )}
  </div>
</div>

<div className="mt-10 border-t border-slate-200 pt-8">
  <p className="text-sm font-bold uppercase tracking-wider text-[#b18a13]">
    Étape 3
  </p>

  <h3 className="mt-1 text-2xl font-extrabold text-[#102a43]">
    Évolution de l’élève
  </h3>

  <p className="mt-2 text-sm text-slate-500">
    Évaluez les progrès observés dans chaque domaine.
  </p>

  {loadingEvolution ? (
    <p className="mt-5 text-sm text-slate-500">
      Chargement de l’évaluation...
    </p>
  ) : (
    <form onSubmit={saveEvolution} className="mt-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          ["comprehension", "Compréhension"],
          ["lecture", "Lecture"],
          ["ecriture", "Écriture"],
          ["autonomie", "Autonomie"],
          ["attention", "Attention"],
        ].map(([field, label]) => (
          <Field key={field} label={label}>
            <select
              value={evolution[field]}
              onChange={(event) =>
                setEvolution((prev) => ({
                  ...prev,
                  [field]: event.target.value,
                }))
              }
              className={inputClass}
            >
              <option value="">Choisir une évaluation</option>
              {[
                "Très bien",
                "Satisfaisant",
                "Léger",
                "Aucun",
                "Persistant",
              ].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </Field>
        ))}

        <Field label="Date de l’évaluation">
          <input
            type="date"
            value={evolution.date_evaluation}
            onChange={(event) =>
              setEvolution((prev) => ({
                ...prev,
                date_evaluation: event.target.value,
              }))
            }
            className={inputClass}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Observations générales">
            <textarea
              rows={4}
              value={evolution.observations}
              onChange={(event) =>
                setEvolution((prev) => ({
                  ...prev,
                  observations: event.target.value,
                }))
              }
              placeholder="Progrès constatés, difficultés persistantes..."
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      {evolutionMessage && (
        <div
          role="status"
          className={`mt-5 rounded-xl border p-4 text-sm ${
            evolutionError
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-800"
          }`}
        >
          {evolutionMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={savingEvolution}
        className="mt-5 rounded-xl bg-[#102a43] px-6 py-3 font-bold text-white transition hover:bg-[#183d5d] disabled:opacity-60"
      >
        {savingEvolution
          ? "Enregistrement..."
          : "Enregistrer l’évolution"}
      </button>
    </form>
  )}
</div>

<div className="mt-10 border-t border-slate-200 pt-8">
  <p className="text-sm font-bold uppercase tracking-wider text-[#b18a13]">
    Étape 4
  </p>

  <h3 className="mt-1 text-2xl font-extrabold text-[#102a43]">
    Communication avec la famille
  </h3>

  <p className="mt-2 text-sm text-slate-500">
    Enregistrez les rencontres et les décisions prises avec la famille.
  </p>

  <form onSubmit={saveCommunication} className="mt-6">
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Date de la rencontre">
        <input
          type="date"
          required
          value={nouvelleCommunication.date_rencontre}
          onChange={(event) =>
            setNouvelleCommunication((prev) => ({
              ...prev,
              date_rencontre: event.target.value,
            }))
          }
          className={inputClass}
        />
      </Field>

      <Field label="Motif de la rencontre">
        <input
          value={nouvelleCommunication.motif}
          onChange={(event) =>
            setNouvelleCommunication((prev) => ({
              ...prev,
              motif: event.target.value,
            }))
          }
          placeholder="Ex. : difficultés scolaires"
          className={inputClass}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Difficultés abordées">
          <textarea
            rows={3}
            value={nouvelleCommunication.difficultes_abordees}
            onChange={(event) =>
              setNouvelleCommunication((prev) => ({
                ...prev,
                difficultes_abordees: event.target.value,
              }))
            }
            className={inputClass}
            placeholder="Difficultés discutées avec la famille..."
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Observations des parents">
          <textarea
            rows={3}
            value={nouvelleCommunication.observations_parents}
            onChange={(event) =>
              setNouvelleCommunication((prev) => ({
                ...prev,
                observations_parents: event.target.value,
              }))
            }
            className={inputClass}
            placeholder="Remarques et informations partagées par les parents..."
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Décisions et recommandations">
          <textarea
            rows={3}
            value={nouvelleCommunication.decisions_recommandations}
            onChange={(event) =>
              setNouvelleCommunication((prev) => ({
                ...prev,
                decisions_recommandations: event.target.value,
              }))
            }
            className={inputClass}
            placeholder="Actions convenues avec la famille..."
          />
        </Field>
      </div>
    </div>

    {communicationMessage && (
      <div
        role="status"
        className={`mt-5 rounded-xl border p-4 text-sm ${
          communicationError
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-green-200 bg-green-50 text-green-800"
        }`}
      >
        {communicationMessage}
      </div>
    )}

    <button
      type="submit"
      disabled={savingCommunication}
      className="mt-5 rounded-xl bg-[#102a43] px-6 py-3 font-bold text-white transition hover:bg-[#183d5d] disabled:opacity-60"
    >
      {savingCommunication
        ? "Enregistrement..."
        : "Enregistrer la rencontre"}
    </button>
  </form>

  <div className="mt-8">
    <h4 className="text-lg font-bold text-[#102a43]">
      Historique des rencontres
    </h4>

    {loadingCommunications ? (
      <p className="mt-3 text-sm text-slate-500">
        Chargement des rencontres...
      </p>
    ) : communications.length === 0 ? (
      <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
        Aucune rencontre enregistrée pour cet élève.
      </p>
    ) : (
      <div className="mt-4 space-y-4">
        {communications.map((communication) => (
          <article
            key={communication.id}
            className="rounded-xl border border-slate-200 p-5"
          >
            <p className="font-bold text-[#102a43]">
              Rencontre du {formatDate(communication.date_rencontre)}
            </p>

            {communication.motif && (
              <p className="mt-2 text-sm text-slate-700">
                <strong>Motif :</strong> {communication.motif}
              </p>
            )}

            {communication.difficultes_abordees && (
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                <strong>Difficultés abordées :</strong>{" "}
                {communication.difficultes_abordees}
              </p>
            )}

            {communication.observations_parents && (
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                <strong>Observations des parents :</strong>{" "}
                {communication.observations_parents}
              </p>
            )}

            {communication.decisions_recommandations && (
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                <strong>Décisions et recommandations :</strong>{" "}
                {communication.decisions_recommandations}
              </p>
            )}
          </article>
        ))}
      </div>
    )}
  </div>
</div>

<div className="mt-10 border-t border-slate-200 pt-8">
  <p className="text-sm font-bold uppercase tracking-wider text-[#b18a13]">
    Étape 5
  </p>

  <h3 className="mt-1 text-2xl font-extrabold text-[#102a43]">
    Bilans trimestriels
  </h3>

  <p className="mt-2 text-sm text-slate-500">
    Évaluez les acquis, les difficultés persistantes et les recommandations.
  </p>

  <form onSubmit={saveBilan} className="mt-6">
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Trimestre">
        <select
          value={nouveauBilan.trimestre}
          onChange={(event) =>
            setNouveauBilan((prev) => ({
              ...prev,
              trimestre: event.target.value,
            }))
          }
          className={inputClass}
        >
          <option value="1">1er trimestre</option>
          <option value="2">2ème trimestre</option>
          <option value="3">3ème trimestre</option>
        </select>
      </Field>

      <Field label="Année scolaire">
        <input
          required
          pattern="\d{4}-\d{4}"
          title="Format attendu : 2026-2027"
          value={nouveauBilan.annee_scolaire}
          onChange={(event) =>
            setNouveauBilan((prev) => ({
              ...prev,
              annee_scolaire: event.target.value,
            }))
          }
          placeholder="2026-2027"
          className={inputClass}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Acquis et progrès constatés">
          <textarea
            rows={3}
            value={nouveauBilan.acquis}
            onChange={(event) =>
              setNouveauBilan((prev) => ({
                ...prev,
                acquis: event.target.value,
              }))
            }
            placeholder="Compétences acquises, progrès observés..."
            className={inputClass}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Difficultés persistantes">
          <textarea
            rows={3}
            value={nouveauBilan.difficultes_persistantes}
            onChange={(event) =>
              setNouveauBilan((prev) => ({
                ...prev,
                difficultes_persistantes: event.target.value,
              }))
            }
            placeholder="Difficultés qui nécessitent encore un accompagnement..."
            className={inputClass}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Recommandations">
          <textarea
            rows={3}
            value={nouveauBilan.recommandations}
            onChange={(event) =>
              setNouveauBilan((prev) => ({
                ...prev,
                recommandations: event.target.value,
              }))
            }
            placeholder="Actions et adaptations à prévoir..."
            className={inputClass}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Appréciation générale">
          <textarea
            rows={3}
            value={nouveauBilan.appreciation_generale}
            onChange={(event) =>
              setNouveauBilan((prev) => ({
                ...prev,
                appreciation_generale: event.target.value,
              }))
            }
            placeholder="Synthèse générale du trimestre..."
            className={inputClass}
          />
        </Field>
      </div>
    </div>

    {bilanMessage && (
      <div
        role="status"
        className={`mt-5 rounded-xl border p-4 text-sm ${
          bilanError
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-green-200 bg-green-50 text-green-800"
        }`}
      >
        {bilanMessage}
      </div>
    )}

    <button
      type="submit"
      disabled={savingBilan}
      className="mt-5 rounded-xl bg-[#102a43] px-6 py-3 font-bold text-white transition hover:bg-[#183d5d] disabled:opacity-60"
    >
      {savingBilan ? "Enregistrement..." : "Enregistrer le bilan"}
    </button>
  </form>

  <div className="mt-8">
    <h4 className="text-lg font-bold text-[#102a43]">
      Historique des bilans
    </h4>

    {loadingBilans ? (
      <p className="mt-3 text-sm text-slate-500">
        Chargement des bilans...
      </p>
    ) : bilans.length === 0 ? (
      <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
        Aucun bilan enregistré pour cet élève.
      </p>
    ) : (
      <div className="mt-4 space-y-4">
        {bilans.map((bilan) => (
          <article
            key={bilan.id}
            className="rounded-xl border border-slate-200 p-5"
          >
            <p className="font-bold text-[#102a43]">
              {bilan.trimestre === "1"
                ? "1er trimestre"
                : bilan.trimestre === "2"
                ? "2ème trimestre"
                : "3ème trimestre"}{" "}
              — Année scolaire {bilan.annee_scolaire}
            </p>

            {bilan.acquis && (
              <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">
                <strong>Acquis :</strong> {bilan.acquis}
              </p>
            )}

            {bilan.difficultes_persistantes && (
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                <strong>Difficultés persistantes :</strong>{" "}
                {bilan.difficultes_persistantes}
              </p>
            )}

            {bilan.recommandations && (
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                <strong>Recommandations :</strong>{" "}
                {bilan.recommandations}
              </p>
            )}

            {bilan.appreciation_generale && (
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                <strong>Appréciation générale :</strong>{" "}
                {bilan.appreciation_generale}
              </p>
            )}
          </article>
        ))}
      </div>
    )}
  </div>
</div>


{/* Étape 6 — Bilan final */}
<div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
  <h2 className="mb-2 text-xl font-bold text-slate-800">
    Étape 6 — Bilan final
  </h2>

  <p className="mb-6 text-sm text-slate-500">
    Synthèse finale des progrès et des difficultés de l’élève.
  </p>

  {loadingBilanFinal ? (
    <p className="text-slate-500">Chargement du bilan final...</p>
  ) : (
    <form onSubmit={saveBilanFinal} className="space-y-5">
      <Field label="Date du bilan">
        <input
          type="date"
          className={inputClass}
          value={nouveauBilanFinal.date_bilan}
          onChange={(e) =>
            setNouveauBilanFinal({
              ...nouveauBilanFinal,
              date_bilan: e.target.value,
            })
          }
        />
      </Field>

      <Field label="Synthèse des progrès">
        <textarea
          className={inputClass}
          rows={3}
          value={nouveauBilanFinal.synthese_progres}
          onChange={(e) =>
            setNouveauBilanFinal({
              ...nouveauBilanFinal,
              synthese_progres: e.target.value,
            })
          }
          placeholder="Résumer les progrès réalisés par l’élève..."
        />
      </Field>

      <Field label="Difficultés restantes">
        <textarea
          className={inputClass}
          rows={3}
          value={nouveauBilanFinal.difficultes_restantes}
          onChange={(e) =>
            setNouveauBilanFinal({
              ...nouveauBilanFinal,
              difficultes_restantes: e.target.value,
            })
          }
          placeholder="Préciser les difficultés qui persistent..."
        />
      </Field>

      <Field label="Objectifs atteints">
        <textarea
          className={inputClass}
          rows={3}
          value={nouveauBilanFinal.objectifs_atteints}
          onChange={(e) =>
            setNouveauBilanFinal({
              ...nouveauBilanFinal,
              objectifs_atteints: e.target.value,
            })
          }
          placeholder="Indiquer les objectifs atteints..."
        />
      </Field>

      <Field label="Recommandations finales">
        <textarea
          className={inputClass}
          rows={3}
          value={nouveauBilanFinal.recommandations_finales}
          onChange={(e) =>
            setNouveauBilanFinal({
              ...nouveauBilanFinal,
              recommandations_finales: e.target.value,
            })
          }
          placeholder="Proposer les prochaines étapes..."
        />
      </Field>

      <Field label="Conclusion générale">
        <textarea
          className={inputClass}
          rows={3}
          value={nouveauBilanFinal.conclusion}
          onChange={(e) =>
            setNouveauBilanFinal({
              ...nouveauBilanFinal,
              conclusion: e.target.value,
            })
          }
          placeholder="Conclusion générale sur le parcours de l’élève..."
        />
      </Field>

      {bilanFinalMessage && (
        <p
          className={
            bilanFinalError
              ? "text-sm text-red-600"
              : "text-sm text-green-600"
          }
        >
          {bilanFinalMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={savingBilanFinal}
        className="rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50"
      >
        {savingBilanFinal ? "Enregistrement..." : "Enregistrer le bilan final"}
      </button>
    </form>
  )}
</div>

          </section>
        )}

        <footer className="pb-5 text-center text-xs text-slate-400">
          Suivi des difficultés scolaires · Espace de suivi pédagogique
        </footer>
      </main>
    </div>
  );
}
