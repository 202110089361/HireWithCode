import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InterviewGuidePage() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 获取README.md内容
    fetch('https://raw.githubusercontent.com/InfiniteStatesInc/HireWithCode/refs/heads/main/README.md')
      .then(response => response.text())
      .then(content => {
        setMarkdownContent(content);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching markdown:', error);
        setIsLoading(false);
      });
  }, []);

  const handleNext = () => {
    navigate('/accept-challenge');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* 头部装饰 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">面试流程说明</h1>
              <p className="text-blue-100">请仔细阅读以下说明，了解完整的面试流程</p>
            </div>
          </div>

          <div className="p-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="ml-4 text-gray-600">加载中...</span>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none mb-8">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                  {markdownContent || '内容加载失败，请刷新页面重试'}
                </div>
              </div>
            )}

            <div className="text-center pt-6 border-t border-gray-100">
              <button
                onClick={handleNext}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  开始挑战
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}