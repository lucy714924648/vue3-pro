import { rest } from 'msw';

// 模拟数据库
let db = {
    items: [
        { id: 1, name: '初始数据1', category: '默认', createdAt: new Date().toISOString() },
        { id: 2, name: '初始数据2', category: '示例', createdAt: new Date().toISOString() }
    ]
};

export const handlers = [
    // 拦截 GET 请求
    rest.get('/api/items', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(db.items));
    }),

    // 拦截 POST 请求（创建数据）
    rest.post('/api/items', async (req, res, ctx) => {
        const newItem = await req.json();
        const createdItem = {
            id: Date.now(), // 生成唯一ID
            ...newItem,
            createdAt: new Date().toISOString()
        };

        // 添加到模拟数据库
        db.items.push(createdItem);

        return res(
            ctx.status(201), // 创建成功状态码
            ctx.json(createdItem)
        );
    }),

    // 拦截 DELETE 请求（删除数据）
    rest.delete('/api/items/:id', (req, res, ctx) => {
        const { id } = req.params;
        const itemIndex = db.items.findIndex(item => item.id === Number(id));

        if (itemIndex === -1) {
            return res(ctx.status(404), ctx.json({ error: '未找到该项目' }));
        }

        // 从模拟数据库中删除
        db.items.splice(itemIndex, 1);

        return res(ctx.status(200), ctx.json({ message: '删除成功' }));
    }),

    // 模拟网络延迟（可选）
    rest.get('/api/slow-items', (req, res, ctx) => {
        return res(
            ctx.delay(1500), // 延迟1.5秒
            ctx.status(200),
            ctx.json(db.items)
        );
    }),

    // 模拟错误响应（可选）
    rest.post('/api/error-items', (req, res, ctx) => {
        return res(
            ctx.status(500),
            ctx.json({ error: '服务器内部错误' })
        );
    })
];    