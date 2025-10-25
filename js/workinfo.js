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
        const infoJSON = worksJSON.info[0];
        const characterJSON = worksJSON.character;
        const listJSON = worksJSON.list;


        let workinfo = document.getElementById("workinfo");

        let firstnum = listJSON.find(item => item.episodes === 1);
        let lastnum = listJSON.find(item => item.episodes === listJSON.length);

        workinfo.innerHTML = workinfo.innerHTML +
        '<dt class="aaa">作者</dt>' +
        '<dd class="f1">' + infoJSON.author + '</dd>' +
        '<dt class="aaa">連載開始号</dt>' +
        '<dd class="f1">' + String(firstnum.number).substring(0,4) + '年' +
        String(firstnum.number).substring(4,6) + '月号' + '</dd>' +
        '<dt class="aaa">話数</dt>' +
        '<dd class="f1">' + lastnum.episodes + '</dd>';


        let workstory = document.getElementById("workstory");

        workstory.innerHTML = workstory.innerHTML +
        '<p>' + infoJSON.story + '</p>';


        let workcharacter = document.getElementById("workcharacter");
        for(let i=0;i<characterJSON.length;i++)
        {
            const obj = characterJSON.find(item => item.order === i+1);
            workcharacter.innerHTML = workcharacter.innerHTML +
            '<h3>' + obj.name + '(' + obj.read + ')' + '</h3>' +
            '<p>' + obj.description + '</p>'
        }
    }
    catch (err)
    {
        console.error("JSONの読み込みエラー:", err);
    }
}