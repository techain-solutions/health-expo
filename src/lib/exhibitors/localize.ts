import type { Locale } from "@/lib/site";

type LocalizableExhibitor = {
  slug: string;
  category: string;
  text: string;
  filterCategory?: string;
};

type ExhibitorCopy = Record<Exclude<Locale, "en">, { category: string; text: string }>;

const localizedCopy: Record<string, ExhibitorCopy> = {
  "nova-medical-group": {
    nl: { category: "Medisch toerisme", text: "Internationale zorgtrajecten en gespecialiseerde ziekenhuisdiensten." },
    tr: { category: "Sağlık turizmi", text: "Uluslararası hasta hizmetleri ve uzman hastane çözümleri." },
    ru: { category: "Медицинский туризм", text: "Международные программы лечения и услуги профильных клиник." },
    ar: { category: "السياحة العلاجية", text: "مسارات رعاية دولية وخدمات مستشفيات متخصصة." },
  },
  "althea-aesthetics": {
    nl: { category: "Esthetische geneeskunde", text: "Moderne, niet-chirurgische esthetische behandelingen waarbij de patiënt centraal staat." },
    tr: { category: "Estetik tıp", text: "Hasta odaklı, modern ve cerrahi olmayan estetik uygulamalar." },
    ru: { category: "Эстетическая медицина", text: "Современные безоперационные эстетические процедуры с фокусом на пациенте." },
    ar: { category: "الطب التجميلي", text: "علاجات تجميلية حديثة غير جراحية تضع المريض في المقام الأول." },
  },
  "lumen-skin-science": {
    nl: { category: "Huidverzorging", text: "Professionele huidverzorging en diagnostische innovatie, onderbouwd door onderzoek." },
    tr: { category: "Cilt bakımı", text: "Kanıta dayalı profesyonel cilt bakımı ürünleri ve ileri düzey tanısal yenilikler sunuyoruz." },
    ru: { category: "Уход за кожей", text: "Профессиональный уход за кожей и диагностические инновации, основанные на исследованиях." },
    ar: { category: "العناية بالبشرة", text: "عناية احترافية بالبشرة وابتكار تشخيصي يستندان إلى الأدلة العلمية." },
  },
  "origin-wellness-lab": {
    nl: { category: "Wellness", text: "Holistische programma’s voor lichaam, geest en duurzaam welzijn." },
    tr: { category: "Wellness", text: "Beden, zihin ve sürdürülebilir iyilik hâli için bütünsel programlar." },
    ru: { category: "Велнес", text: "Комплексные программы для тела, разума и устойчивого благополучия." },
    ar: { category: "العافية", text: "برامج شاملة للجسد والعقل والرفاه المستدام." },
  },
  "vita-preventive-care": {
    nl: { category: "Preventieve zorg", text: "Persoonlijk inzicht in gezondheid, screening en ondersteuning voor een gezonde leefstijl." },
    tr: { category: "Koruyucu sağlık", text: "Kişisel sağlık içgörüsü, tarama ve yaşam tarzı desteği." },
    ru: { category: "Профилактическая медицина", text: "Персональная оценка здоровья, скрининг и поддержка здорового образа жизни." },
    ar: { category: "الرعاية الوقائية", text: "رؤية شخصية للصحة وفحوصات داعمة وأسلوب حياة صحي." },
  },
  "elara-hair-institute": {
    nl: { category: "Haarverzorging", text: "Geavanceerde haarzorg, haarherstel en professionele producten." },
    tr: { category: "Saç bakımı", text: "Gelişmiş saç sağlığı, restorasyon ve profesyonel ürünler." },
    ru: { category: "Уход за волосами", text: "Передовые решения для здоровья и восстановления волос, а также профессиональные продукты." },
    ar: { category: "العناية بالشعر", text: "حلول متقدمة لصحة الشعر واستعادته ومنتجات احترافية." },
  },
  "derma-vita-clinics": {
    nl: { category: "Dermatologie", text: "Gespecialiseerde dermatologische zorg die diagnostiek combineert met geavanceerde huidbehandelingen." },
    tr: { category: "Dermatoloji", text: "Tanı ile ileri düzey cilt tedavilerini birleştiren uzman dermatoloji bakımı." },
    ru: { category: "Дерматология", text: "Специализированная дерматологическая помощь, сочетающая диагностику с передовыми методами лечения кожи." },
    ar: { category: "الأمراض الجلدية", text: "رعاية جلدية متخصصة تجمع بين التشخيص وأحدث علاجات البشرة." },
  },
  "pulse-fitness-collective": {
    nl: { category: "Fitness & beweging", text: "Bewegingscoaching en hersteltrajecten voor een actieve, gezonde levensstijl." },
    tr: { category: "Fitness ve hareket", text: "Aktif ve sağlıklı yaşam tarzları için hareket koçluğu ve iyileşme programları." },
    ru: { category: "Фитнес и движение", text: "Программы двигательного коучинга и восстановления для активного и здорового образа жизни." },
    ar: { category: "اللياقة والحركة", text: "برامج تدريب حركي وتعافٍ لأسلوب حياة نشط وصحي." },
  },
  "medtech-solutions-group": {
    nl: { category: "Medische apparatuur", text: "Innovatieve medische apparatuur en diagnostische uitrusting voor moderne klinieken." },
    tr: { category: "Tıbbi cihazlar", text: "Modern klinikler için yenilikçi tıbbi cihazlar ve tanı ekipmanları." },
    ru: { category: "Медицинское оборудование", text: "Инновационное медицинское оборудование и диагностическая техника для современных клиник." },
    ar: { category: "الأجهزة الطبية", text: "أجهزة طبية ومعدات تشخيص مبتكرة للعيادات الحديثة." },
  },
  "nourish-nutrition-lab": {
    nl: { category: "Voeding", text: "Persoonlijke voedingsprogramma's ondersteund door klinisch onderzoek en coaching." },
    tr: { category: "Beslenme", text: "Klinik araştırma ve koçlukla desteklenen kişiselleştirilmiş beslenme programları." },
    ru: { category: "Питание", text: "Персонализированные программы питания, подкреплённые клиническими исследованиями и коучингом." },
    ar: { category: "التغذية", text: "برامج تغذية شخصية مدعومة بالأبحاث السريرية والتوجيه." },
  },
  "bella-cosmetic-group": {
    nl: { category: "Esthetische geneeskunde", text: "Premium niet-chirurgische esthetische behandelingen door gecertificeerde specialisten." },
    tr: { category: "Estetik tıp", text: "Sertifikalı uzmanlar tarafından uygulanan premium cerrahi olmayan estetik tedaviler." },
    ru: { category: "Эстетическая медицина", text: "Премиальные неинвазивные эстетические процедуры от сертифицированных специалистов." },
    ar: { category: "الطب التجميلي", text: "علاجات تجميلية فاخرة غير جراحية يقدمها متخصصون معتمدون." },
  },
  "global-health-journeys": {
    nl: { category: "Medisch toerisme", text: "Volledige begeleiding bij medische reizen, met toegang tot erkende ziekenhuizen in het buitenland." },
    tr: { category: "Sağlık turizmi", text: "Hastaları yurt dışındaki akredite hastanelerle buluşturan uçtan uca sağlık seyahati planlaması." },
    ru: { category: "Медицинский туризм", text: "Полное сопровождение медицинских поездок с доступом к аккредитованным клиникам за рубежом." },
    ar: { category: "السياحة العلاجية", text: "تخطيط شامل للسفر العلاجي يربط المرضى بمستشفيات معتمدة في الخارج." },
  },
  "zenith-wellness-retreats": {
    nl: { category: "Wellness", text: "Meeslepende wellnessretraites die mindfulness, beweging en holistische therapieën combineren." },
    tr: { category: "Wellness", text: "Farkındalık, hareket ve bütünsel terapileri bir araya getiren sürükleyici wellness kaçamakları." },
    ru: { category: "Велнес", text: "Комплексные велнес-ретриты, сочетающие осознанность, движение и холистические практики." },
    ar: { category: "العافية", text: "برامج عافية غامرة تجمع بين اليقظة الذهنية والحركة والعلاجات الشاملة." },
  },
  "radiance-skin-studio": {
    nl: { category: "Huidverzorging", text: "Boetiek voor huidverzorging met persoonlijke gezichtsbehandelingen en dermocosmetische producten." },
    tr: { category: "Cilt bakımı", text: "Kişiye özel cilt bakımı ve dermokozmetik ürünler sunan butik cilt stüdyosu." },
    ru: { category: "Уход за кожей", text: "Бутик-студия по уходу за кожей с индивидуальными процедурами и дермокосметикой." },
    ar: { category: "العناية بالبشرة", text: "استوديو عناية بالبشرة يقدم جلسات مخصصة ومنتجات تجميلية جلدية." },
  },
  "momentum-physio-movement": {
    nl: { category: "Fitness & beweging", text: "Fysiotherapie-gestuurde bewegingsprogramma's voor blessurepreventie en sportprestaties." },
    tr: { category: "Fitness ve hareket", text: "Yaralanma önleme ve sportif performans için fizyoterapi destekli hareket programları." },
    ru: { category: "Фитнес и движение", text: "Программы движения под руководством физиотерапевтов для профилактики травм и спортивных результатов." },
    ar: { category: "اللياقة والحركة", text: "برامج حركية بإشراف علاج طبيعي للوقاية من الإصابات وتحسين الأداء الرياضي." },
  },
};

export function localizeExhibitor<T extends LocalizableExhibitor>(exhibitor: T, locale: Locale): T {
  if (locale === "en") return exhibitor;
  const copy = localizedCopy[exhibitor.slug]?.[locale];
  return copy ? { ...exhibitor, ...copy, filterCategory: exhibitor.filterCategory ?? exhibitor.category } : exhibitor;
}
