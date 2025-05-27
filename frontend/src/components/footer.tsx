export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-600 font-medium">
              © 2024 Infist. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6 text-xs text-gray-500">
            <span className="hover:text-blue-600 transition-colors cursor-pointer">隐私政策</span>
            <span className="hover:text-blue-600 transition-colors cursor-pointer">服务条款</span>
            <span className="hover:text-blue-600 transition-colors cursor-pointer">联系我们</span>
          </div>
        </div>
      </div>
    </footer>
  );
}