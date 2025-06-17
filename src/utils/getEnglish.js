import { ref, onMounted } from "vue";

let str = ref("");
const arr = ref([]);
// export const getData = async () => {
//     const data = await fetch(
//         "https://aisubtitle.hdslb.com/bfs/subtitle/6375e4859f4734148ffb577ce4851177d2f63e1e.json?auth_key=1749879216-f2996508409b435ab3133cabcf6ca6d5-0-d2c38d54e29e3d6ae9a6faf8cfbd42d9"
//     ).then(res => res.json())
//     str = data.body.map((item) => item.content).join("\n");

//     console.log(str);
//     navigator.clipboard.writeText(str);
// };
export const getData = async () => {
    const res = await fetch(
        "https://aisubtitle.hdslb.com/bfs/subtitle/6375e4859f4734148ffb577ce4851177d2f63e1e.json?auth_key=1749879216-f2996508409b435ab3133cabcf6ca6d5-0-d2c38d54e29e3d6ae9a6faf8cfbd42d9"
    )
    const data = await res.json();
    str = data.body.map((item) => item.content).join("\n");

    console.log(str);
    navigator.clipboard.writeText(str);
};

