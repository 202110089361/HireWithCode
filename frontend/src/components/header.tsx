export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <img 
                className="relative h-10 w-10 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform" 
                src="/images/logo.png" 
                alt="Infist" 
              />
            </div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Infist
            </span>
          </div>
          
          {/* 可选：添加导航指示器 */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500 font-medium">面试进行中</span>
          </div>
        </div>
      </div>
    </header>
  );
}