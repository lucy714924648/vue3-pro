import { setupWorker } from 'msw';
import { handlers } from './handlers';

// 创建浏览器工作者
export const worker = setupWorker(...handlers);

// 在开发环境启动拦截（生产环境不启用）
if (import.meta.env.DEV) {
    worker.start({
        // 处理未定义的请求
        onUnhandledRequest: 'warn'
    });
}    