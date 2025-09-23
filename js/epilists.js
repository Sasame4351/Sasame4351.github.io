async function loadCSVEpisodes(code)
{
    try
    {
        let csvcode = '../csv/'+code+'.csv';
        const response = await fetch(csvcode);
        if (!response.ok)
        {
            throw new Error("HTTP error! status: " + response.status);
        }

        const text = await response.text();

        let csvArray = [];
        let lines = text.split("\n");

        for (let i = 0; i < lines.length; ++i)
        {
            let cells = lines[i].split(",");
            if (cells.length !== 1)
            {
                csvArray.push(cells);
            }
        }

        let elem = document.getElementById("episodes");
        for(let i=0;i<csvArray.length;i++)
        {
            elem.innerHTML = elem.innerHTML +
            '<h3><a href="../Mag/'+csvArray[i][1].substr(2,4)+'.html">'+
            '第'+csvArray[i][0]+'話:'+
            'まんがタイムきららキャラット'+
            csvArray[i][1].substr(0,4)+'年'+
            csvArray[i][1].substr(4)+'月号</a></h3>';
        }

    }
    catch (err)
    {
        console.error("CSVの読み込みエラー:", err);
    }
}