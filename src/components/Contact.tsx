'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2, Loader2, RotateCcw, Send } from 'lucide-react'

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null)

    // Form State
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        serviceType: 'Residential VRF',
        message: ''
    })

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        })

        tl.from('.contact-title', {
            y: 30,
            opacity: 0,
            duration: 0.8,
        })
            .from('.contact-info', {
                x: -30,
                opacity: 0,
                duration: 0.8,
            }, '-=0.6')
            .from('.contact-form', {
                x: 30,
                opacity: 0,
                duration: 0.8,
            }, '-=0.6')

    }, { scope: containerRef })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate a brief processing delay for UX
        await new Promise(resolve => setTimeout(resolve, 800))

        // Format WhatsApp Message
        const text = `*New Project Inquiry - VAER HVAC*%0A%0A` +
            `*Name:* ${formData.name}%0A` +
            `*Phone:* ${formData.phone}%0A` +
            `*Requirement:* ${formData.serviceType}%0A` +
            `*Details:* ${formData.message || 'N/A'}`

        // Redirect to WhatsApp
        window.open(`https://wa.me/919824653242?text=${text}`, '_blank')

        setIsSubmitting(false)
    }

    return (
        <section id="contact" ref={containerRef} className="py-24 bg-white relative overflow-hidden">
            {/* Engineering Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="contact-title text-center mb-16">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                        Get In Touch
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                        Ready to Upgrade Your <br />
                        <span className="text-blue-600">Climate Control?</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Schedule a free site inspection with our senior engineers. No sales reps, just technical experts.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Contact Info (Left) */}
                    <div className="contact-info space-y-8">
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
                            {/* Decor Corner */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-50 to-transparent rounded-tr-2xl"></div>

                            <h3 className="text-xl font-bold text-slate-900 mb-6 relative z-10">Contact Information</h3>

                            <div className="space-y-6 relative z-10">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Phone</p>
                                        <a href="tel:+919824653242" className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                                            +91 982 465 3242
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Email</p>
                                        <a href="mailto:info@vaerhvac.com" className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                                            info@vaerhvac.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Office</p>
                                        <p className="text-lg font-semibold text-slate-900">
                                            A-73, The New Ritanagar Co.Op.H.Society,<br />
                                            Ahead Bhagatbapa Nagar, Vastral Road,<br />
                                            Amraiwadi, Ahmedabad-380026,<br />
                                            Gujarat, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                            <div>
                                <p className="font-bold text-emerald-800">Certified Engineers</p>

                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="contact-form bg-white rounded-2xl p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden min-h-[500px] flex flex-col justify-center">

                        <form onSubmit={handleSubmit} className="space-y-6 transition-opacity duration-300 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-slate-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-bold text-slate-700">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="serviceType" className="text-sm font-bold text-slate-700">Project Type</label>
                                <select
                                    id="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-700"
                                >
                                    <option>Residential VRF</option>
                                    <option>Commercial Office</option>
                                    <option>Villa/Penthouse</option>
                                    <option>Industrial Ventilation</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-slate-700">Message (Optional)</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 text-slate-900 resize-none"
                                    placeholder="Tell us about your requirements..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating Project Brief...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                        Book via WhatsApp
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-slate-400 mt-2">
                                You'll be redirected to chat with our engineering team directly.
                            </p>
                        </form>

                    </div>
                </div>

            </div>
        </section >
    )
}
