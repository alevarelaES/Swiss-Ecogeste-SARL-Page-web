import React, { useState } from 'react';
import { Mail, MapPin, Linkedin, Instagram, ArrowRight, Phone } from 'lucide-react';
import { Button } from "../ui/button";
import { cn } from '../ui/utils';
import Reveal from '../animations/Reveal';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';

const ContactSection = ({ compact = false }: { compact?: boolean }) => {
    const { t } = useTranslation('common');
    const [currentType, setCurrentType] = useState('Villa');
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
            {/* Cool Abstract Background Shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute -top-[10%] -left-[10%] w-[50%] h-[60%] text-[#1b5e39]/5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M42.7,-73.2C55.9,-67.1,67.6,-57.6,76.1,-46.1C84.6,-34.6,89.9,-21.1,89.2,-7.9C88.5,5.3,81.8,18.2,73.1,29.4C64.4,40.6,53.7,50.1,42.1,58.3C30.5,66.5,18,73.4,4.2,76.2C-9.6,79,-20.9,77.7,-31.6,72.6C-42.3,67.5,-52.4,58.6,-61,48.1C-69.6,37.6,-76.7,25.5,-79.8,12.4C-82.9,-0.7,-82,-9.5,-76.3,-19.9C-70.6,-30.3,-60.1,-42.3,-48.5,-50C-36.9,-57.7,-24.2,-61.1,-11.7,-63.9C0.8,-66.7,13.3,-68.9,29.5,-71.3L42.7,-73.2Z" transform="translate(100 100)" />
                </svg>
                <svg className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[70%] text-[#4ade80]/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M37.5,-64.4C49.6,-58.3,61.1,-50.7,69.5,-40.4C77.9,-30.1,83.2,-17.1,83.8,-3.8C84.4,9.5,80.3,23.1,72.7,34.7C65.1,46.3,54,55.9,41.9,62.8C29.8,69.7,16.7,73.9,3.1,76.4C-10.5,78.9,-24.6,79.7,-36.8,75C-49,70.3,-59.3,60.1,-66.4,48.1C-73.5,36.1,-77.4,22.3,-78.3,8.3C-79.2,-5.7,-77.1,-19.9,-69.6,-32.1C-62.1,-44.3,-49.2,-54.5,-35.8,-61.1C-22.4,-67.7,-8.5,-70.7,3.9,-71.9C16.3,-73.1,30.3,-72.5,41.5,-67.2L37.5,-64.4Z" transform="translate(100 100)" />
                </svg>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDQwaDQwVjBIMHY0MHptMS0xdjM4aDM4VjFIMXoiIGZpbGw9IiMxYjVlMzkiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
                <div className="absolute top-[20%] right-[15%] w-32 h-32 rounded-full border-4 border-[#1b5e39]/5 opacity-60"></div>
                <div className="absolute bottom-[20%] left-[8%] w-24 h-24 rounded-full border-2 border-dashed border-[#1b5e39]/10 rotate-45"></div>
            </div>
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
                                <p className="text-gray-600 mb-10 text-lg leading-relaxed">
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
                                                            : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
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
                                            className={`w-full bg-white border border-gray-200 rounded-none px-5 py-4 text-[#0f1f1a] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1b5e39]/20 transition-all shadow-md ${errors.fullName ? 'ring-1 ring-red-500' : ''}`}
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
                                                className={`w-full bg-white border border-gray-200 rounded-none px-5 py-4 text-[#0f1f1a] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1b5e39]/20 transition-all shadow-md ${errors.email ? 'ring-1 ring-red-500' : ''}`}
                                                placeholder="jean.dupont@email.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-xs font-bold text-[#0f1f1a] uppercase tracking-wide">{t('contact_section.phone')}</label>
                                                {errors.phone && <span className="text-[10px] text-red-500 font-medium">{errors.phone}</span>}
                                            </div>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <Phone size={16} />
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handlePhoneChange}
                                                    className={`w-full bg-white border border-gray-200 rounded-none pl-12 pr-5 py-4 text-[#0f1f1a] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1b5e39]/20 transition-all shadow-md ${errors.phone ? 'ring-1 ring-red-500' : ''}`}
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
                                            className={`w-full bg-white border border-gray-200 rounded-none px-5 py-4 text-[#0f1f1a] placeholder:text-gray-400 focus:ring-2 focus:ring-[#1b5e39]/20 transition-all shadow-md resize-none ${errors.message ? 'ring-1 ring-red-500' : ''}`}
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
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                                alt="Experte Swiss Ecogestes"
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
                    <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-gray-600">
                        <a href="mailto:info@swissecogestes.ch" className="flex items-center gap-4 group transition-colors">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#1b5e39] group-hover:bg-[#e8f5e9] transition-colors">
                                <Mail size={18} />
                            </div>
                            <span className="text-lg font-medium border-b-2 border-transparent group-hover:border-[#1b5e39] group-hover:text-[#1b5e39] transition-all pb-0.5">
                                info@swissecogestes.ch
                            </span>
                        </a>

                        <span className="hidden md:block w-px h-8 bg-gray-300"></span>

                        <div className="flex items-center gap-4 cursor-default">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#1b5e39]">
                                <MapPin size={18} />
                            </div>
                            <span className="text-lg font-medium">Vaud & Genève</span>
                        </div>

                        <span className="hidden md:block w-px h-8 bg-gray-300"></span>

                        <div className="flex gap-4">
                            <a href="https://www.linkedin.com/company/swissecogestes/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5] hover:-translate-y-1.5 transition-transform duration-300 ease-spring">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://www.instagram.com/swissecogestes/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#E4405F]/10 flex items-center justify-center text-[#E4405F] hover:-translate-y-1.5 transition-transform duration-300 ease-spring">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                </Reveal>
            </div>
        </section>
    );
};
export default ContactSection;
