import React from 'react';
import { motion, useInView } from 'motion/react';
import { 
    Building2, Home, Factory, ArrowRight, Quote, 
    CheckCircle2, XCircle, ChevronRight, TrendingDown, MapPin, Briefcase 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components';
import { Reveal } from '../components/animations';
import { useTranslation } from 'react-i18next';
import { useSearchHighlight } from '../hooks/useSearchHighlight';
import { useLocalizedPath } from '../hooks/useLocalizedPath';

const Num = ({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string; }) => {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true });
    const [v, setV] = React.useState(0);
    React.useEffect(() => {
        if (!inView) return;
        const dur = 1800;
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            setV(Math.floor((1 - Math.pow(1 - p, 3)) * to));
            if (p < 1) requestAnimationFrame(tick); else setV(to);
        };
        requestAnimationFrame(tick);
    }, [inView, to]);
    return <span ref={ref}>{prefix}{v}{suffix}</span>;
};

// Custom Impact Stats replacing the generic StatsSection
const getImpactStats = (lang: string) => {
    return [
        { icon: ClipboardCheck, value: 120, suffix: '+', label: lang === 'de' ? 'Audits durchgeführt' : lang === 'en' ? 'Audits performed' : 'Audits réalisés' },
        { icon: Building2, value: 450, suffix: '+', label: lang === 'de' ? 'Gebäude begleitet' : lang === 'en' ? 'Buildings accompanied' : 'Bâtiments accompagnés' },
        { icon: TrendingDown, value: 25, suffix: '%', prefix: '~ ', label: lang === 'de' ? 'Einsparungen identifiziert' : lang === 'en' ? 'Savings identified' : 'Économies identifiées' },
        { icon: MapPin, value: 3, suffix: '', label: lang === 'de' ? 'Kantone abgedeckt' : lang === 'en' ? 'Cantons covered' : 'Cantons couverts' },
        { icon: Briefcase, value: 15, suffix: '+', label: lang === 'de' ? 'Anerkannte Partner' : lang === 'en' ? 'Recognized partners' : 'Partenaires reconnus' },
    ];
};
