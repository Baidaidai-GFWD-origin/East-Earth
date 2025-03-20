(function(){
    const rawHTML = $0
    const context = rawHTML.innerHTML
    
    function analyzeMusicList(params) {
        const regexp = /href="\/song\?id=(\d+)"/g;
        const songIDMatches = context.match(regexp);
        if (!songIDMatches) {
            console.log("No song IDs found.");
            return [];
        }
        const songIDs = songIDMatches.map(match => {
            const matchResult = /href="\/song\?id=(\d+)"/.exec(match);
            return matchResult ? matchResult[1] : null;
        });
        return songIDs;
    }
    
    const result = analyzeMusicList();
    
    console.log(result)
    console.log(result.toString())
})()
