import type { Dictionary } from "./en";

export const tr: Dictionary = {
  shell: {
    skipToContent: "İçeriğe geç",
    homeLabel: "Health and Beauty Expo ana sayfa",
    primaryNav: "Ana gezinme",
    mobileNav: "Mobil gezinme",
    openNav: "Menüyü aç",
    closeNav: "Menüyü kapat",
    selectLanguage: "Dil seçin",
    currentLanguage: "geçerli dil",
    nav: {
      about: "Hakkımızda",
      exhibitors: "Katılımcılar",
      program: "Program",
      visit: "Ziyaret",
      tickets: "Biletler",
      plan: "Fuar planı",
      fairMatch: "Fair Match",
      exhibit: "Katıl",
      media: "Medya",
      contact: "İletişim",
      explore: "Keşfet",
      participate: "Katılım",
      documents: "Belgeler",
      planVisit: "Ziyaretini planla",
    },
    navHints: {
      tickets: "Giriş ve etkinlik bilgileri",
      visit: "Mekan, tarihler ve pratik bilgiler",
      plan: "Fuar yerleşimini keşfedin",
      fairMatch: "Kişisel tanıştırma talep edin",
    },
    footer: {
      tagline: "Sağlık, güzellik, iyi yaşam ve uluslararası fırsatların buluştuğu yer.",
      socialLabel: "Sosyal medya",
      standPackages: "Stant paketleri",
      sponsorship: "Sponsorluk",
      participantGuide: "Katılımcı rehberi",
      exhibitorManualEn: "Katılımcı el kitabı (EN)",
      participantManualNl: "Katılımcı el kitabı (NL)",
      exhibitorAgreement: "Katılımcı sözleşmesi",
      standPriceList: "Stant fiyat listesi",
      floorPlanPdf: "Fuar planı (PDF)",
      generalTerms: "Genel koşullar",
      paris: "Paris 2027",
      dates: "24–25 EKİM 2026",
      venue: "De Broodfabriek",
      city: "Rijswijk, Hollanda",
      hours: "Açılış 10:00–18:00",
      rights: "© 2026 Health & Beauty Expo",
      privacy: "Gizlilik",
      cookies: "Çerezler",
      terms: "Koşullar",
    },
  },

  common: {
    home: "Ana sayfa",
    viewProfile: "Profili görüntüle",
    viewAllExhibitors: "Tüm katılımcıları gör",
    allExhibitors: "Tüm katılımcılar",
    visitWebsite: "Web sitesini ziyaret et",
    openInNewTab: "yeni sekmede açılır",
    selectOne: "Bir seçenek belirleyin",
    required: "zorunlu",
  },

  forms: {
    consent:
      "Bu talebin işlenmesi için bilgilerimin kullanılmasını kabul ediyorum. Verilerinizin nasıl ve ne kadar süre saklandığını gizlilik politikasında bulabilirsiniz.",
    consentRequired: "Talebinizi işleyebilmemiz için onay kutusunu işaretleyin.",
    sending: "Talebiniz gönderiliyor…",
    success: "Teşekkürler. Talebiniz alındı; organizasyon ekibi e-posta ile dönüş yapacak.",
    error: "Talebinizi gönderemedik. İşaretli alanları kontrol edip tekrar deneyin.",
    rateLimited: "Kısa süre içinde birkaç talep gönderdiniz. Lütfen birkaç dakika sonra tekrar deneyin.",
    invalid: "Bazı bilgiler eksik veya hatalı. Formu gözden geçirip tekrar deneyin.",
    note: "Talebiniz organizasyon ekibine iletilir; ekip e-posta ile yanıt verir.",
    privacyLink: "Gizlilik politikası",
  },

  event: {
    eyebrowFallback: "Rijswijk 2026 · Uluslararası sağlık, güzellik ve iyi yaşam fuarı",
    datesFallback: "24–25 Ekim 2026",
    hoursFallback: "10:00–18:00",
    venueFallback: "De Broodfabriek",
    cityFallback: "Rijswijk, NL",
    addressFallback: "Volmerlaan 12, 2288 GD Rijswijk",
  },

  home: {
    title: "Health & Beauty Expo Rijswijk 2026",
    description:
      "Rijswijk'teki De Broodfabriek'te sağlık profesyonellerini, güzellik yenilikçilerini, wellness uzmanlarını ve uluslararası sağlık turizmi temsilcilerini bir araya getiren iki ilham verici fuar günü.",
    heroImageAlt: "Uluslararası bir sağlık ve güzellik fuarında buluşan profesyoneller",
    exploreSuffix: "fuarı",
    sectors: ["Sağlık", "Güzellik", "İyi yaşam", "Sağlık turizmi"],
    experience: {
      kicker: "DENEYİM",
      title: "Daha iyi bakımı ve daha iyi yaşamı şekillendiren fikirleri keşfedin.",
      text: "Ulusal ve uluslararası markalar, profesyoneller ve ziyaretçiler; keşif, canlı uygulama ve değerli iş bağlantıları için iki gün bir arada.",
      cards: [
        {
          kicker: "CANLI DENEYİM",
          title: "İnovasyon iş başında",
          text: "Uzmanların sunduğu tedavileri, teknolojileri ve yeni ürünleri görün.",
        },
        {
          kicker: "İŞ",
          title: "Fark yaratan bağlantılar",
          text: "Farklı pazarlardan marka, klinik, iş ortağı ve karar vericilerle tanışın.",
        },
        {
          kicker: "KİŞİSEL KEŞİF",
          title: "Beden ve zihin için bakım",
          text: "Estetik, cilt bakımı, koruyucu sağlık ve bütünsel iyi yaşamı keşfedin.",
        },
      ],
    },
    ambition: {
      kicker: "HER HEDEF İÇİN",
      title: "Tek bir uluslararası buluşma noktası. Katılmanın birçok yolu.",
      text: "Ziyaret etmek, katılımcı olmak, profesyonel bir tanıştırma istemek veya sektörü haberleştirmek için.",
      cards: [
        {
          title: "Fuarı ziyaret edin",
          text: "Yeni tedavileri, ürünleri, bilgiyi ve uzman tavsiyesini keşfedin.",
          link: "Gününü planla",
        },
        {
          title: "Markanızı sergileyin",
          text: "Kurumunuzu uluslararası bir kitlenin önüne çıkarın.",
          link: "Paketleri gör",
        },
        {
          title: "Fair Match'i kullanın",
          text: "Ne aradığınızı ekibimize anlatın ve tanıştırma talep edin.",
          link: "Talep oluştur",
        },
        {
          title: "Medya olarak katılın",
          text: "Basın, içerik üreticileri ve influencer'lar için akreditasyon koşullarını inceleyin.",
          link: "Koşulları gör",
        },
      ],
    },
    featured: {
      kicker: "ÖNE ÇIKAN KATILIMCILAR",
      title: "Rijswijk 2026'ya katılan klinikler, markalar ve iş ortakları.",
      empty: "İlk katılımcılar kısa süre içinde burada duyurulacak.",
    },
    programme: {
      kicker: "PROGRAM",
      title: "Uzman görüşleri. Uygulanabilir fikirler. Anlamlı sohbetler.",
      text: "Konuşma ve canlı uygulama programı konuşmacılarımızla birlikte tamamlanıyor.",
      link: "Programı gör",
    },
    campaign: {
      kicker: "ULUSLARARASI SAĞLIK TURİZMİ",
      title: "Sağlığınız, önceliğimiz.",
      text: "Kampanyamız dünya standartlarında sağlık hizmetlerini, estetiği ve bütünsel iyi yaşamı birleştiriyor.",
      posterAlt: "Health and Beauty Expo tanıtım afişi",
      items: [
        { term: "Sağlık", text: "Dünya standartlarında sağlık ve sağlık turizmi profesyonelleri" },
        { term: "Güzellik", text: "Estetik ve kişisel bakım için yenilikçi çözümler" },
        { term: "İyi yaşam", text: "Beden, zihin ve ruh için bütünsel iyilik" },
      ],
      link: "Hikayemizi keşfedin",
    },
    fairMatch: {
      kicker: "FAIR MATCH",
      title: "Doğru klinikle tanışın, ekibimiz ayarlasın.",
      text: "Ne aradığınızı bize anlatın; ekibimiz fuarda kişisel bir tanıştırma ayarlar.",
      link: "Fair Match nasıl çalışır",
      steps: [
        { title: "Talebinizi gönderin", text: "Aradığınız bakımı, ürünü veya iş birliğini tanımlayın." },
        { title: "Biz inceleriz", text: "Ekibimiz talebinizi katılımcı firmalarla eşleştirir." },
        { title: "Kişisel takip", text: "Tanıştırmayı ayarlamak için e-posta ile size ulaşırız." },
      ],
    },
    cta: {
      title: "Rijswijk 2026'ya hazır mısınız?",
      text: "24–25 Ekim'de De Broodfabriek'te bize katılın.",
      label: "Bilet bilgileri",
    },
  },

  about: {
    title: "Sağlık ve güzelliğin birlikte büyüdüğü yer.",
    description:
      "Sağlık, güzellik ve wellness alanında keşif, marka görünürlüğü, uzmanlık ve anlamlı bağlantılar için profesyonel, uluslararası bir buluşma noktası.",
    metaTitle: "Fuar hakkında",
    heroImageAlt: "Health and Beauty Expo ziyaretçileri",
    primaryCta: "Fuarı ziyaret et",
    secondaryCta: "Katılımcı ol",
    positioning: {
      kicker: "KONUMLANDIRMAMIZ",
      title: "Bir fuardan fazlası—buluşma, öğrenme ve ilerleme yeri.",
      body1:
        "Health & Beauty Expo 2026, 24–25 Ekim'de Rijswijk'teki De Broodfabriek'te düzenlenir. İki günlük etkinlik ulusal ve uluslararası markaları, profesyonelleri ve ziyaretçileri buluşturur.",
      body2:
        "Fuar kozmetik, estetik uygulamalar, cilt bakımı, saç bakımı, iyi yaşam, koruyucu sağlık, yaşam tarzı ve sağlık turizmini kapsar.",
      quote: "“Kalite, görünürlük ve sonuç odaklı; ciddi, modern ve profesyonel bir uluslararası fuar.”",
      quoteSource: "Health & Beauty Expo 2026",
    },
    expect: {
      kicker: "NELER BEKLEYEBİLİRSİNİZ",
      title: "Eksiksiz bir sağlık ve güzellik deneyimi.",
      cards: [
        { title: "Canlı uygulamalar", text: "Uzmanların gösterdiği ve anlattığı tedaviler ve teknolojiler." },
        { title: "Yeni lansmanlar", text: "Fuarda pazara sunulan ürün ve hizmetler." },
        { title: "Kişisel danışmanlık", text: "Her sektörden profesyonellerle birebir görüşmeler." },
        { title: "Yeni bakış açıları", text: "Bakım, korunma ve iyi yaşam üzerine konuşmalar ve uygulamalar." },
        { title: "İş görünürlüğü", text: "Uluslararası bir profesyonel kitle önünde iki gün." },
        { title: "İnsani bağ", text: "Fuardan sonra da süren ilişkiler için zaman ve alan." },
      ],
    },
    stats: [
      { value: "2", label: "Tam fuar günü" },
      { value: "5", label: "Web sitesi dili" },
      { value: "4", label: "Ana sektör" },
      { value: "1", label: "Uluslararası buluşma noktası" },
    ],
    cta: {
      title: "Rijswijk edisyonunun parçası olun.",
      text: "Bu büyüyen sektörü şekillendiren kitleyle, iş ortaklarıyla ve uzmanlarla tanışın.",
      label: "Katılım seçeneklerini gör",
    },
  },

  exhibitors: {
    title: "Katılımcılarla tanışın.",
    description:
      "Rijswijk 2026'ya yön veren klinikleri, sağlık kuruluşlarını, güzellik yenilikçilerini, wellness uzmanlarını, tedarikçileri ve iş ortaklarını keşfedin.",
    metaTitle: "Katılımcılar",
    searchLabel: "Katılımcı ara",
    searchPlaceholder: "Katılımcı ara…",
    filterAll: "Tümü",
    empty: "Katılımcılar kısa süre içinde duyurulacak.",
    noMatches: "Aramanıza uyan katılımcı bulunamadı.",
    resultCount: "katılımcı gösteriliyor",
    cta: {
      title: "Katılımcı olmak ister misiniz?",
      text: "Rijswijk 2026 için stant paketlerini ve sponsorluk seçeneklerini karşılaştırın.",
      label: "Paketleri gör",
    },
  },

  exhibitorDetail: {
    metaTitlePrefix: "Katılımcı",
    featuredLabel: "Katılımcı",
    about: {
      kicker: "KATILIMCI HAKKINDA",
      title: "Rijswijk'te kiminle tanışacaksınız.",
    },
    categoryLabel: "Kategori",
    websiteLabel: "Web sitesi",
    fairMatch: {
      kicker: "FUARDA",
      title: "Tanıştırma talep edin.",
      text: "Ekibimiz fuar boyunca bu katılımcıyla kişisel bir tanıştırma ayarlayabilir.",
      link: "Fair Match'e git",
    },
  },

  program: {
    title: "Program ve konuşmacılar.",
    description:
      "Her iki fuar gününde pratik içgörüler, yeni fikirler ve sağlık-güzellik sektöründen sohbetler sunan konuşmalar, canlı uygulamalar ve uzman oturumları.\nProgramın tamamı etkinlikten önce açıklanacaktır.",
    metaTitle: "Program",
    pending: {
      title: "2026 programı tamamlanıyor.",
      text: "Konuşmacılar, konular ve oturum saatleri iş ortaklarımızla kesinleştiriliyor ve onaylanır onaylanmaz burada yayımlanıyor.\nBilgilendirilmek için iletişim formu üzerinden kaydolun.",
      cta: "Bana haber verin",
    },
    structure: {
      kicker: "NELER BEKLEYEBİLİRSİNİZ",
      title: "İki gün nasıl düzenleniyor.",
      cards: [
        { title: "Ana sahne", text: "Sağlık, güven ve uluslararası hasta bakımı üzerine açılış konuşmaları ve paneller." },
        { title: "Güzellik sahnesi", text: "Estetik uygulamaların, cilt ve saç bakımının canlı gösterimleri." },
        { title: "İyi yaşam köşesi", text: "Koruyucu sağlık, beslenme, hareket ve ruh sağlığı oturumları." },
      ],
    },
    speakers: {
      kicker: "KONUŞMACILAR",
      title: "Fuarda konuşmak ister misiniz?",
      text: "Paylaşacak uygulamalı deneyimi olan uzmanlardan, kliniklerden ve markalardan öneriler bekliyoruz.",
      cta: "Öneri gönder",
    },
    cta: {
      title: "Bir oturuma katılmak ister misiniz?",
      text: "Oturumlar fuar biletinize dahildir.",
      label: "Bilet bilgileri",
    },
  },

  tickets: {
    title: "Ziyaretinizi planlayın.",
    descriptionPrefix: "Hazırlanmanız için gereken her şey:",
    descriptionFallback: "Health & Beauty Expo Rijswijk 2026",
    metaTitle: "Biletler",
    openTickets: "Biletini al",
    ticketsPending: "Bilet satışı kısa süre içinde açılıyor. Haberdar olmak için bizimle iletişime geçin.",
    details: {
      kicker: "ETKİNLİK BİLGİLERİ",
      title: "İki gün uluslararası keşif.",
      dates: "Tarihler",
      hours: "Açılış saatleri",
      venue: "Mekan",
      format: "Format",
      formatFallback: "Halka açık fuar, profesyonel ağ kurma ve canlı uygulamalar",
    },
    visit: {
      kicker: "ZİYARETİNİZ",
      title: "Her şey net ve keyifli bir gün için tasarlandı.",
      cards: [
        { title: "Hazırlanın", text: "Gelmeden önce katılımcıları, sektörleri ve fuar planını inceleyin." },
        { title: "Keşfedin", text: "Sağlık, güzellik, iyi yaşam ve sağlık turizmini keşfedin." },
        { title: "Bağlantı kurun", text: "Fair Match ile kişisel tanıştırma talep edin." },
      ],
    },
    cta: {
      title: "Pratik bilgi mi gerekiyor?",
      text: "Mekan, erişilebilirlik ve ulaşım bilgilerini ziyaret sayfasında bulun.",
      label: "Yolculuğunu planla",
    },
  },

  visit: {
    title: "Rijswijk'teki gününüzü planlayın.",
    description: "Sorunsuz bir ziyaret için tarihler, açılış saatleri, mekan bilgileri ve pratik öneriler.",
    metaTitle: "Ziyaret",
    practical: {
      kicker: "PRATİK BİLGİLER",
      title: "De Broodfabriek, Rijswijk.",
      dates: "Tarihler",
      datesValue: "24–25 Ekim 2026",
      hours: "Açılış saatleri",
      hoursValue: "Her iki gün 10:00–18:00",
      venue: "Mekan",
      venueValue: "De Broodfabriek, Rijswijk, Hollanda",
      address: "Adres",
      addressValue: "Volmerlaan 12, 2288 GD Rijswijk",
      languages: "Diller",
      languagesValue: "Hollandaca, Türkçe, İngilizce, Rusça ve Arapça",
      planLink: "Fuar planını gör",
    },
    before: {
      kicker: "GELMEDEN ÖNCE",
      title: "Ziyaretinizden en iyi şekilde yararlanın.",
      cards: [
        { title: "Biletinizi alın", text: "Önceden alın, girişte sıra beklemeyin." },
        { title: "Katılımcılara bakın", text: "Görüşmek istediğiniz klinik ve markaları belirleyin." },
        { title: "Planı inceleyin", text: "Sahneleri, stantları ve ikram alanlarını bulun." },
        { title: "Fair Match", text: "Kişisel tanıştırmayı önceden ayarlamamızı isteyin." },
      ],
    },
    cta: {
      title: "Ziyaretinizle ilgili sorular mı var?",
      text: "Ekibimiz fuardan önce pratik bilgilerle yardımcı olabilir.",
      label: "Ekibe ulaşın",
    },
  },

  floorPlan: {
    title: "Fuar alanını keşfedin.",
    description: "Giriş, sahne, stant sıraları ve ikram alanlarını gösteren güncel fuar planı.",
    metaTitle: "Fuar planı",
    imageAlt: "Sahne, giriş, stantlar ve ikram alanlarını gösteren Health and Beauty Expo fuar planı",
    currentPlan: "Güncel fuar planı",
    openPdf: "PDF'i aç",
    openLarge: "Büyük görünümü aç",
    download: "Güncel planı indir",
    legend: ["Üst: sahne", "Orta: katılımcı stantları", "Alt: ana giriş", "Yanlar: ikram alanları"],
    cta: {
      title: "Görüşmek istediğiniz katılımcıları bulun.",
      text: "Salondaki rotanızı planlamadan önce listeye göz atın.",
      label: "Katılımcılara göz at",
    },
  },

  fairMatch: {
    title: "Fair Match",
    subtitle: "Tanıştırma talep edin.",
    description:
      "Ne aradığınızı anlatın; ekibimiz önceliklerinize en uygun uzmanlığa sahip katılımcıyla kişisel bir tanıştırma ayarlasın.",
    metaTitle: "Fair Match",
    heroCta: "Talep formuna git",
    how: {
      kicker: "NASIL ÇALIŞIR",
      title: "Net ve kişisel bir talep.",
      text: "Her talep, organizasyon ekibinden bir kişi tarafından dikkatle okunur ve değerlendirilir.\nOtomatik eşleştirme veya rezervasyon yapılmaz.",
      cards: [
        { title: "Talebinizi anlatın", text: "Aradığınız bağlantıyı veya bilgiyi paylaşın." },
        { title: "Ekibe gönderin", text: "Bilgileriniz doğrudan organizasyon ekibine ulaşır." },
        { title: "Kişisel takip", text: "Tanıştırmayı ayarlamak için e-posta ile size ulaşırız." },
      ],
    },
    participants: {
      kicker: "KATILIMCI FİRMALAR",
      title: "Kiminle tanıştırılabilirsiniz.",
      text: "Aktif her katılımcı bir Fair Match tanıştırmasına dahil edilebilir.",
      empty: "Katılımcı firmalar onayladıkça burada listelenecek.",
    },
    form: {
      kicker: "TANIŞTIRMA TALEBİ",
      title: "Kişisel tanıştırma talep edin.",
      intro: "İletişim bilgilerinizi ve talebinizi organizasyon ekibine gönderin.",
      noteTitle: "Kişisel takip",
      note: "E-posta ile yanıt veririz. Hiçbir şey otomatik olarak rezerve veya onaylanmaz.",
      formTitle: "Talebiniz",
      button: "Talebi gönder",
      fields: {
        firstName: "Ad",
        firstNamePlaceholder: "Adınız",
        lastName: "Soyad",
        lastNamePlaceholder: "Soyadınız",
        email: "E-posta",
        emailPlaceholder: "ad@ornek.com",
        phone: "Telefon",
        phonePlaceholder: "+90 …",
        request: "Ne arıyorsunuz?",
        requestPlaceholder: "İhtiyaç duyduğunuz tanıştırmayı veya bilgiyi anlatın.",
      },
    },
  },

  participate: {
    title: "Markanızı sohbetin merkezine taşıyın.",
    description: "Profesyonel görünürlük için tasarlanmış bir stant veya sponsorluk paketi seçin.",
    metaTitle: "Katıl",
    heroCta: "Paketleri karşılaştır",
    heroSecondary: "Katılımcı bilgileri",
    packages: {
      kicker: "STANT PAKETLERİ",
      title: "Kurumunuz için profesyonel bir platform.",
      text: "Fiyatlar 2026 stant fiyat listesinden alınmıştır ve KDV hariçtir.",
      popular: "POPÜLER",
      includes: [
        "Profesyonel stant alanı",
        "230V elektrik",
        "Masa ve sandalyeler",
        "Stant yerleşimi organizatör tarafından",
      ],
      request: "Bu standı talep et",
      previewStands12: "Stant 1 ve 2'ye bak",
      previewStands34: "Stant 3 ve 4'e bak",
      downloadPriceList: "Fiyat listesini indir",
    },
    sponsorship: {
      kicker: "SPONSORLUK",
      title: "Görünürlüğünüzü standın ötesine taşıyın.",
      text: "Dijital tanıtımı ve mekan görünürlüğünü birleştiren üç kademe.",
      tiers: [
        { name: "Bronz", text: "Web sitesinde ve ziyaretçi rehberinde logo yer alması." },
        { name: "Gümüş", text: "Web sitesi ve mekan markalaması ile sosyal medya tanıtımı." },
        { name: "Altın", text: "Mekanda, web sitesinde ve kampanyada öne çıkan markalama." },
      ],
    },
    form: {
      kicker: "KATILIM TALEBİ",
      title: "Nasıl katılmak istediğinizi bize anlatın.",
      intro: "Organizasyon ekibine kurumunuzu ve katılım ilginizi anlatın.",
      noteTitle: "Önemli tarih",
      note: "Ek elektrik ihtiyaçları 23 Eylül 2026'dan önce bildirilmelidir.",
      formTitle: "Kurum bilgileri",
      button: "Talebi gönder",
      fields: {
        company: "Firma adı",
        companyPlaceholder: "Kurumunuz",
        contact: "İlgili kişi",
        contactPlaceholder: "Ad soyad",
        email: "Kurumsal e-posta",
        emailPlaceholder: "ad@firma.com",
        phone: "Telefon",
        phonePlaceholder: "+90 …",
        interest: "İlgilendiğiniz paket",
        interestPlaceholder: "Paket seçin",
        about: "Kurumunuzdan bahsedin",
        aboutPlaceholder: "Ürünler, hizmetler ve stant ihtiyaçları.",
      },
    },
    cta: {
      title: "Katılımınız onaylandı mı?",
      text: "Lojistik, tarihler, güvenlik kuralları ve indirilebilir belgeleri inceleyin.",
      label: "Katılımcı rehberini aç",
    },
  },

  participantInfo: {
    title: "Katılımcı bilgileri.",
    description: "Onaylanmış katılımcılar için katılımcı el kitabının web özeti.",
    metaTitle: "Katılımcı bilgileri",
    downloadFull: "El kitabının tamamını indir",
    downloadEnglish: "İngilizce el kitabı",
    keyDates: {
      kicker: "ÖNEMLİ TARİHLER",
      title: "Sorunsuz bir fuar için erken hazırlanın.",
      items: [
        { term: "Ek elektrik", text: "İhtiyaçları 23 Eylül 2026'dan önce bildirin" },
        { term: "Stant talepleri", text: "Fuardan en az 30 gün önce iletin" },
        { term: "Fuar saatleri", text: "24–25 Ekim · 10:00–18:00" },
        { term: "Ödeme", text: "İmzalanan katılımcı sözleşmesinde belirtildiği gibi" },
      ],
      steps: [
        { title: "İletişim bilgilerini paylaşın", text: "Standınız için sahadaki ilgili kişiyi bize bildirin." },
        { title: "Lojistiği onaylayın", text: "Teslimat, kurulum saatleri ve teknik ihtiyaçlar." },
        { title: "Standı hazırlayın", text: "Her iki gün için markalama, materyal ve personel." },
        { title: "Güvenli çalışın", text: "Mekanın güvenlik, hijyen ve ikram kurallarına uyun." },
      ],
    },
    documents: {
      kicker: "BELGELER",
      title: "Katılımcı firmalar için indirmeler.",
      text: "El kitabı ve sözleşme katılımın bağlayıcı referansıdır.",
      sourceLabel: "PDF belgesi",
      open: "PDF'i aç",
      items: [
        { title: "Katılımcı el kitabı 2026 (NL)", href: "/downloads/participant-manual-2026.pdf" },
        { title: "Katılımcı el kitabı (EN)", href: "/downloads/participant-manual-2026-en.pdf" },
        { title: "Katılımcı sözleşmesi (NL)", href: "/downloads/exhibitor-agreement-nl.pdf" },
        { title: "Stant fiyat listesi 2026", href: "/downloads/stand-pricing-2026.pdf" },
      ],
    },
    topics: {
      kicker: "SIK SORULAN KONULAR",
      title: "Temel kurallar bir bakışta.",
      items: [
        {
          title: "Stant, markalama ve ek hizmetler",
          text: "Stant ölçüleri, kurulum kuralları, markalama sınırları ve ek elektrik, mobilya veya hizmet siparişi.",
        },
        {
          title: "Ulaşım, transfer ve konaklama",
          text: "Varış, park, De Broodfabriek'te yükleme saatleri ve mekana yakın otel seçenekleri.",
        },
        {
          title: "Güvenlik, hijyen ve ikram",
          text: "Mekanın güvenlik kuralları, uygulamalar için hijyen koşulları ve stantta yiyecek-içecek sunma kuralları.",
        },
        {
          title: "Sigorta, hasar ve iptal",
          text: "Sigorta yükümlülükleriniz, hasar sorumluluğu ve sözleşmedeki iptal koşulları.",
        },
      ],
    },
  },

  media: {
    title: "Medya, basın ve influencer'lar.",
    description:
      "Sağlık, güzellik, wellness ve inovasyon alanlarında özgün içerik üreten profesyoneller için; sektörü şekillendiren insanlara ve fikirlere odaklanan akreditasyon.",
    metaTitle: "Medya",
    heroCta: "Akreditasyon formuna git",
    accreditation: {
      kicker: "AKREDİTASYON",
      title: "Güvenilir ve özgün habercilik için profesyonel erişim.",
      text: "Her başvuru organizasyon ekibi tarafından tek tek değerlendirilir.",
      cards: [
        { title: "Yerleşik medya", text: "Aktif editoryal rolü olan basın, radyo, televizyon ve haber ajansları." },
        {
          title: "Dijital ve serbest",
          text: "Düzenli siteler, podcast'ler, görevli gazeteciler, fotoğrafçılar ve analistler.",
        },
        { title: "Influencer'lar", text: "Sektörde güncel içeriği ve kanıtlanmış özgün işi olan içerik üreticileri." },
      ],
    },
    criteria: {
      kicker: "KOŞULLAR BİR BAKIŞTA",
      items: [
        {
          title: "Dijital medya",
          text: "Sağlık, güzellik veya iyi yaşam alanında kitlesi olan, düzenli güncellenen yayın, podcast veya kanal.",
        },
        {
          title: "Serbest gazeteciler ve fotoğrafçılar",
          text: "Onaylı bir görev veya sektörde yayınlanmış güncel çalışmalardan oluşan bir portfolyo.",
        },
        {
          title: "Sektör analistleri",
          text: "Fuardaki sektörlerle ilgili pazar araştırması veya danışmanlık alanında profesyonel bir görev.",
        },
        {
          title: "Influencer'lar ve içerik üreticileri",
          text: "Sektörde güncel özgün içerik ve fuarı içerikle destekleme taahhüdü.",
        },
      ],
    },
    commitment: {
      kicker: "INFLUENCER TAAHHÜDÜ",
      title: "Üç dönem. Dokuz amaçlı paylaşım.",
      stats: [
        { value: "3", label: "Fuardan önce" },
        { value: "3", label: "Fuar sırasında" },
        { value: "3", label: "Fuardan sonra" },
        { value: "9", label: "Toplam paylaşım" },
      ],
    },
    form: {
      kicker: "BAŞVURU",
      title: "Akreditasyon talep edin.",
      intro: "Profesyonel bilgilerinizi organizasyon ekibinin değerlendirmesi için gönderin.",
      noteTitle: "Destekleyici bilgiler",
      note: "Mesaj alanına güncel çalışmalarınızın bağlantılarını ekleyin; gerekirse daha fazlasını isteriz.",
      formTitle: "Profesyonel bilgiler",
      button: "Başvuruyu gönder",
      fields: {
        name: "Ad soyad",
        namePlaceholder: "Adınız ve soyadınız",
        email: "Profesyonel e-posta",
        emailPlaceholder: "ad@yayin.com",
        organisation: "Kurum / yayın",
        organisationPlaceholder: "Yayın veya kanal",
        type: "Başvuru türü",
        typeOptions: [
          "Gazeteci / editör",
          "Serbest gazeteci / fotoğrafçı",
          "Dijital medya / podcast",
          "Influencer / içerik üreticisi",
        ],
        website: "Web sitesi veya profil bağlantısı",
        audience: "Kitle ve güncel içerikler",
        audiencePlaceholder: "İlgili profesyonel bilgileri ve bağlantıları paylaşın.",
      },
    },
  },

  contact: {
    title: "İletişime geçelim.",
    description: "Ziyaret, katılım, akreditasyon veya etkinlik hakkında sorularınız mı var? Bize yazın.",
    metaTitle: "İletişim",
    form: {
      kicker: "İLETİŞİM",
      title: "Yardımcı olmak için buradayız.",
      intro: "Mesajınızı organizasyon ekibine gönderin.",
      noteTitle: "Yanıt süresi",
      note: "İki iş günü içinde yanıt vermeyi hedefliyoruz.",
      formTitle: "Mesaj gönder",
      button: "Mesajı gönder",
      fields: {
        name: "Ad",
        namePlaceholder: "Adınız",
        email: "E-posta",
        emailPlaceholder: "ad@ornek.com",
        subject: "Konu",
        subjectOptions: [
          "Ziyaretçi bilgileri",
          "Katılım ve sponsorluk",
          "Medya akreditasyonu",
          "Fair Match",
          "Diğer",
        ],
        message: "Mesaj",
        messagePlaceholder: "Nasıl yardımcı olabiliriz?",
      },
    },
    findUs: {
      kicker: "BİZE ULAŞIN",
      title: "De Broodfabriek, Rijswijk.",
      maps: "Google Haritalar'da aç",
      venue: "De Broodfabriek",
      address: "Volmerlaan 12, 2288 GD Rijswijk",
      country: "Hollanda",
    },
    routes: {
      kicker: "TALEBİNİZİ YÖNLENDİRİN",
      title: "Doğru yolu seçin.",
      cards: [
        { title: "Ziyaretçi", text: "Bilet, mekan ve pratik bilgiler." },
        { title: "Katılımcı", text: "Stant, sponsorluk ve katılım seçenekleri." },
        { title: "Medya", text: "Basın, gazeteci ve influencer akreditasyonu." },
        { title: "Fair Match", text: "Kişisel tanıştırma talep edin." },
      ],
    },
  },

  paris: {
    title: "Paris 2027.",
    description: "Yeni bir şehir. Aynı uluslararası hedef. Health & Beauty Expo Paris geliyor.",
    metaTitle: "Paris 2027",
    heroImageAlt: "Paris silueti",
    heroCta: "Gelişmelerden haberdar ol",
    intro: {
      kicker: "YAKINDA",
      title: "Uluslararası yolculuğumuzun yeni bölümü.",
      body1:
        "Health & Beauty Expo Paris 2027 hazırlanıyor. Tarihler, mekan, program ve katılım bilgileri kesinleştiği anda duyurulacak.",
      body2: "Bilgilerinizi bırakın, ilk siz haberdar olun.",
      quote: "“Sağlık, güzellik ve iyi yaşam—sınırların ötesinde bir arada.”",
      quoteSource: "Health & Beauty Expo Paris 2027",
    },
    form: {
      kicker: "GELİŞMELER",
      title: "İlk siz haberdar olun.",
      intro: "Paris 2027'ye nasıl katılmak istediğinizi bize anlatın.",
      formTitle: "Beni bilgilendirin",
      button: "Gönder",
      fields: {
        name: "Ad",
        namePlaceholder: "Adınız",
        email: "E-posta",
        emailPlaceholder: "ad@ornek.com",
        interest: "İlgi alanım",
        interestOptions: ["Ziyaretçi", "Katılımcı", "Sponsor", "Medya / influencer"],
      },
    },
  },

  legal: {
    metaTitle: "Yasal bilgiler",
    heroDescription: "Bu web sitesi ve etkinlik hakkında yasal ve pratik bilgiler.",
    navLabel: "Yasal bilgiler",
    draftNotice: "Bu metin hukuki incelemededir ve etkinlikten önce kesinleştirilecektir.",
    sections: {
      scopeTitle: "1. Kapsam ve amaç",
      scopeText:
        "Bu sayfa web sitesini kimin işlettiğini ve sorularınız için sorumlu kuruluşa nasıl ulaşabileceğinizi açıklar.",
      responsibilitiesTitle: "2. Bilgiler ve sorumluluklar",
      responsibilitiesText:
        "İlgili haklar, sorumluluklar, kullanılan harici hizmetler ve geçerli sınırlamalar burada açıklanır.",
      contactTitle: "3. İletişim ve değişiklikler",
      contactText:
        "Bu sayfayla ilgili her soru için iletişim formundan bize ulaşabilirsiniz. Geçerli sürüm tarihi yayınlandığında belirtilir.",
    },
    tabs: {
      privacy: {
        label: "Gizlilik politikası",
        heading: "Kişisel bilgiler nasıl işlenir",
        intro:
          "Web sitesi formları aracılığıyla gönderdiğiniz bilgileri yalnızca talebinizi işlemek için saklıyoruz. Saklama süreleri, hukuki dayanaklar, veri işleyenler ve iletişim bilgileri nihai sürümde belirtilir.",
      },
      cookies: {
        label: "Çerez politikası",
        heading: "Net seçimler ve şeffaf bilgi",
        intro:
          "Web sitesi yalnızca çalışması için gereken çerezleri kullanır. Opsiyonel analitik araçlar ancak açık bir onay tercihinden sonra eklenir.",
      },
      terms: {
        label: "Site koşulları",
        heading: "Web sitesinin kullanım kuralları",
        intro:
          "Bu koşullar kabul edilebilir kullanımı, fikri mülkiyeti, harici bağlantıları ve web sitesine ilişkin sorumluluk sınırlarını kapsar.",
      },
      visitors: {
        label: "Ziyaretçi bilgileri",
        heading: "Katılımcılar için önemli bilgiler",
        intro:
          "Rijswijk 2026 ziyaretçileri için bilet, mekan, erişilebilirlik, davranış kuralları ve etkinlik değişikliklerine ilişkin bilgiler.",
      },
      exhibitors: {
        label: "Katılımcı bilgileri",
        heading: "Katılım koşulları ve sorumluluklar",
        intro:
          "Katılımcı el kitabı ve katılımcı sözleşmesi stant, ödeme, iptal, sigorta, güvenlik ve operasyonel sorumlulukları kapsar.",
      },
    },
  },
};
