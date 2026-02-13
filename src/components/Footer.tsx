export default function Footer() {
    return (
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-slate-400 font-sans">
        <div className="container mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl font-bold text-white">VAER</span>
                  <span className="text-2xl font-light text-slate-500">HVAC</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                Engineering comfort through precision climate control solutions. Serving luxury residential and commercial spaces since 2014.
              </p>
            </div>
  
            {/* Services Column */}
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">VRF Installation</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Annual Maintenance</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Emergency Repairs</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Ductwork Design</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Indoor Air Quality</a></li>
              </ul>
            </div>
  
            {/* Quick Links Column */}
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Our Projects</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Contact</a></li>
              </ul>
            </div>
  
            {/* Contact Column */}
            <div>
              <h4 className="text-white font-bold mb-6">Get in Touch</h4>
              <div className="space-y-4 text-sm">
                <p>
                  <strong className="text-slate-300 block mb-1">Support</strong>
                  support@vaerhvac.com
                </p>
                <p>
                  <strong className="text-slate-300 block mb-1">Sales</strong>
                  +91 6353070793
                </p>
                <p>
                  <strong className="text-slate-300 block mb-1">Location</strong>
                  Navi Mumbai, MH 400705
                </p>
              </div>
            </div>
  
          </div>
  
          {/* Bottom Bar */}
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wide">
            <p>&copy; {new Date().getFullYear()} VAER HVAC Solutions. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
  
        </div>
      </footer>
    )
  }
