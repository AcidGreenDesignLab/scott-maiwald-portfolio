export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
        <div className="space-y-3">
          <h4 className="text-[15px] font-semibold" style={{ color: "#94a3b8" }}>
            Intellectual Property Notice
          </h4>
          <p className="text-[13px] text-slate-400 leading-relaxed">
            All case studies, proprietary frameworks, and design assets showcased here are protected by copyright. 
            Unauthorized reproduction, distribution, or commercial use of this intellectual property is strictly prohibited.
          </p>
        </div>
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Scott Maiwald. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
