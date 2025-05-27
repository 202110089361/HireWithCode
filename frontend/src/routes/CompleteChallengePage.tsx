import { useState } from 'react';

export default function CompleteChallengePage() {
  const [formData, setFormData] = useState({
    githubRepoUrl: '',
    vercelUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 这里可以添加API调用来提交作品
      console.log('提交的作品:', formData);

      // 获取之前保存的用户信息
      const userInfo = localStorage.getItem('challengeUserInfo');
      const submissionData = {
        ...JSON.parse(userInfo || '{}'),
        ...formData,
        submittedAt: new Date().toISOString()
      };

      console.log('完整提交数据:', submissionData);

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitted(true);
    } catch (error) {
      console.error('提交失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">提交成功！</h1>
              <p className="text-gray-600">
                感谢您完成挑战！我们会尽快审查您的作品并与您联系。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
            完成挑战
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="githubRepoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                GitHub 仓库地址
              </label>
              <p className='text-[14px]'>https://github.com/202110089361/HireWithCode</p>
            </div>

            <div>
              <label htmlFor="vercelUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Vercel 在线体验地址
              </label>
              <p className='text-[14px]'>hire-with-code.vercel.app</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {isSubmitting ? '提交中...' : '提交作品'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}