// 真实的API请求封装
export const fetchItems = async () => {
    const response = await fetch('/api/items');
    if (!response.ok) throw new Error('获取数据失败');
    return response.json();
};

export const createItem = async (data) => {
    const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('创建数据失败');
    return response.json();
};

export const deleteItem = async (id) => {
    const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('删除数据失败');
    return response.json();
};    