// JSON 檔案網址
const url = "https://hexschool.github.io/js-filter-data/data.json";
const box = document.querySelector(".box");
const btnBox = document.querySelector(".btnBox");

let data = [];
let currentData = []; 
let currentSortKey = null; // 新增：記錄目前排序欄位

// 抓取api資料賦予到data,過濾掉作物名稱為空值
function getData(){
axios.get(url)
    .then((res)=>{
        res.data.forEach((item)=>{
            if (item.作物名稱){data.push(item);
            }
        })
    })
}
getData();

function renderData(showdata) {
    let str='';
    showdata.forEach((item)=>{
        str += `<tr>
                <td>${item.作物名稱}</td>
                <td>${item.市場名稱}</td>
                <td>${item.上價}</td>
                <td>${item.中價}</td>
                <td>${item.下價}</td>
                <td>${item.平均價}</td>
                <td>${item.交易量}</td>
                </tr>`;
            })
            box.innerHTML = str;
        }
        
btnBox.addEventListener("click",(e)=>{
    const type = e.target.textContent;
    const buttons = document.querySelectorAll('.btnBox button');
    if (e.target.nodeName === 'BUTTON'){
        buttons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        let filterData = [];
        if (type === '蔬菜'){
            filterData = data.filter((item)=>item.種類代碼 ==='N04' && item.作物名稱);
        }else if (type === '水果'){
            filterData = data.filter((item)=>item.種類代碼 ==='N05' && item.作物名稱);
        }else if (type === '花卉'){
            filterData = data.filter((item)=>item.種類代碼 ==='N06' && item.作物名稱);
        }
        if (currentSortKey) {
            filterData = [...filterData].sort((a,b)=> b[currentSortKey] - a[currentSortKey]);
        }
        renderData(filterData);
        currentData = filterData;
    }
})

const search = document.querySelector(".search");
search.addEventListener("click", () => {
    const input = document.querySelector(".input");
    const keyword = input.value.trim();
    if (keyword) {
        const regex = new RegExp(keyword, 'gi');
        currentData = data.filter(item => item.作物名稱 && regex.test(item.作物名稱));
    } else {
        // 如果輸入是空的，就顯示全部
        currentData = data;
    }
    renderData(currentData);
    input.value = '';
});

const select = document.querySelector(".sortSelect");
select.addEventListener('change',(e)=>{
    switch (e.target.value){
        case '依上價排序':
            currentSortKey = '上價';
            selectChange('上價');
            break;
        case '依中價排序':
            currentSortKey = '中價';
            selectChange('中價');
            break;
        case '依下價排序':
            currentSortKey = '下價';
            selectChange('下價');
            break;
        case '依平均價排序':
            currentSortKey = '平均價';
            selectChange('平均價');
            break;
        case '依交易量排序':
            currentSortKey = '交易量';
            selectChange('交易量');
            break;
        default:
            break;
    }
    function selectChange(search){
        let sortData = [...currentData].sort((a,b)=>{
            return b[search] - a[search];
        });
        renderData(sortData);
    }
})
