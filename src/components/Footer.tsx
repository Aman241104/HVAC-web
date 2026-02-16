export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-12 text-slate-600 font-sans relative overflow-hidden">
      {/* Large Watermark Logo */}
      <div className="absolute -left-20 -bottom-20 w-96 h-96 opacity-[0.03] pointer-events-none select-none">
        <img src="/company_logo.png" alt="" className="w-full h-full object-contain grayscale" />
      </div>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src="/company_logo.png" alt="VAER HVAC Logo" className="w-16 h-16 object-contain" />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-slate-500">
              Engineering comfort through precision climate control solutions. Serving luxury residential and commercial spaces with pride.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors">VRF Installation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Annual Maintenance</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Emergency Repairs</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Ductwork Design</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Indoor Air Quality</a></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Our Projects</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Get in Touch</h4>
            <div className="space-y-4 text-sm">
              <p>
                <strong className="text-slate-900 block mb-1">Support</strong>
                support@vaerhvac.com
              </p>
              <p>
                <strong className="text-slate-900 block mb-1">Sales</strong>
                +91 982 465 3242
              </p>
              <p>
                <strong className="text-slate-900 block mb-1">Location</strong>
                A-73, The New Ritanagar Co.Op.H.Society, Ahead Bhagatbapa Nagar, Vastral Road, Amraiwadi, Ahmedabad-380026, Gujarat, India
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wide text-slate-500">
          <p>&copy; {new Date().getFullYear()} VAER HVAC Solutions. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
