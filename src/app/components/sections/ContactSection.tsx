import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Linkedin, Instagram, Facebook, X, ArrowRight, Phone } from 'lucide-react';
import { Button } from "../ui/button";
import { cn } from '../ui/utils';
import Reveal from '../animations/Reveal';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { getContactPage, getSettings } from '../../../sanity/client';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1974&auto=format&fit=crop";

const ContactSection = ({ compact = false }: { compact?: boolean }) => {
    const { t } = useTranslation('common');
    const [currentType, setCurrentType] = useState('Villa');
    const [contactImage, setContactImage] = useState(FALLBACK_IMAGE);
    const [email, setEmail] = useState('info@swissecogestes.ch');
    const [phone, setPhone] = useState('078 628 77 38');
    const [address, setAddress] = useState('Route de Chavannes 207, 1007 Lausanne');
    const [linkedinUrl, setLinkedinUrl] = useState('https://www.linkedin.com/company/swissecogestes/');
    const [instagramUrl, setInstagramUrl] = useState('https://www.instagram.com/swissecogestes/');
    const [facebookUrl, setFacebookUrl] = useState('https://www.facebook.com/swissecogestes');
    const [twitterUrl, setTwitterUrl] = useState('https://twitter.com/swissecogestes');

    useEffect(() => {
        getContactPage().then((data) => {
            const url = data?.formSection?.image?.asset?.url;
            if (url) setContactImage(url);
        }).catch(() => {});

        getSettings().then((data) => {
            if (!data) return;
            if (data.contactInfo?.email) setEmail(data.contactInfo.email);
            if (data.contactInfo?.phone) setPhone(data.contactInfo.phone);
            if (data.contactInfo?.address) setAddress(data.contactInfo.address);
            if (data.socialMedia?.linkedin) setLinkedinUrl(data.socialMedia.linkedin);
            if (data.socialMedia?.instagram) setInstagramUrl(data.socialMedia.instagram);
            if (data.socialMedia?.facebook) setFacebookUrl(data.socialMedia.facebook);
            if (data.socialMedia?.twitter) setTwitterUrl(data.socialMedia.twitter);
        }).catch(() => {});
    }, []);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Sanitize inputs
        const sanitizedName = DOMPurify.sanitize(formData.fullName.trim(), { ALLOWED_TAGS: [] });
        const sanitizedEmail = DOMPurify.sanitize(formData.email.trim(), { ALLOWED_TAGS: [] });
        const sanitizedMessage = DOMPurify.sanitize(formData.message.trim(), { ALLOWED_TAGS: [] });

        // Validate name (2-100 chars, letters, spaces, hyphens)
        if (!sanitizedName) {
            newErrors.fullName = t('contact_section.name') + ' requis';
        } else if (sanitizedName.length < 2 || sanitizedName.length > 100) {
            newErrors.fullName = 'Nom invalide (2-100 caractères)';
        } else if (!/^[a-zA-ZÀ-ſ\s'-]+$/.test(sanitizedName)) {
            newErrors.fullName = 'Nom invalide (lettres uniquement)';
        }

        // Validate email (RFC 5322 compliant)
        if (!sanitizedEmail) {
            newErrors.email = "Email requis";
        } else if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(sanitizedEmail)) {
            newErrors.email = "Email invalide";
        }

        // Validate phone (international format)
        if (formData.phone) {
            const sanitizedPhone = formData.phone.replace(/\s/g, '');
            if (!/^\+?[1-9]\d{1,14}$/.test(sanitizedPhone)) {
                newErrors.phone = "Téléphone invalide (format international)";
            }
        }

        // Validate message (10-2000 chars)
        if (!sanitizedMessage) {
            newErrors.message = "Message requis";
        } else if (sanitizedMessage.length < 10) {
            newErrors.message = "Message trop court (min 10 caractères)";
        } else if (sanitizedMessage.length > 2000) {
            newErrors.message = "Message trop long (max 2000 caractères)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Automatically replace "00" with "+" at the beginning
        if (value.startsWith('00')) {
            value = '+' + value.slice(2);
        }

        // Only allow numbers and the "+" character
        if (/^[\d+]*$/.test(value)) {
            setFormData(prev => ({ ...prev, phone: value }));
            if (errors.phone) setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.phone;
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                toast.success(t('contact_section.success'));
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                setErrors({});
            } catch (error) {
                toast.error(t('contact_section.error'));
            } finally {
                setIsSubmitting(false);
            }
        } else {
            toast.error(t('contact_section.error'));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user start typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const clientRequestTypes = [
        { label: t('contact_section.types.villa'), value: 'Villa' },
        { label: t('contact_section.types.entreprise'), value: 'Entreprise' },
        { label: t('contact_section.types.regie'), value: 'Gérance/Régie' },
        { label: t('contact_section.types.proprio'), value: 'Propriétaire' },
        { label: t('contact_section.types.other'), value: 'Autre' },
    ];

    return (
        <section id="contact" className={`${compact ? 'py-8 md:pb-20 md:pt-4' : 'py-10 md:py-16'} bg-white relative overflow-hidden`}>
                {/* Yellow Line SVG Path */}
                <svg className="absolute w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <path 
                        d="M-50 400 C 100 300, 300 100, 600 300 C 800 433, 750 600, 900 600 C 1050 600, 1000 450, 1100 400 C 1200 350, 1350 400, 1500 450" 
                        stroke="#FBBF24" 
                        strokeWidth="12" 
                        strokeLinecap="round" 
                        strokeOpacity="0.8"
                        vectorEffect="non-scaling-stroke"
                    />
                    {/* Secondary lighter line for depth effect (optional, keeps it flat but interesting) */}
                    <path 
                        d="M-50 415 C 100 315, 300 115, 600 315 C 800 448, 750 615, 900 615 C 1050 615, 1000 465, 1100 415 C 1200 365, 1350 415, 1500 465" 
                        stroke="#FDE68A" 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                        strokeOpacity="0.4"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <Reveal>
                    <div className="bg-[#F4F7F5] rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row min-h-[640px] shadow-sm ring-1 ring-gray-100 mb-8">

                        {/* Form Side */}
                        <div className="w-full lg:w-1/2 p-8 sm:p-16 flex flex-col justify-center">
                            <div className="max-w-lg mx-auto w-full">
                                <span className="inline-block text-[#1b5e39] font-bold tracking-wider text-xs uppercase mb-4 bg-[#e8f5e9] px-4 py-1.5 rounded-full">
                                    {t('contact_section.tag')}
                                </span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f1f1a] mb-6 tracking-tight font-sans">
                                    {t('contact_section.title')}
                                </h2>
                                <p className="text-gray-800 mb-10 text-lg leading-relaxed">
                                    {t('contact_section.subtitle')}
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-[#0f1f1a] uppercase tracking-wide">{t('contact_section.you_are')}</label>
                                        <div className="flex flex-wrap gap-3">
                                            {clientRequestTypes.map((type) => (
                                                <Button
                                                    key={type.value}
                                                    type="button"
                                                    variant={currentType === type.value ? 'default' : 'outline'}
                                                    size="sm"
                                                    rounded="lg"
                                                    onClick={() => setCurrentType(type.value)}
                                                    className={cn(
                                                        "px-6 py-2.5 transition-all duration-300",
                                                        currentType === type.value
                                                            ? 'bg-[#1b5e39] text-white shadow-lg shadow-[#1b5e39]/20 transform scale-105'
                                                            : 'bg-white text-gray-800 hover:bg-gray-50 border-gray-200'
                                                    )}
                                                >
                                                    {type.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-[#0f1f1a] uppercase tracking-wide">{t('contact_section.name')}</label>
                                            {errors.fullName && <span className="text-[10px] text-red-500 font-medium">{errors.fullName}</span>}
                                        </div>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className={`w-full bg-white border border-gray-200 rounded-none px-5 py-4 text-[#0f1f1a] placeholder:text-gray-700 focus:ring-2 focus:ring-[#1b5e39]/20 transition-all shadow-md ${errors.fullName ? 'ring-1 ring-red-500' : ''}`}
                                            placeholder="Jean Dupont"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-xs font-bold text-[#0f1f1a] uppercase tracking-wide">{t('contact_section.email')}</label>
                                                {errors.email && <span className="text-[10px] text-red-500 font-medium">{errors.email}</span>}
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full bg-white border border-gray-200 rounded-none px-5 py-4 text-[#0f1f1a] placeholder:text-gray-700 focus:ring-2 focus:ring-[#1b5e39]/20 transition-all shadow-md ${errors.email ? 'ring-1 ring-red-500' : ''}`}
                                                placeholder="jean.dupont@email.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-xs font-bold text-[#0f1f1a] uppercase tracking-wide">{t('contact_section.phone')}</label>
                                                {errors.phone && <span className="text-[10px] text-red-500 font-medium">{errors.phone}</span>}
                                            </div>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800">
                                                    <Phone size={16} />
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handlePhoneChange}
                                                    className={`w-full bg-white border border-gray-200 rounded-none pl-12 pr-5 py-4 text-[#0f1f1a] placeholder:text-gray-700 focus:ring-2 focus:ring-[#1b5e39]/20 transition-all shadow-md ${errors.phone ? 'ring-1 ring-red-500' : ''}`}
                                                    placeholder="+41 79 000 00 00"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-[#0f1f1a] uppercase tracking-wide">{t('contact_section.message')}</label>
                                            {errors.message && <span className="text-[10px] text-red-500 font-medium">{errors.message}</span>}
                                        </div>
                                        <textarea
                                            rows={4}
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`w-full bg-white border border-gray-200 rounded-none px-5 py-4 text-[#0f1f1a] placeholder:text-gray-700 focus:ring-2 focus:ring-[#1b5e39]/20 transition-all shadow-md resize-none ${errors.message ? 'ring-1 ring-red-500' : ''}`}
                                            placeholder={t('contact_section.placeholder_message')}
                                        ></textarea>
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="dark"
                                        size="lg"
                                        rounded="lg"
                                        disabled={isSubmitting}
                                        className="w-full h-14 bg-[#1b5e39] hover:bg-[#144a2d] text-white text-lg font-bold shadow-xl shadow-[#1b5e39]/20 transition-all hover:-translate-y-1 group disabled:opacity-70 disabled:hover:translate-y-0"
                                    >
                                        <span>{isSubmitting ? t('contact_section.sending') : t('contact_section.submit')}</span>
                                        {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className="hidden lg:block lg:w-1/2 relative lg:min-h-full overflow-hidden">
                            <img
                                src={contactImage}
                                alt="Swiss Ecogestes"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#1b5e39]/80 mix-blend-multiply opacity-60"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f1a] via-transparent to-transparent"></div>

                            <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                                <div className="mb-6 w-12 h-1 bg-[#4ade80]"></div>
                                <blockquote className="text-2xl md:text-3xl font-medium leading-normal mb-8 tracking-tight font-sans">
                                    {t('contact_section.quote')}
                                </blockquote>
                                <div className="flex items-center gap-3 opacity-90">
                                    <span className="font-bold tracking-widest uppercase text-sm">{t('common.swissecogestes')}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* INFO ROW - Updated: No Container, Simple & Clean */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-gray-800">
                        <a href={`mailto:${email}`} className="flex items-center gap-4 group transition-colors">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#1b5e39] group-hover:bg-[#e8f5e9] transition-colors">
                                <Mail size={18} />
                            </div>
                            <span className="text-lg font-medium border-b-2 border-transparent group-hover:border-[#1b5e39] group-hover:text-[#1b5e39] transition-all pb-0.5">
                                {email}
                            </span>
                        </a>

                        <span className="hidden md:block w-px h-8 bg-gray-300"></span>

                        <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-4 group transition-colors">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#1b5e39] group-hover:bg-[#e8f5e9] transition-colors">
                                <Phone size={18} />
                            </div>
                            <span className="text-lg font-medium border-b-2 border-transparent group-hover:border-[#1b5e39] group-hover:text-[#1b5e39] transition-all pb-0.5">
                                {phone}
                            </span>
                        </a>

                        <span className="hidden md:block w-px h-8 bg-gray-300"></span>

                        <div className="flex items-center gap-4 cursor-default">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#1b5e39]">
                                <MapPin size={18} />
                            </div>
                            <span className="text-lg font-medium">{address}</span>
                        </div>

                        <span className="hidden md:block w-px h-8 bg-gray-300"></span>

                        <div className="flex gap-4">
                            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5] hover:-translate-y-1.5 transition-transform duration-300 ease-spring">
                                <Linkedin size={18} />
                            </a>
                            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#E4405F]/10 flex items-center justify-center text-[#E4405F] hover:-translate-y-1.5 transition-transform duration-300 ease-spring">
                                <Instagram size={18} />
                            </a>
                            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] hover:-translate-y-1.5 transition-transform duration-300 ease-spring">
                                <Facebook size={18} />
                            </a>
                            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900/10 flex items-center justify-center text-gray-900 hover:-translate-y-1.5 transition-transform duration-300 ease-spring">
                                <X size={18} />
                            </a>
                        </div>
                    </div>

                </Reveal>
            </div>
        </section>
    );
};
export default ContactSection;
