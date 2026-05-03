// ═══════════════════════════════════════════════════
//  KASAJI — Bilingual Copy  (EN default / AR toggle)
//  Product names (Kasaji AI · XM · Academy) stay EN always
// ═══════════════════════════════════════════════════

export const en = {
  nav: {
    signIn: 'Sign in',
    getStarted: 'Get started',
  },
  hero: {
    badge: 'Human-Centered Digital Innovation',
    titleLine1: 'Advancing Digital',
    titleLine2: 'Healthcare Innovation',
    subtitle:
      'Technology-driven solutions for modern healthcare and learning. Empowering organizations with intelligent digital solutions, data-driven insights, and future-ready capabilities.',
    cta1: 'Start building',
    cta2: 'Contact sales',
    stats: [
      { num: '500+', label: 'Healthcare Organizations' },
      { num: '99.9%', label: 'Uptime SLA' },
      { num: '24/7',  label: 'Support Available' },
    ],
  },
  products: {
    badge: 'Ecosystem',
    title: 'Our Integrated Ecosystem',
    subtitle:
      'Specialized solutions working together to transform healthcare delivery and professional learning',
    learnMore: 'Learn more',
    items: [
      {
        tagline: 'Experience Intelligence',
        description:
          'AI-powered experience intelligence that turns patient and caregiver feedback into actionable healthcare insights.',
        features: [
          'Experience & Voice Management',
          'AI-Driven Analytics & Insights',
          'Proactive Engagement & Resolution',
          'Real-time Communication',
        ],
      },
      {
        tagline: 'Healthcare Consulting',
        description:
          'Healthcare consulting that designs seamless, compassionate, and digitally enabled patient and staff experiences.',
        features: [
          'Experience Design & Strategy',
          'Digital Health & Service Design',
          'Intelligent Insights & Brand Experience',
          'Journey Mapping',
        ],
      },
      {
        tagline: 'Professional Learning',
        description:
          'Professional learning platform building future-ready capabilities in experience, analytics, and AI.',
        features: [
          'Business Consulting Programs',
          'Customer & Patient Experience',
          'Business Analytics Training',
          'AI & Data Education',
        ],
      },
    ],
  },
  integration: {
    badge: 'Integrated Ecosystem',
    titleMain: 'Our',
    titleHighlight: 'Integrated Solutions',
    subtitle:
      'Kasaji AI, Kasaji XM, and Kasaji Academy intertwine into a unified fabric that transforms healthcare from every dimension.',
    hubSubtitle: 'Unified Platform',
    aiSub: 'Artificial Intelligence',
    xmSub: 'Patient Experience',
    acSub: 'Healthcare Education',
    labels: ['AI Insights', 'UX Data', 'Learning Path', 'Design × AI', 'AI Training', 'Case Studies'],
    cards: [
      {
        sub: 'Artificial Intelligence',
        desc: 'Advanced analytics and AI models that power Kasaji products with instant insights and precise predictions',
        badge: 'Connected to ecosystem',
      },
      {
        sub: 'Patient Experience',
        desc: 'Designing exceptional human experiences powered by AI data to improve every touchpoint in the patient journey',
        badge: 'Connected to ecosystem',
      },
      {
        sub: 'Healthcare Education',
        desc: 'Developing healthcare teams with smart AI-powered curricula and modern adaptive learning methodologies',
        badge: 'Connected to ecosystem',
      },
    ],
    tagline: '✦   Each product amplifies the others — together they form a complete transformation ecosystem   ✦',
  },
  values: {
    badge: 'Core Principles',
    title: 'Our Values',
    subtitle: 'Guided by principles that drive meaningful healthcare transformation',
    items: [
      { title: 'Human-Centered Design',     desc: 'Putting people first in every solution we create' },
      { title: 'Innovation with Purpose',   desc: 'Meaningful innovation that drives real impact' },
      { title: 'Data-Driven Decisions',     desc: 'Leveraging insights to inform every choice' },
      { title: 'Excellence & Integrity',    desc: 'Maintaining the highest standards in all we do' },
      { title: 'Sustainable Impact',        desc: 'Creating lasting value for healthcare ecosystems' },
    ],
    cta: {
      title: 'Ready to transform healthcare together?',
      subtitle: 'Partner with us to elevate healthcare experiences, empower teams, and deliver measurable impact',
      btn1: 'Contact sales',
      btn2: 'View documentation',
    },
  },
  footer: {
    desc: 'Advancing digital healthcare innovation through human-centered design and AI-powered solutions.',
    cols: { products: 'Products', company: 'Company', resources: 'Resources' },
    links: {
      pricing: 'Pricing', aboutUs: 'About us', careers: 'Careers',
      blog: 'Blog', contact: 'Contact', docs: 'Documentation',
      api: 'API Reference', support: 'Support', status: 'Status',
    },
    copyright: '© 2026 Kasaji & Company. All rights reserved.',
    privacy: 'Privacy Policy', terms: 'Terms of Service', cookies: 'Cookie Settings',
  },
};

export type Translations = typeof en;

export const ar: Translations = {
  nav: {
    signIn: 'تسجيل الدخول',
    getStarted: 'ابدأ الآن',
  },
  hero: {
    badge: 'ابتكار رقمي يمحور الإنسان',
    titleLine1: 'نقود مستقبل',
    titleLine2: 'الرعاية الصحية الرقمية',
    subtitle:
      'حلول تكنولوجية متقدمة للرعاية الصحية الحديثة والتعلم. نمكّن المنظمات بحلول رقمية ذكية ورؤى مبنية على البيانات وكفاءات جاهزة للمستقبل.',
    cta1: 'ابدأ الآن',
    cta2: 'تواصل معنا',
    stats: [
      { num: '500+', label: 'منظمة صحية' },
      { num: '99.9%', label: 'وقت التشغيل' },
      { num: '24/7',  label: 'دعم متواصل' },
    ],
  },
  products: {
    badge: 'المنظومة',
    title: 'منظومتنا المتكاملة',
    subtitle: 'حلول متخصصة تعمل معاً لتحويل تقديم الرعاية الصحية والتعلم المهني',
    learnMore: 'اعرف المزيد',
    items: [
      {
        tagline: 'ذكاء التجربة',
        description:
          'ذكاء تجربة مدعوم بالذكاء الاصطناعي يحوّل ملاحظات المرضى ومقدمي الرعاية إلى رؤى صحية قابلة للتنفيذ.',
        features: [
          'إدارة التجربة والصوت',
          'تحليلات ورؤى مدعومة بالذكاء الاصطناعي',
          'المشاركة الاستباقية والحل',
          'التواصل في الوقت الفعلي',
        ],
      },
      {
        tagline: 'استشارات الرعاية الصحية',
        description:
          'استشارات الرعاية الصحية التي تصمم تجارب سلسة ومتعاطفة ومُمكَّنة رقمياً للمرضى والموظفين.',
        features: [
          'تصميم التجربة والاستراتيجية',
          'الصحة الرقمية وتصميم الخدمة',
          'رؤى ذكية وتجربة العلامة التجارية',
          'رسم خريطة الرحلة',
        ],
      },
      {
        tagline: 'التعلم الاحترافي',
        description:
          'منصة تعلم احترافية تبني قدرات جاهزة للمستقبل في التجربة والتحليلات والذكاء الاصطناعي.',
        features: [
          'برامج الاستشارات التجارية',
          'تجربة العميل والمريض',
          'تدريب تحليلات الأعمال',
          'تعليم الذكاء الاصطناعي والبيانات',
        ],
      },
    ],
  },
  integration: {
    badge: 'منظومة متكاملة',
    titleMain: 'حلولنا',
    titleHighlight: 'المتكاملة',
    subtitle:
      'Kasaji AI و Kasaji XM و Kasaji Academy تتشابك في نسيج واحد يحوّل تجربة الرعاية الصحية من جميع المحاور',
    hubSubtitle: 'المنصة المتكاملة',
    aiSub: 'ذكاء اصطناعي',
    xmSub: 'تجربة المريض',
    acSub: 'التعليم الصحي',
    labels: ['رؤى الذكاء', 'بيانات التجربة', 'مسار التعلم', 'تصميم × ذكاء', 'تدريب الذكاء', 'دراسات الحالة'],
    cards: [
      {
        sub: 'ذكاء اصطناعي',
        desc: 'تحليلات متقدمة ونماذج AI تُغذّي منتجات Kasaji بالرؤى الفورية والتنبؤات الدقيقة',
        badge: 'متصل بالمنظومة',
      },
      {
        sub: 'تجربة المريض',
        desc: 'تصميم تجارب إنسانية استثنائية مدعومة ببيانات AI لتحسين كل نقطة تواصل في الرحلة',
        badge: 'متصل بالمنظومة',
      },
      {
        sub: 'التعليم الصحي',
        desc: 'تطوير الكوادر الصحية بمناهج ذكية مدعومة بالبيانات وأساليب التعلم التكيّفي',
        badge: 'متصل بالمنظومة',
      },
    ],
    tagline: '✦   كل منتج يُعزّز الآخر — معاً يشكّلون منظومة تحويل شاملة   ✦',
  },
  values: {
    badge: 'المبادئ الأساسية',
    title: 'قيمنا',
    subtitle: 'مرشدون بمبادئ تدفع التحول الصحي الحقيقي',
    items: [
      { title: 'التصميم المتمحور حول الإنسان', desc: 'وضع الناس في المقام الأول في كل حل نبتكره' },
      { title: 'الابتكار الهادف',               desc: 'ابتكار ذو معنى يحقق تأثيراً حقيقياً' },
      { title: 'القرارات المبنية على البيانات',  desc: 'الاستفادة من الرؤى لإعلام كل قرار' },
      { title: 'التميز والنزاهة',               desc: 'الحفاظ على أعلى المعايير في كل ما نفعله' },
      { title: 'الأثر المستدام',                desc: 'خلق قيمة دائمة لمنظومات الرعاية الصحية' },
    ],
    cta: {
      title: 'هل أنت مستعد لتحويل الرعاية الصحية معاً؟',
      subtitle: 'تشارك معنا لرفع مستوى تجارب الرعاية الصحية وتمكين الفرق وتقديم تأثير قابل للقياس',
      btn1: 'تواصل معنا',
      btn2: 'عرض الوثائق',
    },
  },
  footer: {
    desc: 'نقود ابتكار الرعاية الصحية الرقمية من خلال التصميم المتمحور حول الإنسان والحلول المدعومة بالذكاء الاصطناعي.',
    cols: { products: 'المنتجات', company: 'الشركة', resources: 'الموارد' },
    links: {
      pricing: 'الأسعار', aboutUs: 'من نحن', careers: 'الوظائف',
      blog: 'المدونة', contact: 'اتصل بنا', docs: 'التوثيق',
      api: 'مرجع API', support: 'الدعم', status: 'الحالة',
    },
    copyright: '© 2026 Kasaji & Company. جميع الحقوق محفوظة.',
    privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة', cookies: 'إعدادات ملفات تعريف الارتباط',
  },
};
