async function loadWorksinfo(code)
{
    try
    {
        let jsoncode = '../jsonWork/'+code+'.json';
        const response = await fetch(jsoncode);
        if (!response.ok)
        {
            throw new Error("HTTP error! status: " + response.status);
        }

        const worksJSON = await response.json();

        let elem = document.getElementById("workinfo");

        const firstnum = worksJSON.find(item => item.order === 0);
        const lastnum = worksJSON.find(item => item.order === worksJSON.length);

        elem.innerHTML = elem.innerHTML +
        '<dt class="aaa">作者</dt>' +
        '<dd class="f1">ぴらそん</dd>' +
        '<dt class="aaa">連載開始号</dt>' +
        '<dd class="f1">' + String(firstnum.number).substring(0,4) + '年' +
        String(firstnum.number).substring(5,6) + '月号' + '</dd>' +
        '<dt class="aaa">話数</dt>' +
        '<dd class="f1">' + lastnum.episodes + '</dd>';
    }
    catch (err)
    {
        console.error("JSONの読み込みエラー:", err);
    }
}