async function loadWorkslists(code)
{
    try
    {
        let jsoncode = '../jsonMag/'+code+'.json';
        const response = await fetch(jsoncode);
        if (!response.ok)
        {
            throw new Error("HTTP error! status: " + response.status);
        }

        const worksJSON = await response.json();

        let elem = document.getElementById("works");
        for(let i=0;i<worksJSON.length;i++)
        {
            const obj = worksJSON.find(item => item.order === i+1);
            elem.innerHTML = elem.innerHTML +
            '<p><a href="../Work/'+obj.tag+'.html">'+
            obj.title +'</a></p>';
        }

    }
    catch (err)
    {
        console.error("JSONの読み込みエラー:", err);
    }
}