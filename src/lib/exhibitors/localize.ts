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
};

export function localizeExhibitor<T extends LocalizableExhibitor>(exhibitor: T, locale: Locale): T {
  if (locale === "en") return exhibitor;
  const copy = localizedCopy[exhibitor.slug]?.[locale];
  return copy ? { ...exhibitor, ...copy, filterCategory: exhibitor.filterCategory ?? exhibitor.category } : exhibitor;
}
