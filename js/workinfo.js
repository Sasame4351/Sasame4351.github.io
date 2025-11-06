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


        if(document.getElementById("headkiraracarat" != null))
        {
            let headhtml = document.getElementById("headkiraracarat");
            headhtml.innerHTML +=
            '<meta charset="utf-8" />'+
            '<title>キャラット雑感 '+infoJSON.title+'</title>'+
            '<meta name="description" content="まんがタイムきららキャラットの感想を垂れ流す"></meta>'+
            '<meta name="viewport" content="width = device-width, user-scalable = 1">'+
            '<link rel="stylesheet" href="/css/stylesheet.css"></link>';
        }


        if(document.getElementById("pagetitle") != null)
        {
            let pagetitle = document.getElementById("pagetitle");
            pagetitle.innerHTML += 'キャラット雑感 '+infoJSON.title;
        }


        if(document.getElementById("workinfo") != null)
        {
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
        }


        if(document.getElementById("workstory") != null)
        {
            let workstory = document.getElementById("workstory");

            workstory.innerHTML = workstory.innerHTML +
            '<p>' + infoJSON.story + '</p>';
        }


        let workcharacter = document.getElementById("workcharacter");
        let spoiler = document.getElementsByClassName("depth");

        function character()
        {
            workcharacter.innerHTML = "";

            for(let i=0;i<characterJSON.length;i++)
            {
                const obj = characterJSON.find(item => item.order === i+1);
                const description = obj.description;
                let html = '<h3>'+obj.name+'('+obj.read+')'+'</h3>';
                html += '<p>'+description[0]+'</p>';

                for(let j=0;j<spoiler.length;j++)
                {
                    if(spoiler[j].checked && description[j+1])
                    {
                        html += '<p>'+description[j+1]+'</p>'
                    }
                }

                workcharacter.innerHTML += html;
            }
        }

        character();

        for(const cb of spoiler)
        {
            cb.addEventListener("change",character);
        }
    }
    catch (err)
    {
        console.error("JSONの読み込みエラー:", err);
    }
}