async function loadEpisodeslists(code)
{
    try
    {
        let jsoncode = '../jsonWork/'+code+'.json';
        const response = await fetch(jsoncode);
        if (!response.ok)
        {
            throw new Error("HTTP error! status: " + response.status);
        }

        const episodesJSON = await response.json();

        let elem = document.getElementById("episodes");
        for(let i=0;i<episodesJSON.length;i++)
        {
            const obj = episodesJSON.find(item => item.episodes === i+1);
            elem.innerHTML = elem.innerHTML +
            '<h3><a href="../Mag/'+String(obj.number).substring(2,6)+'.html">'+
            '第'+obj.episodes+'話:'+
            String(obj.number).substring(0,4)+'年'+
            String(obj.number).substring(4,6)+'月号</a></h3>';
        }

    }
    catch (err)
    {
        console.error("JSONの読み込みエラー:", err);
    }
}