async function loadDictionaryworks()
{
    try
    {
        const response = await fetch('../jsonWork/_list.json');
        if (!response.ok)
        {
            throw new Error("HTTP error! status: " + response.status);
        }

        let listJSON = await response.json();

        function compare(a,b)
        {
            if( a.read < b.read ) return -1;
            else if( a.read > b.read ) return 1;
            else return 0;
        }
        listJSON.sort(compare);

        let dicwork = document.getElementById("dictionaryworks");
        for(let i=0;i<listJSON.length;i++)
        {
            const obj = listJSON[i];
            dicwork.innerHTML +=
            '<li><a href="../Work/'+obj.tag+'.html">'+
            obj.title +'</a></li>';
        }

    }
    catch (err)
    {
        console.error("JSONの読み込みエラー:", err);
    }
}