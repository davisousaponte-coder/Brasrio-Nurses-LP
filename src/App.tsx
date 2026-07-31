import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Stethoscope, 
  Clock, 
  Home, 
  MapPin, 
  Instagram, 
  Facebook, 
  AlertTriangle,
  Microscope,
  Zap,
  Check,
  ChevronDown,
  Navigation,
  Activity,
  Award,
  Heart,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './components/Logo';

import recepcaoImg from './assets/images/recepcao.jpg';
import espaco2Img from './assets/images/espaco_2.jpg';
import espaco3Img from './assets/images/espaco_3.jpg';

const etapa1Img = "/images/etapa_1.png";
const etapa2Img = "/images/etapa_2.png";
const etapa3Img = "/images/etapa_3.png";
const etapa4Img = "/images/etapa_4.png";

// Depoimentos dos pacientes via imagens de feedback

// --- CONFIGURAÇÃO DA CLÍNICA ---
// Altere aqui o número do WhatsApp (apenas números, com DDD e 55)
const PHONE_NUMBER = "5500000000000"; 
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER}?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação%20na%20Clínica%20Brasrio%20Nurses.`;
const PHONE_DISPLAY = "(00) 00000-0000"; // Como o número aparece no texto

// --- CONFIGURAÇÃO DE RASTREAMENTO E CONVERSÕES ---
// Insira seus IDs abaixo para disparar e rastrear conversões automaticamente ao clicar nos botões do WhatsApp.
// Se você já tem as tags configuradas diretamente no Google Tag Manager ou no index.html, pode deixar em branco,
// pois o código já detecta e dispara as conversões nesses sistemas de forma automática!
const GOOGLE_ADS_CONVERSION_ID = "";     // Exemplo: "AW-1122334455"
const GOOGLE_ADS_CONVERSION_LABEL = "";  // Exemplo: "abCDeFGhIJKlMNoPQ"
const META_PIXEL_ID = "";                // Exemplo: "123456789012345"

// Função para rastrear a conversão ao clicar nos botões do WhatsApp
const trackWhatsAppConversion = () => {
  console.log("Rastreando clique de conversão no WhatsApp...");

  // 1. Google Tag Manager / dataLayer genérico
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push({
      event: "whatsapp_conversion",
      event_category: "Conversion",
      event_action: "WhatsApp Click",
      event_label: "Botão WhatsApp"
    });
  }

  // 2. Google Analytics / Google Ads gtag
  // @ts-ignore
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    // Envia evento personalizado padrão
    // @ts-ignore
    window.gtag("event", "click_whatsapp", {
      event_category: "Contact",
      event_label: "WhatsApp Chat"
    });

    // Se o ID de conversão do Google Ads estiver configurado, dispara a conversão específica
    if (GOOGLE_ADS_CONVERSION_ID && GOOGLE_ADS_CONVERSION_LABEL) {
      // @ts-ignore
      window.gtag("event", "conversion", {
        send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`
      });
      console.log(`Conversão Google Ads enviada para: ${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`);
    }
  }

  // 3. Meta Pixel (Facebook)
  // @ts-ignore
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    // @ts-ignore
    window.fbq("track", "Contact", {
      content_name: "Conversão WhatsApp"
    });
    console.log("Conversão Meta Pixel (Contact) enviada.");
  }
};

// --- Constants & Types ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Logo theme="light" className="h-16 w-auto md:h-20" />
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#tratamentos" className="text-brand-blue-700 hover:text-brand-gold-600 font-medium transition-colors">Tratamentos</a>
          <a href="#diferenciais" className="text-brand-blue-700 hover:text-brand-gold-600 font-medium transition-colors">Diferenciais</a>
          <a href="#vacuo" className="text-brand-blue-700 hover:text-brand-gold-600 font-medium transition-colors">Curativo a Vácuo</a>
          <a href="#sobre" className="text-brand-blue-700 hover:text-brand-gold-600 font-medium transition-colors">Sobre</a>
          <a href={WHATSAPP_LINK} className="bg-brand-blue-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-brand-blue-800 transition-all shadow-lg hover:shadow-brand-blue-900/20 active:scale-95">
            Agendar Avaliação
          </a>
        </div>

        <button className="md:hidden text-brand-blue-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-heading font-extrabold text-brand-blue-900 mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-brand-blue-600 max-w-2xl text-lg leading-relaxed mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
    <div className={`h-1.5 w-20 bg-brand-gold-400 mt-4 rounded-full ${centered ? 'mx-auto' : ''}`} />
  </div>
);

const Hero = () => (
  <section className="relative flex items-center pt-24 pb-12 overflow-hidden bg-brand-blue-50/20">
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold-100 rounded-full blur-3xl opacity-50" />
    
    <div className="max-w-4xl mx-auto px-4 text-center relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold-100 text-brand-gold-800 rounded-full text-[10px] md:text-xs font-bold mb-4 border border-brand-gold-200 uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          ATENDIMENTO ESPECIALIZADO EM FERIDAS
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-brand-blue-900 leading-tight mb-6 max-w-3xl">
          Tratamento avançado para <span className="text-brand-gold-600">feridas</span> e <span className="relative inline-block">
            <span className="relative z-10">cicatrização</span>
            <span className="absolute bottom-1 left-0 w-full h-2.5 bg-brand-gold-200/50 -z-10" />
          </span>
        </h1>
        <p className="text-base md:text-lg text-brand-blue-700 leading-relaxed max-w-2xl mb-8">
          Atendimento especializado para feridas simples e de difícil cicatrização com tecnologia de ponta e equipe focada no seu bem-estar.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full justify-center max-w-md">
          <a href={WHATSAPP_LINK} className="bg-brand-blue-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-blue-800 transition-all shadow-lg hover:shadow-brand-blue-900/10 active:scale-95 text-center flex items-center justify-center gap-2">
            Agendar Avaliação no WhatsApp
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        
        <div className="flex items-center gap-4 text-brand-blue-600 font-medium justify-center">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-brand-blue-100 flex items-center justify-center overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Patient" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <p className="text-xs md:text-sm">Mais de <span className="text-brand-blue-900 font-bold">500 vidas</span> transformadas pelo nosso acompanhamento.</p>
        </div>

        {/* Carrossel de Fotos da Recepção e Outros Espaços */}
        <SpacesCarousel />
      </motion.div>
    </div>
  </section>
);

function SpacesCarousel() {
  const slides = [
    {
      img: recepcaoImg,
      fallbackImg: "/images/recepcao.jpg",
      badge: "Recepção Acolhedora",
      title: "Recepção da Clínica Brasrio Nurses",
      desc: "Ambiente humanizado, moderno e confortável, preparado com carinho para acolher você e sua família."
    },
    {
      img: espaco2Img,
      fallbackImg: "/images/espaco_2.jpg",
      badge: "Salas de Atendimento",
      title: "Consultório & Estrutura Especializada",
      desc: "Ambiente privativo totalmente equipado com tecnologia avançada e normas de biossegurança."
    },
    {
      img: espaco3Img,
      fallbackImg: "/images/espaco_3.jpg",
      badge: "Conforto & Acolhimento",
      title: "Infraestrutura Moderna e Humanizada",
      desc: "Projetada para proporcionar tranquilidade e bem-estar durante todo o acompanhamento médico."
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="mt-10 max-w-3xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-white p-2.5 relative text-left"
    >
      {/* Moldura da Imagem Principal */}
      <div className="relative overflow-hidden rounded-[2rem] aspect-[16/9] md:aspect-[21/9] bg-brand-blue-950">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img 
              src={slide.img} 
              alt={slide.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== slide.fallbackImg) {
                  target.src = slide.fallbackImg;
                }
              }}
            />
          </div>
        ))}

        {/* Gradiente Escuro Suave no Fundo para Dar Contraste Superior Sem Borrar a Foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none" />

        {/* Textos Informativos do Slide com Contraste Direto nas Letras */}
        <div className="absolute inset-0 flex items-end p-4 sm:p-6 md:p-7 justify-between z-30 pointer-events-none">
          <div className="max-w-md md:max-w-lg pointer-events-auto pr-4">
            <span className="inline-block bg-brand-gold-400 text-brand-blue-950 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2 shadow-lg">
              {slides[current].badge}
            </span>
            <p className="text-base sm:text-lg md:text-2xl font-black text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              {slides[current].title}
            </p>
            <p className="text-xs sm:text-sm text-white font-medium mt-1.5 leading-relaxed hidden sm:block drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
              {slides[current].desc}
            </p>
          </div>

          {/* Botões do Carrossel */}
          <div className="flex flex-col items-end justify-between h-full pointer-events-auto z-30 flex-shrink-0">
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all shadow-md active:scale-95 border border-white/30"
                title="Foto Anterior"
                aria-label="Foto Anterior"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button 
                onClick={() => setCurrent((current + 1) % slides.length)}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all shadow-md active:scale-95 border border-white/30"
                title="Próxima Foto"
                aria-label="Próxima Foto"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Trilho de Progresso */}
            <div className="flex gap-1.5 mt-auto">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === current ? 'w-6 bg-brand-gold-400' : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Ir para foto ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Miniaturas de Navegação Rápida (Thumbnails) para Troca Direta */}
      <div className="grid grid-cols-3 gap-2 mt-2.5">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`relative rounded-xl overflow-hidden aspect-[16/9] border-2 transition-all text-left ${
              idx === current 
                ? 'border-brand-gold-500 ring-2 ring-brand-gold-400/50 scale-[1.02]' 
                : 'border-transparent opacity-70 hover:opacity-100 hover:border-brand-blue-200'
            }`}
          >
            <img 
              src={slide.img} 
              alt={slide.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-1.5 flex items-end">
              <span className="text-[10px] md:text-xs text-white font-bold truncate">
                {slide.badge}
              </span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

const TreatmentCategories = () => {
  const categories = [
    { title: "Úlceras diabéticas", icon: <Activity className="w-6 h-6" /> },
    { title: "Lesão por pressão", icon: <Stethoscope className="w-6 h-6" /> },
    { title: "Feridas cirúrgicas", icon: <ShieldCheck className="w-6 h-6" /> },
    { title: "Queimaduras", icon: <Zap className="w-6 h-6" /> },
    { title: "Feridas vasculares", icon: <Microscope className="w-6 h-6" /> },
    { title: "Lesões traumáticas", icon: <Users className="w-6 h-6" /> },
  ];

  return (
    <section id="tratamentos" className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader 
          title="Para quem é o tratamento?" 
          subtitle="Nossa clínica atua em diversas frentes para garantir a saúde e bem-estar de quem convive com lesões de difícil cicatrização."
          centered
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-brand-blue-50 border border-brand-blue-100 p-6 rounded-3xl group hover:bg-white hover:shadow-xl hover:border-brand-gold-300 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue-800 mb-6 group-hover:scale-110 transition-transform shadow-sm group-hover:text-brand-gold-600">
                {cat.icon}
              </div>
              <h3 className="text-base md:text-lg font-bold text-brand-blue-900">{cat.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BeforeAfter = () => {
  const stages = [
    {
      step: "1",
      title: "ETAPA 1",
      subtitle: "Início do tratamento",
      img: etapa1Img,
      desc: "Avaliação inicial e elaboração do plano terapêutico individualizado."
    },
    {
      step: "2",
      title: "ETAPA 2",
      subtitle: "Desbridamento",
      img: etapa2Img,
      desc: "Limpeza especializada e remoção do tecido desvitalizado para preparo da lesão."
    },
    {
      step: "3",
      title: "ETAPA 3",
      subtitle: "Granulação",
      img: etapa3Img,
      desc: "Formação de novo tecido saudável e aceleração da regeneração celular."
    },
    {
      step: "4",
      title: "ETAPA 4",
      subtitle: "Cicatrização",
      img: etapa4Img,
      desc: "Epitelização completa da pele e cicatrização definitiva com restauração da área."
    }
  ];

  return (
    <section id="antes-e-depois" className="py-10 md:py-16 bg-brand-blue-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader 
          title="Antes e Depois — Evolução do Tratamento" 
          subtitle="Acompanhe o processo de cicatrização e regeneração da pele em cada etapa do atendimento especializado." 
          centered 
        />
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-10 max-w-6xl mx-auto">
          {stages.map((st, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white rounded-2xl sm:rounded-[2.2rem] p-2.5 sm:p-4 border border-brand-blue-100 shadow-md hover:shadow-xl hover:border-brand-gold-300 transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Photo Box with Number Badge */}
              <div className="w-full aspect-square bg-slate-100 rounded-xl sm:rounded-[1.6rem] overflow-hidden relative mb-2.5 sm:mb-5 border border-slate-100">
                <img 
                  src={st.img} 
                  alt={`${st.title} - ${st.subtitle}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 w-6 h-6 sm:w-9 sm:h-9 bg-[#187265] text-white font-black text-xs sm:text-base rounded-full flex items-center justify-center shadow-md">
                  {st.step}
                </div>
              </div>

              {/* Labels matching the provided material */}
              <div className="px-1 sm:px-2 pb-1 sm:pb-2">
                <h4 className="text-xs sm:text-lg font-black text-brand-blue-900 tracking-wide uppercase mb-0.5 sm:mb-1">
                  {st.title}
                </h4>
                <p className="text-brand-blue-700 font-bold text-xs sm:text-base mb-1 sm:mb-2">
                  {st.subtitle}
                </p>
                <p className="text-[11px] sm:text-xs text-brand-blue-600/90 font-medium leading-tight sm:leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WarningSigns = () => {
  const signs = [
    "Feridas que não cicatrizam", "Dor persistente", "Mau cheiro", "Vermelhidão", "Inchaço", "Secreção", "Agravamento da lesão"
  ];

  return (
    <section className="py-8 md:py-12 bg-brand-blue-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue-800/30 skew-x-12 transform translate-x-20" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-bold mb-4 border border-red-500/30">
              <AlertTriangle className="w-4 h-4" />
              ATENÇÃO AOS SINAIS
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold mb-6 leading-tight">
              Sinais que indicam a necessidade de <span className="text-brand-gold-400">intervenção especializada</span>
            </h2>
            <p className="text-brand-blue-200 text-base md:text-lg mb-6 leading-relaxed">
              O atraso no tratamento de uma ferida pode levar a complicações sérias. Identificar esses sinais precocemente é fundamental para uma recuperação segura.
            </p>
            <a href={WHATSAPP_LINK} className="inline-flex items-center gap-2 bg-brand-gold-500 text-brand-blue-900 px-8 py-4 rounded-xl font-extrabold text-lg hover:bg-brand-gold-400 transition-all shadow-lg">
              Falar com Especialista agora
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {signs.map((sign, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-brand-gold-500/20 flex items-center justify-center text-brand-gold-400 group-hover:scale-110 transition-transform">
                  <Check className="w-5 h-5" />
                </div>
                <span className="font-semibold text-brand-blue-50">{sign}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Differentials = () => {
  const items = [
    { title: "Atendimento especializado", icon: <Award className="w-6 h-6" /> },
    { title: "Compromisso com o paciente", icon: <Heart className="w-6 h-6" /> },
    { title: "Atendimento humanizado", icon: <Users className="w-6 h-6" /> },
    { title: "Acompanhamento contínuo", icon: <Activity className="w-6 h-6" /> },
    { title: "Protocolos regulamentados", icon: <ShieldCheck className="w-6 h-6" /> },
    { title: "Equipe especializada", icon: <Stethoscope className="w-6 h-6" /> },
  ];

  return (
    <section id="diferenciais" className="py-8 md:py-12 bg-brand-blue-50/40">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader 
          title="Por que escolher a Brasrio Nurses?" 
          subtitle="Somos referência em acompanhamento e tratamento de feridas, com foco em resultados reais e qualidade de vida."
          centered
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-brand-blue-50 border border-brand-blue-100 p-6 rounded-3xl group hover:bg-white hover:shadow-xl hover:border-brand-gold-300 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue-800 mb-6 group-hover:scale-110 transition-transform shadow-sm group-hover:text-brand-gold-600">
                {item.icon}
              </div>
              <h3 className="text-base md:text-lg font-bold text-brand-blue-900">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VacuumDressing = () => (
  <section id="vacuo" className="py-8 bg-white relative">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-8">
         <motion.h3 
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-brand-gold-500 font-extrabold uppercase tracking-[0.2em] text-xs mb-2"
         >
           Diferencial Clínico
         </motion.h3>
         <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-brand-blue-900">Curativo a Vácuo Avançado</h2>
      </div>
      <div className="bg-brand-blue-900 rounded-[2.5rem] overflow-hidden shadow-xl relative border-4 border-brand-blue-50">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        <div className="grid lg:grid-cols-2 items-center">
          <div className="p-8 md:p-12 lg:p-16 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold-500/20 text-brand-gold-300 rounded-full text-xs font-bold mb-6 border border-brand-gold-500/30">
              MÉTODO DE PRESSÃO NEGATIVA
            </div>
            <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-6 leading-tight">
              Tecnologia que acelera a cicatrização de forma segura
            </h3>
            <p className="text-brand-blue-100 text-base mb-8 leading-relaxed max-w-xl">
              Realizamos todo o processo de aplicação e acompanhamento internamente em Brasília por enfermeiras especialistas, sem terceirização. Isso garante máximo controle clínico, segurança e eficácia no seu tratamento.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                "Cicatrização acelerada",
                "Controle de exsudato",
                "Redução drástica de edema",
                "Estímulo constante à granulação"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2.5 text-white text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-brand-gold-500 flex items-center justify-center text-brand-blue-900 flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  {benefit}
                </div>
              ))}
            </div>
            
            <a href={WHATSAPP_LINK} className="inline-flex items-center gap-2 bg-white text-brand-blue-900 px-8 py-3.5 rounded-full font-bold text-base hover:bg-brand-gold-400 hover:text-brand-blue-900 transition-all shadow-md active:scale-95">
              Saber mais sobre o tratamento
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="h-full min-h-[300px] lg:min-h-[450px] relative order-first lg:order-last">
             <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Tecnologia Médica" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-900 lg:bg-gradient-to-r lg:from-brand-blue-900" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Technologies = () => {
  const techs = [
    { title: "Terapia por pressão negativa", icon: <Activity className="w-6 h-6" /> },
    { title: "Laserterapia", icon: <Zap className="w-6 h-6" /> },
    { title: "Ozonioterapia", icon: <Microscope className="w-6 h-6" /> },
    { title: "Curativos avançados", icon: <ShieldCheck className="w-6 h-6" /> }
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader 
          title="Tecnologias e Métodos" 
          subtitle="Aliamos ciência e inovação para oferecer o que há de mais moderno no mundo em tratamento de feridas."
          centered
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
          {techs.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-brand-blue-50 border border-brand-blue-100 p-6 rounded-3xl group hover:bg-white hover:shadow-xl hover:border-brand-gold-300 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-blue-800 mb-6 group-hover:scale-110 transition-transform shadow-sm group-hover:text-brand-gold-600">
                {t.icon}
              </div>
              <h3 className="text-base md:text-lg font-bold text-brand-blue-900">{t.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  const benefitList = [
    { t: "Cicatrização", d: "Redução do tempo de tratamento através de técnicas otimizadas." },
    { t: "Redução de dor", d: "Protocolos focados no alívio imediato e conforto do paciente." },
    { t: "Segurança", d: "Ambiente controlado e profissionais especialistas de ponta." },
    { t: "Impacto na qualidade de vida", d: "Retorno às atividades diárias e restauração da autoestima." }
  ];

  return (
    <section className="py-8 md:py-12 bg-brand-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader 
          title="Benefícios Reais para você" 
          subtitle="Tratamento completo que vai além da ferida, cuidando da saúde do paciente como um todo."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefitList.map((b, i) => (
            <div key={i} className="flex gap-5 items-start bg-white p-6 md:p-8 rounded-3xl group shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-brand-gold-100 flex items-center justify-center text-brand-gold-600 flex-shrink-0 group-hover:bg-brand-gold-500 group-hover:text-white transition-all">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-extrabold text-brand-blue-900 mb-2">{b.t}</h4>
                <p className="text-brand-blue-600 text-sm font-medium leading-relaxed">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const list = [
    {
      printImage: "https://i.ibb.co/cX3Z2mKN/Brasrio-feedback-01.jpg"
    },
    {
      printImage: "https://i.ibb.co/FGzdYLH/Brasrio-feedback-02.jpg"
    },
    {
      printImage: "https://i.ibb.co/8gSQc8Fb/Brasrio-feedback-03.jpg"
    },
    {
      printImage: "https://i.ibb.co/vCbKRDym/Brasrio-feedback-04.jpg"
    }
  ];

  return (
    <section className="py-8 md:py-10 bg-brand-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="O que dizem nossos pacientes" subtitle="Depoimentos reais de quem encontrou na Brasrio Nurses o cuidado necessário para a cicatrização." centered />
        
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {list.map((t, i) => (
              <motion.div 
                key={i} 
                className="bg-white p-4 rounded-3xl shadow-xl border border-brand-blue-100 flex flex-col items-center justify-between"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Imagem real (Screenshot do WhatsApp) */}
                <div className="w-full bg-brand-blue-50/10 rounded-2xl overflow-hidden border border-brand-blue-100/30 relative group flex items-center justify-center">
                  <img 
                    src={t.printImage} 
                    alt={`Avaliação real ${i + 1}`} 
                    className="w-full h-auto object-contain max-h-[420px] rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-brand-blue-900/60 py-1.5 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Print Real do WhatsApp</span>
                  </div>
                </div>
                <div className="flex gap-1 mt-3 text-brand-gold-500 justify-center">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-center opacity-45">
           <div className="flex flex-col items-center">
             <p className="text-3xl font-black text-brand-blue-900">500+</p>
             <p className="text-[11px] font-bold uppercase tracking-widest text-brand-blue-600">Pacientes Felizes</p>
           </div>
           <div className="flex flex-col items-center">
             <p className="text-3xl font-black text-brand-blue-900">98%</p>
             <p className="text-[11px] font-bold uppercase tracking-widest text-brand-blue-600">Cicatrização total</p>
           </div>
           <div className="flex flex-col items-center">
             <p className="text-3xl font-black text-brand-blue-900">10+</p>
             <p className="text-[11px] font-bold uppercase tracking-widest text-brand-blue-600">Anos de Exp</p>
           </div>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="sobre" className="py-8 md:py-12 bg-brand-blue-50">
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="text-center md:text-left">
          <SectionHeader title="Sobre a Clínica Brasrio Nurses" />
          <div className="text-brand-blue-700 text-base md:text-lg leading-relaxed mt-6 space-y-4 font-medium">
            <p>
              A Clínica Brasrio Nurses é referência no tratamento e cicatrização de feridas de difícil cicatrização, unindo tecnologia avançada, cuidado humanizado e práticas baseadas em evidências científicas.
            </p>
            <p className="text-sm md:text-base text-brand-blue-600">
              Nossa missão é devolver a qualidade de vida e a autonomia aos nossos pacientes, proporcionando atendimentos especializados tanto em nossa clínica estruturada quanto no conforto do ambiente domiciliar.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-white/50 p-2 hover:scale-[1.01] transition-transform duration-300">
            <img 
              src="/images/juntas.jpg" 
              alt="Dra. Vanessa Oliveira e Dra. Juliane Brandão" 
              className="w-full h-auto object-cover rounded-[2rem]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Specialists = () => {
  const team = [
    {
      name: "Enf. Vanessa Oliveira",
      coren: "COREN-DF 594448",
      specialty: "Especialista em tratamento de feridas, práticas integrativas e tecnologias de cicatrização",
      image: "/images/vanessa.jpg",
      bullets: [
        "Sócio-proprietária da BrasaRio Nurses – referência em tratamento de feridas",
        "Graduada em Enfermagem pela Faculdade Anhanguera",
        "Pós-graduada em Terapia Intensiva, Urgência, Emergência e Trauma",
        "Pós-graduada em Estomaterapia",
        "Pós-graduada em Estética Avançada",
        "Formação em Práticas Integrativas em Saúde, com foco em ozonioterapia e terapia ortomolecular",
        "Atuação clínica com curativos modernos e tecnologias avançadas para cicatrização de feridas de difícil cicatrização"
      ]
    },
    {
      name: "Enf. Juliane Brandão",
      coren: "COREN-DF 550882",
      specialty: "Especialista em cuidado avançado de feridas e cicatrização tecnológica",
      image: "/images/jully.jpg",
      bullets: [
        "Sócio-proprietária da BrasaRio Nurses – tratamento especializado de feridas",
        "Graduada em Enfermagem pela Faculdade Anhanguera",
        "Pós-graduada em Dermatologia e Tratamento de Feridas (Facuminas)",
        "Pós-graduada em Estomaterapia (Facuminas)",
        "Formação em PRP e PRF pelo Instituto Regenera",
        "Experiência em ambiente industrial com atuação em empresas de referência em curativos e tecnologias em saúde",
        "Atuação clínica com foco em curativos modernos, laserterapia e ozonioterapia"
      ]
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader 
          title="Equipe de Enfermagem Especializada em Tratamento de Feridas" 
          subtitle="A BrasaRio Nurses conta com profissionais altamente qualificadas, com atuação clínica focada em tratamento avançado de feridas, cicatrização acelerada e tecnologias em saúde integrativa." 
          centered 
        />
        
        <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-6xl mx-auto">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-brand-blue-50/50 rounded-[3rem] border border-brand-blue-100 p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl hover:border-brand-gold-300 transition-all duration-300 group"
            >
              <div>
                <div className="relative mb-8 mx-auto w-full aspect-[3/4] max-w-[340px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white group-hover:scale-[1.02] transition-transform">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-brand-gold-500 text-brand-blue-900 font-extrabold text-[11px] px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                    {member.coren}
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-black text-brand-blue-900 mb-2">{member.name}</h3>
                  <p className="text-brand-gold-600 font-bold text-xs uppercase tracking-widest mb-6 leading-relaxed">
                    {member.specialty}
                  </p>
                </div>

                <ul className="space-y-3.5 mt-4 text-left">
                  {member.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-brand-blue-700 text-sm md:text-base font-medium leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-brand-gold-100 flex items-center justify-center text-brand-gold-600 flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="flex-1">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Avaliação inicial paga", desc: "Primeiro contato para entender a lesão e o histórico do paciente." },
    { title: "Diagnóstico especializado", desc: "Análise profunda dos fatores que interferem na cicatrização." },
    { title: "Definição do protocolo", desc: "Criação de um plano terapêutico personalizado com datas e métodos." },
    { title: "Acompanhamento contínuo", desc: "Visitas e curativos realizados por nossa equipe especializada." },
    { title: "Atendimento Clínica ou Domiciliar", desc: "Flexibilidade para quem não pode se deslocar até nós." }
  ];

  return (
    <section className="py-8 md:py-12 bg-brand-blue-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Como funciona o atendimento" subtitle="Um processo claro e organizado para garantir sua segurança e resultados." centered />
        <div className="grid md:grid-cols-5 gap-6 mt-8 relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-brand-blue-800" />
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-brand-gold-500 text-brand-blue-900 flex items-center justify-center text-2xl font-black mb-8 border-4 border-brand-blue-900 shadow-[0_0_20px_-5px_rgba(197,155,45,0.5)]">
                {i + 1}
              </div>
              <h4 className="text-xl font-extrabold mb-4 leading-tight">{step.title}</h4>
              <p className="text-brand-blue-300 text-sm font-medium leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/10 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-brand-gold-400 mb-4">
            <Home className="w-6 h-6" />
            <p className="font-bold text-lg uppercase tracking-wide">Atenção Home Care</p>
          </div>
          <p className="text-brand-blue-100 font-medium leading-relaxed italic">
            "Atendimento domiciliar disponível somente para pacientes impossibilitados de ir até a clínica."
          </p>
        </div>
      </div>
    </section>
  );
};

const Insurances = () => {
  const list = [
    { name: "Saúde Caixa", short: "Saúde Caixa" },
    { name: "INAS GDF", short: "INAS GDF" },
    { name: "É Vida (Lumiar)", short: "É Vida" },
    { name: "Fascal", short: "Fascal" },
    { name: "SIS Senado", short: "SIS Senado" },
    { name: "TJDFT", short: "TJDFT" }
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Aceitamos Convênios" subtitle="Confira alguns dos principais convênios que atendemos em nossa clínica." centered />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-8 max-w-5xl mx-auto">
          {list.map((item, i) => (
            <div key={i} className="h-20 sm:h-24 w-full bg-brand-blue-50/50 rounded-2xl flex flex-col items-center justify-center p-2.5 sm:p-4 border border-brand-blue-100/60 hover:border-brand-gold-400 hover:bg-white hover:shadow-md transition-all duration-300 group text-center">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue-400 group-hover:text-brand-gold-500 transition-colors mb-1 sm:mb-2" />
              <p className="text-xs sm:text-base font-extrabold text-brand-blue-900 group-hover:text-brand-gold-600 transition-colors">
                {item.short}
              </p>
              {item.name !== item.short && (
                <p className="text-[9px] sm:text-[10px] font-bold text-brand-blue-400 mt-0.5 sm:mt-1 uppercase tracking-wider group-hover:text-brand-blue-600 transition-colors">
                  {item.name}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Caixa em destaque para "E diversos outros / Consulte-nos" */}
        <div className="mt-8 flex justify-center">
          <div className="bg-gradient-to-br from-brand-gold-50/70 to-brand-blue-50/30 border-2 border-brand-gold-300/50 rounded-3xl p-6 md:p-8 text-center max-w-xl w-full shadow-lg shadow-brand-gold-500/5 hover:shadow-xl hover:border-brand-gold-400 transition-all duration-300">
            <span className="inline-flex items-center gap-1.5 bg-brand-gold-500 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 shadow-sm">
              Mais Opções
            </span>
            <h4 className="text-2xl md:text-3xl font-black text-brand-blue-900 tracking-tight">
              E diversos outros...
            </h4>
            <p className="text-brand-blue-700 font-bold text-base md:text-lg mt-2 mb-5 leading-normal">
              Não encontrou seu convênio? Consulte-nos agora para verificar a cobertura ou obter auxílio com reembolso!
            </p>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold-500 hover:bg-brand-gold-600 text-white font-extrabold px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all text-sm md:text-base group"
            >
              Consulte-nos pelo WhatsApp
              <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center max-w-2xl mx-auto bg-brand-blue-50/40 p-5 rounded-2xl border border-brand-blue-100/50">
          <p className="text-brand-blue-500 text-xs font-semibold leading-relaxed">
            Caso deseje utilizar o sistema de reembolso livre escolha, oferecemos todo o suporte e documentação necessários para facilitar o seu processo.
          </p>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Quanto tempo dura o tratamento?", a: "O tempo varia de acordo com a complexidade da ferida e a resposta metabólica de cada organismo. Na avaliação inicial, projetamos uma estimativa realista." },
    { q: "Os procedimentos são seguros?", a: "Sim, todos os nossos protocolos seguem rigorosamente as normas de biossegurança e são realizados por profissionais capacitados (Coren/Cofen)." },
    { q: "A Brasrio Nurses atende convênios?", a: "Atendemos diversos convênios importantes como Saúde Caixa, INAS GDF, É Vida (Lumiar), Fascal, SIS Senado, TJDFT, entre outros. Além disso, trabalhamos com sistema de reembolso e atendimento particular diferenciado. Entre em contato para verificar seu caso específico e obter auxílio." },
    { q: "Dói realizar o tratamento?", a: "Nossos protocolos priorizam o conforto. Utilizamos técnicas e materiais que minimizam a dor durante e após a realização dos curativos." },
    { q: "Como funciona a avaliação?", a: "É uma consulta técnica onde realizamos a mensuração da ferida, análise clínica e fotográfica, e definimos o plano de tratamento." }
  ];

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeader title="Dúvidas Frequentes" centered />
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`border rounded-[1.5rem] transition-all overflow-hidden ${open === i ? 'border-brand-gold-400 bg-brand-blue-50/50 shadow-lg' : 'border-brand-blue-100 hover:border-brand-blue-200'}`}>
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-8 py-6 text-left flex justify-between items-center group"
              >
                <span className={`text-lg font-extrabold ${open === i ? 'text-brand-blue-900' : 'text-brand-blue-700'}`}>{faq.q}</span>
                <ChevronDown className={`w-6 h-6 transition-transform text-brand-gold-600 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-8 text-brand-blue-600 leading-relaxed font-medium"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FloatingWhatsApp = () => (
  <a 
    href={WHATSAPP_LINK}
    className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all group"
  >
    <MessageCircle className="w-8 h-8 fill-current" />
    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-brand-blue-900 px-4 py-2 rounded-xl text-sm font-black whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Falar no WhatsApp
    </span>
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
  </a>
);

const Footer = () => {
  const mapLink = "https://www.google.com/maps/place/BRASRIO+NURSES+CENTRO+INTEGRADO+DE+CURATIVOS+E+TRATAMENTO+DE+FERIDAS/@-15.8115693,-47.9158364,933m/data=!3m2!1e3!4b1!4m6!3m5!1s0x935a396710f0f253:0x69a1eb549b43bcb1!8m2!3d-15.8115693!4d-47.9132615!16s%2Fg%2F11vwm6yqzk?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D";
  
  return (
    <footer className="bg-brand-blue-900 text-white pt-10 pb-6 border-t border-brand-blue-800">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4">
              <Logo theme="dark" className="h-14 w-auto md:h-16" />
            </div>
            <p className="text-brand-blue-200 text-sm max-w-sm mb-6 leading-relaxed">
              Referência em curativos de alta complexidade e cicatrização acelerada em Brasília. Oferecemos atendimento especializado voltado para a total recuperação e qualidade de vida.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Navigation className="w-5 h-5 text-brand-gold-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-gray-100 text-sm">Nossa Localização</p>
                <p className="text-brand-blue-200 text-xs mt-1 leading-relaxed">
                  SGAS 910, Bloco F, Via W4 Sul, Salas 236 e 238
                  <br />Asa Sul, Brasília - DF, 70390-100
                </p>
              </div>
            </div>
            
            <a 
              href={mapLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-brand-gold-400 hover:text-brand-gold-300 font-bold text-sm transition-colors mt-1"
            >
              Abrir no Google Maps
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="rounded-2xl overflow-hidden shadow-lg border border-brand-blue-800/80 h-[240px] w-full relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1919.37!2d-47.9158364!3d-15.8115693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a396710f0f253%3A0x69a1eb549b43bcb1!2sBRASRIO%20NURSES%20CENTRO%20INTEGRADO%20DE%20CURATIVOS%20E%20TRATAMENTO%20DE%20FERIDAS!5e0!3m2!1spt-BR!2sbr!4v1718800000000!5m2!1spt-BR!2sbr"
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 border-t border-brand-blue-800/60 pt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
        <p className="text-[11px] text-brand-blue-300">
          © {new Date().getFullYear()} Brasrio Nurses. Todos os direitos reservados.
        </p>
        <p className="text-[10px] text-brand-blue-400">
          O conteúdo fornecido neste site tem caráter informativo e não substitui avaliação médica ou de enfermagem.
        </p>
      </div>
    </footer>
  );
};

export default function App() {
  // Configuração e inicialização dinâmica das tags de rastreamento (Google Ads / Meta Pixel)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Inicializa Google Ads se o ID for configurado e gtag ainda não estiver ativo
    if (GOOGLE_ADS_CONVERSION_ID && !('gtag' in window)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONVERSION_ID}`;
      document.head.appendChild(script);

      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      // @ts-ignore
      function gtag() { window.dataLayer.push(arguments); }
      // @ts-ignore
      window.gtag = gtag;
      // @ts-ignore
      gtag("js", new Date());
      // @ts-ignore
      gtag("config", GOOGLE_ADS_CONVERSION_ID);
      console.log("Google Ads (gtag.js) inicializado com sucesso.");
    }

    // 2. Inicializa Meta Pixel se o ID for configurado e fbq ainda não estiver ativo
    if (META_PIXEL_ID && !('fbq' in window)) {
      // @ts-ignore
      !(function (f, b, e, v, n, t, s) {
        // @ts-ignore
        if (f.fbq) return;
        // @ts-ignore
        n = f.fbq = function () {
          // @ts-ignore
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        // @ts-ignore
        if (!f._fbq) f._fbq = n;
        // @ts-ignore
        n.push = n;
        // @ts-ignore
        n.loaded = !0;
        // @ts-ignore
        n.version = "2.0";
        // @ts-ignore
        n.queue = [];
        // @ts-ignore
        t = b.createElement(e);
        // @ts-ignore
        t.async = !0;
        // @ts-ignore
        t.src = v;
        // @ts-ignore
        s = b.getElementsByTagName(e)[0];
        // @ts-ignore
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

      // @ts-ignore
      window.fbq("init", META_PIXEL_ID);
      // @ts-ignore
      window.fbq("track", "PageView");
      console.log("Meta Pixel (Facebook) inicializado com sucesso.");
    }
  }, []);

  // Event Listener global para rastrear cliques em links do WhatsApp de forma 100% resiliente
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.href) {
        const isWhatsApp = anchor.href.includes("wa.me") || anchor.href.includes("whatsapp.com");
        if (isWhatsApp) {
          trackWhatsAppConversion();
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <TreatmentCategories />
      <BeforeAfter />
      <WarningSigns />
      <Differentials />
      <VacuumDressing />
      <Technologies />
      <Insurances />
      <Benefits />
      <Testimonials />
      <About />
      <Specialists />
      <HowItWorks />
      <FAQ />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
