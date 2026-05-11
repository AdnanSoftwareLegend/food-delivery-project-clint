

const Footer = () => {
    return (
        <footer className="bg-[#121212] text-gray-400 pt-16 pb-8 px-6 lg:px-16 mt-20">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
                
                <div className="space-y-4">
                    <h2 className="text-3xl font-black italic text-white">Delish<span className="text-[#ff6b6b]">!</span></h2>
                    <p className="text-sm">Fresh flavors, fast delivery. We bring the best city food to your table.</p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-white font-bold uppercase text-xs tracking-widest">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-[#ff6b6b]">About Us</a></li>
                        <li><a href="#" className="hover:text-[#ff6b6b]">Restaurants</a></li>
                        <li><a href="#" className="hover:text-[#ff6b6b]">Offers</a></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-white font-bold uppercase text-xs tracking-widest">Contact</h3>
                    <p className="text-sm">Email: help@delish.com</p>
                    <p className="text-sm">Phone: +880 123 456 789</p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-white font-bold uppercase text-xs tracking-widest">Newsletter</h3>
                    <div className="flex bg-gray-800 rounded-lg p-1">
                        <input type="text" placeholder="Email" className="bg-transparent border-none outline-none px-3 py-2 w-full text-sm" />
                        <button className="bg-[#ff6b6b] text-white px-4 py-2 rounded-md text-xs font-bold uppercase">Join</button>
                    </div>
                </div>
            </div>
            
            <p className="text-center mt-8 text-[10px] tracking-widest uppercase font-bold">© 2026 DELISH DELIVERY SERVICE. ALL RIGHTS RESERVED.</p>
        </footer>
    );
};

export default Footer;